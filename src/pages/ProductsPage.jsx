import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
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

const products = [
  {
    icon: 'fa-hammer',
    title: 'OakForge',
    tagline: 'Strategy & Management System Implementation Accelerator',
    desc: 'Accelerate your enterprise strategy, organizational transformation, and management system lifecycle from blueprinting to complete operational reviews.',
    features: [
      'Strategic objective planning & blueprints',
      'Phase F1–F6 program lifecycle checks',
      'Executive Command Centre integrations',
      'Management system review boards',
      'Separation of duties approval safety',
      'ECIE/Improvement CAPA links'
    ],
    benefits: ['60% faster ISO implementation', 'Pre-configured blueprints', 'Continuous program alignment', 'Executive dashboard visibility'],
    image: 'https://images.pexels.com/photos/3182766/pexels-photo-3182766.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    color: 'from-emerald-700 to-emerald-900',
    details: [
      { subtitle: 'Lifecycle Management', text: 'Governs transformation stages from Foundation (F1) through Gap Assessment (F2), design (F3), documentation (F4), readiness verification (F5), to audit handoff (F6).' },
      { subtitle: 'Unified operating foundation', text: 'Combines structural program blueprints and operational reviews into a single canonical model, eliminating disconnected processes.' }
    ]
  },
  {
    icon: 'fa-clipboard-check',
    title: 'OakAudix',
    tagline: 'Enterprise Audit Management',
    desc: 'Plan, schedule, execute, and verify audits in one knowledge-driven workspace. Streamlines finding tracking and corrective action plans.',
    features: [
      'Knowledge-driven, process-based audits',
      'Automated finding tracking & CAPA tasks',
      'Curated clause-level audit questionnaires',
      'Evidence collection & validation repositories',
      'Comprehensive audit package seals & hashes',
      'Assurance dashboards & review boards'
    ],
    benefits: ['45% less audit preparation effort', 'Consolidated evidence and CAPA spine', 'Eliminates audit process variance', 'Automated regulatory reporting'],
    image: 'https://images.pexels.com/photos/3861077/pexels-photo-3861077.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    color: 'from-emerald-600 to-teal-700',
    details: [
      { subtitle: 'Audit Assurance Flow', text: 'Fully tracks programs, plans, scopes, checklists, executions, findings, and reviews. Feeds findings directly into corrective action workflows.' },
      { subtitle: 'Knowledge Studio Curator', text: 'Reuses curated checklist standards, previous evidence structures, and criteria benchmarks directly during live audits.' }
    ]
  },
  {
    icon: 'fa-shield-halved',
    title: 'OakComply',
    tagline: 'Legal & Regulatory Compliance Management',
    desc: 'Keep track of legal and regulatory obligations, complete applicability checks, address gap actions, and ensure continuous operational compliance.',
    features: [
      'Regulatory obligations register',
      'Gap identification & remediation plans',
      'Recurring compliance calendars & alerts',
      'Continuous regulatory change feeds',
      'Controlled document policy linkups',
      'Conformance evidence registers'
    ],
    benefits: ['Zero-compliance blind spots', 'Drastically reduced regulatory penalties', 'Instant evidence of conformance', 'Direct linkage to company policies'],
    image: 'https://images.pexels.com/photos/7433857/pexels-photo-7433857.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    color: 'from-blue-600 to-indigo-700',
    details: [
      { subtitle: 'Obligation Registry', text: 'Tracks all regional, national, and international standards relevant to your tenancy. Ensures every clause has an accountable owner.' },
      { subtitle: 'Compliance Calendars', text: 'Establishes scheduled checks and regulatory alerts to prevent overdue actions and minimize compliance exposures.' }
    ]
  },
  {
    icon: 'fa-leaf',
    title: 'OakHSE360',
    tagline: 'Health, Safety & Environment',
    desc: 'Manage safety incidents, mitigate workplace hazards, monitor environmental footprints, and verify safety controls across all operations and sites.',
    features: [
      'Incident & near-miss reporting',
      'Hazard logging & control assessments',
      'Site safety permits to work',
      'Environmental KPI & emissions logs',
      'Safety inspections & site audits',
      'Contractor safety verification portals'
    ],
    benefits: ['Minimized workplace incidents', 'Full environmental standard compliance', 'Better contractor risk visibility', 'Improved internal safety culture'],
    image: 'https://images.pexels.com/photos/37510660/pexels-photo-37510660.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    color: 'from-emerald-600 to-green-700',
    details: [
      { subtitle: 'OHS & Incident Workflows', text: 'Guides investigators from the initial incident report through root-cause analysis up to implementing verified controls.' },
      { subtitle: 'Contractor Management', text: 'Extends safety policies and compliance checklists to external contractors to prevent operational loopholes.' }
    ]
  },
  {
    icon: 'fa-triangle-exclamation',
    title: 'OakRisk360',
    tagline: 'Enterprise Risk & Opportunity',
    desc: 'Identify, assess, and simulate risks with scenario intelligence, resilience scoring, and seven risk domains to guarantee complete governance.',
    features: [
      'Seven risk domains analysis',
      'Scenario intelligence engine',
      'Resilience scoring metrics',
      'Risk simulator & forecaster',
      'Appetite & threshold alerts',
      'Combined assurance dashboard'
    ],
    benefits: ['Proactive threat mitigation', 'Accurate resilience scoring', 'Grounded decision support', 'Simulate worst-case scenarios'],
    image: 'https://images.pexels.com/photos/8636589/pexels-photo-8636589.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    color: 'from-red-800 to-rose-950', // Maroon theme accent
    details: [
      { subtitle: 'Decision Simulator', text: 'Enables risk officers to model hypothetical market disruptions or operational events to test company thresholds before committing capital.' },
      { subtitle: 'Resilience Indexing', text: 'Calculates live company-wide governance strength and risk maturity based on verified audit records and control checks.' }
    ]
  }
]

