import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, ease: [0.45, 0.05, 0.55, 0.95] },
  },
}

const itemFadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 14 },
  },
}

function AnimatedCounter({ value, suffix = '+' }) {
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

  return <span ref={ref} className="block text-4xl md:text-5xl font-extrabold text-emerald-400 mb-2 tabular-nums">{count}{suffix}</span>
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
        <p className={`mt-4 text-base max-w-xl mx-auto leading-relaxed ${light ? 'text-neutral-500' : 'text-white/40'}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}

const grcServices = [
  { icon: 'fa-shield', title: 'Risk & Compliance Health Check', desc: 'A rapid assessment of your organisation\'s risk management maturity, compliance obligations, and governance effectiveness.', features: ['Risk maturity evaluation', 'Compliance gap analysis', 'Governance framework review', 'Regulatory obligation mapping', 'Actionable improvement roadmap'] },
  { icon: 'fa-sitemap', title: 'Enterprise Risk Management Framework', desc: 'Design and implement a comprehensive ERM framework aligned with ISO 31000 to identify, assess, and mitigate business risks.', features: ['Risk appetite definition', 'Risk assessment and planning', 'Control framework design', 'Risk reporting dashboards', 'Culture and capability building'] },
  { icon: 'fa-file-shield', title: 'Compliance Management System (ISO 37301)', desc: 'Implement a robust compliance management system based on ISO 37301 to ensure regulatory adherence and ethical operations.', features: ['Compliance framework setup', 'Regulatory obligation register', 'Policy and procedure development', 'Compliance training programs', 'Continuous monitoring systems'] },
  { icon: 'fa-handshake', title: 'Outsourcing Governance (ISO 37500)', desc: 'Establish effective governance frameworks for outsourced operations ensuring quality, risk control, and regulatory compliance.', features: ['Vendor risk assessment', 'Outsourcing governance framework', 'Service level monitoring', 'Contract compliance review', 'Performance evaluation'] },
  { icon: 'fa-users-gear', title: 'Board Advisory Sessions', desc: 'Strategic advisory services for boards and senior leadership on governance best practices, risk oversight, and compliance strategy.', features: ['Board governance assessment', 'Strategic risk workshops', 'Compliance oversight guidance', 'Governance policy development', 'Board effectiveness review'] },
  { icon: 'fa-laptop-code', title: 'Virtual GRC Advisory', desc: 'Flexible remote advisory services providing ongoing GRC support, guidance, and expertise to organizations across all locations.', features: ['Remote GRC consulting', 'Virtual risk workshops', 'Online compliance reviews', 'Digital documentation', 'Progress tracking tools'] },
]

const managementServices = [
  { icon: 'fa-chart-line', title: 'Business Performance Management', desc: 'Comprehensive performance management to optimize your business operations and achieve strategic objectives through data-driven insights.', features: ['Performance metrics design', 'Balanced scorecard implementation', 'KPI development', 'Performance dashboards', 'Continuous improvement cycles'] },
  { icon: 'fa-compass', title: 'Strategic Planning & Execution', desc: "Develop and execute winning strategies that align your organization's vision with actionable plans, ensuring measurable results.", features: ['Strategic plan development', 'Vision and mission alignment', 'Action plan creation', 'Progress monitoring', 'Strategy review cycles'] },
  { icon: 'fa-gauge-high', title: 'Operational Improvement', desc: 'Streamline operations, reduce costs, and improve efficiency through proven methodologies and best practices in operational excellence.', features: ['Process optimization', 'Cost reduction strategies', 'Efficiency improvement', 'Quality management', 'Lean methodology'] },
  { icon: 'fa-clock', title: 'Performance Monitoring', desc: 'Continuous monitoring and reporting systems that track performance, identify trends, and enable proactive decision-making.', features: ['Monitoring system design', 'Real-time reporting', 'Trend analysis', 'Alert mechanisms', 'Management dashboards'] },
  { icon: 'fa-stairs', title: 'Strategy Maturity Assessment', desc: 'Evaluate the connection between your strategies, vision, and purpose through comprehensive assessment and maturity roadmap development.', features: ['Strategic maturity evaluation', 'Capability assessment', 'Gap analysis', 'Improvement roadmap', 'Benchmark comparison'] },
  { icon: 'fa-clipboard-check', title: 'Management Systems Assessment', desc: 'Comprehensive evaluation of your management systems with actionable recommendations for enhancement and certification readiness.', features: ['System effectiveness review', 'Compliance validation', 'Best practice assessment', 'Improvement recommendations', 'Certification support'] },
  { icon: 'fa-award', title: 'ISO Excellence', desc: 'Comprehensive ISO services including system design, gap assessment, internal audits, implementation support, and certification validation.', features: ['ISO system design', 'Gap assessment and analysis', 'Internal audits', 'Implementation support', 'Certification validation'] },
  { icon: 'fa-leaf', title: 'Environmental Impact Audit', desc: 'Thorough environmental impact assessment and audit services to ensure regulatory compliance and sustainable business practices.', features: ['Environmental impact review', 'Regulatory audit and assessment', 'Sustainability planning', 'Compliance framework', 'Improvement roadmap'] },
]

const process = [
  { num: '01', title: 'Discovery', desc: 'We begin by understanding your business, challenges, and objectives through in-depth consultation.' },
  { num: '02', title: 'Assessment', desc: 'Based on our assessment, we develop customized strategies and solutions tailored to your specific needs.' },
  { num: '03', title: 'Implementation', desc: 'Our team works alongside yours to implement solutions effectively and efficiently.' },
  { num: '04', title: 'Optimization', desc: 'We continuously monitor, measure, and optimize to ensure sustained success.' },
]

const stats = [
  { value: 200, label: 'Projects Completed' },
  { value: 50, label: 'Certified Experts' },
  { value: 15, label: 'Industry Verticals' },
  { value: 6, label: 'Global Offices' },
]

const faqs = [
  { q: 'Which service is right for my organization?', a: 'We offer a complimentary initial consultation to assess your needs and recommend the most suitable service package. Our team works with you to understand your challenges, goals, and industry requirements before proposing a tailored solution.' },
  { q: 'What is the typical timeline for implementation?', a: 'Timelines vary based on the scope and complexity of the engagement. A typical project ranges from 4 to 12 weeks, depending on your organization\'s size, readiness, and specific requirements. We provide a detailed timeline during our initial assessment phase.' },
  { q: 'Do you offer ongoing support after implementation?', a: 'Yes, we provide continuous support through our Virtual GRC Advisory services, performance monitoring, and periodic review engagements. We believe in building lasting partnerships and are always available for ongoing consultation.' },
  { q: 'How do you ensure compliance with industry regulations?', a: 'Our consultants stay up-to-date with the latest regulatory requirements across industries. We leverage ISO standards, regulatory databases, and our network of compliance experts to ensure your organization meets all applicable regulations.' },
  { q: 'Can your services be tailored for small businesses?', a: 'Absolutely. We design scalable solutions that fit organizations of all sizes. Our engagement models are flexible, and we offer modular service packages that can be customized to your budget and needs.' },
  { q: 'What certifications do your consultants hold?', a: 'Our team holds international certifications including ISO Lead Auditor, PMP, CRISC, CISM, and other industry-recognized credentials. Each consultant brings 10+ years of experience in their domain of expertise.' },
]

export default function ServicesPage() {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('category') === 'grc' ? 'grc' : 'management')
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat === 'grc' || cat === 'management') setActiveTab(cat)
  }, [searchParams])

  const services = activeTab === 'grc' ? grcServices : managementServices

  return (
    <PageTransition>
      {/* ─────── Hero ─────── */}
      <section className="relative min-h-[65vh] flex items-center overflow-hidden pt-32 lg:pt-[140px]">
        <div className="absolute inset-0 -z-10">
          <motion.img
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: 'easeOut' }}
            src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/70 to-neutral-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/[0.04] blur-3xl pointer-events-none" />
        </div>
        <div className="max-w-6xl mx-auto px-4 w-full">
          <motion.div className="text-center max-w-3xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase border border-emerald-500/20"
            >
              Our Expertise
            </motion.span>

            <h1 className="mt-6 font-extrabold leading-[1.04]">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.45, 0.05, 0.55, 0.95] }}
                className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-white"
              >
                Comprehensive Business
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.45, 0.05, 0.55, 0.95] }}
                className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-emerald-400 mt-1 tracking-tight"
              >
                Solutions
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.45, 0.05, 0.55, 0.95] }}
              className="mt-6 text-white/60 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
            >
              Tailored solutions designed to optimize your business performance, ensure compliance, and drive sustainable growth.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─────── Tabs ─────── */}
      <section className="py-12 bg-neutral-50 border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center gap-1 bg-white p-1 shadow-sm border border-neutral-200 max-w-md mx-auto">
            {[
              { key: 'management', label: 'Management Systems' },
              { key: 'grc', label: 'GRC Advisory' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-5 py-2.5 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === tab.key ? 'text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {activeTab === tab.key && (
                  <motion.div layoutId="tab-bg" className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-sky-700" />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─────── Services Grid ─────── */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              variants={containerVariants}
              className="flex flex-wrap justify-center gap-6"
            >
              {services.map((s, i) => (
                <motion.div
                  key={s.title}
                  variants={itemFadeUp}
                  className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                >
                  <div className="bg-white border border-neutral-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                    <div className="p-6 flex flex-col flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-sky-700 flex items-center justify-center text-white text-lg mb-4">
                        <i className={`fas ${s.icon}`} />
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-3">{s.title}</h3>
                      <p className="text-neutral-600 text-sm leading-relaxed mb-4 flex-1">{s.desc}</p>
                      <ul className="space-y-2 border-t border-neutral-100 pt-4">
                        {s.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-neutral-600">
                            <i className="fas fa-check text-emerald-600 mt-0.5 text-xs" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─────── Stats ─────── */}
      <section className="py-20 bg-neutral-950 relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5"
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={itemFadeUp} className="bg-neutral-950 py-10 px-6 text-center">
                <AnimatedCounter value={s.value} />
                <span className="text-white/50 text-xs font-semibold uppercase tracking-[0.15em]">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────── Process ─────── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-12">
            <SectionHeading label="Our Process" title="How We" highlight="Work" light description="A proven methodology that ensures successful outcomes for every engagement." />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {process.map((step, i) => (
              <motion.div key={step.num} variants={itemFadeUp}>
                <div className="bg-neutral-50 p-6 text-center shadow-sm border border-neutral-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 h-full group">
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-sky-700 rotate-45 group-hover:rotate-[135deg] transition-transform duration-500" />
                    <div className="relative z-10 w-full h-full flex items-center justify-center text-white text-lg font-bold">
                      {step.num}
                    </div>
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2">{step.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────── FAQ ─────── */}
      <section className="py-24 bg-neutral-50 overflow-hidden border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-12">
            <SectionHeading label="FAQ" title="Frequently Asked" highlight="Questions" light description="Quick answers to common questions about our services and engagement process." />
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 100, damping: 16 }}
                className="mb-3"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 bg-white border border-neutral-200 text-left cursor-pointer hover:border-emerald-300 transition-colors duration-300"
                >
                  <span className="font-semibold text-neutral-900 text-sm">{faq.q}</span>
                  <motion.i
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="fas fa-chevron-down text-emerald-600 shrink-0 text-sm"
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.45, 0.05, 0.55, 0.95] }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 bg-white border-t-0 border border-neutral-200">
                        <p className="text-neutral-600 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────── CTA ─────── */}
      <section className="py-24 bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/[0.03] blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            className="text-center max-w-xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
              Ready to Transform <span className="text-emerald-400">Your Business?</span>
            </h2>
            <p className="text-white/40 text-base leading-relaxed mb-8">
              Contact us today to discuss how our comprehensive services can help your organization achieve operational excellence and global recognition.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-sky-700 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              <span>Get Started Today</span>
              <i className="fas fa-arrow-right" />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
