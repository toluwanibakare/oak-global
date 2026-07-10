import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import PageTransition from '../components/PageTransition'

const grcServices = [
  { title: 'Risk & Compliance Health Check', desc: 'A rapid assessment of your organisation\'s risk management maturity, compliance obligations, and governance effectiveness.', features: ['Risk maturity evaluation', 'Compliance gap analysis', 'Governance framework review', 'Regulatory obligation mapping', 'Actionable improvement roadmap'] },
  { title: 'Enterprise Risk Management Framework', desc: 'Design and implement a comprehensive ERM framework aligned with ISO 31000 to identify, assess, and mitigate business risks.', features: ['Risk appetite definition', 'Risk assessment and planning', 'Control framework design', 'Risk reporting dashboards', 'Culture and capability building'] },
  { title: 'Compliance Management System (ISO 37301)', desc: 'Implement a robust compliance management system based on ISO 37301 to ensure regulatory adherence and ethical operations.', features: ['Compliance framework setup', 'Regulatory obligation register', 'Policy and procedure development', 'Compliance training programs', 'Continuous monitoring systems'] },
  { title: 'Outsourcing Governance (ISO 37500)', desc: 'Establish effective governance frameworks for outsourced operations ensuring quality, risk control, and regulatory compliance.', features: ['Vendor risk assessment', 'Outsourcing governance framework', 'Service level monitoring', 'Contract compliance review', 'Performance evaluation'] },
  { title: 'Board Advisory Sessions', desc: 'Strategic advisory services for boards and senior leadership on governance best practices, risk oversight, and compliance strategy.', features: ['Board governance assessment', 'Strategic risk workshops', 'Compliance oversight guidance', 'Governance policy development', 'Board effectiveness review'] },
  { title: 'Virtual GRC Advisory', desc: 'Flexible remote advisory services providing ongoing GRC support, guidance, and expertise to organizations across all locations.', features: ['Remote GRC consulting', 'Virtual risk workshops', 'Online compliance reviews', 'Digital documentation', 'Progress tracking tools'] },
]

const managementServices = [
  { title: 'Business Performance Management', desc: 'Comprehensive performance management to optimize your business operations and achieve strategic objectives through data-driven insights.', features: ['Performance metrics design', 'Balanced scorecard implementation', 'KPI development', 'Performance dashboards', 'Continuous improvement cycles'] },
  { title: 'Strategic Planning & Execution', desc: "Develop and execute winning strategies that align your organization's vision with actionable plans, ensuring measurable results.", features: ['Strategic plan development', 'Vision and mission alignment', 'Action plan creation', 'Progress monitoring', 'Strategy review cycles'] },
  { title: 'Operational Improvement', desc: 'Streamline operations, reduce costs, and improve efficiency through proven methodologies and best practices in operational excellence.', features: ['Process optimization', 'Cost reduction strategies', 'Efficiency improvement', 'Quality management', 'Lean methodology'] },
  { title: 'Performance Monitoring', desc: 'Continuous monitoring and reporting systems that track performance, identify trends, and enable proactive decision-making.', features: ['Monitoring system design', 'Real-time reporting', 'Trend analysis', 'Alert mechanisms', 'Management dashboards'] },
  { title: 'Strategy Maturity Assessment', desc: 'Evaluate the connection between your strategies, vision, and purpose through comprehensive assessment and maturity roadmap development.', features: ['Strategic maturity evaluation', 'Capability assessment', 'Gap analysis', 'Improvement roadmap', 'Benchmark comparison'] },
  { title: 'Management Systems Assessment', desc: 'Comprehensive evaluation of your management systems with actionable recommendations for enhancement and certification readiness.', features: ['System effectiveness review', 'Compliance validation', 'Best practice assessment', 'Improvement recommendations', 'Certification support'] },
  { title: 'ISO Excellence', desc: 'Comprehensive ISO services including system design, gap assessment, internal audits, implementation support, and certification validation.', features: ['ISO system design', 'Gap assessment and analysis', 'Internal audits', 'Implementation support', 'Certification validation'] },
  { title: 'Environmental Impact Audit', desc: 'Thorough environmental impact assessment and audit services to ensure regulatory compliance and sustainable business practices.', features: ['Environmental impact review', 'Regulatory audit and assessment', 'Sustainability planning', 'Compliance framework', 'Improvement roadmap'] },
]

const process = [
  { num: '01', title: 'Discovery', desc: 'We begin by understanding your business, challenges, and objectives through in-depth consultation.' },
  { num: '02', title: 'Assessment', desc: 'Based on our assessment, we develop customized strategies and solutions tailored to your specific needs.' },
  { num: '03', title: 'Implementation', desc: 'Our team works alongside yours to implement solutions effectively and efficiently.' },
  { num: '04', title: 'Optimization', desc: 'We continuously monitor, measure, and optimize to ensure sustained success.' },
]

export default function ServicesPage() {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('category') === 'grc' ? 'grc' : 'management')

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat === 'grc' || cat === 'management') setActiveTab(cat)
  }, [searchParams])

  const services = activeTab === 'grc' ? grcServices : managementServices

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden pt-24 lg:pt-[116px]">
        <div className="absolute inset-0 -z-10">
          <img src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop" alt="" className="w-full h-full object-cover brightness-[0.4]" />
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-emerald-700/50 to-sky-700/50" />
        </div>
        <div className="max-w-6xl mx-auto px-4 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1.5 bg-white/15 text-white rounded-full text-xs font-semibold uppercase tracking-wide mb-4 border border-white/20">
              Our Expertise
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">Comprehensive Business Solutions</h1>
            <p className="text-white/80 text-lg">Tailored solutions designed to optimize your business performance, ensure compliance, and drive sustainable growth.</p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-neutral-200 max-w-md mx-auto">
            {[
              { key: 'management', label: 'Management Systems' },
              { key: 'grc', label: 'GRC Advisory' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === tab.key ? 'text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {activeTab === tab.key && (
                  <motion.div layoutId="tab-bg" className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-sky-700 rounded-xl" />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map((s, i) => (
                <ScrollReveal key={s.title} delay={i * 0.08}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-neutral-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group">
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-neutral-900 mb-3">{s.title}</h3>
                      <p className="text-neutral-600 text-sm leading-relaxed mb-4">{s.desc}</p>
                      <ul className="space-y-2">
                        {s.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-neutral-600">
                            <i className="fas fa-check text-emerald-600 mt-0.5 text-xs" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="inline-block px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wide mb-4 border border-emerald-200">
                Our Process
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-2">How We Work</h2>
              <p className="text-neutral-600">A proven methodology that ensures successful outcomes for every engagement.</p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.1}>
                <div className="bg-neutral-50 p-6 rounded-2xl text-center shadow-md border border-neutral-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-sky-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-lg font-bold">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2">{step.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-neutral-900 to-neutral-800 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Ready to Transform Your Business?</h2>
              <p className="text-white/70 mb-6">Contact us today to discuss how our comprehensive services can help your organization achieve operational excellence and global recognition.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-sky-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <span>Get Started Today</span>
                <i className="fas fa-arrow-right" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  )
}
