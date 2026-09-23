export const personalInfo = {
  name: "Mikiyas Abesha",
  roleTitle: "Full-Stack Software Engineer & Frontend Specialist",
  tagline: "Engineering high-performance web applications, scalable architectures, and visually stunning digital experiences.",
  status: "Available for new projects & full-time roles",
  location: "Addis Ababa, Ethiopia (Open to Remote Worldwide)",
  email: "mikiyas.abesha.dev@gmail.com",
  phone: "+251 91 123 4567",
  avatar: "/images/avatar.jpg",
  bio: "I am a passionate software engineer with 3+ years of experience crafting modern, resilient web products. I bridge technical rigor with refined design craft—specializing in React 19, Next.js, Node.js, and cloud ecosystems. Whether architecting real-time streaming interfaces or optimizing Core Web Vitals, I build software that scales cleanly and inspires users.",
  socials: {
    github: "https://github.com/mikiyas-abesha",
    linkedin: "https://linkedin.com/in/mikiyas-abesha",
    twitter: "https://twitter.com/mikiyas_dev",
    email: "mailto:mikiyas.abesha.dev@gmail.com",
  },
};

export const metrics = [
  { value: "3+", label: "Years Experience", description: "Production web development" },
  { value: "18+", label: "Projects Delivered", description: "Full-stack & frontend" },
  { value: "99.8%", label: "Lighthouse Score", description: "Average speed & SEO" },
  { value: "100%", label: "Client Satisfaction", description: "Across global contracts" },
];

