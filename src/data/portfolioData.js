export const portfolioData = {
  personal: {
    name: "Lâm Văn Vũ",
    shortName: "VuLV",
    role: "Fullstack Developer",
    status: "Sẵn sàng nhận dự án mới",
    location: "Hà Nội, Việt Nam",
    email: "vulv.bnvn@gmail.com",
    github: "https://github.com/marx5",
    linkedin: "#",
    bio: "Kỹ sư phần mềm đam mê xây dựng các sản phẩm web tốc độ cao, giao diện trực quan và kiến trúc code sạch sẽ.",
    stats: [
      { id: "exp", number: "0+", label: "Năm kinh nghiệm" },
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
      items: ["Node.js", "Express", "PostgreSQL", "MySQL", "MongoDB", "Redis"],
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
      description: "Website giới thiệu bản thân của Lâm Văn Vũ, một Fullstack Developer với 0+ năm kinh nghiệm trong lĩnh vực phát triển phần mềm.",
      techStack: ["React", "Vite", "HTML5/CSS3"],
      githubUrl: "https://github.com/marx5",
      liveUrl: "https://vulv.id.vn",
    },
    {
      id: "vulv",
      title: "VuLV",
      category: "Realtime Web",
      description: "",
      techStack: [],
      githubUrl: "",
      liveUrl: "",
    }
  ],

  experience: [
    {
      id: "exp-1",
      period: "2025 - NAY",
      role: "Fullstack Developer",
      company: "Không",
      description: "Tự học và phát triển bản thân",
      tags: ["React", "Node.js", "MySQL", "MongoDB", "Redis", "Docker"],
    }
  ],

  contact: {
    heading: "Bắt đầu dự án cùng nhau?",
    subheading: "Tôi luôn sẵn sàng trao đổi về các cơ hội hợp tác, dự án mới hoặc công việc phù hợp.",
    email: "vulv.bnvn@gmail.com",
    location: "Hà Nội, Việt Nam",
  },
}
