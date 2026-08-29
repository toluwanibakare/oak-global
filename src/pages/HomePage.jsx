import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const slides = [
  {
    product: 'OakForge',
    tagline: 'Management System Establishment & Operations',
    headline: 'Where the Management',
    highlight: 'System Comes Alive.',
    description: 'Build, configure, operate and improve management systems through the complete BUILD → RUN → IMPROVE lifecycle.',
    image: 'https://images.pexels.com/photos/3182766/pexels-photo-3182766.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    icon: 'fa-hammer',
    details: ['F1–F6 governed lifecycle', 'Multi-entity architecture', 'Evidence governance', 'Trace — the complete story'],
  },
  {
    product: 'OakAudix',
    tagline: 'Audit Management',
    headline: 'Enterprise Audit',
    highlight: 'Intelligence.',
    description: 'Plan, execute, evidence and manage audits and audit-related improvement activities.',
    image: 'https://images.pexels.com/photos/3861077/pexels-photo-3861077.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    icon: 'fa-clipboard-check',
    details: ['Knowledge-driven audits', 'Automated finding tracking', 'Curated questionnaires', 'Audit package seals'],
  },
  {
    product: 'OakComply',
    tagline: 'Compliance Management',
    headline: 'Connect Compliance.',
    highlight: 'Close Every Gap.',
    description: 'Connect compliance obligations with organisational responsibilities, controls, evidence and follow-up.',
    image: 'https://images.pexels.com/photos/7433857/pexels-photo-7433857.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    icon: 'fa-shield-halved',
    details: ['Obligation register', 'Gap identification', 'Compliance calendars', 'Conformance evidence'],
  },
  {
    product: 'OakHSE360',
    tagline: 'Health, Safety & Environment',
    headline: 'Zero Harm.',
    highlight: 'Maximum Performance.',
    description: 'Support structured HSE management, operational controls, inspections, observations and improvement.',
    image: 'https://images.pexels.com/photos/37510660/pexels-photo-37510660.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    icon: 'fa-leaf',
    details: ['Incident reporting', 'Hazard logging', 'Environmental KPI', 'Contractor verification'],
  },
  {
    product: 'OakRisk360',
    tagline: 'Risk Management',
    headline: 'Scenario Intelligence.',
    highlight: 'Resilience Scoring.',
    description: 'Provide a governed environment for identifying, assessing, managing and monitoring organisational risks.',
    image: 'https://images.pexels.com/photos/8636589/pexels-photo-8636589.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    icon: 'fa-triangle-exclamation',
    details: ['Seven risk domains', 'Scenario intelligence engine', 'Resilience scoring', 'Risk simulator'],
  },
  {
    product: 'OakStrategy',
    tagline: 'Strategy & Performance',
    headline: 'Strategy to Execution.',
    highlight: 'Measurable Performance.',
    description: 'Connect strategic direction with objectives, measures and organisational execution.',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    icon: 'fa-chess-king',
    details: ['Strategic objective planning', 'OKR framework', 'Performance dashboards', 'Strategy-to-execution traceability'],
  },
  {
    product: 'Lumina BI',
    tagline: 'Business Intelligence',
    headline: 'Governed',
    highlight: 'Enterprise Insight.',
    description: 'Provide management insight from governed enterprise information.',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    icon: 'fa-chart-line',
    details: ['Cross-module analytics', 'Executive dashboards', 'Board packs', 'Evidence-based decisions'],
  },
]

const stats = [
  { value: 500, label: 'Projects Completed' },
  { value: 150, label: 'Happy Clients' },
  { value: 25, label: 'ISO Standards' },
  { value: 10, label: 'Years Experience' },
]

const services = [
  {
    title: 'Management Systems Services',
    desc: 'Comprehensive business performance optimization, strategic planning, operational improvement, and ISO excellence services.',
    link: '/services?category=management',
    icon: 'fa-chart-line',
  },
  {
    title: 'GRC Advisory Services',
    desc: 'Expert Governance, Risk & Compliance solutions including risk management frameworks, compliance systems, and board advisory.',
    link: '/services?category=grc',
    icon: 'fa-shield-alt',
  },
]

