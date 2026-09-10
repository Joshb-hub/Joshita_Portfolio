'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Command,
  Database,
  Download,
  Globe2,
  GraduationCap,
  Mail,
  Menu,
  Moon,
  Network,
  PanelTop,
  Phone,
  Quote,
  Send,
  Sparkles,
  Sun,
  Terminal,
  Trophy,
  X,
  Zap,
} from 'lucide-react'
import { profile, titleLine } from '@/lib/site-profile'

const roles = [...profile.titles]

const navItems = [
  'About',
  'Skills',
  'Experience',
  'Projects',
  'Education',
  'Certifications',
  'Contact',
]

const skillGroups = [
  {
    name: 'Frontend',
    icon: PanelTop,
    items: [
      'HTML5',
      'CSS3',
      'JavaScript ES6+',
      'React',
      'Redux',
      'Tailwind CSS',
      'Next.js',
      'Responsive Design',
      'UI/UX',
      'Web Accessibility',
    ],
  },
  {
    name: 'Cloud & Microsoft',
    icon: Globe2,
    items: [
      'Microsoft Azure',
      'MSAL',
      'Cloud Concepts',
      'Azure Fundamentals',
      'SQL Server',
      'SSMS',
    ],
  },
  {
    name: 'AI & Prompting',
    icon: Sparkles,
    items: [
      'Claude AI',
      'Gemini AI',
      'ChatGPT',
      'GitHub Copilot',
      'Prompt Engineering',
      'Structured Prompting',
      'AI-assisted Development',
    ],
  },
  {
    name: 'Data & Databases',
    icon: Database,
    items: [
      'Power BI',
      'DAX',
      'SQL',
      'MySQL',
      'MongoDB',
      'Dashboard Development',
      'KPI Analytics',
      'MS Excel',
    ],
  },
  {
    name: 'Programming',
    icon: Code2,
    items: [
      'Python',
      'JavaScript',
      'OOP',
      'Data Structures & Algorithms',
      'Operating Systems',
      'Computer Networks',
    ],
  },
  {
    name: 'Tools & Practices',
    icon: Terminal,
    items: [
      'Git',
      'GitHub',
      'VS Code',
      'Agile SDLC',
      'Version Control',
      'Debugging',
      'REST APIs',
      'Node.js',
    ],
  },
]

