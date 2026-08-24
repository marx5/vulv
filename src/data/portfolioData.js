export const portfolioData = {
  personal: {
    name: "Lâm Văn Vũ",
    shortName: "VuLV",
    role: "Fullstack Developer",
    status: "Sẵn sàng nhận dự án mới",
    location: "Hà Nội, Việt Nam",
    email: "vulv.dev@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    bio: "Kỹ sư phần mềm đam mê xây dựng các sản phẩm web tốc độ cao, giao diện trực quan và kiến trúc code sạch sẽ.",
    stats: [
      { id: "exp", number: "3+", label: "Năm kinh nghiệm" },
      { id: "proj", number: "15+", label: "Dự án hoàn thành" },
      { id: "sat", number: "100%", label: "Cam kết chất lượng" },
    ],
  },

  skills: [
    {
      category: "Frontend",
      items: ["React", "TypeScript", "Next.js", "JavaScript", "HTML5/CSS3", "Vite"],
    },
    {
      category: "Backend & APIs",
      items: ["Node.js", "Express", "NestJS", "PostgreSQL", "MySQL", "Redis"],
    },
    {
      category: "DevOps & Tools",
      items: ["Docker", "Nginx", "Git / GitHub", "Linux", "Postman", "CI/CD"],
    },
  ],

  projects: [
    {
      id: "vulv-commerce",
      title: "E-Commerce System",
      category: "Fullstack Web",
      description: "Nền tảng thương mại điện tử với giỏ hàng thời gian thực, quản lý đơn hàng và dashboard phân tích doanh thu.",
      techStack: ["React", "Node.js", "PostgreSQL", "Docker"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      id: "task-flow",
      title: "TaskFlow Kanban",
      category: "Realtime Web",
      description: "Ứng dụng quản lý công việc nhóm Agile trực quan với kéo thả realtime qua WebSockets và đồng bộ đa người dùng.",
      techStack: ["React", "TypeScript", "Socket.io", "Redis"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      id: "dev-metrics",
      title: "DevMetrics Monitor",
      category: "Backend & DevOps",
      description: "Hệ thống theo dõi logs, máy chủ và giám sát dịch vụ web tập trung, tích hợp cảnh báo Telegram tức thì.",
      techStack: ["Node.js", "Docker", "Nginx", "MongoDB"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
  ],

  experience: [
    {
      id: "exp-1",
      period: "2023 - NAY",
      role: "Fullstack Developer",
      company: "Tech Solutions Co.",
      description: "Thiết kế kiến trúc hệ thống web, phát triển tính năng cốt lõi và tối ưu hóa hiệu năng cơ sở dữ liệu.",
      tags: ["React", "Node.js", "PostgreSQL", "Docker"],
    },
    {
      id: "exp-2",
      period: "2021 - 2023",
      role: "Frontend Developer",
      company: "Digital Studio",
      description: "Phát triển giao diện web SPA mượt mà, tối ưu UI/UX và tích hợp hệ thống RESTful APIs.",
      tags: ["React", "JavaScript", "CSS3", "REST APIs"],
    },
  ],

  contact: {
    heading: "Bắt đầu dự án cùng nhau?",
    subheading: "Tôi luôn sẵn sàng trao đổi về các cơ hội hợp tác, dự án mới hoặc công việc phù hợp.",
    email: "vulv.dev@gmail.com",
    location: "Hà Nội, Việt Nam",
  },
}
