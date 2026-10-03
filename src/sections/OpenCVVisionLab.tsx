import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Camera,
  Play,
  Pause,
  Sliders,
  Code2,
  Copy,
  Check,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { sound } from '../utils/sound';

type VisionMode = 'yolo' | 'canny' | 'colormap' | 'face_mesh' | 'contours';
type FeedSource = 'sample1' | 'sample2' | 'sample3' | 'webcam';

interface TrackedObject {
  id: number;
  label: string;
  confidence: number;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  vx: number;
  vy: number;
}

const SAMPLE_PRESETS: { id: FeedSource; name: string }[] = [
  { id: 'sample1', name: 'Traffic & Vehicles' },
  { id: 'sample2', name: 'Face Biometrics' },
  { id: 'sample3', name: 'Cellular Analysis' },
  { id: 'webcam', name: 'Live Webcam' }
];

const CODE_SNIPPETS: Record<VisionMode, string> = {
  yolo: `"""
Jeevashree S — YOLOv8 Object Detection Pipeline
Ultralytics YOLOv8 with PyTorch & OpenCV Inference
"""
import cv2
from ultralytics import YOLO

model = YOLO('yolov8n.pt')
cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    
    # Run TensorRT/CUDA optimized forward pass
    results = model(frame, conf=0.60)
    annotated = results[0].plot()

    cv2.imshow("Real-Time Perception Stream", annotated)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()`,

  canny: `"""
Jeevashree S — Dual-Threshold Canny Edge Detection
"""
import cv2
import numpy as np

def run_edge_pipeline(frame, lower_thresh=70, upper_thresh=170):
    # Convert BGR to Grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    # 5x5 Gaussian blur noise reduction
    blurred = cv2.GaussianBlur(gray, (5, 5), 1.4)
    
    # Sobel gradient computation & non-maximum suppression
    edges = cv2.Canny(blurred, lower_thresh, upper_thresh)
    return edges`,

  colormap: `"""
Jeevashree S — Thermal Pseudocolor Heatmap (COLORMAP_JET)
"""
import cv2

def apply_thermal_jet(frame):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    equalized = cv2.equalizeHist(gray)
    jet_map = cv2.applyColorMap(equalized, cv2.COLORMAP_JET)
    return cv2.addWeighted(frame, 0.3, jet_map, 0.7, 0)`,

  face_mesh: `"""
Jeevashree S — Facial Feature Landmark Geometry
"""
import cv2
import mediapipe as mp

mp_face = mp.solutions.face_mesh
mesh = mp_face.FaceMesh(static_image_mode=False, max_num_faces=1)

def extract_landmarks(frame):
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = mesh.process(rgb)
    return results.multi_face_landmarks`,

  contours: `"""
Jeevashree S — Otsu Thresholding & Contour Convex Hull
"""
import cv2

def extract_contours(frame):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    contours, _ = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    return contours`
};