const differentiators = [
  { icon: 'fa-puzzle-piece', title: 'Seamless Integration', desc: 'All Oak products are designed to work together seamlessly, sharing data and providing a unified view of your enterprise operations.' },
  { icon: 'fa-microchip', title: 'Built for Scale', desc: 'Our cloud-native architecture scales with your organization, from single-site operations to global enterprise deployments.' },
  { icon: 'fa-headset', title: 'Dedicated Support', desc: 'Every Oak product comes with dedicated implementation support, training, and ongoing technical assistance from our expert team.' },
]

export default function ProductsPage() {
  const { hash } = useLocation()

  // Scroll to hash ID if present on render or hash update
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [hash])

  return (
    <PageTransition>
      {/* ─────── Hero ─────── */}
      <section className="relative min-h-[65vh] flex items-center overflow-hidden pt-32 lg:pt-[140px]">
        <div className="absolute inset-0 -z-10">
          <motion.img
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: 'easeOut' }}
            src="https://images.pexels.com/photos/3861976/pexels-photo-3861976.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
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
              Our Products
            </motion.span>

            <h1 className="mt-6 font-extrabold leading-[1.04]">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.45, 0.05, 0.55, 0.95] }}
                className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-white"
              >
                Enterprise-Grade
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.45, 0.05, 0.55, 0.95] }}
                className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-emerald-400 mt-1 tracking-tight"
              >
                Technology Solutions
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.45, 0.05, 0.55, 0.95] }}
              className="mt-6 text-white/60 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
            >
              Powerful modules built on a single, continuous operating model designed to manage strategy, blueprints, audits, compliance, HSE, and risks.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─────── Products ─────── */}
      <section className="py-16 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-16">
            <SectionHeading label="Product Suite" title="Integrated" highlight="Platforms" light description="Five powerful modules built on a unified database architecture to give you complete enterprise visibility and control." />
          </div>

          <div className="space-y-36">
            {products.map((product, i) => (
              <motion.div
                key={product.title}
                id={product.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ type: 'spring', stiffness: 80, damping: 18, delay: i * 0.1 }}
                className="scroll-mt-32"
              >
                <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-start ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  
                  {/* Text Details */}
                  <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${product.color} flex items-center justify-center text-white text-xl`}>
                        <i className={`fas ${product.icon}`} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-extrabold text-neutral-900">{product.title}</h3>
                        <span className="text-emerald-600 text-sm font-semibold">{product.tagline}</span>
                      </div>
                    </div>
                    
                    <p className="text-neutral-600 leading-relaxed mb-6 text-base">{product.desc}</p>
                    
                    {/* Key features list */}
                    <div className="mb-6">
                      <h4 className="text-neutral-800 text-sm font-bold uppercase tracking-wider mb-3">Key Capabilities</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {product.features.map((f) => (
                          <div key={f} className="flex items-start gap-2 text-sm text-neutral-600">
                            <i className="fas fa-circle-check text-emerald-600 mt-1 text-xs shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Detailed breakdown from strategy operating manual */}
                    {product.details && (
                      <div className="mb-6 space-y-4 bg-neutral-50 p-4 border border-neutral-200">
                        <h4 className="text-neutral-800 text-xs font-bold uppercase tracking-wider">Enterprise Framework Details</h4>
                        {product.details.map((dt) => (
                          <div key={dt.subtitle} className="text-xs">
                            <span className="font-bold text-neutral-800 block mb-0.5">{dt.subtitle}</span>
                            <span className="text-neutral-500 leading-relaxed">{dt.text}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Benefits metrics */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.benefits.map((b) => (
                        <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                          <i className="fas fa-arrow-trend-up text-[10px]" />
                          {b}
                        </span>
                      ))}
                    </div>

                    <Link 
                      to={`/request-demo?product=${product.title}`} 
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-sky-700 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <span>Request Demo</span>
                      <i className="fas fa-arrow-right text-xs" />
                    </Link>
                  </div>
                  
                  {/* Image Block */}
                  <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <div className="overflow-hidden shadow-xl border border-neutral-100">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-[220px] sm:h-[300px] lg:h-[450px] object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </div>
                  
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────── Why Our Products ─────── */}
      <section className="py-16 lg:py-24 bg-neutral-950 relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-xl mx-auto mb-12">
            <SectionHeading label="Why Oak" title="Built" highlight="Different" description="What sets our products apart in the enterprise technology landscape." />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-3 gap-8"
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

      {/* ─────── CTA ─────── */}
      <section className="py-16 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            className="text-center max-w-xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-semibold tracking-widest uppercase border bg-emerald-500/10 text-emerald-700 border-emerald-500/20">
              Get Started
            </span>
            <h2 className="mt-6 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-neutral-900">
              Ready to See Our <span className="text-emerald-600">Platforms in Action?</span>
            </h2>
            <p className="mt-4 text-neutral-500 text-base leading-relaxed mb-8">
              Schedule a personalized demo to discover how Oak products can transform your enterprise operations.
            </p>
            <Link to="/request-demo" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-sky-700 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              <span>Request Full Demo</span>
              <i className="fas fa-arrow-right" />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