const industries = [
  { name: 'Oil & Gas', icon: 'fa-droplet', desc: 'Risk management, compliance, HSE for energy sector operations.' },
  { name: 'Energy', icon: 'fa-bolt', desc: 'Operational excellence, regulatory compliance, and asset integrity.' },
  { name: 'Manufacturing', icon: 'fa-industry', desc: 'Operational excellence, ISO standards, and quality management.' },
  { name: 'Engineering', icon: 'fa-cogs', desc: 'Project governance, risk management, and compliance frameworks.' },
  { name: 'Logistics', icon: 'fa-truck', desc: 'Supply chain risk, compliance, and operational safety.' },
  { name: 'Construction', icon: 'fa-hard-hat', desc: 'Site safety, regulatory compliance, and quality assurance.' },
  { name: 'Professional Services', icon: 'fa-briefcase', desc: 'Governance, risk, and compliance for knowledge-based organisations.' },
  { name: 'Government & Public Sector', icon: 'fa-landmark', desc: 'Public sector governance, transparency frameworks, and audit readiness.' },
]

const buildRunImprove = [
  {
    phase: 'BUILD',
    title: 'Establish the Management System',
    desc: 'A governed establishment architecture provides a structured path from foundation through certification readiness.',
    points: ['F1 — Foundation & Scope', 'F2 — Gap Assessment', 'F3 — Control Design', 'F4 — Documented Information', 'F5 — Readiness & Certification', 'F6 — Handover & Closure'],
    icon: 'fa-hammer',
  },
  {
    phase: 'RUN',
    title: 'See How the System Operates',
    desc: 'Move beyond "Do we have the required procedure?" to "How is this requirement actually operating in our organisation?"',
    points: ['Requirement → Applicability', 'Process → Control → Activity', 'Occurrence → Evidence → Review', 'Acceptance → Effectiveness', 'Trace', 'Multi-entity governed contexts'],
    icon: 'fa-play',
  },
  {
    phase: 'IMPROVE',
    title: 'Turn Operational Learning into Better Systems',
    desc: 'A genuine operational weakness may lead to an improvement decision — creating a controlled cycle of continual organisational improvement.',
    points: ['Change an activity', 'Strengthen a control', 'Improve a process', 'Revise documented information', 'Return to BUILD', 'Continual improvement'],
    icon: 'fa-arrow-trend-up',
  },
]

const engagements = [
  {
    icon: 'fa-seedling',
    name: 'Controlled Pilot',
    desc: 'Experience OakEIP using a defined organisational scope and real management-system activities before expanding to a broader enterprise deployment.',
    cta: 'Request a Pilot',
    link: '/request-demo',
    points: ['One organisation', 'Selected management-system scope', '2–4 representative processes', 'Real activities, evidence & effectiveness', 'Management insight from day one'],
  },
  {
    icon: 'fa-tags',
    name: 'Flexible Enterprise Pricing',
    desc: 'OakEIP pricing is structured according to organisational complexity, number of legal entities, operating contexts, selected products, implementation scope and support requirements.',
    cta: 'Talk to an OakEIP Specialist',
    link: '/contact',
    points: ['Organisational complexity', 'Number of legal entities', 'Operating contexts & selected products', 'Implementation scope & support requirements', 'Tailored proposal after pilot'],
  },
]

const differentiators = [
  { icon: 'fa-puzzle-piece', title: 'Connected Rather Than Fragmented', desc: 'Bring related organisational information into a common governed architecture — not disconnected systems and spreadsheets.' },
  { icon: 'fa-cogs', title: 'Operational Rather Than Document-Centric', desc: 'Move from "we have a procedure" to "we can demonstrate how the process operates." A document exists ≠ a process operates.' },
  { icon: 'fa-shield-alt', title: 'Governance by Design', desc: 'Tenant isolation, controlled authority, evidence governance, auditability and segregation-of-duties principles are embedded in the platform architecture.' },
  { icon: 'fa-sitemap', title: 'Multi-Entity Ready', desc: 'One canonical model can serve multiple governed organisational contexts — subsidiaries, business units, sites and legal entities.' },
  { icon: 'fa-user-tie', title: 'Human Judgement Preserved', desc: 'The platform supports management decisions without pretending that every governance decision can or should be automated.' },
  { icon: 'fa-cube', title: 'Modular and Extensible', desc: 'OakEIP can grow as an organisation\'s digital management requirements mature — start small, scale progressively.' },
]