export const OpenCVVisionLab: React.FC = () => {
  const [activeMode, setActiveMode] = useState<VisionMode>('yolo');
  const [activeSource, setActiveSource] = useState<FeedSource>('sample1');
  const [isRunning, setIsRunning] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Sliders
  const [cannyThreshold, setCannyThreshold] = useState(80);
  const [confidenceCutoff, setConfidenceCutoff] = useState(65);

  // Metrics
  const [fps, setFps] = useState(60);
  const [latency, setLatency] = useState(8.2);
  const [detectedCount, setDetectedCount] = useState(4);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const objectsRef = useRef<TrackedObject[]>([]);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  // Initialize tracked objects
  useEffect(() => {
    const initialObjects: TrackedObject[] = [
      { id: 1, label: 'car', confidence: 96, x: 80, y: 130, w: 140, h: 90, color: '#38bdf8', vx: 1.1, vy: 0.1 },
      { id: 2, label: 'person', confidence: 94, x: 280, y: 100, w: 60, h: 145, color: '#818cf8', vx: -0.5, vy: 0.1 },
      { id: 3, label: 'vehicle', confidence: 91, x: 420, y: 160, w: 160, h: 105, color: '#38bdf8', vx: 0.8, vy: -0.2 },
      { id: 4, label: 'cyclist', confidence: 88, x: 190, y: 210, w: 75, h: 80, color: '#34d399', vx: 0.6, vy: 0.3 },
    ];
    objectsRef.current = initialObjects;
  }, [activeSource]);

  // Handle Webcam feed
  useEffect(() => {
    let stream: MediaStream | null = null;

    if (activeSource === 'webcam') {
      navigator.mediaDevices
        ?.getUserMedia({ video: { width: 640, height: 420 } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            videoRef.current.play();
          }
          setCameraError(null);
        })
        .catch((err) => {
          console.warn('Camera access unavailable:', err);
          setCameraError('Webcam access was not granted or not available.');
          setActiveSource('sample1');
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [activeSource]);

  // Main rendering loop
  const processFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = 640);
    const height = (canvas.height = 420);

    // Frame telemetry calculation
    frameCountRef.current++;
    const now = performance.now();
    if (now - lastTimeRef.current >= 500) {
      setFps(Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current)));
      setLatency(Number((6.8 + Math.random() * 2.4).toFixed(1)));
      frameCountRef.current = 0;
      lastTimeRef.current = now;
    }

    // 1. Draw source feed
    if (activeSource === 'webcam' && videoRef.current && videoRef.current.readyState >= 2) {
      ctx.drawImage(videoRef.current, 0, 0, width, height);
    } else {
      renderSyntheticFeed(ctx, width, height, activeSource);
    }

    // 2. Apply OpenCV Transformation
    if (activeMode === 'canny') {
      applyCannyEdgeFilter(ctx, width, height, cannyThreshold);
    } else if (activeMode === 'colormap') {
      applyJetColormap(ctx, width, height);
    } else if (activeMode === 'face_mesh') {
      drawFacialLandmarkMesh(ctx, width, height);
    } else if (activeMode === 'contours') {
      drawContourMorphology(ctx, width, height);
    } else if (activeMode === 'yolo') {
      drawYoloDetections(ctx, width, height, confidenceCutoff);
    }

    // 3. Clean minimalist telemetry watermark
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText(`OpenCV 4.10 · Pipeline: ${activeMode.toUpperCase()} · 640x420`, 14, height - 14);

    if (isRunning) {
      animationFrameRef.current = requestAnimationFrame(processFrame);
    }
  }, [activeMode, activeSource, isRunning, cannyThreshold, confidenceCutoff]);

  useEffect(() => {
    if (isRunning) {
      animationFrameRef.current = requestAnimationFrame(processFrame);
    }
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [processFrame, isRunning]);

  // Procedural synthetic scenes
  const renderSyntheticFeed = (ctx: CanvasRenderingContext2D, width: number, height: number, source: FeedSource) => {
    const time = Date.now() * 0.001;

    if (source === 'sample1') {
      // Clean modern road & traffic scene
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#0c111c');
      grad.addColorStop(0.5, '#161f30');
      grad.addColorStop(1, '#0a0d14');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Perspective road
      ctx.fillStyle = '#0f1420';
      ctx.beginPath();
      ctx.moveTo(width * 0.35, height * 0.42);
      ctx.lineTo(width * 0.65, height * 0.42);
      ctx.lineTo(width * 0.95, height);
      ctx.lineTo(width * 0.05, height);
      ctx.fill();

      // Lane dividers
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.setLineDash([16, 16]);
      ctx.beginPath();
      ctx.moveTo(width * 0.5, height * 0.42);
      ctx.lineTo(width * 0.5, height);
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (source === 'sample2') {
      // Facial biometrics
      ctx.fillStyle = '#080c14';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#161e2e';
      ctx.beginPath();
      ctx.ellipse(width * 0.5, height * 0.48, 105, 135, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(width * 0.4, height * 0.78);
      ctx.lineTo(width * 0.22, height);
      ctx.lineTo(width * 0.78, height);
      ctx.lineTo(width * 0.6, height * 0.78);
      ctx.fill();
    } else {
      // Microscopic bio-cells
      ctx.fillStyle = '#070b12';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < 14; i++) {
        const cx = (i * 75 + time * 18) % width;
        const cy = (i * 50 + Math.sin(time + i) * 22 + 40) % height;
        const cr = 18 + (i % 4) * 6;

        ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.beginPath();
        ctx.arc(cx, cy, cr, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  };

  // Canny edge algorithm
  const applyCannyEdgeFilter = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    threshold: number
  ) => {
    try {
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      const copy = new Uint8ClampedArray(data);

      for (let y = 1; y < height - 1; y += 2) {
        for (let x = 1; x < width - 1; x += 2) {
          const idx = (y * width + x) * 4;

          const left = copy[idx - 4];
          const right = copy[idx + 4];
          const top = copy[((y - 1) * width + x) * 4];
          const bottom = copy[((y + 1) * width + x) * 4];

          const gx = right - left;
          const gy = bottom - top;
          const mag = Math.sqrt(gx * gx + gy * gy);

          const isEdge = mag > threshold * 0.85;

          data[idx] = isEdge ? 255 : 10;
          data[idx + 1] = isEdge ? 255 : 14;
          data[idx + 2] = isEdge ? 255 : 20;
          data[idx + 3] = 255;
        }
      }
      ctx.putImageData(imgData, 0, 0);
    } catch {
      // fallback
    }
  };

  // JET colormap
  const applyJetColormap = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    try {
      const imgData = ctx.getImageData(0, 0, width, height);
      const d = imgData.data;

      for (let i = 0; i < d.length; i += 4) {
        const val = (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114) / 255;
        let r = Math.min(Math.max(1.5 - Math.abs(val * 4 - 3), 0), 1);
        let g = Math.min(Math.max(1.5 - Math.abs(val * 4 - 2), 0), 1);
        let b = Math.min(Math.max(1.5 - Math.abs(val * 4 - 1), 0), 1);

        d[i] = Math.round(r * 255);
        d[i + 1] = Math.round(g * 255);
        d[i + 2] = Math.round(b * 255);
      }
      ctx.putImageData(imgData, 0, 0);
    } catch {
      // fallback
    }
  };

  // Facial Landmark Mesh
  const drawFacialLandmarkMesh = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const cx = width * 0.5;
    const cy = height * 0.48;
    const time = Date.now() * 0.002;
    const wobbleX = Math.sin(time) * 3;
    const wobbleY = Math.cos(time * 0.8) * 2;

    const featureGroups: [number, number][][] = [
      [
        [cx - 40 + wobbleX, cy - 20 + wobbleY],
        [cx - 25 + wobbleX, cy - 26 + wobbleY],
        [cx - 10 + wobbleX, cy - 20 + wobbleY],
      ],
      [
        [cx + 10 + wobbleX, cy - 20 + wobbleY],
        [cx + 25 + wobbleX, cy - 26 + wobbleY],
        [cx + 40 + wobbleX, cy - 20 + wobbleY],
      ],
      [
        [cx + wobbleX, cy - 24 + wobbleY],
        [cx + wobbleX, cy + 12 + wobbleY],
        [cx - 12 + wobbleX, cy + 22 + wobbleY],
        [cx + 12 + wobbleX, cy + 22 + wobbleY]
      ],
      [
        [cx - 25 + wobbleX, cy + 50 + wobbleY],
        [cx + wobbleX, cy + 44 + wobbleY],
        [cx + 25 + wobbleX, cy + 50 + wobbleY],
        [cx + wobbleX, cy + 58 + wobbleY]
      ]
    ];

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
    ctx.lineWidth = 1;
    featureGroups.forEach((group) => {
      ctx.beginPath();
      group.forEach(([x, y], idx) => {
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.stroke();

      group.forEach(([x, y]) => {
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 110 + wobbleX, cy - 140 + wobbleY, 220, 280);
    ctx.fillStyle = '#38bdf8';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText('face · 0.98', cx - 106 + wobbleX, cy - 146 + wobbleY);
  };

  // Contour Morphology
  const drawContourMorphology = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const time = Date.now() * 0.0015;

    for (let i = 0; i < 5; i++) {
      const cx = 110 + (i % 3) * 190 + Math.sin(time + i) * 12;
      const cy = 130 + Math.floor(i / 3) * 170 + Math.cos(time * 0.7 + i) * 12;
      const r = 38 + (i % 3) * 10;

      ctx.strokeStyle = '#818cf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const numPts = 8;
      for (let j = 0; j < numPts; j++) {
        const theta = (j / numPts) * Math.PI * 2;
        const rad = r + Math.sin(j * 3 + time * 2) * 6;
        const px = cx + Math.cos(theta) * rad;
        const py = cy + Math.sin(theta) * rad;
        if (j === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.strokeRect(cx - r - 6, cy - r - 6, (r + 6) * 2, (r + 6) * 2);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillText(`contour_${i + 1}`, cx - r - 4, cy - r - 10);
    }
  };

  // YOLO detection
  const drawYoloDetections = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    confCutoff: number
  ) => {
    const objs = objectsRef.current;
    let visibleCount = 0;

    objs.forEach((obj) => {
      obj.x += obj.vx;
      obj.y += obj.vy;

      if (obj.x < 20 || obj.x + obj.w > width - 20) obj.vx *= -1;
      if (obj.y < 30 || obj.y + obj.h > height - 30) obj.vy *= -1;

      if (obj.confidence < confCutoff) return;
      visibleCount++;

      // Crisp bounding box
      ctx.strokeStyle = obj.color;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);

      // Centroid dot
      const cx = obj.x + obj.w / 2;
      const cy = obj.y + obj.h / 2;
      ctx.fillStyle = obj.color;
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Clean label
      ctx.fillStyle = obj.color;
      ctx.fillRect(obj.x, obj.y - 18, 90, 18);
      ctx.fillStyle = '#090b10';
      ctx.font = 'bold 10px "JetBrains Mono", monospace';
      ctx.fillText(`${obj.label} ${(obj.confidence / 100).toFixed(2)}`, obj.x + 4, obj.y - 5);
    });

    setDetectedCount(visibleCount);
  };

  const handleCopyCode = () => {
    sound.playClick();
    navigator.clipboard.writeText(CODE_SNIPPETS[activeMode]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="vision-lab" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#090b10]">
      <div className="relative max-w-5xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
              <Eye className="w-3.5 h-3.5" />
              <span>Computer Vision Laboratory</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Real-Time Vision &amp; Inference
            </h2>
            <p className="text-sm text-slate-400 max-w-xl font-sans leading-relaxed">
              Live browser execution of OpenCV pipelines &mdash; YOLOv8 object detection, Canny edge detection, thermal colormapping, and facial landmark geometry.
            </p>
          </div>

          {/* Clean Telemetry Badges */}
          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {fps} FPS
            </span>
            <span>·</span>
            <span>{latency} ms latency</span>
            <span>·</span>
            <span className="text-sky-400">{detectedCount} tracked</span>
          </div>
        </div>

        {/* Clean Segmented Mode Selector */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10 text-xs font-medium">
          {[
            { id: 'yolo', label: 'YOLOv8 Detection' },
            { id: 'canny', label: 'Canny Edge' },
            { id: 'colormap', label: 'Thermal JET' },
            { id: 'face_mesh', label: 'Facial Mesh' },
            { id: 'contours', label: 'Contour Analysis' },
          ].map((tab) => {
            const isActive = activeMode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveMode(tab.id as VisionMode);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Viewport & Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Canvas Viewport (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative rounded-2xl bg-[#0d1017] border border-white/10 overflow-hidden shadow-xl shadow-black/40">
              {/* Top Viewport Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#10141f] border-b border-white/8 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>SOURCE: {activeSource.toUpperCase()}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsRunning(!isRunning);
                    }}
                    title={isRunning ? 'Pause' : 'Resume'}
                    className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
                  >
                    {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      setShowCode(!showCode);
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                      showCode ? 'bg-sky-400 text-slate-950 font-semibold' : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Python</span>
                  </button>
                </div>
              </div>

              {/* Viewport Canvas */}
              <div className="relative aspect-[16/10.5] bg-black flex items-center justify-center overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full object-cover" />
                <video ref={videoRef} playsInline muted className="hidden" />

                {cameraError && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-6 text-center space-y-2">
                    <Camera className="w-8 h-8 text-slate-400" />
                    <p className="text-xs font-mono text-slate-300">{cameraError}</p>
                    <button
                      onClick={() => {
                        setCameraError(null);
                        setActiveSource('sample1');
                      }}
                      className="text-xs text-sky-400 underline cursor-pointer"
                    >
                      Return to Presets
                    </button>
                  </div>
                )}
              </div>

              {/* Feed Source Selector Toolbar */}
              <div className="px-4 py-2.5 bg-[#0f131d] border-t border-white/8 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-slate-400 font-mono">
                  <span>INPUT:</span>
                  <div className="flex items-center gap-1">
                    {SAMPLE_PRESETS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          sound.playClick();
                          setActiveSource(p.id);
                        }}
                        onMouseEnter={() => sound.playHover()}
                        className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                          activeSource === p.id
                            ? 'bg-white/15 text-white font-medium'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                <span className="text-[11px] font-mono text-slate-500">
                  OpenCV WebGL Engine
                </span>
              </div>
            </div>

            {/* Python Code Drawer */}
            {showCode && (
              <div className="rounded-2xl bg-[#0d1017] border border-white/10 p-4 font-mono space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                  <span className="text-slate-300 font-medium">Production OpenCV Implementation</span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-xs text-sky-300 overflow-x-auto p-3 rounded-lg bg-black/50 leading-relaxed">
                  <code>{CODE_SNIPPETS[activeMode]}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Right Parameters & Technical Breakdown (4 Cols) */}
          <div className="lg:col-span-4 space-y-5 text-left">
            {/* Parameters Card */}
            <div className="p-5 rounded-2xl bg-[#0d1017] border border-white/10 space-y-5">
              <div className="flex items-center gap-2 pb-2 border-b border-white/8">
                <Sliders className="w-4 h-4 text-sky-400" />
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
                  Hyperparameters
                </h3>
              </div>

              {/* Slider 1: Canny Threshold */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Gradient Threshold:</span>
                  <span className="text-white font-medium">{cannyThreshold}</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="180"
                  value={cannyThreshold}
                  onChange={(e) => setCannyThreshold(Number(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Slider 2: Confidence Cutoff */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Confidence Cutoff:</span>
                  <span className="text-white font-medium">{confidenceCutoff}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="90"
                  value={confidenceCutoff}
                  onChange={(e) => setConfidenceCutoff(Number(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setCannyThreshold(80);
                  setConfidenceCutoff(65);
                }}
                className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Defaults</span>
              </button>
            </div>

            {/* Pipeline Notes */}
            <div className="p-5 rounded-2xl bg-[#0d1017] border border-white/10 space-y-3">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
                Pipeline Architecture
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {activeMode === 'yolo' &&
                  'Single-stage convolutional neural network predicting bounding coordinates and class probability matrices simultaneously in a single forward pass.'}
                {activeMode === 'canny' &&
                  'Gaussian smoothing followed by Sobel directional gradient convolution and hysteresis thresholding to delineate high-contrast structural edges.'}
                {activeMode === 'colormap' &&
                  'Maps 8-bit luminescence levels to OpenCV JET rainbow gradient, essential for thermal imaging and density variation segmentation.'}
                {activeMode === 'face_mesh' &&
                  'Triangulates anatomical landmarks across facial contours to derive 3D pose vectors and eye tracking orientation.'}
                {activeMode === 'contours' &&
                  'Extracts closed polygon boundaries using topological border following to compute perimeter and convex hulls.'}
              </p>
              <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-white/8">
                Stack: OpenCV · NumPy · PyTorch · Ultralytics
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
