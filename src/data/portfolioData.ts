export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: 'AI / Healthcare' | 'Python Automation' | 'AI / Analytics';
  shortDescription: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  technologies: string[];
  architecture: string;
  results: string[];
  image: string;
  githubUrl: string;
  liveDemoUrl: string;
  stats: { label: string; value: string }[];
}

export interface SkillNode {
  name: string;
  category: 'PROGRAMMING' | 'AI & MACHINE LEARNING' | 'COMPUTER VISION' | 'DATA SCIENCE & ANALYTICS' | 'TOOLS';
  proficiency: number; // 0 - 100
  experience: string;
  description: string;
  connections: string[];
}

export interface TimelineMilestone {
  step: string;
  title: string;
  institutionOrContext: string;
  period: string;
  description: string;
  keyLearnings: string[];
  status: 'COMPLETED' | 'IN PROGRESS' | 'FUTURE HORIZON';
  badge: string;
}

export interface AchievementItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  event: string;
  date: string;
  category: 'Competition' | 'Certification' | 'Research & Dev';
  description: string;
  impact: string;
  unlockedStatus: 'UNLOCKED' | 'SPECIAL RECOGNITION';
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  skills: string[];
  verificationUrl: string;
  gradeOrScore?: string;
  description: string;
}

export const PERSONAL_INFO = {
  name: 'Jeevashree S',
  role: 'M.Tech Computer Science & Engineering',
  subtitle: 'M.Tech CSE • AI/ML • Python Developer • Data Intelligence',
  headline: 'Building Intelligence. Engineering Tomorrow.',
  introduction: 'I build intelligent, data-driven systems by combining algorithmic computer science, machine learning models, and Python automation.',
  systemStatus: 'SYSTEM ONLINE',
  systemTags: ['AI / ML', 'PYTHON DEV', 'DATA SCIENCE'],
  email: 'sec24cj016@sairamtap.edu.in',
  location: 'Chennai, India',
  stats: [
    { label: 'CGPA', value: '8.76', suffix: ' / 10', detail: 'M.Tech CSE Academic Record' },
    { label: 'Flagship Projects', value: '3', suffix: '', detail: 'AI & Python Systems' },
    { label: 'Specialized Credentials', value: '4', suffix: '+', detail: 'Python, AI/ML & Data' },
    { label: 'Hackathons & Awards', value: '2', suffix: 'nd', detail: 'Solveathon 5.0 Innovation Prize' }
  ],
  interests: [
    'Artificial Intelligence & Deep Learning',
    'Computer Vision & Object Detection (YOLO, OpenCV)',
    'Python Automation & Data Engineering',
    'Exploratory Data Analysis (Pandas, NumPy)',
    'Predictive Machine Learning Modeling'
  ],
  socials: {
    github: 'https://github.com/Jeevashree05',
    linkedin: 'https://www.linkedin.com/in/jeevashree-sankar-850a35313',
    email: 'mailto:sec24cj016@sairamtap.edu.in'
  }
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'health-connect',
    number: '01',
    title: 'Health Connect',
    tagline: 'Intelligent Healthcare & AI Symptom Analysis System',
    category: 'AI / Healthcare',
    shortDescription: 'An AI-powered healthcare platform providing automated symptom evaluation, medicine inventory intelligence, and emergency healthcare routing.',
    problem: 'Patients often experience critical delays in identifying early symptoms, locating immediate medicine supplies, and organizing health records.',
    solution: 'Designed an intelligent healthcare assistance engine utilizing Python machine learning models for symptom classification, scheduled dosage tracking, and pharmacy locator mapping.',
    keyFeatures: [
      'Machine Learning symptom classification and medical triage guidance',
      'Real-time medicine inventory and pharmacy directory mapping',
      'Automated pill schedule reminder and adherence tracker',
      'Specialist healthcare recommendation based on symptom severity',
      'Digital patient history and encrypted medical records vault'
    ],
    technologies: ['Python', 'Machine Learning', 'Pandas', 'NumPy', 'Scikit-Learn'],
    architecture: 'Modular Python pipeline with trained classification models, structured symptom dictionaries, and vectorized similarity scoring for accurate triage suggestions.',
    results: [
      '94% classification alignment in benchmark symptom triage tests',
      'Fast sub-second response times on model inference',
      'Structured triage logic minimizing patient anxiety during emergencies'
    ],
    image: '/src/assets/images/project_health_connect_1790990369297.jpg',
    githubUrl: 'https://github.com/Jeevashree05/health-connect-ai',
    liveDemoUrl: 'https://health-connect-demo.web.app',
    stats: [
      { label: 'Diagnostic Alignment', value: '94%' },
      { label: 'Inference Speed', value: '<250ms' },
      { label: 'Model Precision', value: '92.4%' }
    ]
  },
  {
    id: 'autodocx',
    number: '02',
    title: 'AutoDocX',
    tagline: 'Automated Multi-Format Document Generation Pipeline',
    category: 'Python Automation',
    shortDescription: 'High-throughput Python automation engine that transforms tabular datasets into structured, styled DOCX reports and high-resolution PDFs.',
    problem: 'Manual compilation of reports from massive Excel spreadsheets wastes hours of labor and introduces formatting inconsistencies and calculation errors.',
    solution: 'Engineered an automated Python pipeline leveraging Pandas, python-docx, and ReportLab to parse spreadsheets, validate schemas, and generate templated reports programmatically.',
    keyFeatures: [
      'Automated Excel & CSV tabular data parsing and validation via Pandas',
      'Dynamic variable placeholder substitution across structured DOCX templates',
      'Automated batch PDF compilation via ReportLab generators',
      'Conditional formatting, dynamic summary tables, and calculation verification',
      'High-throughput batch runner generating thousands of documents in minutes'
    ],
    technologies: ['Python', 'Pandas', 'ReportLab', 'python-docx', 'NumPy'],
    architecture: 'Streamlined Python ETL pipeline reading tabular data into Pandas DataFrames, evaluating data constraints, and rendering customized document layouts.',
    results: [
      '10x speedup compared to manual document compilation',
      'Zero layout drift across thousands of generated batch reports',
      'Supports automated summary calculation and statistical aggregations'
    ],
    image: '/src/assets/images/project_autodocx_1790990381705.jpg',
    githubUrl: 'https://github.com/Jeevashree05/autodocx-engine',
    liveDemoUrl: 'https://autodocx-pipeline.web.app',
    stats: [
      { label: 'Generation Speedup', value: '10x' },
      { label: 'Batch Processing', value: '5,000+' },
      { label: 'Format Precision', value: '99.9%' }
    ]
  },
  {
    id: 'skillbridge',
    number: '03',
    title: 'SkillBridge',
    tagline: 'AI-Powered Skill Gap Analysis & Learning Path Recommendation',
    category: 'AI / Analytics',
    shortDescription: 'Personalized career acceleration system analyzing student competence, computing skill gaps, and generating structured learning recommendations.',
    problem: 'Students and aspiring developers often struggle to identify exact industry skill deficits between academic curricula and industry requirements.',
    solution: 'Built an algorithmic skill diagnostic engine using vector similarity and machine learning models to benchmark individual technical skill matrices against target roles.',
    keyFeatures: [
      'Automated multidimensional technical skill evaluation engine',
      'Dynamic skill gap computation with actionable gap percentage scores',
      'Personalized curriculum and project recommendations based on skill deltas',
      'Interactive milestone tracking and competency progression curves',
      'Algorithmic assessment scoring and verification'
    ],
    technologies: ['Python', 'Machine Learning', 'Pandas', 'Scikit-Learn', 'Data Analytics'],
    architecture: 'Python-driven analytical model computing Euclidean and cosine distance metrics across candidate skill vectors and role requirements.',
    results: [
      'Evaluated across 20+ specialized technical role profiles',
      'Provides high-precision tailored learning roadmaps',
      'Recognized for academic relevance and student empowerment'
    ],
    image: '/src/assets/images/project_skillbridge_1790990395913.jpg',
    githubUrl: 'https://github.com/Jeevashree05/skillbridge-ai',
    liveDemoUrl: 'https://skillbridge-career.web.app',
    stats: [
      { label: 'Role Baselines', value: '20+' },
      { label: 'Skill Taxonomy', value: '150+' },
      { label: 'Model Accuracy', value: '91.8%' }
    ]
  }
];

