import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import PageTransition from '../components/PageTransition'
import { submitContact } from '../lib/api'

const benefits = [
  { icon: 'fa-clock', title: 'Quick Response', desc: 'We respond to all inquiries within 24 hours.' },
  { icon: 'fa-handshake', title: 'Expert Consultation', desc: 'Get advice from certified industry professionals.' },
  { icon: 'fa-cogs', title: 'Customized Solutions', desc: 'Tailored strategies for your unique business needs.' },
  { icon: 'fa-shield-alt', title: 'Confidentiality', desc: 'Your information is handled with utmost discretion.' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address'
    if (!form.message.trim()) errs.message = 'Message is required'
    else if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    setStatus(null)
    try {
      await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim() || null,
        service: form.service || null,
        message: form.message.trim(),
      })
      setStatus({ type: 'success', text: 'Thank you! We will get back to you within 24 hours.' })
      setForm({ name: '', email: '', company: '', service: '', message: '' })
    } catch {
      setStatus({ type: 'error', text: 'Sorry, something went wrong. Please try again or contact us directly.' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden pt-24 lg:pt-[116px]">
        <div className="absolute inset-0 -z-10">
          <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop" alt="" className="w-full h-full object-cover brightness-[0.4]" />
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-emerald-700/50 to-sky-700/50" />
        </div>
        <div className="max-w-6xl mx-auto px-4 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1.5 bg-white/15 text-white rounded-full text-xs font-semibold uppercase tracking-wide mb-4 border border-white/20">
              Get In Touch
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">Let's Work Together</h1>
            <p className="text-white/80 text-lg">Ready to transform your business? Reach out and our team will respond within 24 hours.</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <ScrollReveal>
                <h2 className="text-3xl font-extrabold text-neutral-900 mb-4">Get In Touch</h2>
                <p className="text-neutral-600 mb-6">Have a question, project, or idea? We'd love to hear from you.</p>
              </ScrollReveal>

              <ScrollReveal>
                <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
                  <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" alt="Contact" className="w-full h-[280px] object-cover" />
                </div>
              </ScrollReveal>

              <div className="space-y-4">
                {[
                  { icon: 'fa-envelope', title: 'Email', text: 'o.kolawole@oak-global.com.ng', href: 'mailto:o.kolawole@oak-global.com.ng' },
                  { icon: 'fa-phone', title: 'Phone', text: '+2348099904338', href: 'tel:+2348099904338' },
                  { icon: 'fa-clock', title: 'Business Hours', text: 'Monday - Friday, 9:00 AM - 6:00 PM' },
                ].map((item, i) => (
                  <ScrollReveal key={item.title} delay={i * 0.1}>
                    <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-xl border border-emerald-100/50 hover:translate-x-1 hover:shadow-md transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-sky-700 rounded-xl flex items-center justify-center text-white shrink-0">
                        <i className={`fas ${item.icon}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900">{item.title}</h4>
                        {item.href ? (
                          <a href={item.href} className="text-sky-700 text-sm hover:underline">{item.text}</a>
                        ) : (
                          <p className="text-neutral-600 text-sm">{item.text}</p>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Form */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="bg-neutral-50 p-6 md:p-8 rounded-2xl shadow-lg border border-emerald-100/50">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">Send Us a Message</h3>
                  <p className="text-neutral-600 text-sm">Fill out the form and we'll get back to you shortly.</p>
                </div>

                {status && (
                  <div className={`mb-6 p-3 rounded-lg flex items-center gap-2 text-sm font-medium ${
                    status.type === 'success' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    <i className={`fas ${status.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}`} />
                    {status.text}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-1.5">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={`w-full p-3 pl-10 border-2 rounded-xl text-sm transition-all outline-none bg-white ${
                        errors.name ? 'border-red-400' : 'border-neutral-200 focus:border-emerald-500 focus:shadow-[0_0_0_3px_rgba(4,120,87,0.15)]'
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-1.5">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`w-full p-3 pl-10 border-2 rounded-xl text-sm transition-all outline-none bg-white ${
                        errors.email ? 'border-red-400' : 'border-neutral-200 focus:border-emerald-500 focus:shadow-[0_0_0_3px_rgba(4,120,87,0.15)]'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-neutral-800 mb-1.5">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        className="w-full p-3 pl-10 border-2 border-neutral-200 rounded-xl text-sm transition-all outline-none bg-white focus:border-emerald-500 focus:shadow-[0_0_0_3px_rgba(4,120,87,0.15)]"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-800 mb-1.5">Service Interest</label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="w-full p-3 border-2 border-neutral-200 rounded-xl text-sm transition-all outline-none bg-white focus:border-emerald-500 focus:shadow-[0_0_0_3px_rgba(4,120,87,0.15)]"
                      >
                        <option value="">Select service</option>
                        <option value="business-performance">Business Performance Management</option>
                        <option value="strategy-assessment">Strategy Maturity Assessment</option>
                        <option value="management-systems">Management Systems Assessment</option>
                        <option value="regulatory-compliance">Regulatory Compliance Assessment</option>
                        <option value="iso-compliance">ISO Compliance Validation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-1.5">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full p-3 border-2 rounded-xl text-sm transition-all outline-none bg-white resize-vertical ${
                        errors.message ? 'border-red-400' : 'border-neutral-200 focus:border-emerald-500 focus:shadow-[0_0_0_3px_rgba(4,120,87,0.15)]'
                      }`}
                      placeholder="Tell us about your project..."
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-sky-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <span>Sending...</span>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <i className="fas fa-paper-plane" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="inline-block px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wide mb-4 border border-emerald-200">
                Why Contact Us
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-2">Here's What to Expect</h2>
              <p className="text-neutral-600">When you reach out to OAK Global, you can expect professional, timely, and customized support.</p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.1}>
                <div className="bg-white p-6 rounded-2xl text-center shadow-md border border-neutral-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-sky-700 rounded-xl flex items-center justify-center mx-auto mb-4 text-white text-2xl group-hover:scale-110 group-hover:rotate-3 transition-all">
                    <i className={`fas ${b.icon}`} />
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2">{b.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