export const skillCategories = [
  {
    id: "frontend",
    title: "Frontend & UI Engineering",
    icon: "Layout",
    skills: [
      { name: "React 19 & Next.js", level: 96, highlight: "Server Components, App Router, Hooks" },
      { name: "JavaScript (ES6+) & TypeScript", level: 94, highlight: "Type-safety, async architecture" },
      { name: "HTML5, Semantic & Modern CSS", level: 98, highlight: "Responsive grids, flexbox, clamp" },
      { name: "Tailwind CSS & Vanilla CSS3", level: 95, highlight: "Glassmorphism, animations, tokens" },
      { name: "State Architecture", level: 92, highlight: "Zustand, Context API, Redux Toolkit" },
      { name: "Web Performance & SEO", level: 94, highlight: "Core Web Vitals, dynamic imports, SSR" },
    ],
  },
  {
    id: "backend",
    title: "Backend, APIs & Databases",
    icon: "Server",
    skills: [
      { name: "Node.js & Express", level: 90, highlight: "RESTful APIs, microservices, auth" },
      { name: "PostgreSQL & Prisma ORM", level: 88, highlight: "Relational modeling, migrations, indexing" },
      { name: "MongoDB & Mongoose", level: 86, highlight: "Document storage, aggregation pipelines" },
      { name: "REST & GraphQL APIs", level: 90, highlight: "Contract design, caching, rate limiting" },
      { name: "Authentication & Security", level: 89, highlight: "JWT, OAuth 2.0, RBAC, input sanitization" },
      { name: "WebSocket & Realtime", level: 85, highlight: "Socket.io, live subscriptions, events" },
    ],
  },
  {
    id: "devops",
    title: "DevOps, Cloud & Architecture",
    icon: "Cloud",
    skills: [
      { name: "Git, GitHub & Workflows", level: 96, highlight: "Feature branches, code reviews, rebase" },
      { name: "Docker & Containerization", level: 85, highlight: "Multi-stage builds, compose networks" },
      { name: "CI/CD Automation", level: 86, highlight: "GitHub Actions, automated testing, lint" },
      { name: "Vercel, AWS & Cloudflare", level: 88, highlight: "Edge functions, CDN, S3, lambdas" },
      { name: "Testing (Jest & Vitest)", level: 84, highlight: "Unit testing, React Testing Library" },
      { name: "Linux & Shell Scripting", level: 86, highlight: "Bash, server administration, automation" },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "Addis Eats Platform",
    subtitle: "Authentic Ethiopian Food Ordering & Restaurant Platform",
    category: "Full Stack",
    image: "/images/addis_eats.jpg",
    tags: ["React 19", "Context API", "Vite", "Node.js", "CSS Modules"],
    summary:
      "A high-performance online food ordering and delivery web application engineered for authentic Ethiopian cuisine, featuring real-time cart persistence, geolocation delivery estimates, and accessible UI.",
    fullDescription:
      "Addis Eats connects traditional Ethiopian culinary hubs with modern hungry customers. Built from the ground up to solve friction in menu customization and order assembly, the platform features a responsive reactive cart state, custom dish spice/preparation notes, and smooth visual checkout.",
    problem:
      "Traditional restaurant ordering systems in the region suffered from slow mobile responsiveness, confusing item customization, and lack of visual polish that undermined customer trust.",
    solution:
      "Engineered an ultra-fast React single-page application using custom hooks for persistent cart synchronization, optimized WebP imagery, and a clean glassmorphic order drawer that reduced checkout abandonment by 35%.",
    metrics: ["45% Faster Checkout", "4.9/5 Average Review", "1.2s First Contentful Paint"],
    highlights: [
      "Dynamic Cart State with LocalStorage resilience",
      "Interactive dish customization & special dietary filters",
      "Visual Order Summary drawer with subtotal & tax calculation",
      "Adaptive design optimized for mobile, tablet, and desktop",
    ],
    liveUrl: "https://addis-eats-demo.vercel.app",
    githubUrl: "https://github.com/mikiyas-abesha/addis-eats-platform",
    featured: true,
  },
  {
    id: 2,
    title: "Astra Digital Agency Platform",
    subtitle: "SaaS Performance Intelligence & Case Study Portfolio",
    category: "Web Development",
    image: "/images/agency_portfolio.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Technical SEO", "Chart.js"],
    summary:
      "A sleek enterprise client portfolio and business analytics dashboard providing actionable conversion insights, lead velocity tracking, and client case study showcases.",
    fullDescription:
      "Astra Digital was designed for a forward-thinking digital agency wanting to showcase high-impact enterprise case studies alongside real-time client ROI metrics. The interface uses modern visual depth, glowing gradient highlights, and sub-second page transitions.",
    problem:
      "Agencies frequently struggle to prove direct financial impact and conversion velocity to prospective enterprise clients through static PDF presentations.",
    solution:
      "Created an interactive web application with embedded client performance graphs, dynamic lead tracking counters, and modular case study sheets that drove an 18.4% conversion rate on lead inquiries.",
    metrics: ["315% Client Average ROI", "100/100 Lighthouse Performance", "18.4% Inbound Lead Conversion"],
    highlights: [
      "Interactive SVG chart displays for 30-day conversion curves",
      "Dynamic client case study modal drawer with technical metrics",
      "Flawless technical SEO architecture with OpenGraph metadata",
      "Ultra-low CLS (Cumulative Layout Shift) scoring 0.00",
    ],
    liveUrl: "https://astra-digital-demo.vercel.app",
    githubUrl: "https://github.com/mikiyas-abesha/astra-agency-platform",
    featured: true,
  },
  {
    id: 3,
    title: "Nexus Trade Analytics",
    subtitle: "Real-Time Financial Terminal & Technical Intelligence",
    category: "Data & Trading",
    image: "/images/market_analytics.jpg",
    tags: ["React 19", "WebSockets", "Canvas API", "REST APIs", "Financial Math"],
    summary:
      "An institutional-grade cryptocurrency and foreign exchange terminal delivering sub-millisecond price updates, order book depth visualization, and algorithmic trading indicators.",
    fullDescription:
      "Nexus Trade is an ultra-low latency market intelligence terminal built for day traders and quantitative analysts. It aggregates multi-exchange price tickers and visualizes market depth with custom canvas-rendered charts.",
    problem:
      "Existing retail charting tools experience severe browser thread choking during high volatility events when thousands of DOM nodes re-render concurrently.",
    solution:
      "Implemented a dual-buffer HTML5 Canvas engine paired with WebSockets event debouncing, ensuring continuous 60 FPS performance even during peak volume surges.",
    metrics: ["Steady 60 FPS under peak load", "<15ms Data Latency", "12+ Technical Indicators"],
    highlights: [
      "Real-time order book with live bids and asks ladder",
      "Custom candlestick chart engine with EMA, RSI, and MACD overlays",
      "Instant trade simulation panel with limit and market execution",
      "Configurable audio and visual alerts on price breakouts",
    ],
    liveUrl: "https://nexus-trade-demo.vercel.app",
    githubUrl: "https://github.com/mikiyas-abesha/nexus-trade-terminal",
    featured: true,
  },
  {
    id: 4,
    title: "CloudOps Orchestrator",
    subtitle: "Automated CI/CD Pipeline & Multi-Environment Deployments",
    category: "DevOps & Tools",
    image: "/images/agency_portfolio.jpg",
    tags: ["Docker", "GitHub Actions", "Node.js", "AWS", "Bash"],
    summary:
      "An automated continuous integration and delivery framework orchestrating multi-environment test runners, container linting, and automated preview deployments.",
    fullDescription:
      "A developer tooling solution designed to eliminate manual staging deployments and flaky integration checks, providing automated preview links on every pull request.",
    problem:
      "Engineering teams suffered from 45-minute deployment bottlenecks and staging drift due to manual server configuration.",
    solution:
      "Engineered automated GitHub Actions pipelines with Docker multi-stage builds and automated zero-downtime rollbacks, slashing deployment cycles to under 4 minutes.",
    metrics: ["90% Faster Deployments", "Zero Downtime Deployments", "100% Automated Test Coverage"],
    highlights: [
      "Containerized test suites running in parallel matrices",
      "Instant preview environments for QA validation",
      "Automated Slack notification bot on deployment events",
      "Automatic secret rotation and security vulnerability auditing",
    ],
    liveUrl: "https://cloudops-orchestrator-demo.vercel.app",
    githubUrl: "https://github.com/mikiyas-abesha/cloudops-orchestrator",
    featured: false,
  },
];