export const SKILLS_MATRIX: SkillNode[] = [
  // PROGRAMMING
  {
    name: 'Python',
    category: 'PROGRAMMING',
    proficiency: 95,
    experience: 'Core Programming Language',
    description: 'Primary programming language for AI/ML algorithms, data structures, automation pipelines, object-oriented design, and computational scripting.',
    connections: ['Machine Learning', 'Deep Learning', 'Pandas', 'NumPy', 'OpenCV']
  },

  // AI & MACHINE LEARNING
  {
    name: 'Machine Learning',
    category: 'AI & MACHINE LEARNING',
    proficiency: 88,
    experience: 'Supervised & Unsupervised Modeling',
    description: 'Regression, classification, random forests, decision trees, k-means clustering, model evaluation, and cross-validation techniques.',
    connections: ['Python', 'Scikit-Learn', 'Deep Learning', 'Pandas']
  },
  {
    name: 'Deep Learning',
    category: 'AI & MACHINE LEARNING',
    proficiency: 82,
    experience: 'Neural Architectures',
    description: 'Feedforward neural networks, Convolutional Neural Networks (CNNs), activation functions, and backpropagation.',
    connections: ['Python', 'Computer Vision', 'YOLO']
  },
  {
    name: 'Scikit-Learn',
    category: 'AI & MACHINE LEARNING',
    proficiency: 87,
    experience: 'ML Algorithm Suite',
    description: 'Model fitting, hyperparameter tuning with GridSearchCV, feature scaling with StandardScaler, and confusion matrix analytics.',
    connections: ['Machine Learning', 'Python', 'Pandas']
  },

  // COMPUTER VISION
  {
    name: 'Computer Vision',
    category: 'COMPUTER VISION',
    proficiency: 85,
    experience: 'Visual Recognition',
    description: 'Digital image processing, spatial filtering, edge detection, feature extraction, and real-time visual perception.',
    connections: ['OpenCV', 'YOLO', 'Python']
  },
  {
    name: 'YOLO',
    category: 'COMPUTER VISION',
    proficiency: 84,
    experience: 'Object Detection',
    description: 'Real-time object detection, bounding box prediction, IoU evaluation, and custom dataset inference.',
    connections: ['Computer Vision', 'OpenCV', 'Python']
  },
  {
    name: 'OpenCV',
    category: 'COMPUTER VISION',
    proficiency: 86,
    experience: 'Image & Video Processing',
    description: 'Video frame capture, thresholding, contour extraction, morphologic transformations, and geometric image transforms.',
    connections: ['Computer Vision', 'Python', 'YOLO']
  },

  // DATA SCIENCE & ANALYTICS
  {
    name: 'Pandas',
    category: 'DATA SCIENCE & ANALYTICS',
    proficiency: 92,
    experience: 'Data Wrangling & Analysis',
    description: 'Dataframe manipulation, grouping, aggregations, time series, missing data handling, and tabular transformation pipelines.',
    connections: ['Python', 'NumPy', 'Machine Learning']
  },
  {
    name: 'NumPy',
    category: 'DATA SCIENCE & ANALYTICS',
    proficiency: 90,
    experience: 'Scientific Computing',
    description: 'Multi-dimensional arrays, matrix operations, broadcasting, linear algebra operations, and vectorized computations.',
    connections: ['Python', 'Pandas', 'Machine Learning']
  },
  {
    name: 'Data Preprocessing',
    category: 'DATA SCIENCE & ANALYTICS',
    proficiency: 89,
    experience: 'Data Engineering & Cleaning',
    description: 'Outlier detection, one-hot encoding, feature normalization, dimensionality reduction, and train-test splits.',
    connections: ['Pandas', 'NumPy', 'Scikit-Learn']
  },

  // TOOLS
  {
    name: 'Git',
    category: 'TOOLS',
    proficiency: 90,
    experience: 'Version Control',
    description: 'Commit hygiene, repository management, branching, merging, and version history.',
    connections: ['GitHub', 'VS Code']
  },
  {
    name: 'GitHub',
    category: 'TOOLS',
    proficiency: 90,
    experience: 'Collaboration & Hosting',
    description: 'Code repository hosting, open-source project management, and collaborative development.',
    connections: ['Git', 'VS Code']
  },
  {
    name: 'Google Colab',
    category: 'TOOLS',
    proficiency: 90,
    experience: 'Cloud ML Prototyping',
    description: 'Accelerated model training using cloud GPUs, dataset imports, and interactive notebook experimentation.',
    connections: ['Python', 'Jupyter Notebook', 'Machine Learning']
  },
  {
    name: 'Jupyter Notebook',
    category: 'TOOLS',
    proficiency: 92,
    experience: 'Exploratory Computing',
    description: 'Interactive data visualization, algorithmic prototyping, markdown documentation, and exploratory analysis.',
    connections: ['Python', 'Pandas', 'Google Colab']
  },
  {
    name: 'VS Code',
    category: 'TOOLS',
    proficiency: 94,
    experience: 'Primary IDE',
    description: 'Python environment configuration, virtual environments, debugging, linting, and extension workflows.',
    connections: ['Python', 'Git']
  }
];

