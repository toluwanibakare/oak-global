import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

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

const itemFadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1, x: 0,
    transition: { type: 'spring', stiffness: 100, damping: 16 },
  },
}

const itemFadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1, x: 0,
    transition: { type: 'spring', stiffness: 100, damping: 16 },
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

const values = [
  { icon: 'fa-brain', title: 'Knowledge', desc: 'We believe that growth starts with understanding. By continually learning, sharing insights, and applying wisdom, we empower better decisions and stronger results.' },
  { icon: 'fa-star', title: 'Excellence', desc: 'We strive for the highest standards in everything we do, ensuring our clients receive world-class service and results that exceed expectations.' },
  { icon: 'fa-handshake', title: 'Integrity', desc: 'We operate with transparency, honesty, and ethical practices in all our business relationships, building trust through consistent actions.' },
  { icon: 'fa-lightbulb', title: 'Innovation', desc: 'We continuously evolve our methodologies and solutions to address emerging challenges in the global business landscape.' },
  { icon: 'fa-users', title: 'Partnership', desc: 'We work closely with our clients as trusted partners, ensuring collaborative success and sustainable improvements.' },
]

const expertise = [
  { icon: 'fa-certificate', title: 'Certified Professionals', desc: 'Our team holds international certifications in business management, ISO standards, and compliance frameworks.' },
  { icon: 'fa-globe', title: 'Global Perspective', desc: 'We bring international best practices and global market insights to every engagement.' },
  { icon: 'fa-rocket', title: 'Results-Driven', desc: 'Our proven methodologies deliver measurable improvements and sustainable business growth.' },
]

const stats = [
  { value: 10, label: 'Years of Experience' },
  { value: 500, label: 'Projects Delivered' },
  { value: 50, label: 'Certified Experts' },
  { value: 200, label: 'Happy Clients' },
]

const approach = [
  { icon: 'fa-search', title: 'Discover', desc: 'We dive deep into your business, understanding your challenges, goals, and unique context to build a tailored strategy.' },
  { icon: 'fa-sync', title: 'Transform', desc: 'We implement world-class solutions, aligning your operations with global standards and best practices.' },
  { icon: 'fa-trophy', title: 'Excel', desc: 'We ensure sustainable excellence through continuous improvement, monitoring, and strategic support.' },
]