export const experienceTimeline = [
  {
    period: "2024 — Present",
    role: "Senior Full-Stack & Frontend Engineer",
    company: "TechVanguard Solutions",
    location: "Addis Ababa / Hybrid",
    description:
      "Lead frontend architecture and full-stack feature delivery for high-scale customer web applications. Architected modular design systems, cut bundle sizes by 40%, and mentored junior engineers.",
    achievements: [
      "Migrated monolithic frontend to React 19 and Vite, achieving sub-second HMR and 50% faster build times.",
      "Designed reusable design token system adopted across 4 cross-functional product squads.",
      "Engineered real-time collaboration features using WebSockets and optimistic UI patterns.",
    ],
    tech: ["React 19", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    period: "2023 — 2024",
    role: "Full-Stack Web Developer",
    company: "Addis Tech Innovations",
    location: "Addis Ababa, Ethiopia",
    description:
      "Built and deployed end-to-end web applications for retail, hospitality, and fintech clients. Designed RESTful backend services and implemented secure payment gateway integrations.",
    achievements: [
      "Delivered 6 commercial client platforms with 100% on-time milestone delivery record.",
      "Built automated inventory sync engine that handled 50,000+ daily SKU updates.",
      "Enhanced SEO scores from an average of 65 to 98 across all client domains.",
    ],
    tech: ["React", "JavaScript", "Express.js", "MongoDB", "Tailwind CSS", "REST APIs"],
  },
  {
    period: "2021 — 2023",
    role: "Junior Frontend Developer & Open Source Contributor",
    company: "Freelance & Community",
    location: "Remote",
    description:
      "Collaborated with international teams and open-source initiatives to build accessible web components, modern landing pages, and interactive UI widgets.",
    achievements: [
      "Contributed to widely used open-source developer toolkits and UI component libraries.",
      "Authored technical tutorials on React state management and modern CSS techniques.",
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Git", "React", "Responsive Design"],
  },
];

export const testimonials = [
  {
    id: 1,
    quote:
      "Mikiyas is a standout engineer who combines deep technical architecture with an extraordinary eye for UI aesthetics. His React code is clean, performant, and delightful to interact with.",
    author: "Dawit Tadesse",
    title: "CTO, EthioTech Labs",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    quote:
      "Working with Mikiyas was seamless. He took our rough dashboard concepts and delivered a production-grade application ahead of schedule with flawless code quality and zero bugs.",
    author: "Sarah Jenkins",
    title: "VP of Product, Horizon Global",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    quote:
      "Mikiyas's grasp of state management, real-time data streaming, and web performance is world-class. He elevates every engineering team he collaborates with.",
    author: "Ermias Bekele",
    title: "Lead Systems Architect, FinTech Addis",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
];
