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
    tagline: 'Management System Establishment & Operations',
    desc: 'Build, configure, operate and improve management systems through the complete BUILD → RUN → IMPROVE lifecycle.',
    category: 'core',
    isFlagship: true,
    features: [
      'Governed establishment architecture (F1–F6 lifecycle)',
      'RUN journey: Requirement → Applicability → Process → Control → Activity → Occurrence → Evidence → Review → Acceptance → Effectiveness → Trace',
      'Multi-subsidiary: One canonical model + multiple governed contexts',
      'IMPROVE cycle: BUILD → RUN → LEARN → IMPROVE → BUILD / RUN AGAIN',
      'Evidence lifecycle: Expected → Submitted → Under Review → Accepted',
      'Human effectiveness evaluation (Effective / Partially Effective / Ineffective / Unable to Determine)',
    ],
    benefits: ['60% faster ISO implementation', 'Pre-configured blueprints', 'Continuous program alignment', 'Executive dashboard visibility'],
    image: 'https://images.pexels.com/photos/3182766/pexels-photo-3182766.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    color: 'from-emerald-700 to-emerald-900',
    details: [
      { subtitle: 'BUILD — Establish the Management System', text: 'OakForge\'s governed establishment architecture provides a structured path through: F1 — Foundation & Scope, F2 — Gap Assessment, F3 — Control Design, F4 — Documented Information, F5 — Readiness & Certification, F6 — Handover & Closure. The objective is not simply to produce documents — it is to establish a structured management-system foundation that can subsequently operate within the organisation.' },
      { subtitle: 'RUN — See How the System Operates', text: 'The RUN journey connects: Requirement → Applicability → Process → Control → Activity → Occurrence → Evidence → Review → Acceptance → Effectiveness → Trace. This allows management to move beyond "Do we have the required procedure?" and ask "How is this requirement actually operating in our organisation?"' },
      { subtitle: 'Multi-Subsidiary Organisations', text: 'One enterprise model. Multiple governed operating contexts. Instead of creating separate copies of the same management-system structure for every subsidiary, OakForge uses: One canonical enterprise model + multiple governed applicability and operating contexts.' },
      { subtitle: 'IMPROVE — Turn Learning into Better Systems', text: 'A genuine operational weakness may lead to an improvement decision. That improvement may reveal the need to: change an activity; strengthen a control; improve a process; revise documented information; or return to BUILD to reconfigure the management system. This creates a controlled cycle: BUILD → RUN → LEARN → IMPROVE → BUILD / RUN AGAIN.' },
      { subtitle: 'Evidence You Can Trust', text: 'OakForge treats evidence as a governed lifecycle: Expected → Submitted → Under Review → Accepted. This distinction prevents a common management-system weakness: Uploaded ≠ Reviewed ≠ Accepted ≠ Effective. Evidence can be traced back to the operational occurrence that generated it.' },
      { subtitle: 'Trace — Follow the Complete Story', text: 'OakForge provides a read-only Trace journey from: Requirement → Applicability → Process → Control → Activity → Occurrence → Evidence → Review → Acceptance → Effectiveness. Trace helps management, assurance teams and process owners understand not just what exists, but how the management-system story connects.' }
    ]
  },
  {
    icon: 'fa-clipboard-check',
    title: 'OakAudix',
    tagline: 'Audit Management',
    desc: 'Plan, execute, evidence and manage audits and audit-related improvement activities.',
    category: 'core',
    isFlagship: false,
    features: [
      'Knowledge-driven, process-based audits',
      'Automated finding tracking & CAPA tasks',
      'Curated clause-level audit questionnaires',
      'Evidence collection & validation repositories',
      'Comprehensive audit package seals & hashes',
      'Assurance dashboards & review boards',
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
    tagline: 'Compliance Management',
    desc: 'Connect compliance obligations with organisational responsibilities, controls, evidence and follow-up.',
    category: 'core',
    isFlagship: false,
    features: [
      'Regulatory obligations register',
      'Gap identification & remediation plans',
      'Recurring compliance calendars & alerts',
      'Continuous regulatory change feeds',
      'Controlled document policy linkups',
      'Conformance evidence registers',
    ],
    benefits: ['Zero compliance blind spots', 'Drastically reduced regulatory penalties', 'Instant evidence of conformance', 'Direct linkage to company policies'],
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
    desc: 'Support structured HSE management, operational controls, inspections, observations and improvement.',
    category: 'core',
    isFlagship: false,
    features: [
      'Incident & near-miss reporting',
      'Hazard logging & control assessments',
      'Site safety permits to work',
      'Environmental KPI & emissions logs',
      'Safety inspections & site audits',
      'Contractor safety verification portals',
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
    title: 'OakRisk',
    tagline: 'Risk Management',
    desc: 'Provide a governed environment for identifying, assessing, managing and monitoring organisational risks.',
    category: 'core',
    isFlagship: false,
    features: [
      'Seven risk domains analysis',
      'Scenario intelligence engine',
      'Resilience scoring metrics',
      'Risk simulator & forecaster',
      'Appetite & threshold alerts',
      'Combined assurance dashboard',
    ],
    benefits: ['Proactive threat mitigation', 'Accurate resilience scoring', 'Grounded decision support', 'Simulate worst-case scenarios'],
    image: 'https://images.pexels.com/photos/8636589/pexels-photo-8636589.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    color: 'from-red-800 to-rose-950',
    details: [
      { subtitle: 'Decision Simulator', text: 'Enables risk officers to model hypothetical market disruptions or operational events to test company thresholds before committing capital.' },
      { subtitle: 'Resilience Indexing', text: 'Calculates live company-wide governance strength and risk maturity based on verified audit records and control checks.' }
    ]
  },
  {
    icon: 'fa-chess-king',
    title: 'OakStrategy',
    tagline: 'Strategy & Performance',
    desc: 'Connect strategic direction with objectives, measures and organisational execution.',
    category: 'strategy',
    isFlagship: false,
    features: [
      'Strategic objective planning & alignment',
      'Objective & key results (OKR) framework',
      'Performance measurement & dashboards',
      'Strategy-to-execution traceability',
    ],
    benefits: ['Strategy-execution alignment', 'Measurable organisational performance', 'Governed decision-making'],
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    color: 'from-purple-700 to-indigo-800',
    details: [
      { subtitle: 'Strategy Alignment', text: 'Connects strategic direction with measurable objectives and ensures organisational execution is traceable to strategic intent.' }
    ]
  },
  {
    icon: 'fa-chart-line',
    title: 'Lumina BI',
    tagline: 'Business Intelligence',
    desc: 'Provide management insight from governed enterprise information.',
    category: 'intelligence',
    isFlagship: false,
    features: [
      'Governed management insight & reporting',
      'Cross-module analytics & correlation',
      'Executive dashboards & board packs',
      'Evidence-based decision support',
    ],
    benefits: ['Management insight from governed data', 'Cross-domain correlation', 'Executive-ready reporting'],
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    color: 'from-sky-600 to-blue-700',
    details: [
      { subtitle: 'Governed Intelligence', text: 'Turns governed enterprise information into management insight — dashboards, board packs, and cross-module analytics for evidence-based decisions.' }
    ]
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

const categoryOrder = ['core', 'strategy', 'intelligence']
const categoryLabels = {
  core: 'Core Management Modules',
  strategy: 'Strategy & Performance',
  intelligence: 'Business Intelligence',
}

export default function ProductsPage() {
  const { hash } = useLocation()

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

  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category || 'core'
    if (!acc[category]) acc[category] = []
    acc[category].push(product)
    return acc
  }, {})

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
              OakEIP Product Suite
            </motion.span>

            <h1 className="mt-6 font-extrabold leading-[1.04]">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.45, 0.05, 0.55, 0.95] }}
                className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-white"
              >
                The Enterprise
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.45, 0.05, 0.55, 0.95] }}
                className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-emerald-400 mt-1 tracking-tight"
              >
                Intelligence Platform
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.45, 0.05, 0.55, 0.95] }}
              className="mt-6 text-white/60 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
            >
              Seven integrated modules on a single governed architecture. Build, operate, and improve management systems across strategy, audit, compliance, HSE, risk, and business intelligence.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─────── Products by Category ─────── */}
      <section className="py-16 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-16">
            <SectionHeading label="Product Suite" title="Integrated" highlight="Platforms" light description="Seven powerful modules built on a unified governed architecture to give you complete enterprise visibility and control." />
          </div>

          {categoryOrder.map((category, catIndex) => {
            const categoryProducts = groupedProducts[category] || []
            if (categoryProducts.length === 0) return null

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: catIndex * 0.1, type: 'spring', stiffness: 100, damping: 16 }}
                className={catIndex > 0 ? 'pt-16 border-t border-neutral-100' : ''}
              >
                <div className="text-center mb-12">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-neutral-900">
                    {categoryLabels[category] || category}
                  </h3>
                </div>

                <div className="space-y-36">
                  {categoryProducts.map((product, i) => (
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
                              {product.isFlagship && (
                                <span className="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded">Flagship</span>
                              )}
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

                          {/* Detailed breakdown */}
                          {product.details && product.details.length > 0 && (
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
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ─────── Why OakEIP ─────── */}
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
              Ready to Experience <span className="text-emerald-600">OakEIP in Action?</span>
            </h2>
            <p className="mt-4 text-neutral-500 text-base leading-relaxed mb-8">
              Start with a Controlled Pilot — see how the platform operates with your real management-system activities before scaling across the enterprise.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/request-demo" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-sky-700 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <span>Request a Pilot</span>
                <i className="fas fa-arrow-right" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 border border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50 transition-all duration-300">
                Talk to a Specialist
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}