const projects = [
  {
    name: 'EduBridge',
    category: 'Education',
    status: 'In development',
    type: ['Backend & Full Stack', 'UI/UX'],
    accent: 'violet',
    image: '',
    github: '',
    live: '',
    description:
      'A centralized learning platform with structured subject navigation, categorized layouts, and reusable accessible UI components.',
    stack: ['HTML', 'CSS', 'Tailwind CSS'],
    details:
      'Designed a clear information architecture around subject discovery, with responsive layouts and a consistent component language for learners.',
  },
  {
    name: 'SwasthyaSetu',
    category: 'Healthcare',
    status: 'In development',
    type: ['Backend & Full Stack', 'UI/UX'],
    accent: 'lime',
    image: '',
    github: '',
    live: '',
    description:
      'A health awareness platform built to deliver structured, readable, and user-friendly informational content.',
    stack: ['HTML', 'CSS', 'Tailwind CSS'],
    details:
      'Focused on readability, calm visual hierarchy, accessible navigation, and responsive content patterns for health education.',
  },
  {
    name: 'SkillSwap',
    category: 'Community',
    status: 'In development',
    type: ['Backend & Full Stack', 'UI/UX', 'Community'],
    accent: 'orange',
    image: '',
    github: '',
    live: '',
    description:
      'A peer-to-peer skill exchange platform for discovering people, profiles, and opportunities to learn together.',
    stack: ['HTML', 'CSS', 'Tailwind CSS'],
    details:
      'Explored categorized profiles, skill listings, and intuitive interactions that make community discovery feel lightweight and welcoming.',
  },
  {
    name: 'AegisRAG',
    category: 'AI / GenAI',
    status: 'Completed',
    type: 'AI Application',
    accent: 'violet',
    image: '',
    github: '',
    live: '',
    description:
      'A query-adaptive PDF Q&A system that intelligently classifies user questions and dynamically adjusts retrieval depth to generate grounded answers from source documents.',
    stack: ['Python', 'FAISS', 'Streamlit', 'HuggingFace'],
    details:
      'Uses intelligent query classification, dynamic retrieval depth, and semantic search to provide more relevant answers from PDF content instead of relying on fixed-context retrieval.',
  },
  {
    name: 'E-Commerce Sales Dashboard',
    category: 'Data Analytics',
    status: 'Completed',
    type: 'Business Intelligence',
    accent: 'amber',
    image: '',
    github: 'https://github.com/Joshb-hub/E-Commerce-Dashboard-Power-BI-Project',
    live: '',
    description:
      'An interactive Power BI dashboard that transforms raw e-commerce sales data into actionable business insights across revenue, profit, regions, products, and customer behavior.',
    stack: ['Power BI', 'DAX', 'Power Query', 'Data Modeling'],
    details:
      'Built an end-to-end BI layer with data cleaning, transformation, modeling, and DAX-powered KPIs to analyze sales performance, regional trends, product performance, and customer behavior.',
  },
  {
    name: 'Backend-Auth',
    category: 'AI / GenAI',
    status: 'Completed',
    type: ['Backend & Full Stack', 'Cloud & Azure'],
    accent: 'cyan',
    image: '',
    github: '',
    live: '',
    description:
      'An internal organization knowledge assistant with secure Microsoft login, document search, chat history management, Gemini API integration, and a chatbot interface for business teams.',
    stack: ['Next.js', 'Azure', 'SQL Server', 'Microsoft Auth', 'Gemini API', 'Node.js'],
    details:
      'Built a secure internal chatbot with Microsoft-based login, toggle mode, document search, new-chat creation, delete chat history, chat history persistence, Gemini API integration, and Azure + SQL Server-backed storage for team knowledge workflows.',
  },
  {
    name: 'Frontend-Auth',
    category: 'AI / GenAI',
    status: 'Completed',
    type: ['Frontend & Full Stack', 'Cloud & Azure'],
    accent: 'cyan',
    image: '',
    github: '',
    live: '',
    description:
      'A frontend authentication and chatbot experience with Microsoft login, chat history, a toggle mode, and Gemini-powered responses for internal usage.',
    stack: ['Next.js', 'Azure', 'SQL Server', 'Microsoft Auth', 'Gemini API', 'Node.js'],
    details:
      'Implemented Microsoft login, mode switching, chat history management, add-new-chat, delete-chat actions, and AI-assisted conversations, while using Azure and SQL Server for backend integration and persistence. This version excludes document search, which was handled separately in the backend-auth flow.',
  },
  {
    name: 'Internal Project Collection',
    category: 'Web Development',
    status: 'In development',
    type: ['Frontend', 'Cloud & Azure', 'Community'],
    accent: 'cyan',
    image: '/company_projects.png',
    github: '',
    live: '',
    description:
      'A collection of anonymous internal company projects focused on user authentication, community workflows, profile management, and role-based access for business operations.',
    stack: ['Next.js', 'React', 'OAuth', 'Authorization', 'API Integration', 'Azure'],
    details:
      'Contributed to multiple internal platform experiences by implementing frontend flows for secure login, member onboarding, community features, profile management, and role-based access. The backend and database layers were handled by the respective team members, while I focused on API integration and the user-facing application experience.',
  },
]

const powerBiDashboardImages = [
  '/projects/power_bi_executive_overview.png',
  '/projects/power_bi_product_performance.png',
  '/projects/power_bi_regional_analysis.png',
  '/projects/power_bi_customer_insights.png',
]

const experiences = [
  {
    role: 'Systems Engineer Trainee',
    company: 'Surelia Info Systems Private Limited',
    date: 'August 2026 – Current',
    text:
      'Full-time employee in structured training and project development. Gaining hands-on exposure to Azure, MSAL, Python, Next.js, SQL Server, Claude, Gemini, prompt engineering, and AI-assisted development.',
    current: true,
  },
  {
    role: 'Business Development Intern',
    company: 'Banao Technologies',
    date: 'January 2026 – June 2026',
    text:
      'Worked across professional outreach, communication, SEO, and workflow automation.',
  },
  {
    role: 'Power BI Intern',
    company: 'Microsoft Elevate (AICTE)',
    date: 'December 2025 – January 2026',
    text:
      'Worked with Power BI, DAX, dashboard development, KPI analytics, and data cleaning.',
  },
  {
    role: 'Web Developer Intern',
    company: 'Webstack Academy',
    date: 'September 2025 – November 2025',
    text:
      'Built responsive frontend experiences using React, JavaScript, Tailwind CSS, REST APIs, and Node.js.',
  },
]

