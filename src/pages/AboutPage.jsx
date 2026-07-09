import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import PageTransition from '../components/PageTransition'
import { motion } from 'framer-motion'

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

export default function AboutPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden pt-24 md:pt-0">
        <div className="absolute inset-0 -z-10">
          <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop" alt="" className="w-full h-full object-cover brightness-[0.4]" />
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-emerald-700/50 to-sky-700/50" />
        </div>
        <div className="max-w-6xl mx-auto px-4 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1.5 bg-white/15 text-white rounded-full text-xs font-semibold uppercase tracking-wide mb-4 border border-white/20">
              About OAK Global
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">Excellence in Global Business Solutions</h1>
            <p className="text-white/80 text-lg">Empowering organizations to achieve operational excellence and international recognition through strategic business performance management.</p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wide mb-4 border border-emerald-200">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-6">Who We Are</h2>
              <div className="w-full max-w-3xl mx-auto mb-8">
                <video
                  src="/assets/video/OAK%20GLOBAL.mp4"
                  poster="/assets/img/logo.png"
                  className="w-full rounded-2xl shadow-lg bg-black"
                  muted
                  playsInline
                  preload="auto"
                  controls
                />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <p className="text-lg font-semibold text-neutral-900 mb-6">
                  At Oak Global International Business Solutions, we specialize in helping organizations achieve and maintain global status through comprehensive business performance management and strategic excellence.
                </p>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  Founded on the principles of integrity, expertise, and results-driven approaches, we have established ourselves as trusted partners to businesses across various industries. Our team of seasoned professionals brings decades of combined experience in business strategy, ISO compliance, regulatory frameworks, and performance optimization.
                </p>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  We understand that every organization is unique, which is why we provide customized solutions that align with your specific goals and challenges.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-sky-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  <span>Get Started Today</span>
                  <i className="fas fa-arrow-right" />
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" alt="Professional business team" className="w-full h-[400px] object-cover" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="inline-block px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wide mb-4 border border-emerald-200">
                Our Foundation
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-2">Vision & Mission</h2>
              <p className="text-neutral-600">The driving forces behind everything we do at OAK Global.</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: 'fa-eye', title: 'Our Vision', text: 'To be the leading partner in delivering world-class business support that equips organizations with winning strategies for visibility and access to the global markets.', subtext: 'We envision a world where businesses of all sizes can achieve international recognition and sustainable success through strategic excellence and operational optimization.' },
              { icon: 'fa-bullseye', title: 'Our Mission', text: 'To provide business performance solutions that empower organizations to achieve excellence, ensure compliance and drive sustainable growth.', subtext: 'Through our comprehensive approach to performance management, compliance validation, and strategic assessment, we help our clients build resilient, efficient, and compliant operations.' },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.15}>
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-emerald-100/50 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-sky-700 rounded-xl flex items-center justify-center text-white text-xl">
                      <i className={`fas ${item.icon}`} />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                  </div>
                  <p className="font-semibold text-neutral-800 mb-4 leading-relaxed">{item.text}</p>
                  <p className="text-neutral-600 leading-relaxed">{item.subtext}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="inline-block px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wide mb-4 border border-emerald-200">
                Our Foundation
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-2">Core Values That Drive Us</h2>
              <p className="text-neutral-600">These fundamental principles guide every decision we make and every solution we deliver.</p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className="bg-neutral-50 p-8 rounded-2xl text-center shadow-md border border-neutral-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-sky-700 rounded-xl flex items-center justify-center mx-auto mb-6 text-white text-2xl">
                    <i className={`fas ${v.icon}`} />
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900 mb-3">{v.title}</h4>
                  <p className="text-neutral-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" alt="Professional team meeting" className="w-full h-[400px] object-cover" />
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal>
                <span className="inline-block px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wide mb-4 border border-emerald-200">
                  Our Expertise
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-3">Why Choose OAK Global</h2>
                <p className="text-lg font-semibold text-neutral-800 mb-6">Our success is built on a foundation of expertise, experience, and unwavering commitment to client success.</p>
              </ScrollReveal>

              <div className="space-y-4">
                {expertise.map((e, i) => (
                  <ScrollReveal key={e.title} delay={i * 0.1}>
                    <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-neutral-100 hover:-translate-x-1 transition-all duration-300">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-sky-700 rounded-xl flex items-center justify-center text-white text-lg shrink-0">
                        <i className={`fas ${e.icon}`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-900 mb-1">{e.title}</h4>
                        <p className="text-neutral-600 text-sm leading-relaxed">{e.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal>
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-sky-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 mt-6">
                  <span>Work With Us</span>
                  <i className="fas fa-arrow-right" />
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
