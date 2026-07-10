import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import PageTransition from '../components/PageTransition'

const slides = [
  {
    product: 'OakAudix',
    tagline: 'Audit Management',
    headline: 'Enterprise Audit',
    highlight: 'Intelligence.',
    description: 'Plan, execute, and track audits in one place. Real-time reports, automated findings, and risk-based scheduling.',
    image: 'https://images.pexels.com/photos/3861077/pexels-photo-3861077.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    icon: 'fa-clipboard-check',
    details: ['Automated audit scheduling', 'Real-time reporting', 'Risk-based assessment', 'Finding tracking & closure'],
  },
  {
    product: 'OakComply',
    tagline: 'Compliance Management',
    headline: 'Stay Compliant.',
    highlight: 'Stay Ahead.',
    description: 'Know your obligations. Track every requirement. Close gaps before they become findings.',
    image: 'https://images.pexels.com/photos/7433857/pexels-photo-7433857.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    icon: 'fa-shield-halved',
    details: ['Obligation register', 'Gap analysis', 'Compliance calendar', 'Regulatory updates'],
  },
  {
    product: 'OakHSE360',
    tagline: 'Health, Safety & Environment',
    headline: 'Zero Harm.',
    highlight: 'Maximum Performance.',
    description: 'Report incidents. Assess risks. Track environmental data. All in one place.',
    image: 'https://images.pexels.com/photos/37510660/pexels-photo-37510660.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    icon: 'fa-leaf',
    details: ['Incident reporting', 'Risk assessment', 'Environmental monitoring', 'Safety compliance'],
  },
  {
    product: 'OakExec',
    tagline: 'Executive Intelligence',
    headline: 'Data-Driven.',
    highlight: 'Decisions.',
    description: 'Dashboards that matter. Metrics that move the needle. Visibility from boardroom to frontline.',
    image: 'https://images.pexels.com/photos/8636589/pexels-photo-8636589.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    icon: 'fa-chart-pie',
    details: ['Executive dashboards', 'Predictive analytics', 'Enterprise KPIs', 'Real-time reporting'],
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
    img: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
  },
  {
    title: 'GRC Advisory Services',
    desc: 'Expert Governance, Risk & Compliance solutions including risk management frameworks, compliance systems, and board advisory.',
    link: '/services?category=grc',
    icon: 'fa-shield-alt',
    img: 'https://images.pexels.com/photos/3183158/pexels-photo-3183158.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const [counts, setCounts] = useState(stats.map(() => 0))
  const statsRef = useRef(null)
  const counted = useRef(false)
  const slideTimer = useRef(null)
  const slideRef = useRef(null)

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
    const el = statsRef.current
    if (!el || counted.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true
          stats.forEach((stat, i) => {
            const duration = 2000
            const increment = stat.value / (duration / 16)
            let current = 0
            const timer = setInterval(() => {
              current += increment
              if (current >= stat.value) {
                setCounts((prev) => {
                  const next = [...prev]
                  next[i] = stat.value
                  return next
                })
                clearInterval(timer)
              } else {
                setCounts((prev) => {
                  const next = [...prev]
                  next[i] = Math.floor(current)
                  return next
                })
              }
            }, 16)
          })
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <PageTransition>
      {/* Hero */}
      <section ref={slideRef} className="relative h-screen overflow-hidden"
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
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full h-full pt-24 lg:pt-[140px] pb-36">
          <div className="grid lg:grid-cols-2 gap-16 items-center h-full">
            {/* Left */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase border border-emerald-500/20">
                    <i className={`fas ${slides[currentSlide].icon} text-[10px]`} />
                    {slides[currentSlide].product} — {slides[currentSlide].tagline}
                  </span>

                  <h1 className="mt-6 text-white font-extrabold leading-[1.04]">
                    <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight">{slides[currentSlide].headline}</span>
                    <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-emerald-400 mt-1 tracking-tight">{slides[currentSlide].highlight}</span>
                  </h1>

                  <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-lg leading-relaxed">
                    {slides[currentSlide].description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-500 transition-all duration-300"
                    >
                      <span>Explore {slides[currentSlide].product}</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                    <Link
                      to="/about"
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-white/20 text-white text-sm font-bold hover:bg-white/5 transition-all duration-300"
                    >
                      View All Products
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="hidden lg:block"
              >
                <div className="bg-white/[0.04] border border-white/[0.08] p-6">
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
                    {slides[currentSlide].details.map((d) => (
                      <li key={d} className="flex items-center gap-3 text-sm text-neutral-400">
                        <span className="w-1 h-1 bg-emerald-400" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Side arrows */}
        <button
          onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
          className={`absolute left-1 lg:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/40 hover:text-emerald-400 hover:border-emerald-400/50 transition-all duration-300 ${
            showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          ←
        </button>

        <button
          onClick={() => goToSlide((currentSlide + 1) % slides.length)}
          className={`absolute right-1 lg:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/40 hover:text-emerald-400 hover:border-emerald-400/50 transition-all duration-300 ${
            showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          →
        </button>

        {/* Progress */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {slides.map((s, i) => (
            <button
              key={s.product}
              onClick={() => goToSlide(i)}
              className={`h-1 transition-all duration-500 ${
                i === currentSlide ? 'w-10 bg-emerald-400' : 'w-6 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <span className="inline-block px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wide mb-4 border border-emerald-200">
                  About OAK Global
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-4">
                  Excellence in Global Business Solutions
                </h2>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  At Oak Global International Business Solutions, we specialize in helping organizations achieve and maintain global status. We are your trusted partner for operational excellence and compliance solutions, guiding businesses toward sustainable growth and international recognition.
                </p>
                <div className="space-y-3 mb-8">
                  {['Global Standards Compliance', 'Operational Excellence', 'Strategic Growth Planning', 'GRC Advisory Services'].map((f) => (
                    <div key={f} className="flex items-center gap-2.5 font-medium text-neutral-800">
                      <i className="fas fa-check-circle text-emerald-600" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <Link to="/about" className="inline-flex items-center gap-2 text-sky-700 font-semibold hover:gap-3 transition-all">
                  <span>Learn More About Us</span>
                  <i className="fas fa-arrow-right" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Professional business team collaboration"
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wide mb-4 border border-emerald-200">
                Our Expertise
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-3">
                Comprehensive Business Solutions
              </h2>
              <p className="text-neutral-600">
                Tailored solutions designed to optimize your business performance, ensure compliance, and drive sustainable growth.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.15}>
                <Link to={s.link} className="group block bg-white rounded-2xl overflow-hidden shadow-md border border-neutral-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/80 to-sky-800/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <i className={`fas ${s.icon} text-white text-4xl transform scale-75 group-hover:scale-100 transition-transform duration-300`} />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-neutral-900 mb-2">{s.title}</h3>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-4">{s.desc}</p>
                    <span className="inline-flex items-center gap-2 text-sky-700 font-semibold text-sm group-hover:gap-3 transition-all">
                      <span>Explore {s.title.includes('Management') ? 'Management Systems Services' : 'GRC Services'}</span>
                      <i className="fas fa-arrow-right" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="bg-gradient-to-r from-sky-50 to-emerald-50 border-l-4 border-emerald-600 rounded-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="bg-emerald-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-xl shrink-0">
                  <i className="fas fa-shield-alt" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-emerald-700 font-bold text-lg mb-1">Governance, Risk & Compliance (GRC) Advisory Services</h3>
                  <p className="text-neutral-700 text-sm mb-3">We now offer comprehensive GRC solutions to help your organization manage risk, ensure compliance, and strengthen governance frameworks.</p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {['Risk & Compliance Health Check', 'Enterprise Risk Management', 'Compliance Management Systems', 'Board Advisory Sessions', 'Virtual GRC Support'].map((tag) => (
                      <span key={tag} className="bg-white border border-neutral-300 px-3 py-1.5 rounded-full text-xs text-neutral-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center">
              <Link to="/services" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-sky-700 text-white text-base font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <span>View All Services</span>
                <i className="fas fa-arrow-right text-sm" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Statistics */}
      <section ref={statsRef} className="py-24 bg-gradient-to-br from-neutral-900 to-neutral-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_20%_20%,rgba(5,150,105,0.5)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(30,64,175,0.5)_0%,transparent_50%)]" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
                  <span className="block text-4xl md:text-5xl font-extrabold text-white mb-2">{counts[i]}+</span>
                  <span className="text-white/70 text-xs font-semibold uppercase tracking-wider">{stat.label}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="inline-block px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wide mb-4 border border-emerald-200">
                Our Clients
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-2">Trusted by Leading Organizations</h2>
              <p className="text-neutral-600">We're proud to work with these amazing companies and organizations</p>
            </div>
          </ScrollReveal>

          <div className="relative">
            <div className="flex gap-8 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused] w-max">
              {[...Array(19)].map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 w-[140px] h-[70px] flex items-center justify-center bg-white rounded-xl shadow-sm border border-neutral-200 p-3 hover:shadow-lg hover:-translate-y-1 hover:border-emerald-300 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-50/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <img
                    src={`/assets/img/cl_${i + 1}.png`}
                    alt={`Client ${i + 1}`}
                    className="max-w-full max-h-full object-contain opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
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