const features = [
  {
    title: 'Certified Professionals',
    subtitle: 'World-Class Expertise',
    desc: 'Our team brings decades of combined experience across ISO standards, regulatory compliance, and enterprise risk management. Every engagement is led by certified professionals who understand your industry.',
    image: 'https://images.pexels.com/photos/9301763/pexels-photo-9301763.jpeg?auto=compress&cs=tinysrgb&w=1000&h=800&fit=crop',
    stat: '50+',
    statLabel: 'Certified Experts',
  },
  {
    title: 'Technology + Expertise',
    subtitle: 'Not Just Software',
    desc: 'Oak Global combines digital platform capability with practical expertise in QMS, EMS, OHS, IMS, risk management, compliance, auditing, management-system implementation and organisational transformation.',
    image: 'https://images.pexels.com/photos/7964355/pexels-photo-7964355.jpeg?auto=compress&cs=tinysrgb&w=1000&h=800&fit=crop',
    stat: '15+',
    statLabel: 'Countries Served',
  },
  {
    title: 'Results-Driven',
    subtitle: 'Measurable Impact',
    desc: 'Every engagement is designed around measurable outcomes. From certification achievements to risk reduction metrics, we deliver tangible results that strengthen your enterprise.',
    image: 'https://images.pexels.com/photos/5685821/pexels-photo-5685821.jpeg?auto=compress&cs=tinysrgb&w=1000&h=800&fit=crop',
    stat: '99%',
    statLabel: 'Client Satisfaction',
  },
]

const testimonials = [
  {
    quote: 'Oak Global transformed our compliance framework from a reactive checklist to a strategic advantage. Their team understood our challenges and delivered beyond expectations.',
    name: 'Dr. Adebayo Ogunlesi',
    role: 'Group Chief Compliance Officer',
    company: 'First Atlantic Bank',
  },
  {
    quote: 'The ISO certification process seemed daunting until Oak Global stepped in. Their structured approach and deep expertise made the journey seamless and educational.',
    name: 'Chinwe Eze',
    role: 'Head of Quality Assurance',
    company: 'Transcorp Manufacturing',
  },
  {
    quote: 'We engaged Oak Global for a comprehensive risk assessment across our upstream operations. The depth of analysis and practical recommendations exceeded industry standards.',
    name: 'Yusuf Mohammed',
    role: 'HSE Director',
    company: 'Crestar Energy',
  },
  {
    quote: 'OakRisk360 has given our executive team unprecedented visibility into enterprise threats and opportunities. The simulator transformed how we make strategic decisions.',
    name: 'Lola Adeleke',
    role: 'Chief Executive Officer',
    company: 'Adeleke Group',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, ease: [0.45, 0.05, 0.55, 0.95] },
  },
}

const itemFadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 14 },
  },
}

