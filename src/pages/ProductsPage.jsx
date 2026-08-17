import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
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
    icon: 'fa-clipboard-check',
    title: 'OakAudix',
    tagline: 'Audit Management',
    desc: 'A comprehensive audit management platform that streamlines the entire audit lifecycle from planning and execution to reporting and corrective action tracking.',
    features: ['Automated audit scheduling', 'Real-time reporting dashboards', 'Risk-based assessment engine', 'Finding tracking & closure workflows', 'Audit evidence repository', 'Custom audit checklist builder'],
    benefits: ['Reduce audit cycle time', 'Improve finding closure rates', 'Regulatory compliance assurance'],
    image: 'https://images.pexels.com/photos/3861077/pexels-photo-3861077.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    color: 'from-emerald-600 to-teal-700',
  },
  {
    icon: 'fa-shield-halved',
    title: 'OakComply',
    tagline: 'Compliance Management',
    desc: 'Stay ahead of regulatory requirements with a centralized compliance management system that tracks obligations, manages gaps, and ensures continuous adherence.',
    features: ['Regulatory obligation register', 'Gap analysis & remediation', 'Compliance calendar & alerts', 'Regulatory updates & monitoring', 'Policy management & versioning', 'Compliance reporting & dashboards'],
    benefits: ['Eliminate compliance blind spots', 'Reduce regulatory penalties', 'Streamlined audit readiness'],
    image: 'https://images.pexels.com/photos/7433857/pexels-photo-7433857.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    color: 'from-blue-600 to-indigo-700',
  },
  {
    icon: 'fa-leaf',
    title: 'OakHSE360',
    tagline: 'Health, Safety & Environment',
    desc: 'An integrated HSE management solution designed to help organizations achieve zero harm while maintaining peak operational performance.',
    features: ['Incident reporting & investigation', 'Risk assessment & mitigation', 'Environmental monitoring & reporting', 'Safety compliance & inspections', 'Hazard identification & control', 'Training & competency tracking'],
    benefits: ['Reduce workplace incidents', 'Environmental compliance', 'Safety culture improvement'],
    image: 'https://images.pexels.com/photos/37510660/pexels-photo-37510660.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    color: 'from-emerald-600 to-green-700',
  },
  {
    icon: 'fa-triangle-exclamation',
    title: 'OakRisk360',
    tagline: 'Enterprise Risk & Opportunity',
    desc: 'Identify, assess, and simulate risks with scenario intelligence, resilience scoring, and seven risk domains to guarantee complete governance.',
    features: ['Seven risk domains analysis', 'Scenario intelligence engine', 'Resilience scoring metrics', 'Risk simulator & forecaster', 'Appetite & threshold alerts', 'Combined assurance dashboard'],
    benefits: ['Proactive threat mitigation', 'Accurate resilience scoring', 'Grounded decision support'],
    image: 'https://images.pexels.com/photos/8636589/pexels-photo-8636589.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    color: 'from-red-800 to-rose-950', // Maroon theme accent
  },
]

const differentiators = [
  { icon: 'fa-puzzle-piece', title: 'Seamless Integration', desc: 'All Oak products are designed to work together seamlessly, sharing data and providing a unified view of your enterprise operations.' },
  { icon: 'fa-microchip', title: 'Built for Scale', desc: 'Our cloud-native architecture scales with your organization, from single-site operations to global enterprise deployments.' },
  { icon: 'fa-headset', title: 'Dedicated Support', desc: 'Every Oak product comes with dedicated implementation support, training, and ongoing technical assistance from our expert team.' },
]

export default function ProductsPage() {
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
              Powerful platforms designed to transform how you manage audits, compliance, HSE, and risk intelligence.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─────── Products ─────── */}
      <section className="py-16 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-12">
            <SectionHeading label="Product Suite" title="Integrated" highlight="Platforms" light description="Four powerful products built on a unified architecture to give you complete enterprise visibility and control." />
          </div>

          <div className="space-y-24">
            {products.map((product, i) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ type: 'spring', stiffness: 80, damping: 18, delay: i * 0.1 }}
                className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${i % 2 === 1 ? 'md:grid-flow-dense' : ''}`}
              >
                <div className={i % 2 === 1 ? 'md:col-start-2' : ''}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${product.color} flex items-center justify-center text-white text-xl`}>
                      <i className={`fas ${product.icon}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-neutral-900">{product.title}</h3>
                      <span className="text-emerald-600 text-sm font-semibold">{product.tagline}</span>
                    </div>
                  </div>
                  <p className="text-neutral-600 leading-relaxed mb-6">{product.desc}</p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {product.features.map((f) => (
                      <div key={f} className="flex items-start gap-2 text-sm text-neutral-600">
                        <i className="fas fa-check text-emerald-600 mt-0.5 text-xs" />
                        {f}
                      </div>
                    ))}
                  </div>
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-sky-700 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <span>Request Demo</span>
                    <i className="fas fa-arrow-right text-xs" />
                  </Link>
                </div>
                <div className={i % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                  <div className="overflow-hidden shadow-xl">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-[200px] sm:h-[280px] md:h-[350px] object-cover transition-transform duration-700 hover:scale-105"
                    />
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