type ProjectModalItem = {
  name: string
  category: string
  status: string
  type: string | string[]
  accent: string
  image?: string
  github?: string
  live?: string
  description: string
  stack: string[]
  details: string
  pdf?: string
}

const certifications = [
  {
    title: 'AI Foundations Associate',
    issuer: 'Oracle Cloud Infrastructure',
    score: '98%',
    description:
      'Strengthened core AI and cloud fundamentals, including practical understanding of OCI AI concepts and digital transformation workflows.',
    pdf: '/certificates/oci-ai-foundations.pdf',
  },
  {
    title: 'Power BI for Business Applications',
    issuer: 'Microsoft Elevate',
    score: 'Completed',
    description:
      'Developed dashboards, business metrics, and data-driven reporting skills focused on business decision-making with Power BI.',
    pdf: '/certificates/power-bi-business-applications.pdf',
  },
  {
    title: 'Web Development Training',
    issuer: 'Webstack Academy',
    score: 'Completed',
    description:
      'Built responsive frontend skills using modern web technologies, layout design practices, and hands-on project development.',
    pdf: '/certificates/web-development-training.pdf',
  },
  {
    title: 'Claude Code: The Practical Guide',
    issuer: 'Udemy',
    score: 'Completed',
    description:
      'Explored practical AI-assisted development workflows and prompt-driven coding techniques to improve software delivery efficiency.',
    pdf: '/certificates/claude-practical-guide.pdf',
  },
  {
    title: 'Claude Code Masterclass: Code 5x Faster with Agentic AI',
    issuer: 'Udemy',
    score: 'Completed',
    description:
      'Learned agentic AI patterns for faster development cycles, task automation, and improved productivity in coding workflows.',
    pdf: '/certificates/claude-masterclass.pdf',
  },
  {
    title: 'Free Python Course',
    issuer: 'GeeksforGeeks',
    score: 'Completed',
    description:
      'Gained foundational Python programming knowledge, syntax understanding, and problem-solving skills for software development.',
    pdf: '/certificates/free-python-course.pdf',
  },
  {
    title: 'Career Essentials in Software Development',
    issuer: 'Microsoft & LinkedIn',
    score: 'Completed',
    description:
      'Covered software development foundations, professional readiness, and the practical habits needed for a modern engineering career.',
    pdf: '/certificates/career-essentials-software-development.pdf',
  },
  {
    title: 'Python Programming',
    issuer: 'Reliance Foundation',
    score: 'Completed',
    description:
      'Developed a stronger understanding of Python fundamentals, scripting, and applied programming concepts for technical work.',
    pdf: '/certificates/python-programming.pdf',
  },
  {
    title: 'Introduction to Programming',
    issuer: 'freeCodeCamp (IBM SkillsBuild)',
    score: 'Completed',
    description:
      'Built a solid base in programming concepts, logic, and beginner-friendly problem solving using structured learning paths.',
    pdf: '/certificates/introduction-to-programming.pdf',
  },
]