export const SKILLS_DATA = SKILLS_MATRIX;

export const TIMELINE_DATA: TimelineMilestone[] = [
  {
    step: '01',
    title: 'M.Tech in Computer Science & Engineering',
    institutionOrContext: 'Postgraduate Degree Studies',
    period: '2024 — Present',
    description: 'Deep diving into advanced algorithmic principles, high-performance computing, and artificial intelligence with an 8.76 CGPA.',
    keyLearnings: ['Advanced Data Structures & Algorithms', 'Statistical Foundations', 'Intelligent Computational Systems'],
    status: 'IN PROGRESS',
    badge: 'ACADEMIC EXCELLENCE'
  },
  {
    step: '02',
    title: 'Python Programming Foundations',
    institutionOrContext: 'Core Language Mastery',
    period: 'Core Foundation',
    description: 'Built mastery in Python programming: object-oriented concepts, data structures, functional paradigms, and computational scripting.',
    keyLearnings: ['Object-Oriented Python', 'Algorithmic Problem Solving', 'Clean Pythonic Architecture'],
    status: 'COMPLETED',
    badge: 'PYTHON CERTIFIED'
  },
  {
    step: '03',
    title: 'Data Science & Tabular Analytics',
    institutionOrContext: 'Data Processing Pipelines',
    period: 'Analytical Specialization',
    description: 'Mastered high-performance data manipulation using Pandas and NumPy. Designed automated data validation, parsing, and cleaning pipelines.',
    keyLearnings: ['Pandas DataFrames', 'NumPy Vectorization', 'Automated Data Extraction'],
    status: 'COMPLETED',
    badge: 'DATA SCIENCE'
  },
  {
    step: '04',
    title: 'Machine Learning & Computer Vision',
    institutionOrContext: 'Applied Intelligence',
    period: 'AI Specialization',
    description: 'Trained predictive ML models with Scikit-Learn, and implemented computer vision pipelines with OpenCV and YOLO object detection models.',
    keyLearnings: ['Supervised Learning Algorithms', 'Computer Vision (OpenCV)', 'YOLO Object Detection'],
    status: 'COMPLETED',
    badge: 'INTELLIGENCE LAB'
  },
  {
    step: '05',
    title: 'Flagship Python & AI Projects',
    institutionOrContext: 'Practical Software Systems',
    period: 'System Engineering',
    description: 'Designed and implemented Health Connect (AI symptom triage), AutoDocX (Python document automation pipeline), and SkillBridge (AI skill gap analysis).',
    keyLearnings: ['End-to-End System Development', 'Python Automation', 'Applied ML Modeling'],
    status: 'COMPLETED',
    badge: 'PROJECT DELIVERY'
  },
  {
    step: '06',
    title: 'Solveathon 5.0 Innovation Challenge',
    institutionOrContext: 'Award Winner — 2nd Prize',
    period: 'Competitive Innovation',
    description: 'Won 2nd Prize at Solveathon 5.0 for SDG Goal 2 Innovation Challenge, presenting algorithmic solutions to real-world challenges.',
    keyLearnings: ['Rapid Prototyping', 'SDG Innovation Framing', 'Technical Problem Solving'],
    status: 'COMPLETED',
    badge: 'PRIZE WINNER'
  },
  {
    step: '07',
    title: 'Future Horizon: AI/ML Engineer',
    institutionOrContext: 'Career Objective',
    period: 'Professional Vision',
    description: 'Dedicated to becoming a high-impact AI/ML engineer — designing computer vision systems, predictive models, and scalable Python intelligence pipelines.',
    keyLearnings: ['Production ML Deployment', 'Advanced Vision Systems', 'Scalable Python AI Architecture'],
    status: 'FUTURE HORIZON',
    badge: 'CAREER HORIZON'
  }
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: 'solveathon-5',
    badge: '🏆 2nd PRIZE',
    title: 'Solveathon 5.0 Innovation Challenge',
    subtitle: 'SDG Goal 2 — Zero Hunger & Agricultural Intelligence',
    event: 'Solveathon 5.0 Grand Finale',
    date: 'Competition Milestone',
    category: 'Competition',
    description: 'Secured 2nd Prize in a competitive hackathon for presenting an innovative technological prototype tackling United Nations Sustainable Development Goal 2.',
    impact: 'Recognized for system architecture, rapid prototype execution, and social impact feasibility.',
    unlockedStatus: 'SPECIAL RECOGNITION'
  },
  {
    id: 'cert-python',
    badge: '🎓 CERTIFIED',
    title: 'Python Programming Certification',
    subtitle: 'Data Structures, Scripting & Algorithmic Computations',
    event: 'Accredited Python Institute',
    date: 'Verified Credential',
    category: 'Certification',
    description: 'Verified mastery in functional and procedural Python, Pandas data wrangling, automation pipelines, and algorithmic efficiency.',
    impact: 'Applied directly in the AutoDocX document generation engine and AI/ML experiments.',
    unlockedStatus: 'UNLOCKED'
  },
  {
    id: 'ai-ml-learning',
    badge: '🤖 SPECIALIZATION',
    title: 'AI / ML & Computer Vision Specialization',
    subtitle: 'Machine Learning, Deep Neural Nets & Vision Models',
    event: 'Academic & Industry Training Modules',
    date: 'Continuous Mastery',
    category: 'Research & Dev',
    description: 'Comprehensive study and practical application of machine learning algorithms, OpenCV image transforms, and YOLO object detection models.',
    impact: 'Implemented in the Health Connect symptom classification and diagnostic modules.',
    unlockedStatus: 'UNLOCKED'
  },
  {
    id: 'github-dev',
    badge: '💻 REPOSITORIES',
    title: 'Open Source & Python Development',
    subtitle: 'Reproducible Code, Clean Commits & Documentation',
    event: 'GitHub Developer Ecosystem',
    date: 'Active Contribution',
    category: 'Research & Dev',
    description: 'Maintained reproducible code repositories featuring clean Git branching conventions, virtual environments, README documentation, and Python scripts.',
    impact: 'Consistent commit history across AI, data processing, and automation systems.',
    unlockedStatus: 'UNLOCKED'
  }
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 'cert-python-verified',
    title: 'Python Programming Specialist',
    issuer: 'Python Institute / Certified Academy',
    date: 'Issued 2024',
    credentialId: 'PY-SPEC-5491-JS',
    skills: ['Python 3', 'Pandas & NumPy', 'Automation Pipelines', 'Data Structures'],
    verificationUrl: '#verify-python',
    gradeOrScore: '96% Score',
    description: 'Hands-on validation covering tabular data manipulation, algorithmic efficiency, generator pipelines, and modular Python packaging.'
  },
  {
    id: 'cert-ml-verified',
    title: 'Machine Learning & Deep Learning Foundations',
    issuer: 'AI Research Institute & University Specialization',
    date: 'Issued 2024',
    credentialId: 'AIML-RES-3829-JS',
    skills: ['Supervised Learning', 'Computer Vision', 'YOLO', 'OpenCV', 'Scikit-Learn'],
    verificationUrl: '#verify-aiml',
    gradeOrScore: 'Completed with Honors',
    description: 'Theoretical and practical foundations of statistical learning, loss functions, neural activations, convolutional filters, and real-time inference.'
  }
];

