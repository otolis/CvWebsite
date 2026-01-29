export const cvData = {
  personalInfo: {
    firstName: "Apostolos",
    lastName: "Lagonikas",
    title: "Software Engineer",
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
      role: "Software Engineer",
      company: "REDIRECT",
      period: "September 2025 – Present",
      location: "Remote / Hybrid",
      tasks: [
        "Focusing on software engineering principles and .NET development.",
        "Contributing to the development of scalable solutions and engineering workflows."
      ]
    },
    {
      id: 2,
      role: "Assistant Warehouse Operations Manager",
      company: "Pantelis K. Donoupoglou SA",
      period: "June 2024 – June 2025",
      tasks: [
        "Managed daily warehouse operations to ensure efficiency and accuracy.",
        "Facilitated team collaboration and coordinated workflows to meet operational targets."
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
      title: "Spotify Album Finder",
      tech: ["React", "Vite", "RESTful API", "CSS"],
      description: "Built a high-performance web application using React and Vite, leveraging the Spotify Web API for album search and implementing efficient state management.",
      link: "github.com/otolis/SpotifyAlbumFinder"
    },
    {
      id: 3,
      title: "Clima",
      tech: ["Dart", "Flutter", "RESTful API"],
      description: "Developed a dynamic weather application using external REST APIs and geolocation services to provide real-time weather data based on user location.",
      link: "github.com/otolis/Clima"
    },
    {
      id: 4,
      title: "Message Board",
      tech: ["Node.js", "Express", "MongoDB", "EJS"],
      description: "Full-stack message board application with RESTful routes, form validation, and secure password handling.",
      link: "github.com/otolis/messageBoard"
    }
  ]
};