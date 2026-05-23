export const cvData = {
  personalInfo: {
    firstName: "Apostolos",
    lastName: "Lagonikas",
    title: "Full-Stack Developer",
    location: "Piraeus 18546",
    email: "apostoloslagwnikas@gmail.com",
    github: "github.com/otolis",
    phone: "+30 6978226516",
    cvPdf: "/CvWebsite/Apostolos_Lagonikas_CV.pdf",
    summary: "Passionate about learning and constantly improving skills. Strong foundation in computer science with hands-on experience in various programming languages and frameworks."
  },
  experience: [
    {
      id: 1,
      role: "Full-Stack Developer",
      company: "REDIRECT",
      period: "September 2025 – Present",
      location: "Remote / Hybrid",
      tasks: [
        "Building and maintaining full-stack web features across Razor/C# back-end logic, REST APIs, and JavaScript front-end implementations.",
        "Delivering multi-site solutions on Umbraco CMS for hospital clients, including version upgrades and large-scale content migrations.",
        "Automating build and deployment pipelines with GitHub Actions and managing release workflows across Windows (IIS) and Linux environments."
      ]
    }
  ],
  education: [
    {
      id: 1,
      degree: "Bachelor’s degree – Software Development",
      institution: "Hellenic Open University",
      period: "October 2024 – Present"
    },
    {
      id: 2,
      degree: "Bachelor’s degree – Web Development",
      institution: "IEK DELTA 360",
      period: "October 2023 – June 2025"
    }
  ],
  skills: {
    languages: ["C#", "C++", "Dart", "Python", "JavaScript", "HTML", "CSS"],
    frameworks: ["React", "Flutter", "Node.js", "Express", "Vite", ".NET"],
    tools: ["Firebase", "SQLite", "MongoDB", "Webpack", "Git", "RESTful APIs", "Umbraco"],
    softSkills: ["Deep understanding of programming concepts", "Strong organizational skills", "Highly adaptable"]
  },
  projects: [
    {
      id: 1,
      title: "Flash Chat Flutter",
      tech: ["Flutter", "Firebase", "Dart"],
      description: "Engineered a real-time messaging application using Flutter and Dart, integrating Firebase Cloud Firestore for synchronization and Firebase Authentication for secure user login.",
      link: "github.com/otolis/FlashChatFlutter"
    },
    {
      id: 2,
      title: "Fraud Detection Using ML",
      tech: ["Python", "scikit-learn", "pandas", "Streamlit", "Jupyter"],
      description: "Built a fraud detection system on a 6.3M-row financial transactions dataset. Engineered balance-difference features, trained Logistic Regression and Random Forest classifiers, and exposed both models via a Streamlit web app. Raised fraud F1-score from 0.04 to 0.88 by switching algorithms and handling severe class imbalance (0.13% fraud rate).",
      link: "github.com/otolis/fraudDetectionUsingML"
    },
    {
      id: 3,
      title: "Dynamic Resource Management Engine",
      tech: ["NestJS", "TypeScript", "React", "PostgreSQL", "Prisma"],
      description: "Multi-tenant ERP / Project Management platform built on a meta-schema (EAV) architecture, allowing organizations to define entities, custom fields, state-machine workflows, and role-based access control at runtime — without code changes or database migrations.",
      link: "github.com/otolis/DynamicResourceManagementEngine"
    },
    {
      id: 4,
      title: "Focus Forge",
      tech: ["Flutter", "Dart", "Supabase", "Riverpod", "Groq LLM"],
      description: "Smart productivity app combining task management, habit tracking, and AI-powered daily planning. Uses natural language processing to parse tasks, generates adaptive schedules, and supports real-time collaborative boards.",
      link: "github.com/otolis/FocusForge"
    }
  ]
};