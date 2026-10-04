export const CONTACT_EMAIL = "vulv.bnvn@gmail.com"
export const CONTACT_LOCATION = "Hà Nội, Việt Nam"

export const portfolioData = {
  personal: {
    name: "Lâm Văn Vũ",
    shortName: "VuLV",
    role: "Fullstack Developer",
    status: "Sẵn sàng nhận dự án mới",
    location: CONTACT_LOCATION,
    email: CONTACT_EMAIL,
    bio: "Kỹ sư phần mềm đam mê xây dựng các sản phẩm web tốc độ cao, giao diện trực quan và kiến trúc code sạch sẽ.",
    stats: [
      { id: "exp", number: "15+", label: "Công nghệ đã học" },
      { id: "proj", number: "1+", label: "Dự án hoàn thành" },
      { id: "sat", number: "100%", label: "Cam kết chất lượng" },
    ],
  },

  skills: [
    {
      category: "Frontend",
      items: ["React", "JavaScript", "HTML5/CSS3", "Vite"],
    },
    {
      category: "Backend & APIs",
      items: ["Node.js", "Express", "MySQL", "MongoDB", "Redis"],
    },
    {
      category: "DevOps & Tools",
      items: ["Docker", "Nginx", "Git / GitHub", "Linux", "Postman", "CI/CD"],
    },
  ],

  projects: [
    {
      id: "vulv-portfolio",
      title: "VuLV Portfolio",
      category: "Frontend Web",
      description: "Website portfolio giới thiệu bản thân, kỹ năng và dự án của Lâm Văn Vũ, xây dựng với React, Vite và Three.js, triển khai bằng Docker + Nginx.",
      techStack: ["React", "Vite", "HTML5/CSS3"],
      liveUrl: "https://vulv.id.vn",
    },
    {
      id: "vulv",
      title: "VuLV",
      category: "Realtime System",
      description: "Dự án đang trong quá trình phát triển.",
      techStack: [
        "React",
        "Node.js",
        "Express",
        "MySQL",
        "MongoDB",
        "Redis",
        "Docker",
        "Nginx",
        "Git / GitHub",
        "Linux",
        "Postman",
        "CI/CD"
      ],
      liveUrl: "",
    }
  ],

  experience: [
    {
      id: "exp-1",
      period: "2025 - NAY",
      role: "Fullstack Developer",
      company: "Freelance / Tự học",
      description: "Tự học và xây dựng các dự án cá nhân với React, Node.js, cơ sở dữ liệu và Docker.",
      tags: ["React", "Node.js", "MySQL", "MongoDB", "Redis", "Docker"],
    }
  ],

  contact: {
    heading: "Bắt đầu dự án cùng nhau?",
    subheading: "Tôi luôn sẵn sàng trao đổi về các cơ hội hợp tác, dự án mới hoặc công việc phù hợp.",
    email: CONTACT_EMAIL,
    location: CONTACT_LOCATION,
  },
}