export default function Page() {
  const [dark, setDark] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const [activeSection, setActiveSection] = useState('Home')
  const [progress, setProgress] = useState(0)
  const [projectFilter, setProjectFilter] = useState('All')
  const [selectedProject, setSelectedProject] =
    useState<ProjectModalItem | null>(null)
  const [commandOpen, setCommandOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [photoFailed, setPhotoFailed] = useState(false)
  const [powerBiSlide, setPowerBiSlide] = useState(0)

  const changePowerBiSlide = (direction: number) => {
    setPowerBiSlide(
      (current) =>
        (current + direction + powerBiDashboardImages.length) %
        powerBiDashboardImages.length
    )
  }

  useEffect(() => {
    const timer = window.setInterval(
      () => setRoleIndex((index) => (index + 1) % roles.length),
      2600
    )

    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight

      setProgress(max ? (window.scrollY / max) * 100 : 0)

      const current = ['Home', ...navItems]
        .reverse()
        .find((item) => {
          const el = document.getElementById(item.toLowerCase())
          return el && el.getBoundingClientRect().top < 180
        })

      if (current) {
        setActiveSection(current)
      }
    }

    const onKey = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === 'k'
      ) {
        event.preventDefault()
        setCommandOpen(true)
      }

      if (event.key === 'Escape') {
        setCommandOpen(false)
        setSelectedProject(null)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey)

    onScroll()

    return () => {
      window.clearInterval(timer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  const filteredProjects = useMemo(
    () =>
      projectFilter === 'All'
        ? projects
        : projects.filter((project) => {
            const projectTypes = Array.isArray(project.type)
              ? project.type
              : [project.type]

            return (
              projectTypes.includes(projectFilter) ||
              project.category === projectFilter
            )
          }),
    [projectFilter]
  )

  const goTo = (name: string) => {
    document
      .getElementById(name.toLowerCase())
      ?.scrollIntoView({ behavior: 'smooth' })

    setMenuOpen(false)
    setCommandOpen(false)
  }

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = new FormData(event.currentTarget)

    const name = String(form.get('name') || '')
    const email = String(form.get('email') || '')
    const subject = String(
      form.get('subject') || 'Portfolio enquiry'
    )
    const message = String(form.get('message') || '')

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )

    window.location.href =
      `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${body}`

    setSent(true)

    window.setTimeout(() => setSent(false), 4500)
  }

  return (
    <div className={dark ? 'site dark' : 'site light'}>
      <div
        className="scroll-progress"
        style={{ width: `${progress}%` }}
      />

      <header className="nav-shell">
        <a
          className="brand"
          href="#home"
          onClick={() => goTo('Home')}
        >
          <span className="brand-mark">
            <img src="/logo.png" alt="Joshita logo" className="brand-logo" />
          </span>

          <div>
            <strong>{profile.firstName}</strong>
            <small>{profile.titles[0]}</small>
          </div>
        </a>

        <nav
          className={menuOpen ? 'nav-links open' : 'nav-links'}
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <a
              key={item}
              className={
                activeSection === item ? 'active' : ''
              }
              href={`#${item.toLowerCase()}`}
              onClick={() => goTo(item)}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a
            className="icon-link"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Code2 />
          </a>

          <a
            className="icon-link"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <Globe2 />
          </a>

          <a
            className="icon-link resume-link"
            href={profile.resume}
            download
            aria-label="Download resume"
          >
            <Download />
          </a>

          <button
            className="theme-toggle"
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
          >
            {dark ? <Sun /> : <Moon />}
          </button>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section
          id="home"
          className="hero section-wrap"
        >
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" />
              Hello, I&apos;m
            </p>

            <h1>
              {profile.firstName}
              <br />
              <em>{profile.lastName}</em>
            </h1>

            <div className="role-line">
              <span>Currently building as a</span>
              <strong>{roles[roleIndex]}</strong>
            </div>

            <p className="hero-description">
              Building modern, responsive, and intelligent digital
              experiences across web development, cloud technologies,
              AI-assisted workflows, and data-driven solutions.
            </p>

            <div className="button-row">
              <button
                className="button primary"
                onClick={() => goTo('Projects')}
              >
                View my projects
                <ArrowUpRight />
              </button>

              <a
                className="button secondary"
                href={profile.resume}
                download
              >
                Download resume
                <Download />
              </a>

              <a
                className="button secondary"
                href="#contact"
              >
                Let&apos;s connect
                <Mail />
              </a>
            </div>

            <div className="social-row">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                <Code2 />
                GitHub
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Globe2 />
                LinkedIn
              </a>

              <a
                href={profile.leetcode}
                target="_blank"
                rel="noreferrer"
              >
                <Trophy />
                LeetCode
              </a>

              <a
                href={profile.hackerrank}
                target="_blank"
                rel="noreferrer"
              >
                <Terminal />
                HackerRank
              </a>

              <a href={`mailto:${profile.email}`}>
                <Mail />
                Email
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="orb orb-one" />
            <div className="orb orb-two" />

            <div className="portrait-card">
              <div className="portrait-placeholder">
                {photoFailed ? (
                  <>
                    <span>{profile.initials}</span>
                    <small>system / engineer</small>
                  </>
                ) : (
                  <img
                    className="portrait-photo"
                    src={profile.profileImage}
                    alt={`${profile.name} professional portrait`}
                    onError={() => setPhotoFailed(true)}
                  />
                )}
              </div>

              <div className="portrait-caption">
                <span>Based in {profile.location}</span>

                <span className="availability">
                  <i />
                  open to opportunities
                </span>
              </div>
            </div>

            <div className="float-card float-top">
              <Sparkles />

              <span>
                AI + Prompt
                <br />
                <b>Engineering</b>
              </span>
            </div>

            <div className="float-card float-bottom">
              <Code2 />

              <span>
                React + Next.js
                <br />
                <b>Frontend systems</b>
              </span>
            </div>

            <div className="hero-grid-mark">
              <span>01</span>
              <span>—</span>
              <span>∞</span>
            </div>
          </div>
        </section>

        <section className="stats section-wrap">
          <div>
            <strong>
              100<span>+</span>
            </strong>
            <small>DSA problems explored</small>
          </div>

          <div>
            <strong>
              5<span>+</span>
            </strong>
            <small>Interactive dashboards</small>
          </div>

          <div>
            <strong>
              10<span>+</span>
            </strong>
            <small>Web pages &amp; components</small>
          </div>

          <div>
            <strong>∞</strong>
            <small>Curiosity in progress</small>
          </div>
        </section>

        <section
          id="about"
          className="section-wrap section"
        >
          <div className="section-label">
            01 / About
          </div>

          <div className="about-grid">
            <div>
              <h2>
                Building beyond
                <br />
                <em>the interface.</em>
              </h2>
            </div>

            <div className="about-text">
              <p className="lead">
                I&apos;m a Systems Engineer Trainee passionate about
                making thoughtful, accessible digital experiences.
              </p>

              <p>
                My work sits at the intersection of responsive web
                applications, UI/UX, data analytics, and emerging AI
                workflows. I enjoy turning complex ideas into clear
                interfaces with React, JavaScript, Tailwind CSS, and
                REST APIs.
              </p>

              <div className="exploring">
                <p className="mini-label">
                  Currently exploring
                </p>

                <div>
                  {[
                    'Microsoft Azure',
                    'MSAL',
                    'Next.js',
                    'Python',
                    'SQL Server',
                    'Claude AI',
                    'Gemini AI',
                    'Prompt Engineering',
                  ].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="skills"
          className="section-wrap section"
        >
          <div className="section-label">
            02 / Capabilities
          </div>

          <div className="section-heading">
            <h2>
              Tools for turning
              <br />
              <em>ideas into systems.</em>
            </h2>

            <p>
              A practical toolkit shaped by projects, internships,
              and a habit of always learning the next layer.
            </p>
          </div>

          <div className="skill-grid">
            {skillGroups.map(
              ({ name, icon: Icon, items }) => (
                <article
                  className="skill-card"
                  key={name}
                >
                  <Icon />
                  <h3>{name}</h3>

                  <div className="pill-list">
                    {items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              )
            )}
          </div>
        </section>

        <section
          id="experience"
          className="section-wrap section"
        >
          <div className="section-label">
            03 / Experience
          </div>

          <div className="section-heading">
            <h2>
              Growing through
              <br />
              <em>real-world work.</em>
            </h2>
          </div>

          <div className="timeline">
            {experiences.map((experience, index) => (
              <article
                className={
                  experience.current
                    ? 'timeline-item current'
                    : 'timeline-item'
                }
                key={experience.role}
              >
                <div className="timeline-marker">
                  0{index + 1}
                </div>

                <div className="timeline-content">
                  <div className="timeline-top">
                    <div>
                      <h3>
                        {experience.role}

                        {experience.current && (
                          <span className="live-badge">
                            Current
                          </span>
                        )}
                      </h3>

                      <p>{experience.company}</p>
                    </div>

                    <time>{experience.date}</time>
                  </div>

                  <p>{experience.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="projects"
          className="section-wrap section projects-section"
        >
          <div className="section-label">
            04 / Selected work
          </div>

          <div className="section-heading projects-heading">
            <div>
              <h2>
                Made with intent,
                <br />
                <em>not just pixels.</em>
              </h2>
            </div>

            <p>
              Projects that reflect my interest in useful,
              welcoming, and technically thoughtful experiences.
            </p>
          </div>

          <div className="filter-row">
            {[
              'All',
              'Frontend',
              'Frontend & Full Stack',
              'Web Development',
              'Backend & Full Stack',
              'Cloud & Azure',
              'UI/UX',
              'Education',
              'Healthcare',
              'Community',
            ].map((filter) => (
              <button
                className={
                  projectFilter === filter
                    ? 'filter active'
                    : 'filter'
                }
                key={filter}
                onClick={() => setProjectFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {filteredProjects.map((project, index) => {
              const isPowerBiProject =
                project.name === 'E-Commerce Sales Dashboard'

              return (
                <article
                  className={`project-card ${project.accent}`}
                  key={project.name}
                >
                  {isPowerBiProject ? (
                    <div className="project-art dashboard-carousel-card">
                      <div className="training-project-label">
                        Personal Project • GitHub Available
                      </div>

                      <img
                        src={powerBiDashboardImages[powerBiSlide]}
                        alt={`${project.name} dashboard ${powerBiSlide + 1}`}
                        className="project-image"
                      />

                      <div className="dashboard-carousel-controls">
                        <button
                          type="button"
                          className="dashboard-carousel-arrow"
                          onClick={() => changePowerBiSlide(-1)}
                          aria-label="Previous dashboard"
                        >
                          <ChevronLeft />
                        </button>

                        <div className="dashboard-carousel-status">
                          <span>
                            {powerBiSlide + 1} /{' '}
                            {powerBiDashboardImages.length}
                          </span>
                        </div>

                        <button
                          type="button"
                          className="dashboard-carousel-arrow"
                          onClick={() => changePowerBiSlide(1)}
                          aria-label="Next dashboard"
                        >
                          <ChevronRight />
                        </button>
                      </div>

                      <div className="dashboard-carousel-dots">
                        {powerBiDashboardImages.map((_, dotIndex) => (
                          <button
                            key={dotIndex}
                            type="button"
                            className={
                              dotIndex === powerBiSlide
                                ? 'dot active'
                                : 'dot'
                            }
                            onClick={() => setPowerBiSlide(dotIndex)}
                            aria-label={`View dashboard ${dotIndex + 1}`}
                          />
                        ))}
                      </div>

                      <span className="project-index">
                        0{index + 1}
                      </span>
                    </div>
                  ) : (
                    <div className="project-art">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={`${project.name} preview`}
                          className="project-image"
                        />
                      ) : (
                        <div className="art-window">
                          <div className="window-bar">
                            <i />
                            <i />
                            <i />
                          </div>

                          <div className="art-lines">
                            <span />
                            <span />
                            <span />
                          </div>

                          <div className="art-blocks">
                            <b />
                            <b />
                            <b />
                          </div>
                        </div>
                      )}

                      <span className="project-index">
                        0{index + 1}
                      </span>
                    </div>
                  )}

                  <div className="project-info">
                    <div className="project-meta">
                      <span>{project.category}</span>
                      <span className="project-status">
                        {project.status}
                      </span>
                    </div>

                    <h3>{project.name}</h3>

                    <p>{project.description}</p>

                    <div className="project-footer">
                      <div className="stack">
                        {project.stack.map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>

                      <button
                        className="round-button"
                        onClick={() => setSelectedProject(project)}
                        aria-label={`View ${project.name} details`}
                      >
                        <ArrowUpRight />
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="next-section section-wrap">
          <div className="next-glow" />

          <div className="section-label">
            05 / Next generation
          </div>

          <div className="next-content">
            <Sparkles />

            <h2>
              Exploring the next generation
              <br />
              <em>of development.</em>
            </h2>

            <p>
              Alongside frontend development, I&apos;m expanding my
              expertise in cloud technologies, Microsoft ecosystems,
              artificial intelligence tools, prompt engineering, and
              AI-assisted software development.
            </p>

            <div className="explore-grid">
              {[
                'Microsoft Azure',
                'MSAL',
                'Claude AI',
                'Gemini AI',
                'ChatGPT',
                'GitHub Copilot',
                'Prompt Engineering',
                'Next.js',
                'Python',
                'SQL Server',
              ].map((item, index) => (
                <span key={item}>
                  <b>0{index + 1}</b>
                  {item}
                </span>
              ))}
            </div>

            <small>
              These technologies represent my current areas of
              hands-on learning, exploration, and professional
              development.
            </small>
          </div>
        </section>

        <section
          id="education"
          className="section-wrap section split-section"
        >
          <div className="section-label">
            06 / Education
          </div>

          <div>
            <h2>
              Foundations for
              <br />
              <em>what&apos;s next.</em>
            </h2>

            <div className="education-card">
              <GraduationCap />

              <div>
                <span>2022 — 2026 · Completed</span>

                <h3>Bachelor of Technology</h3>

                <p>
                  Electronics and Communication Engineering
                </p>

                <strong>
                  Dr. Sudhir Chandra Sur Institute of Technology &
                  Sports Complex
                </strong>

                <b>CGPA 7.85 / 10</b>
              </div>
            </div>

            <div className="education-mini">
              <span>2020 — 2022</span>

              <div>
                <h3>Higher Secondary · CBSE</h3>
                <p>
                  PCM + Computer Science · 75.8%
                </p>
              </div>
            </div>

            <div className="education-mini">
              <span>2018 — 2020</span>

              <div>
                <h3>Secondary Education · ICSE</h3>
                <p>Class X · 91.3%</p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="certifications"
          className="section-wrap section"
        >
          <div className="section-label">
            07 / Credentials
          </div>

          <div className="section-heading">
            <h2>
              Always learning,
              <br />
              <em>always shipping.</em>
            </h2>

            <p>
              A compact record of learning milestones across
              software, data, and AI.
            </p>
          </div>

          <div className="cert-grid">
            {certifications.map((certificate, index) => (
              <button
                className="cert-card"
                key={certificate.title}
                onClick={() =>
                  setSelectedProject({
                    name: `${certificate.title} - ${certificate.issuer}`,
                    category: 'Certification',
                    status:
                      certificate.score.includes('%')
                        ? `Score: ${certificate.score}`
                        : 'Completed',
                    type: 'Certification',
                    accent: index % 2 ? 'violet' : 'cyan',
                    description: certificate.description,
                    stack: [],
                    details:
                      `Credential from ${certificate.issuer}. This certification reflects Joshita's ongoing professional learning in software, analytics, and AI.`,
                    pdf: certificate.pdf,
                  })
                }
              >
                <span className="cert-number">
                  0{index + 1}
                </span>

                <Trophy />

                <span>
                  <strong>
                    {certificate.title} - {certificate.issuer}
                  </strong>
                </span>

                <ArrowUpRight />
              </button>
            ))}
          </div>

          <div className="pursuing">
            <span>Currently pursuing</span>
            <b>In progress</b>

            <p>
              Python Certification · Azure Certification · Azure
              Certification
            </p>
          </div>
        </section>

        <section className="section-wrap section achievements">
          <div className="section-label">
            08 / Milestones
          </div>

          <div className="achievement-grid">
            <article>
              <Trophy />

              <strong>
                100<span>+</span>
              </strong>

              <h3>DSA Problems Solved</h3>

              <p>
                Focused on arrays, recursion, and dynamic
                programming.
              </p>
            </article>

            <article>
              <Zap />

              <strong>2026</strong>

              <h3>Unstop Talent Awards</h3>

              <p>
                Recognized for contributions to talent ecosystem
                insights.
              </p>
            </article>

            <article>
              <Network />

              <strong>2×</strong>

              <h3>Smart India Hackathon</h3>

              <p>
                Participated in 2023 and 2024 with team-based
                software development.
              </p>
            </article>
          </div>
        </section>

        <section
          id="contact"
          className="contact-section section-wrap"
        >
          <div className="section-label">
            09 / Contact
          </div>

          <div className="contact-grid">
            <div>
              <Quote />

              <h2>
                Let&apos;s build something
                <br />
                <em>great together.</em>
              </h2>

              <p>
                I&apos;m open to opportunities in systems engineering,
                frontend development, web development, cloud
                technologies, and Data &amp; AI.
              </p>

              <div className="contact-links">
                <a href={`mailto:${profile.email}`}>
                  <Mail />
                  {profile.email}
                </a>

                <a href={profile.phoneHref}>
                  <Phone />
                  {profile.phone}
                </a>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Code2 />
                  GitHub
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Globe2 />
                  LinkedIn
                </a>

                <a
                  href={profile.leetcode}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Trophy />
                  LeetCode
                </a>

                <a
                  href={profile.hackerrank}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Terminal />
                  HackerRank
                </a>

                <a href={profile.resume} download>
                  <Download />
                  Download resume
                </a>
              </div>
            </div>

            <form onSubmit={submitForm}>
              <label>
                Name
                <input
                  required
                  name="name"
                  placeholder="Your name"
                />
              </label>

              <label>
                Email
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                />
              </label>

              <label>
                Subject
                <input
                  required
                  name="subject"
                  placeholder="What can we build?"
                />
              </label>

              <label>
                Message
                <textarea
                  required
                  name="message"
                  placeholder="Tell me a little about your idea..."
                  rows={4}
                />
              </label>

              <button
                className="button primary"
                type="submit"
              >
                {sent ? (
                  <>
                    <Check />
                    Message ready
                  </>
                ) : (
                  <>
                    Send message
                    <Send />
                  </>
                )}
              </button>

              {sent && (
                <p className="success-message">
                  Thanks — your message has been prepared. I&apos;ll
                  be in touch soon.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer section-wrap">
        <span>© 2026 {profile.name}</span>

        <span>
          Designed and built with curiosity, creativity, and code.
        </span>

        <span>{titleLine}</span>
      </footer>

      <button
        className="command-trigger"
        onClick={() => setCommandOpen(true)}
        aria-label="Open command palette"
      >
        <Command />
        <span>⌘ K</span>
      </button>

      {selectedProject && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.name} details`}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={() =>
                setSelectedProject(null)
              }
              aria-label="Close dialog"
            >
              <X />
            </button>

            <span className="eyebrow">
              {selectedProject.category} ·{' '}
              {selectedProject.status}
            </span>

            {selectedProject.image && (
              <div className="modal-project-visual">
                <img
                  src={selectedProject.image}
                  alt={`${selectedProject.name} preview`}
                  className="modal-project-image"
                />
              </div>
            )}

            <h2>{selectedProject.name}</h2>

            <p>{selectedProject.details}</p>

            <div className="modal-tags">
              {selectedProject.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="project-links">
              {'pdf' in selectedProject && selectedProject.pdf ? (
                <a
                  href={selectedProject.pdf}
                  target="_blank"
                  rel="noreferrer"
                  className="button primary project-link-button"
                >
                  View credential
                </a>
              ) : null}

              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="button secondary project-link-button"
                >
                  GitHub
                </a>
              )}

              {selectedProject.live && (
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noreferrer"
                  className="button primary project-link-button"
                >
                  Live link
                </a>
              )}

              <button
                className="button primary project-link-button"
                onClick={() =>
                  setSelectedProject(null)
                }
              >
                Close details
                <Check />
              </button>
            </div>
          </div>
        </div>
      )}

      {commandOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setCommandOpen(false)}
        >
          <div
            className="command-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="command-search">
              <Command />

              <span>
                What would you like to explore?
              </span>

              <kbd>ESC</kbd>
            </div>

            {[
              'Home',
              'Projects',
              'Skills',
              'Experience',
              'Certifications',
              'Contact',
            ].map((item) => (
              <button
                key={item}
                onClick={() => goTo(item)}
              >
                <ArrowUpRight />
                Go to {item}
              </button>
            ))}

            <a
              className="command-link"
              href={profile.resume}
              download
              onClick={() =>
                setCommandOpen(false)
              }
            >
              <Download />
              Download resume
            </a>

            <button
              onClick={() => {
                setDark(!dark)
                setCommandOpen(false)
              }}
            >
              <Sun />
              Toggle theme
            </button>
          </div>
        </div>
      )}
    </div>
  )
}