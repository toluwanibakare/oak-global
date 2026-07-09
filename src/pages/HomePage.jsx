import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import PageTransition from '../components/PageTransition'

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
  const [counts, setCounts] = useState(stats.map(() => 0))
  const statsRef = useRef(null)
  const counted = useRef(false)

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
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt=""
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-emerald-700/50 to-sky-700/50" />
        </div>

        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white font-extrabold leading-tight mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="block">Driving Business Performance</span>
              <span className="block bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                Through Global Practices
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/80 text-lg max-w-xl mx-auto mb-10"
            >
              We guide you through every step, ensuring global performance, compliance and operational excellence for sustainable growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-3 justify-center"
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-sky-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Explore Services</span>
                <i className="fas fa-arrow-right" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/30 backdrop-blur-md hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Learn More</span>
              </Link>
            </motion.div>
          </div>
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
              <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-sky-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <span>View All Services</span>
                <i className="fas fa-arrow-right" />
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
