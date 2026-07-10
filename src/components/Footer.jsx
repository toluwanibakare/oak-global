import { Link } from 'react-router-dom'

const products = [
  { name: 'OakAudix', desc: 'Audit Management' },
  { name: 'OakComply', desc: 'Compliance Management' },
  { name: 'OakHSE360', desc: 'HSE Management' },
  { name: 'OakExec', desc: 'Executive Intelligence' },
]

export default function Footer() {
  return (
    <footer className="relative bg-neutral-950 text-white overflow-hidden">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* Top accent line */}
      <div className="relative h-1 bg-gradient-to-r from-emerald-500/20 via-emerald-400 to-emerald-500/20" />

      {/* CTA strip */}
      <div className="relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white text-lg font-semibold">Ready to transform your enterprise?</p>
            <p className="text-white/40 text-sm mt-1">Explore our intelligence platform. One unified view across audit, compliance, HSE, and executive insights.</p>
          </div>
          <Link to="/contact" className="shrink-0 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold text-sm px-6 py-3 transition-colors">
            Get Started
            <i className="fas fa-arrow-right text-xs" />
          </Link>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-none flex items-center justify-center">
                <img src="/logo.png" alt="OAK Global" className="h-7 w-auto object-contain brightness-125" />
              </div>
              <div>
                <span className="text-white text-lg font-bold tracking-tight">OAK Global</span>
                <p className="text-emerald-400 text-[10px] uppercase tracking-[0.15em] font-semibold leading-tight">Enterprise Intelligence Platform</p>
              </div>
            </div>
            <p className="text-emerald-400/80 text-sm font-medium italic mb-5 leading-relaxed border-l-2 border-emerald-500/30 pl-4">
              &ldquo;...helping Organisations achieve and maintain global status for sustained success.&rdquo;
            </p>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Driving business performance through global practices. Your trusted partner for operational excellence and compliance solutions.
            </p>
          </div>

          {/* Products */}
          <div className="lg:col-span-2">
            <h4 className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-semibold mb-6">Products</h4>
            <ul className="space-y-4">
              {products.map((p) => (
                <li key={p.name}>
                  <span className="text-white/80 text-sm font-medium hover:text-emerald-400 transition-colors cursor-default">{p.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Services', 'Contact'].map((label) => {
                const to = label === 'Home' ? '/' : `/${label.toLowerCase().replace(/\s+/g, '')}`
                return (
                  <li key={label}>
                    <Link to={to} className="text-white/50 text-sm hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-3 h-px bg-emerald-400 transition-all duration-300" />
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-semibold mb-6">Contact</h4>
            <div className="space-y-4 text-white/50 text-sm">
              <div className="flex items-start gap-3 group">
                <span className="w-8 h-8 bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                  <i className="fas fa-building text-emerald-400 text-xs" />
                </span>
                <span className="pt-1.5">Professional Business Solutions</span>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="w-8 h-8 bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                  <i className="fas fa-calendar text-emerald-400 text-xs" />
                </span>
                <span className="pt-1.5">Monday - Friday</span>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="w-8 h-8 bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                  <i className="fas fa-clock text-emerald-400 text-xs" />
                </span>
                <span className="pt-1.5">9:00 AM - 6:00 PM</span>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              {[
                { icon: 'fab fa-instagram', href: 'https://www.instagram.com/oak_global', label: 'Instagram' },
                { icon: 'fab fa-facebook-f', href: 'https://www.facebook.com/share/1JxodipmbR', label: 'Facebook' },
                { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/company/oak-global-international-business-solutions-ltd', label: 'LinkedIn' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/5 flex items-center justify-center hover:bg-emerald-500/20 text-white/40 hover:text-emerald-400 transition-all" aria-label={s.label}>
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-8 pb-14 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/30 text-xs">
          <p>&copy; {new Date().getFullYear()} OAK Global Enterprise Intelligence Platform. All rights reserved.</p>
          <p>Built by <a href="https://tmb.it.com" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-400 transition-colors font-medium">TMB</a></p>
        </div>
      </div>
    </footer>
  )
}