function AnimatedCounter({ value }) {
  const [count, setCount] = useState(0)
  const counted = useRef(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || counted.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true
          let start = 0
          const duration = 2000
          const step = value / (duration / 16)
          const timer = setInterval(() => {
            start += step
            if (start >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return <span ref={ref} className="block text-4xl md:text-5xl font-extrabold text-emerald-400 mb-2 tabular-nums">{count}+</span>
}

function ParallaxImage({ src, alt, speed = 0.15 }) {
  const ref = useRef(null)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const centerY = rect.top + rect.height / 2
      const viewCenter = window.innerHeight / 2
      const diff = (centerY - viewCenter) * speed
      setOffsetY(diff)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return (
    <div ref={ref} className="relative overflow-hidden w-full h-full">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ transform: `translateY(${offsetY}px)` }}
      />
    </div>
  )
}

function SectionHeading({ label, title, highlight, description, light }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
    >
      <span className={`inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-semibold tracking-widest uppercase border ${light ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
        {label}
      </span>
      <h2 className={`mt-6 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight ${light ? 'text-neutral-900' : 'text-white'}`}>
        {title} <span className="text-emerald-400">{highlight}</span>
      </h2>
      {description && (
        <p className={`mt-4 text-base max-w-xl leading-relaxed ${light ? 'text-neutral-500' : 'text-white/40'}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const slideTimer = useRef(null)
  const testimonialTimer = useRef(null)

  const goToSlide = useCallback((i) => {
    setCurrentSlide(i)
    if (slideTimer.current) clearInterval(slideTimer.current)
    slideTimer.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
  }, [])

  useEffect(() => {
    slideTimer.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(slideTimer.current)
  }, [])

  useEffect(() => {
    testimonialTimer.current = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(testimonialTimer.current)
  }, [])

  return (
    <PageTransition>
      {/* ─────── Hero ─────── */}
      <section className="relative h-screen overflow-hidden">
        <div
          onMouseEnter={() => { if (slideTimer.current) clearInterval(slideTimer.current) }}
          onMouseLeave={() => {
            if (slideTimer.current) clearInterval(slideTimer.current)
            slideTimer.current = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 5000)
            setShowLeftArrow(false)
            setShowRightArrow(false)
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left
            setShowLeftArrow(x < 100)
            setShowRightArrow(x > rect.width - 100)
          }}
          className="absolute inset-0"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.45, 0.05, 0.55, 0.95] }}
              className="absolute inset-0"
            >
              <img
                src={slides[currentSlide].image}
                alt=""
                className="w-full h-full object-cover object-[center_80%]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/85 to-neutral-950/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full h-full flex items-center pt-24 lg:pt-[100px] pb-20">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 md:gap-16 items-center w-full">
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.7, ease: [0.45, 0.05, 0.55, 0.95] }}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase border border-emerald-500/20"
                  >
                    <i className={`fas ${slides[currentSlide].icon} text-[10px]`} />
                    {slides[currentSlide].product} — {slides[currentSlide].tagline}
                  </motion.span>

                  <h1 className="mt-6 text-white font-extrabold leading-[1.1]">
                    <motion.span
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6, ease: [0.45, 0.05, 0.55, 0.95] }}
                      className="block text-4xl sm:text-5xl lg:text-5xl xl:text-6xl tracking-tight break-words"
                    >
                      {slides[currentSlide].headline}
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6, ease: [0.45, 0.05, 0.55, 0.95] }}
                      className="block text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-emerald-400 mt-1 tracking-tight break-words"
                    >
                      {slides[currentSlide].highlight}
                    </motion.span>
                  </h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mt-4 text-base sm:text-lg text-neutral-400 max-w-lg leading-relaxed"
                  >
                    {slides[currentSlide].description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-8 flex flex-wrap gap-4"
                  >
                    <Link
                      to={`/products#${slides[currentSlide].product}`}
                      className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-500 transition-all duration-300"
                    >
                      <span>Explore {slides[currentSlide].product}</span>
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-white/20 text-white text-sm font-bold hover:bg-white/5 transition-all duration-300"
                    >
                      View All Products
                    </Link>
                    <Link
                      to="/oakeip"
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-sky-700 text-white text-sm font-bold hover:bg-sky-600 transition-all duration-300"
                    >
                      Visit OakEIP
                    </Link>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.45, 0.05, 0.55, 0.95] }}
                className="hidden lg:block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] p-6"
                >
                  <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
                    <div className="w-10 h-10 bg-emerald-500/10 flex items-center justify-center">
                      <i className={`fas ${slides[currentSlide].icon} text-emerald-400 text-base`} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{slides[currentSlide].product}</div>
                      <div className="text-neutral-500 text-xs mt-0.5">{slides[currentSlide].tagline}</div>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {slides[currentSlide].details.map((d, i) => (
                      <motion.li
                        key={d}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                        className="flex items-center gap-3 text-sm text-neutral-400"
                      >
                        <span className="w-1 h-1 bg-emerald-400 shrink-0" />
                        {d}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
          className={`absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/40 hover:text-emerald-400 hover:border-emerald-400/50 transition-all duration-300 ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          ←
        </button>
        <button
          onClick={() => goToSlide((currentSlide + 1) % slides.length)}
          className={`absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/40 hover:text-emerald-400 hover:border-emerald-400/50 transition-all duration-300 ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          →
        </button>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {slides.map((s, i) => (
            <button
              key={s.product}
              onClick={() => goToSlide(i)}
              className={`h-1 transition-all duration-700 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] ${i === currentSlide ? 'w-10 bg-emerald-400' : 'w-6 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>

      </section>

      {/* ─────── Stats Strip ─────── */}
      <section className="py-20 bg-neutral-950 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={itemFadeUp}
                className="bg-neutral-950 py-10 px-6 text-center"
              >
                <AnimatedCounter value={stat.value} />
                <span className="text-white/50 text-xs font-semibold uppercase tracking-[0.15em]">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────── Industries We Serve ─────── */}
      <section className="py-16 lg:py-24 bg-neutral-50 border-b border-neutral-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionHeading
            label="Industries"
            title="Serving"
            highlight="Every Sector."
            description="Deep industry expertise across critical sectors. We understand your regulatory landscape, operational challenges, and strategic priorities."
            light
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {industries.map((ind, i) => (
              <motion.div
                key={ind.name}
                variants={itemFadeUp}
                className="group relative bg-white p-8 lg:p-10 overflow-hidden border border-neutral-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-emerald-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <i className={`fas ${ind.icon} text-emerald-600 text-lg`} />
                  </div>
                  <h3 className="text-neutral-900 font-bold text-lg mb-2">{ind.name}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{ind.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400/0 via-emerald-400/60 to-emerald-400/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────── Platform Overview ─────── */}
      <section className="py-16 lg:py-24 bg-neutral-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            label="The Platform"
            title="One Platform."
            highlight="Multiple Domains."
            description="OakEIP provides a common platform architecture through which specialised capabilities work together — sharing common enterprise services and governed information without creating disconnected systems."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5"
          >
            {slides.map((s, i) => (
              <motion.div
                key={s.product}
                variants={itemFadeUp}
                className="bg-neutral-950 p-8 lg:p-10 h-full group relative cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <i className={`fas ${s.icon} text-emerald-400 text-sm`} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{s.product}</div>
                      <div className="text-white/30 text-[11px] mt-0.5">{s.tagline}</div>
                    </div>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-5">{s.description}</p>
                  <ul className="space-y-2">
                    {s.details.map((d) => (
                      <li key={d} className="flex items-center gap-2.5 text-sm text-white/40">
                        <span className="w-1 h-1 bg-emerald-400/60 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────── BUILD → RUN → IMPROVE ─────── */}
      <section className="py-16 lg:py-24 bg-white border-b border-neutral-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            label="From Documentation to Operation"
            title="BUILD → RUN →"
            highlight="IMPROVE."
            description="A document exists ≠ a process operates ≠ a control operates ≠ a control is effective. OakEIP is designed around that distinction."
            light
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-16 grid md:grid-cols-3 gap-6"
          >
            {buildRunImprove.map((phase, i) => (
              <motion.div
                key={phase.phase}
                variants={itemFadeUp}
                className="relative bg-white border border-neutral-200 p-8 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 group h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-sky-700 flex items-center justify-center text-white text-lg group-hover:scale-110 transition-transform duration-300">
                    <i className={`fas ${phase.icon}`} />
                  </div>
                  <span className="text-5xl font-extrabold text-neutral-100 select-none">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs">{phase.phase}</span>
                <h3 className="mt-2 text-lg font-bold text-neutral-900 leading-snug">{phase.title}</h3>
                <p className="mt-3 text-neutral-500 text-sm leading-relaxed flex-1">{phase.desc}</p>
                <ul className="mt-5 pt-5 border-t border-neutral-100 space-y-2">
                  {phase.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-xs text-neutral-500">
                      <span className="w-1 h-1 bg-emerald-500 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-10 text-center text-neutral-400 text-sm max-w-2xl mx-auto leading-relaxed"
          >
            The objective is continual organisational improvement — not simply closing records. OakEIP helps organisations establish structured management systems, demonstrate how they operate in practice, and generate trusted information for decision-making.
          </motion.p>
        </div>
      </section>

      {/* ─────── Why Oak Global ─────── */}
      <section className="bg-neutral-50 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <SectionHeading
            label="Why Oak Global"
            title="Technology +"
            highlight="Expertise."
            description="Oak Global combines digital platform capability with practical management-system expertise. Customers do not have to choose between consulting expertise and digital technology."
            light
          />
        </div>

        {features.map((feat, i) => {
          const isReversed = i % 2 === 1
          return (
            <motion.section
              key={feat.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.8 }}
              className="border-t border-neutral-100"
            >
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-0 min-h-[500px]">
                  <div className={`relative overflow-hidden ${isReversed ? 'md:order-2' : ''}`}>
                    <ParallaxImage src={feat.image} alt={feat.title} speed={0.1} />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-50/60 via-transparent to-transparent md:hidden" />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ type: 'spring', stiffness: 100, damping: 16, delay: 0.1 }}
                    className={`flex items-center p-8 lg:p-16 ${isReversed ? 'md:order-1' : ''}`}
                  >
                    <div>
                      <span className="text-emerald-600/60 text-xs font-semibold tracking-[0.2em] uppercase">{feat.subtitle}</span>
                      <h3 className="mt-3 text-3xl lg:text-4xl font-extrabold text-neutral-900 leading-tight tracking-tight">{feat.title}</h3>
                      <p className="mt-4 text-neutral-500 text-base leading-relaxed max-w-lg">{feat.desc}</p>
                      <div className="mt-8 flex items-center gap-4">
                        <span className="text-4xl font-extrabold text-emerald-600 tabular-nums">{feat.stat}</span>
                        <span className="text-neutral-400 text-xs font-semibold uppercase tracking-[0.1em] leading-tight">{feat.statLabel}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          )
        })}
      </section>

      {/* ─────── Why OakEIP Differentiators ─────── */}
      <section className="py-16 lg:py-24 bg-neutral-950 relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-xl mx-auto mb-12">
            <SectionHeading label="Why OakEIP" title="Built" highlight="Different" description="What sets the Enterprise Intelligence Platform apart in the enterprise technology landscape." />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {differentiators.map((d) => (
              <motion.div key={d.title} variants={itemFadeUp}>
                <div className="text-center p-8 bg-neutral-900 border border-white/5 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 h-full group">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-sky-700 rotate-45 group-hover:rotate-[135deg] transition-transform duration-500" />
                    <div className="relative z-10 w-full h-full flex items-center justify-center text-white text-2xl">
                      <i className={`fas ${d.icon}`} />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">{d.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────── Testimonials ─────── */}
      <section className="py-16 lg:py-24 bg-neutral-950 border-b border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/[0.015] rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionHeading
            label="Testimonials"
            title="What Our"
            highlight="Clients Say."
            description="Real feedback from organisations we have partnered with across industries."
          />

          <div className="relative mt-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.45, 0.05, 0.55, 0.95] }}
                className="max-w-3xl mx-auto text-center"
              >
                <i className="fas fa-quote-left text-emerald-400/20 text-5xl mb-6 block" />
                <p className="text-white/70 text-lg lg:text-xl leading-relaxed italic">
                  &ldquo;{testimonials[testimonialIndex].quote}&rdquo;
                </p>
                <div className="mt-8">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-emerald-400 font-bold text-sm">
                      {testimonials[testimonialIndex].name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <p className="text-white font-semibold text-sm">{testimonials[testimonialIndex].name}</p>
                  <p className="text-white/30 text-xs mt-1">
                    {testimonials[testimonialIndex].role}, {testimonials[testimonialIndex].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-2 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] ${
                    i === testimonialIndex ? 'w-8 bg-emerald-400' : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────── Commercial Engagement ─────── */}
      <section className="py-16 lg:py-24 bg-neutral-50 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            label="Commercial Engagement"
            title="Start Small."
            highlight="Scale With Us."
            description="OakEIP does not require an organisation to digitise everything at once. Begin with a defined scope and expand progressively."
            light
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-16 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {engagements.map((eng) => (
              <motion.div key={eng.name} variants={itemFadeUp}>
                <div className="h-full bg-white border border-neutral-200 p-8 lg:p-10 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex flex-col">
                  <div className="w-12 h-12 bg-emerald-100 flex items-center justify-center mb-6">
                    <i className={`fas ${eng.icon} text-emerald-600 text-lg`} />
                  </div>
                  <h3 className="text-xl font-extrabold text-neutral-900">{eng.name}</h3>
                  <p className="mt-3 text-neutral-500 text-sm leading-relaxed flex-1">{eng.desc}</p>
                  <ul className="mt-5 pt-5 border-t border-neutral-100 space-y-2">
                    {eng.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-xs text-neutral-500">
                        <i className="fas fa-check text-emerald-600 mt-0.5 text-[10px]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={eng.link}
                    className="group mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-500 transition-all duration-300"
                  >
                    <span>{eng.cta}</span>
                    <i className="fas fa-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-12 max-w-3xl mx-auto bg-emerald-50 border-l-[3px] border-emerald-600 p-6 lg:p-8"
          >
            <p className="text-emerald-900 text-sm leading-relaxed">
              <strong>Technology backed by management-system expertise.</strong> Oak Global combines digital platform capability with practical expertise across QMS, EMS, OHS, IMS, risk management, compliance, auditing and organisational transformation — so customers never have to choose between consulting expertise and digital technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─────── CTA ─────── */}
      <section className="py-16 lg:py-28 bg-neutral-950 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(5,150,105,0.08)_0%,transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase border border-emerald-500/20">
              Get Started
            </span>
            <h2 className="mt-6 text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight max-w-3xl mx-auto">
              Ready to move from documented systems to{' '}
              <span className="text-emerald-400">operating systems?</span>
            </h2>
            <p className="mt-4 text-white/40 text-base max-w-xl mx-auto leading-relaxed">
              OakEIP helps organisations build, operate and continually improve better management systems through one governed digital environment.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/request-demo" className="group inline-flex items-center gap-2.5 px-8 py-4 bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-500 transition-all duration-300">
                <span>Request a Demo</span>
                <i className="fas fa-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 border border-white/20 text-white text-sm font-bold hover:bg-white/5 transition-all duration-300">
                Talk to Oak Global
              </Link>
              <Link to="/oakeip" className="inline-flex items-center gap-2.5 px-8 py-4 bg-sky-700 text-white text-sm font-bold hover:bg-sky-600 transition-all duration-300">
                Visit OakEIP
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────── Client Logos ─────── */}
      <section className="py-20 bg-neutral-50 overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-neutral-400 text-xs font-semibold uppercase tracking-[0.15em] mb-10"
          >
            Trusted by Leading Organizations
          </motion.p>

          <div className="relative">
            <div className="flex gap-12 animate-[marquee_65s_linear_infinite] hover:[animation-play-state:paused] w-max">
              {[...Array(19), ...Array(19)].map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 w-[130px] h-[70px] flex items-center justify-center bg-white border border-neutral-200 rounded-lg p-3 hover:border-emerald-300 hover:shadow-md transition-all duration-300"
                  style={{
                    animation: `wave 5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite`,
                    animationDelay: `${(i % 19) * 0.263}s`,
                  }}
                >
                  <img
                    src={`/assets/img/cl_${(i % 19) + 1}.png`}
                    alt={`Client ${(i % 19) + 1}`}
                    className="max-w-full max-h-full object-contain transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}