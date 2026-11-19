// Single source of truth for all portfolio content.
// Everything here is taken from Priyadharshini_S_Resume.pdf. Fields left empty ('')
// were not present in the resume — fill them in and the UI will pick them up automatically.

export const profile = {
  name: 'Priyadharshini S',
  firstName: 'Priyadharshini',
  role: 'Software Engineer',
  heading: 'Building Digital Experiences Through Code & Creativity.',
  subtitle: 'Software Developer | Full Stack Developer | UI/UX Enthusiast',
  typing: [
    'Full Stack Development',
    'MERN Stack Applications',
    'Java Full Stack',
    'UI/UX Design',
    'Real-Time Web Apps',
  ],
  photo: { webp: '/images/profile-800.webp', jpg: '/images/profile-800.jpg', small: '/images/profile-400.webp' },
  resume: '/Priyadharshini_S_Resume.pdf',
  about:
    'Motivated and enthusiastic B.E Computer Science and Engineering student with a strong interest in Full Stack Development and UI/UX Design. Passionate about learning new technologies and improving technical skills. A good team player with leadership qualities, critical thinking, and effective time management skills. Looking for opportunities to enhance knowledge and gain practical experience in the IT field.',
  contact: {
    email: 'pridharshini17@gmail.com',
    phone: '8056609361',
    location: 'Tiruvannamalai, Tamil Nadu, India',
    linkedin: 'https://www.linkedin.com/in/priyadharshini-s-b903ab291',
    linkedinHandle: 'priyadharshini-s-b903ab291',
    github: '', // Not listed in resume — add e.g. 'https://github.com/your-username'
  },
  softSkills: ['Leadership', 'Decision Making', 'Communication', 'Time Management', 'Teamwork'],
  languages: ['English', 'Tamil'],
};

export const stats = [
  { value: '9.07', label: 'CGPA in B.E CSE' },
  { value: '3', label: 'Projects Built' },
  { value: '7', label: 'Certifications' },
  { value: '1', label: 'Internship' },
];

// Evidence sources replace invented proficiency percentages.
export const EVIDENCE = {
  resume: 'Listed in resume skills',
  cert: 'Certification',
  project: 'Used in project',
  internship: 'Internship training',
};

export const skillGroups = [
  {
    title: 'Programming',
    icon: 'Code2',
    skills: [
      { name: 'Java', evidence: ['resume', 'cert', 'internship'], note: 'NPTEL & SkillRack certified · Java Full Stack internship' },
      { name: 'Python', evidence: ['resume', 'cert'], note: 'Simplilearn certified' },
    ],
  },
  {
    title: 'Frontend',
    icon: 'LayoutTemplate',
    skills: [
      { name: 'React', evidence: ['project'], note: 'MERN real-time communication app' },
      { name: 'UI/UX Design', evidence: ['resume', 'cert'], note: 'Novi Tech certified' },
    ],
  },
  {
    title: 'Backend',
    icon: 'Server',
    skills: [
      { name: 'Node.js', evidence: ['project'], note: 'MERN real-time communication app' },
      { name: 'Express.js', evidence: ['project'], note: 'MERN real-time communication app' },
    ],
  },
  {
    title: 'Database',
    icon: 'Database',
    skills: [
      { name: 'MongoDB', evidence: ['project'], note: 'MERN real-time communication app' },
      { name: 'SQL', evidence: ['cert'], note: 'SkillRack certified' },
    ],
  },
  {
    title: 'Other Skills',
    icon: 'Layers',
    skills: [
      { name: 'Full Stack Development', evidence: ['resume', 'internship', 'project'], note: 'Java Full Stack internship · MERN project' },
      { name: 'MERN Stack', evidence: ['project'], note: 'Real-time communication app' },
      { name: 'Cloud Computing', evidence: ['cert'], note: 'Infosys Springboard certified' },
      { name: 'Generative AI', evidence: ['cert'], note: 'Infosys Springboard certified' },
    ],
  },
];

export const projects = [
  {
    id: 'chat',
    title: 'Real-Time Communication App',
    description:
      'A real-time communication application built with the MERN stack, featuring online/offline user status and real-time message notifications.',
    problem: 'Users need to know who is available and be notified instantly when new messages arrive — without refreshing the page.',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    tags: ['MERN', 'Real-Time'],
    features: ['Real-time messaging', 'Online / offline user status', 'Real-time message notifications'],
    github: '',
    demo: '',
    mockup: 'chat',
  },
  {
    id: 'health',
    title: 'Health Monitoring System',
    description:
      'A health monitoring application that tracks and displays patient vitals in real time, with alert mechanisms for abnormal readings.',
    problem: 'Abnormal patient vitals must be noticed immediately — continuous tracking with automatic alerts reduces the chance of missing them.',
    tech: [],
    tags: ['Real-Time', 'Healthcare'],
    features: ['Real-time vitals tracking', 'Live vitals display', 'Alerts for abnormal readings'],
    github: '',
    demo: '',
    mockup: 'health',
  },
  {
    id: 'crop',
    title: 'AI-Based Crop Yield Prediction',
    description:
      'Designed and implemented an automated irrigation monitoring system to optimise water usage through sensor-based triggers and scheduling logic.',
    problem: 'Manual irrigation wastes water — automating it with sensor data and schedules helps optimise water usage on farms.',
    tech: [],
    tags: ['AI', 'Sensors', 'Agriculture'],
    features: ['Automated irrigation monitoring', 'Sensor-based triggers', 'Scheduling logic for water optimisation'],
    github: '',
    demo: '',
    mockup: 'crop',
  },
];

export const education = [
  {
    title: 'B.E Computer Science and Engineering',
    org: 'Peri Institute of Technology, Chennai',
    period: '2023 – 2027',
    detail: 'CGPA: 9.07',
  },
  {
    title: 'Higher Secondary (HSC)',
    org: 'Maharishi Higher Secondary School',
    period: '2022 – 2023',
    detail: 'Percentage: 82%',
  },
  {
    title: 'Secondary School Leaving Certificate (SSLC)',
    org: "St. Antony's Matric. Hr. Sec. School",
    period: '2021',
    detail: '',
  },
];

export const certifications = [
  { name: 'Programming in Java', issuer: 'NPTEL' },
  { name: 'UI/UX Design', issuer: 'Novi Tech' },
  { name: 'Cloud Computing', issuer: 'Infosys Springboard' },
  { name: 'Python', issuer: 'Simplilearn' },
  { name: 'Generative AI', issuer: 'Infosys Springboard' },
  { name: 'SQL', issuer: 'SkillRack' },
  { name: 'Java', issuer: 'SkillRack' },
];

export const experience = [
  {
    role: 'Java Full Stack Developer Intern',
    company: 'VEI Technologies',
    points: [
      'Trained in Java Full Stack Development, covering both front-end and back-end technologies.',
      'Built web application modules and gained hands-on experience in database connectivity and web development under industry mentorship.',
    ],
  },
];

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];
