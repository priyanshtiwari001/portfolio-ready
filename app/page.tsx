"use client"

import { useEffect, useRef, useState } from "react"
import { Github, Linkedin, Mail, ArrowUpRight, Calendar, Clock, Code, Palette, Database, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Custom Cursor Component
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))

    let ticking = false
    const updateMousePosition = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY })
          ticking = false
        })
        ticking = true
      }
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    window.addEventListener("mousemove", updateMousePosition, { passive: true })

    const interactiveElements = document.querySelectorAll("button, a, [data-magnetic]")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter, { passive: true })
      el.addEventListener("mouseleave", handleMouseLeave, { passive: true })
    })

    return () => {
      observer.disconnect()
      window.removeEventListener("mousemove", updateMousePosition)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        className="fixed top-0 left-0 w-3 h-3 bg-slate-800 dark:bg-slate-100 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-150"
        style={{
          transform: `translate(${mousePosition.x - 6}px, ${mousePosition.y - 6}px) scale(${isHovering ? 1.5 : 1})`,
        }}
      />
      <div
        className="fixed top-0 left-0 w-8 h-8 border border-slate-400/30 rounded-full pointer-events-none z-40 transition-all duration-200"
        style={{
          transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px) scale(${isHovering ? 1.2 : 1})`,
        }}
      />
    </>
  )
}

// Hand-drawn SVG Icons
const HandDrawnIcons = {
  PaperPlane: () => (
    <svg width="60" height="40" viewBox="0 0 60 40" className="text-slate-600 dark:text-slate-400">
      <path
        d="M5 20 L50 5 L35 20 L50 35 L5 20 Z M35 20 L25 30"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Atom: () => (
    <svg width="50" height="50" viewBox="0 0 50 50" className="text-slate-600 dark:text-slate-400">
      <circle cx="25" cy="25" r="3" fill="currentColor" />
      <ellipse
        cx="25"
        cy="25"
        rx="20"
        ry="8"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(0 25 25)"
      />
      <ellipse
        cx="25"
        cy="25"
        rx="20"
        ry="8"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(60 25 25)"
      />
      <ellipse
        cx="25"
        cy="25"
        rx="20"
        ry="8"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(120 25 25)"
      />
    </svg>
  ),
  CodeBlock: () => (
    <svg width="60" height="45" viewBox="0 0 60 45" className="text-slate-600 dark:text-slate-400">
      <rect x="5" y="5" width="50" height="35" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="15" r="2" fill="currentColor" />
      <circle cx="20" cy="15" r="2" fill="currentColor" />
      <circle cx="28" cy="15" r="2" fill="currentColor" />
      <path
        d="M12 25 L18 25 M12 30 L25 30 M12 35 L20 35"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  Lightbulb: () => (
    <svg width="40" height="55" viewBox="0 0 40 55" className="text-slate-600 dark:text-slate-400">
      <path
        d="M20 5 C28 5 35 12 35 20 C35 25 32 29 28 32 L28 40 L12 40 L12 32 C8 29 5 25 5 20 C5 12 12 5 20 5 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M15 45 L25 45 M17 50 L23 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Gear: () => (
    <svg width="50" height="50" viewBox="0 0 50 50" className="text-slate-600 dark:text-slate-400">
      <path
        d="M25 15 C30 15 35 20 35 25 C35 30 30 35 25 35 C20 35 15 30 15 25 C15 20 20 15 25 15 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M25 5 L27 12 L23 12 Z M45 25 L38 27 L38 23 Z M25 45 L23 38 L27 38 Z M5 25 L12 23 L12 27 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  ),
  Database: () => (
    <svg width="45" height="60" viewBox="0 0 45 60" className="text-slate-600 dark:text-slate-400">
      <ellipse cx="22.5" cy="12" rx="17" ry="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M5.5 12 L5.5 48 C5.5 52 12 55 22.5 55 C33 55 39.5 52 39.5 48 L39.5 12"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <ellipse cx="22.5" cy="25" rx="17" ry="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <ellipse cx="22.5" cy="38" rx="17" ry="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  ),
}

// Floating Hand-drawn Elements
const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute top-20 left-16 animate-drift">
        <HandDrawnIcons.PaperPlane />
      </div>
      <div className="absolute top-1/2 left-1/4 animate-float-gentle" style={{ animationDelay: "2s" }}>
        <HandDrawnIcons.Atom />
      </div>
      <div className="absolute top-32 right-20 animate-drift" style={{ animationDelay: "1s" }}>
        <HandDrawnIcons.CodeBlock />
      </div>
      <div className="absolute bottom-32 left-20 animate-float-gentle" style={{ animationDelay: "3s" }}>
        <HandDrawnIcons.Lightbulb />
      </div>
      <div className="absolute bottom-40 right-1/4 animate-drift" style={{ animationDelay: "4s" }}>
        <HandDrawnIcons.Gear />
      </div>
      <div className="absolute top-2/3 right-16 animate-float-gentle" style={{ animationDelay: "1.5s" }}>
        <HandDrawnIcons.Database />
      </div>
    </div>
  )
}

// Clean Button Component
const CleanButton = ({ children, className = "", variant = "default", href, ...props }: any) => {
  const ref = useRef<HTMLButtonElement>(null)

  const variants: any = {
    default:
      "bg-white/90 dark:bg-white text-black dark:text-black hover:bg-white dark:hover:bg-white shadow-lg dark:shadow-2xl",
    outline:
      "border-2 border-white/40 dark:border-white/60 hover:border-white/60 dark:hover:border-white hover:bg-white/10 dark:hover:bg-white/5 text-white dark:text-white",
    ghost: "hover:bg-white/10 dark:hover:bg-white/10 text-white dark:text-white",
    accent: "bg-white dark:bg-white text-black dark:text-black shadow-lg hover:shadow-xl",
    liquid: `
  relative overflow-hidden
  text-white dark:text-white
  rounded-xl
  bg-white/10 dark:bg-white/5
  border border-white/20 dark:border-white/10
  backdrop-blur-xl
  transition-all duration-500
  hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]
  hover:scale-[1.03]
  liquid-bg
`,

  }

  const Component = href ? "a" : "button"

  return (
    <Component
      ref={ref}
      href={href}
      className={`relative px-6 py-3 rounded-lg transition-all duration-200 font-medium text-sm ${variants[variant]} ${className}`}
      data-magnetic
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Component>
  )
}

const MagneticButton = ({ children, className = "", variant = "default", href, ...props }: any) => {
  const ref = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const button = ref.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
      button.style.transition = "transform 0.1s ease-out"
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      button.style.transition = "transform 0.3s ease-out"
      button.style.transform = "translate(0px, 0px)"
    }

    button.addEventListener("mousemove", handleMouseMove)
    button.addEventListener("mouseenter", handleMouseEnter)
    button.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      button.removeEventListener("mousemove", handleMouseMove)
      button.removeEventListener("mouseenter", handleMouseEnter)
      button.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const variants: any = {
    default:
      "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
  }

  const Component = href ? "a" : "button"

  return (
    <div className="relative">
      <Component
        ref={ref}
        href={href}
        className={`relative overflow-hidden px-6 py-3 rounded-full transition-all duration-300 font-medium ${variants[variant]} ${className}`}
        data-magnetic
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Component>
    </div>
  )
}

// Article Card Component
const ArticleCard = ({ article, index }: { article: any; index: number }) => {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={ref}
      className="bg-black/40 liquid-bg dark:bg-black/50 backdrop-blur-xl border border-white/20 dark:border-white/15 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${index * 0.1}s`,
      }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-white/60 dark:text-white/50">
          <Calendar className="w-4 h-4" />
          {article.date}
        </div>
        <div className="flex items-center gap-2 text-sm text-white/60 dark:text-white/50">
          <Clock className="w-4 h-4" />
          {article.readTime}
        </div>
      </div>

      <h3 className="text-xl font-black mb-3 text-white dark:text-white leading-tight">{article.title}</h3>

      <p className="text-white/70 dark:text-white/60 mb-4 line-clamp-3 font-medium">{article.excerpt}</p>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {article.tags.map((tag: string, tagIndex: number) => (
            <Badge
              key={tagIndex}
              variant="outline"
              className="text-xs border-white/30 dark:border-white/20 text-white/80 dark:text-white/70 bg-white/5 dark:bg-white/5"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <Link target="blank" href={article.link}>
          <CleanButton variant="ghost" className="text-sm px-4 py-2">
            Read More
            <ArrowUpRight className="w-3 h-3 ml-1" />
          </CleanButton>
        </Link>
      </div>
    </article>
  )
}

const CallStackCard = ({ project, index, totalCards }: { project: any; index: number; totalCards: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [blur, setBlur] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2
      const distanceFromCenter = Math.abs(rect.top - viewportCenter)
      const maxDistance = window.innerHeight

      const blurAmount = Math.max(0, Math.min(12, (distanceFromCenter / maxDistance) * 12))
      setBlur(blurAmount)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={cardRef} className="sticky top-32 w-full px-4 sm:px-6 z-10">
      <div
        className="bg-black/50 dark:bg-black/60 backdrop-blur-2xl border border-white/20 dark:border-white/15 rounded-3xl p-8 sm:p-10 shadow-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        style={{
          backdropFilter: `blur(${blur}px)`,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-6 sm:mb-8">
              <span className="text-sm font-mono text-white/80 bg-white/10 dark:bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 dark:border-white/20 font-black">
                {project.year}
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string, tagIndex: number) => (
                  <Badge
                    key={tagIndex}
                    variant="secondary"
                    className="text-xs bg-white/15 dark:bg-white/10 text-white dark:text-white/90 backdrop-blur-sm border-white/40 dark:border-white/20 font-black"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <h3 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 text-white dark:text-white leading-tight tracking-tight">
              {project.title}
            </h3>

            <p className="text-white/80 dark:text-white/75 mb-8 sm:mb-10 text-lg sm:text-xl leading-relaxed font-bold">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link target="_blank" href={project.demo}>
                <MagneticButton className="flex items-center gap-2">
                  View Project
                  <ArrowUpRight className="w-4 h-4" />
                </MagneticButton>
              </Link>
              <Link target="_blank" href={project.github}>
                <MagneticButton variant="outline" className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  Code
                </MagneticButton>
              </Link>
            </div>
          </div>

          <div className="relative w-full">
            <div className="aspect-[4/3] bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-white/30 dark:border-white/20 flex items-center justify-center hover:scale-105 transition-transform duration-300">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="absolute -top-3 -right-3 bg-white dark:bg-white text-black dark:text-black text-xs font-mono px-3 py-2 rounded-full font-black shadow-lg">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: true,
        }),
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const projects = [
    {
      title: "Expense tracker",
      year: "2025",
      description:
        "A scalable and modern expense tracker application with complete authentication, data caching, email job processing, and analytics using cutting-edge technologies like Redis, RabbitMQ, MongoDB, and React.",
      image: "/expense.png",
      tags: ["React.js", "Redis", "Node.js", "Chart.js"],
      demo: "https://expanse-tracker-redis.netlify.app/",
      github: "https://github.com/priyanshtiwari001/full-stack-expanse-tracker",
    },
    {
      title: "AuthEase - NPM Package",
      year: "2025",
      description:
        "AuthEase is a full-featured, plug-and-play authentication solution for Node.js and React applications. Built from scratch with over 80+ NPM dependencies, it handles the complete auth lifecycle using JWT and secure route protection middleware",
      image: "/npm.png",
      tags: ["React", "Node.js", "JWT", "MongoDB"],
      demo: "https://www.npmjs.com/package/authease",
      github: "https://www.npmjs.com/package/authease",
    },
    {
      title: "Podcast Transcript",
      year: "2025",
      description:
        "A podcast management platform that allows users to organize their shows as projects, add and manage individual episodes, and write or edit episode transcripts. It provides a intuitive interface for handling podcast content.",
      image: "/podcast.png",
      tags: ["Next.js", "MongoDB", "Node.js", "Express"],
      demo: "https://skai-lama-ques.netlify.app",
      github: "https://github.com/priyanshtiwari001/lama-podcast",
    },
    {
      title: "Fast Fact Pizza",
      year: "2024",
      description:
        "Built with React and React Router v6 for seamless SPA navigation, using Redux Toolkit for efficient state management and Tailwind CSS for responsive styling. Node.js handles backend API integration and data flow.",
      image: "/pizza.png",
      tags: ["React.js", "Tailwind CSS", "React-Router", "API Integration"],
      demo: "https://fast-react-pizza-v3.netlify.app/",
      github: "https://github.com/priyanshtiwari001/fact-react-pizza",
    },
  ]

  const articles = [
    {
      title: "The Ultimate React + TypeScript Cheatsheet: A Practical Guide for Every Developer",
      excerpt:
        "Whether you're just starting with TypeScript in React or need a quick refresher, this cheatsheet is your go-to guide to master the essentials.",
      date: "Jun 26, 2024",
      readTime: "3 min read",
      tags: ["Typescript", "React", "Tutorial"],
      link: "https://medium.com/@priyanshu108tiwari/the-ultimate-react-typescript-cheatsheet-a-practical-guide-for-every-developer-a2e3935c8f20",
    },
    {
      title: "React Interview Questions You Must Know as a Web Developer (2025 Edition) Part-1",
      excerpt:
        "Walk you through the top React interview questions and answers, starting from the basics and progressing to advanced topics. By the end, you'll have a solid understanding of what interviewers are looking for.",
      date: "Nov 28, 2024",
      readTime: "6 min read",
      tags: ["React", "Interviews", "Questions"],
      link: "https://medium.com/@priyanshu108tiwari/react-interview-questions-you-must-know-as-a-web-developer-2025-edition-part-1-73edcc1d227d",
    },
  ]

  const experience = [
    {
      company: "HCL Technologies",
      role: "Frontend Software Engineer",
      period: "2022 - Present",
      description:
        "Worked on large-scale enterprise applications using React.js, Next.js, and TypeScript. Built microfrontend modules, optimized UI performance, integrated REST APIs, and contributed to production-ready dashboards.",
    },
    {
      company: "Independent Learning & Practice",
      role: "Self-Directed Learner",
      period: "Always",
      description:
        "Built real-world projects to deepen skills in full-stack development using React, Node.js, MongoDB, Redux Toolkit, and Tailwind CSS. Focused on writing clean, maintainable code and improving user experience.",
    },
  ]

  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-white dark:text-white grid-background">
      <CustomCursor />
      <FloatingElements />

      <header className="  fixed top-0 left-0 right-0 z-40 bg-black/80 dark:bg-black/90 backdrop-blur-xl border-b border-white/10 rounded-2xl dark:border-white/10 mx-3">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-black text-xl text-white dark:text-white tracking-tight">Priyanshu Tiwari</div>

          <nav className="hidden md:flex space-x-8">
            {["Work", "Articles", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-white/60 dark:text-white/50 hover:text-white dark:hover:text-white transition-colors font-bold"
                data-magnetic
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="text-sm text-white/50 dark:text-white/40 font-black">IST {currentTime}</div>
          </div>
        </div>
      </header>

      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex liquid-bg items-center gap-2 bg-white/10 dark:bg-white/5 text-white dark:text-white px-4 py-2 rounded-full text-sm font-black mb-8 border border-white/20 dark:border-white/10 backdrop-blur-md">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Open to opportunities
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-6 text-white dark:text-white tracking-tight">
              The interactive{" "}
              <span className="relative">
                full-stack
                <div className="absolute bottom-2 left-0 h-2 bg-white/40 -z-10" style={{ width: "100%" }} />
              </span>{" "}
              developer
            </h1>

            <p className="text-xl md:text-2xl text-white/70 dark:text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed font-bold">
              Bridge between a failing system and a working solution: Where creativity meets functionality, and
              innovation drives progress.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CleanButton variant="liquid" className="px-8 py-4 text-base font-black" href="/#work">
                My Projects
              </CleanButton>
              <CleanButton variant="liquid" className="px-8 py-4 text-base font-black" href="#contact">
                Let's Connect
              </CleanButton>
            </div>
          </div>

          {/* Tech Stack Grid */}
          <div className="flex flex-wrap justify-center gap-6 mt-16">
            {[
              { icon: <Code className="w-5 h-5" />, name: "Frontend" },
              { icon: <Database className="w-5 h-5" />, name: "Backend" },
              { icon: <Palette className="w-5 h-5" />, name: "Design" },
              { icon: <Globe className="w-5 h-5" />, name: "Full-Stack" },
            ].map((item) => (
              <div
                key={item.name}
                className="flex liquid-bg  items-center gap-3 bg-black/40 dark:bg-black/50 border border-white/20 dark:border-white/15 px-6 py-4 rounded-xl shadow-lg backdrop-blur-xl hover:scale-105 transition-transform duration-300"
              >
                <div className="text-white dark:text-white">{item.icon}</div>
                <span className="text-sm font-black text-white dark:text-white">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="relative z-10 py-32 px-6 min-h-screen flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-16 text-center">
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-white dark:text-white tracking-tight">
              Selected Work
            </h2>
            <p className="text-white/60 dark:text-white/50 max-w-2xl mx-auto mb-8 text-lg font-bold">
              A collection of projects that showcase my approach to solving complex design and development challenges.
            </p>

            <div className="flex items-center justify-center gap-4 text-sm font-mono text-white/40 dark:text-white/30">
              <div className="flex flex-col items-center">
                <div className="w-8 h-1 bg-white mb-1"></div>
                <div className="w-8 h-1 bg-white/70 mb-1"></div>
                <div className="w-8 h-1 bg-white/50 mb-1"></div>
                <div className="w-8 h-1 bg-white/30"></div>
              </div>
              <span className="text-white/50">Call Stack (LIFO)</span>
            </div>
          </div>

          <div className="relative">
            <div className="space-y-8">
              {projects.map((project, index) => (
                <CallStackCard key={index} project={project} index={index} totalCards={projects.length} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="articles" className="relative z-10 py-32 px-6 min-h-screen flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-white dark:text-white tracking-tight">
              Latest Articles
            </h2>
            <p className="text-lg text-white/60 dark:text-white/50 max-w-2xl mx-auto font-bold">
              Sharing my learning journey and insights about web development, programming, and technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <ArticleCard key={index} article={article} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link target="blank" href="https://medium.com/@priyanshu108tiwari">
              <CleanButton variant="liquid">
                View All Articles
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </CleanButton>
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="relative z-10 py-32 px-6 min-h-screen flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="liquid-bg  bg-black/40 dark:bg-black/50 backdrop-blur-xl border border-white/20 dark:border-white/15 rounded-3xl p-8">
              <h2 className="text-5xl md:text-6xl font-black mb-8 text-white dark:text-white tracking-tight">
                About Me
              </h2>

              <div className="space-y-6 text-white/70 dark:text-white/60 leading-relaxed font-bold">
                <p>
                  Hi, I'm Priyanshu — a full-stack developer with a strong focus on frontend development. I have 3+
                  years of experience building modern, scalable web applications using React.js, Next.js, TypeScript,
                  and Node.js. I enjoy crafting clean, responsive UIs with a strong emphasis on user experience,
                  performance optimization, and maintainable code.
                </p>
                <p>
                  On the backend, I've built APIs using Express.js, implemented JWT-based authentication, and handled
                  asynchronous jobs using Redis and RabbitMQ. I also work with MongoDB for data modeling and
                  persistence.
                </p>
                <p>
                  I'm passionate about building products that are both functional and enjoyable to use — and I'm always
                  looking to improve how I write code, structure systems, and collaborate with teams.
                </p>
              </div>
            </div>

            <div className="bg-black/40 liquid-bg  dark:bg-black/50 backdrop-blur-xl border border-white/20 dark:border-white/15 rounded-3xl p-8">
              <h3 className="text-3xl font-black mb-8 text-white dark:text-white">My Journey</h3>

              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-white/40 pl-6 relative">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-white rounded-full"></div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-black text-white dark:text-white text-lg">{exp.role}</h4>
                      <span className="text-sm text-white/50 dark:text-white/40 bg-white/10 dark:bg-white/5 px-3 py-1 rounded-full border border-white/20 dark:border-white/10 font-mono font-black">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-white dark:text-white/90 mb-2 font-black">{exp.company}</p>
                    <p className="text-sm text-white/60 dark:text-white/50 font-bold">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 py-32 px-6 min-h-screen flex flex-col justify-center">
        <div className="liquid-bg  max-w-4xl mx-auto w-full text-center bg-black/40 dark:bg-black/50 backdrop-blur-xl border border-white/20 dark:border-white/15 rounded-3xl p-12">
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-white dark:text-white tracking-tight">
            Let's Connect
          </h2>

          <p className="text-lg md:text-xl text-white/60 dark:text-white/50 max-w-2xl mx-auto mb-12 font-bold">
            I'm always excited to discuss new opportunities, collaborate on interesting projects, or just chat about
            technology and development.
          </p>

          <div className="flex justify-center gap-6 mb-12">
            <CleanButton
              variant="liquid"
              className="px-8 py-4 text-base font-black"
              href="mailto:priyanshu108tiwari@gmail.com"
            >
              Get In Touch
            </CleanButton>
          </div>

          <div className="flex justify-center gap-8">
            {[
              { icon: <Github className="w-5 h-5" />, label: "GitHub", href: "https://github.com/priyanshtiwari001" },
              {
                icon: <Linkedin className="w-5 h-5" />,
                label: "LinkedIn",
                href: "https://linkedin.com/in/priyanshtiwari001",
              },
              { icon: <Mail className="w-5 h-5" />, label: "Email", href: "mailto:priyanshu108tiwari@gmail.com" },
            ].map((social, index) => (
              <CleanButton
                target="blank"
                key={index}
                variant="ghost"
                className="p-4"
                href={social.href}
                aria-label={social.label}
              >
                {social.icon}
              </CleanButton>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative liquid-bg  z-10 py-8 px-6 border-t border-white/10 dark:border-white/10 bg-black/40 dark:bg-black/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50 dark:text-white/40 font-bold">
            © 2025 Priyanshu Tiwari. All rights reserved.
          </p>
          <p className="text-sm text-white/50 dark:text-white/40 font-bold">Built with Next.js & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  )
}