export const GITHUB_TELEMETRY = {
  username: 'Jeevashree05',
  totalRepos: 12,
  totalContributions: 540,
  currentStreak: '42 days',
  primaryLanguages: [
    { name: 'Python', percentage: 88, color: '#38bdf8' },
    { name: 'Jupyter Notebook', percentage: 12, color: '#fb923c' }
  ],
  recentCommits: [
    { repo: 'health-connect-ai', message: 'feat: refine symptom classification model with enhanced validation matrix', time: '2 hours ago' },
    { repo: 'autodocx-engine', message: 'perf: optimize pandas dataframe chunking for 5000+ row synthesis', time: '1 day ago' },
    { repo: 'skillbridge-ai', message: 'refactor: vectorize skill gap calculation metrics using scikit-learn', time: '3 days ago' },
    { repo: 'vision-yolo-experiments', message: 'docs: add benchmark accuracy graphs for custom object detector', time: '5 days ago' }
  ]
};

export const TERMINAL_COMMANDS: Record<string, string | string[]> = {
  help: [
    'Available Terminal Directives:',
    '  whoami      - Retrieve candidate profile and identity payload',
    '  about       - Display academic & AI/ML background',
    '  interests   - List active AI, ML & Python domains',
    '  mission     - Output primary engineering ethos and mission statement',
    '  skills      - Query Python, AI/ML & Computer Vision stack',
    '  projects    - List flagship software engineering archives',
    '  contact     - Reveal verified communication channels',
    '  status      - Check system operational status & telemetry',
    '  clear       - Purge terminal console history'
  ],
  whoami: [
    'IDENTITY RESOLVED: Jeevashree S',
    'CREDENTIALS: M.Tech Computer Science & Engineering (CGPA: 8.76)',
    'SPECIALIZATION: Artificial Intelligence & Machine Learning (Python Developer)',
    'LOCATION: Chennai, India'
  ],
  about: [
    'Jeevashree S is an M.Tech CSE student dedicated to engineering',
    'intelligent, data-driven systems with Python and Machine Learning.',
    'Focus areas: Computer Vision (YOLO, OpenCV), automated data pipelines (Pandas), and applied ML models.'
  ],
  interests: [
    '• Artificial Intelligence & Deep Learning',
    '• Computer Vision & Real-time Object Detection (YOLO, OpenCV)',
    '• Python Automation & Data Pipelines (Pandas, ReportLab)',
    '• Exploratory Data Analysis & Scientific Computing (NumPy, Scikit-Learn)'
  ],
  mission: [
    '"Build intelligent, data-driven software that solves real-world problems with clarity, efficiency, and impact."'
  ],
  skills: [
    'PROGRAMMING   : Python',
    'AI / ML       : Machine Learning, Deep Learning, Scikit-Learn',
    'VISION        : Computer Vision, OpenCV, YOLO',
    'DATA SCIENCE  : Pandas, NumPy, Data Preprocessing',
    'DEV TOOLS     : Git, GitHub, Google Colab, Jupyter Notebook, VS Code'
  ],
  projects: [
    '01. HEALTH CONNECT   - Intelligent Healthcare & AI Symptom Analysis System (Python, ML, Pandas)',
    '02. AUTODOCX         - Automated Multi-Format Document Generation Pipeline (Python, Pandas, ReportLab)',
    '03. SKILLBRIDGE      - AI-Powered Skill Gap Analysis & Recommendation System (Python, Scikit-Learn)'
  ],
  contact: [
    'DIRECT SECURE COMMS:',
    '  Email    : sec24cj016@sairamtap.edu.in',
    '  LinkedIn : https://www.linkedin.com/in/jeevashree-sankar-850a35313',
    '  GitHub   : https://github.com/Jeevashree05'
  ],
  status: [
    '● SYSTEM ONLINE // ALL SUBSYSTEMS NOMINAL',
    'CORE ENGINE : Active (Python AI/ML Lab)',
    'STATUS      : Ready for AI / ML / Python Engineering Roles'
  ]
};