export default function AboutPage() {
  return (
    <PageTransition>
      {/* ─────── Hero ─────── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-24 lg:pt-[116px]">
        <div className="absolute inset-0 -z-10">
          <motion.img
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: 'easeOut' }}
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt=""
            className="w-full h-full object-cover brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-emerald-700/50 to-sky-700/50" />
        </div>
        <div className="max-w-6xl mx-auto px-4 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="inline-block px-3 py-1.5 bg-white/15 text-white rounded-full text-xs font-semibold uppercase tracking-wide mb-4 border border-white/20">
              About OAK Global
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">Excellence in Global Business Solutions</h1>
            <p className="text-white/80 text-lg">Empowering organizations to achieve operational excellence and international recognition through strategic business performance management.</p>
          </motion.div>
        </div>
      </section>

      {/* ─────── Story ─────── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <SectionHeading label="Our Story" title="Who We" highlight="Are" light description="Discover the journey behind OAK Global and our commitment to excellence." />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.2 }}
              className="mt-8"
            >
              <video
                src="/assets/video/OAK%20GLOBAL.mp4"
                poster="/assets/img/logo.png"
                className="w-full shadow-lg bg-black"
                muted
                playsInline
                preload="auto"
                controls
              />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={itemFadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <p className="text-lg font-semibold text-neutral-900 mb-6">
                At Oak Global International Business Solutions, we specialize in helping organizations achieve and maintain global status through comprehensive business performance management and strategic excellence.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Founded on the principles of integrity, expertise, and results-driven approaches, we have established ourselves as trusted partners to businesses across various industries. Our team of seasoned professionals brings decades of combined experience in business strategy, ISO compliance, regulatory frameworks, and performance optimization.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-6">
                We understand that every organization is unique, which is why we provide customized solutions that align with your specific goals and challenges.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-sky-700 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <span>Get Started Today</span>
                <i className="fas fa-arrow-right" />
              </Link>
            </motion.div>
            <motion.div
              variants={itemFadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="overflow-hidden shadow-xl"
            >
              <div className="group h-[400px]">
                <ParallaxImage src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" alt="Professional business team" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────── Stats ─────── */}
      <section className="py-20 bg-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-sky-900/20" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={itemFadeUp}>
                <AnimatedCounter value={s.value} />
                <span className="text-white/60 text-sm uppercase tracking-widest">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────── Vision & Mission ─────── */}
      <section className="py-24 bg-neutral-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-12">
            <SectionHeading label="Our Foundation" title="Vision" highlight="& Mission" light description="The driving forces behind everything we do at OAK Global." />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: 'fa-eye', title: 'Our Vision', text: 'To be the leading partner in delivering world-class business support that equips organizations with winning strategies for visibility and access to the global markets.', subtext: 'We envision a world where businesses of all sizes can achieve international recognition and sustainable success through strategic excellence and operational optimization.' },
              { icon: 'fa-bullseye', title: 'Our Mission', text: 'To provide business performance solutions that empower organizations to achieve excellence, ensure compliance and drive sustainable growth.', subtext: 'Through our comprehensive approach to performance management, compliance validation, and strategic assessment, we help our clients build resilient, efficient, and compliant operations.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ type: 'spring', stiffness: 100, damping: 16, delay: i * 0.15 }}
              >
                <div className="bg-white p-8 md:p-10 shadow-lg border border-emerald-100/50 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-sky-700 flex items-center justify-center text-white text-xl">
                      <i className={`fas ${item.icon}`} />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                  </div>
                  <p className="font-semibold text-neutral-800 mb-4 leading-relaxed">{item.text}</p>
                  <p className="text-neutral-600 leading-relaxed">{item.subtext}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────── Our Approach ─────── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-12">
            <SectionHeading label="How We Work" title="Our" highlight="Approach" light description="A proven methodology that delivers results." />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-3 gap-8"
          >
            {approach.map((a, i) => (
              <motion.div key={a.title} variants={itemFadeUp}>
                <div className="text-center p-8 bg-neutral-50 border border-neutral-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 h-full group">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-sky-700 rotate-45 group-hover:rotate-[135deg] transition-transform duration-500" />
                    <div className="relative z-10 w-full h-full flex items-center justify-center text-white text-2xl">
                      <i className={`fas ${a.icon}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                      {i + 1}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900 mb-3">{a.title}</h4>
                  <p className="text-neutral-600 text-sm leading-relaxed">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────── Core Values ─────── */}
      <section className="py-24 bg-neutral-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-12">
            <SectionHeading label="Our Foundation" title="Core" highlight="Values" light description="These fundamental principles guide every decision we make and every solution we deliver." />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map((v) => (
              <motion.div key={v.title} variants={itemFadeUp}>
                <div className="bg-white p-8 text-center shadow-md border border-neutral-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 h-full">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-sky-700 flex items-center justify-center mx-auto mb-6 text-white text-2xl">
                    <i className={`fas ${v.icon}`} />
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900 mb-3">{v.title}</h4>
                  <p className="text-neutral-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────── Why Choose Us ─────── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={itemFadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="overflow-hidden shadow-xl"
            >
              <div className="group h-[400px]">
                <ParallaxImage src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" alt="Professional team meeting" />
              </div>
            </motion.div>

            <div>
              <motion.div
                variants={itemFadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
              >
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-semibold tracking-widest uppercase border bg-emerald-500/10 text-emerald-700 border-emerald-500/20">
                  Our Expertise
                </span>
                <h2 className="mt-6 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-neutral-900">
                  Why Choose <span className="text-emerald-600">OAK Global</span>
                </h2>
                <p className="mt-4 text-neutral-500 text-base leading-relaxed max-w-xl mb-8">
                  Our success is built on a foundation of expertise, experience, and unwavering commitment to client success.
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="space-y-4"
              >
                {expertise.map((e) => (
                  <motion.div key={e.title} variants={itemFadeUp}>
                    <div className="flex items-start gap-4 p-4 bg-neutral-50 shadow-sm border border-neutral-100 hover:-translate-x-1 transition-all duration-300">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-sky-700 flex items-center justify-center text-white text-lg shrink-0">
                        <i className={`fas ${e.icon}`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-900 mb-1">{e.title}</h4>
                        <p className="text-neutral-600 text-sm leading-relaxed">{e.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.3 }}
              >
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-sky-700 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 mt-6">
                  <span>Work With Us</span>
                  <i className="fas fa-arrow-right" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
