export const APP_NAME = 'StudyGenie';
export const APP_TAGLINE = 'Your AI-Powered Study Companion';
export const APP_DESCRIPTION = 'Simplify notes, generate assignments, plan study schedules, and ace your exams with AI.';

export const FEATURES = [
  {
    id: 'notes',
    title: 'AI Notes Simplifier',
    description: 'Upload PDFs, images, or paste notes. Get instant bullet summaries, flashcards, and mind maps.',
    icon: 'FileText',
    color: 'from-blue-500 to-cyan-500',
    href: '/dashboard/notes',
  },
  {
    id: 'assignments',
    title: 'AI Assignment Writer',
    description: 'Generate human-like assignments with citations, formatting, and multiple export options.',
    icon: 'PenTool',
    color: 'from-purple-500 to-pink-500',
    href: '/dashboard/assignments',
  },
  {
    id: 'planner',
    title: 'AI Study Planner',
    description: 'Get personalized timetables, smart revision cycles, and adaptive study schedules.',
    icon: 'Calendar',
    color: 'from-orange-500 to-yellow-500',
    href: '/dashboard/planner',
  },
  {
    id: 'tutor',
    title: 'AI Tutor Chat',
    description: 'Ask doubts, get explanations, and learn with an AI that adapts to your level.',
    icon: 'MessageCircle',
    color: 'from-green-500 to-emerald-500',
    href: '/dashboard/tutor',
  },
];

export const PRICING_PLANS = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      '5 AI generations/day',
      'Basic notes simplification',
      'Limited assignment generation',
      'Basic study planner',
      'Community support',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: 9.99,
    period: 'month',
    description: 'For serious students',
    features: [
      'Unlimited AI generations',
      'Advanced notes with OCR',
      'Full assignment writer',
      'Smart study planner',
      'AI tutor chat',
      'Export to PDF/DOCX/PPT',
      'Priority support',
      'No watermarks',
    ],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    name: 'Team',
    price: 19.99,
    period: 'month',
    description: 'For study groups',
    features: [
      'Everything in Pro',
      'Collaborative rooms',
      'Shared study plans',
      'Team leaderboards',
      'Admin dashboard',
      'API access',
      'Dedicated support',
      'Custom integrations',
    ],
    cta: 'Start Team Trial',
    popular: false,
  },
];

export const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'B.Tech Student, IIT Delhi',
    content: 'StudyGenie literally saved my semester! The notes simplifier turns 50-page PDFs into digestible bullet points in seconds.',
    avatar: '👩‍🎓',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    role: 'UPSC Aspirant',
    content: 'The study planner knows exactly when I need revision. My retention has improved by 3x since using this app.',
    avatar: '👨‍💼',
    rating: 5,
  },
  {
    name: 'Ananya Patel',
    role: 'MBA Student, ISB',
    content: 'Assignment writer is a game-changer. Clean formatting, proper citations, and it sounds like ME.',
    avatar: '👩‍💻',
    rating: 5,
  },
  {
    name: 'Karthik Iyer',
    role: 'JEE Advanced Topper',
    content: 'The AI tutor explains complex physics in ways my teachers never could. Hinglish mode is just *chef kiss*.',
    avatar: '🧑‍🔬',
    rating: 5,
  },
  {
    name: 'Sara Khan',
    role: 'Medical Student, AIIMS',
    content: 'OCR for my handwritten notes + flashcard generation = perfect combo for anatomy revision.',
    avatar: '👩‍⚕️',
    rating: 5,
  },
  {
    name: 'Dev Agarwal',
    role: 'Class 12, CBSE Board',
    content: 'The gamification keeps me going! 45-day streak and counting. My parents think I am addicted to studying lol.',
    avatar: '🧑‍🎓',
    rating: 5,
  },
];

export const FAQ_ITEMS = [
  {
    question: 'How does StudyGenie simplify my notes?',
    answer: 'Our AI analyzes your uploaded PDFs, images, or pasted text and breaks down complex concepts into bullet summaries, key points, flashcards, and mind maps. It supports English, Hindi, and Hinglish explanations.',
  },
  {
    question: 'Will AI-generated assignments be flagged as plagiarism?',
    answer: 'StudyGenie uses advanced AI humanization to generate original, human-like content. Our plagiarism reduction system ensures unique output every time. However, we recommend using it as a starting point and adding your personal insights.',
  },
  {
    question: 'Can I use StudyGenie for competitive exam preparation?',
    answer: 'Absolutely! StudyGenie is perfect for UPSC, JEE, NEET, CAT, and board exams. The study planner creates adaptive schedules based on your exam date and weak areas.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! You can start with our Free plan that includes 5 AI generations per day. No credit card required. Upgrade to Pro anytime for unlimited access.',
  },
  {
    question: 'Does it support handwritten notes?',
    answer: 'Yes! Our OCR (Optical Character Recognition) technology can read handwritten notes from photos or scanned documents and convert them into digital, editable text.',
  },
  {
    question: 'Can I use it on my phone?',
    answer: 'StudyGenie is fully mobile-responsive and works perfectly on any device. We are also building native iOS and Android apps for an even better experience.',
  },
];

export const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
  'English', 'Hindi', 'History', 'Geography', 'Economics',
  'Political Science', 'Psychology', 'Sociology', 'Philosophy',
  'Engineering', 'Medicine', 'Law', 'Business', 'Accounting',
];

export const EDUCATION_LEVELS = [
  'High School (Class 9-10)',
  'Senior Secondary (Class 11-12)',
  'Undergraduate (B.Tech/B.Sc/BA)',
  'Postgraduate (M.Tech/M.Sc/MA)',
  'Competitive Exams (JEE/NEET/UPSC)',
  'Professional (MBA/CA/Law)',
];

export const WRITING_TONES = [
  'Academic & Formal',
  'Conversational',
  'Research Paper',
  'Creative & Engaging',
  'Technical & Precise',
  'Simple & Clear',
];

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'hinglish', name: 'Hinglish' },
];

export const ACHIEVEMENTS = [
  { id: 'first-note', title: 'First Note', description: 'Simplify your first note', icon: '📝', xp: 50 },
  { id: 'streak-7', title: 'Week Warrior', description: '7-day study streak', icon: '🔥', xp: 200 },
  { id: 'streak-30', title: 'Monthly Master', description: '30-day study streak', icon: '⚡', xp: 1000 },
  { id: 'assignments-10', title: 'Writer Pro', description: 'Generate 10 assignments', icon: '✍️', xp: 300 },
  { id: 'quizzes-50', title: 'Quiz Champion', description: 'Complete 50 quizzes', icon: '🏆', xp: 500 },
  { id: 'level-10', title: 'Scholar', description: 'Reach Level 10', icon: '🎓', xp: 750 },
  { id: 'pomodoro-100', title: 'Focus Master', description: '100 Pomodoro sessions', icon: '🧘', xp: 600 },
  { id: 'subjects-5', title: 'Renaissance', description: 'Study 5 different subjects', icon: '🌟', xp: 400 },
];
