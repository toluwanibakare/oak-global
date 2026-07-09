import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <img src="/assets/img/logo.png" alt="OAK Global" className="h-20 w-auto object-contain brightness-125 mb-4" />
            <div className="border-t border-b border-white/20 py-4 my-4">
              <p className="text-emerald-400 text-lg font-semibold italic text-center">
                ...helping Organisations achieve and maintain global status for sustained success.
              </p>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Driving Business Performance Through Global Practices. Your trusted partner for operational excellence and compliance solutions.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/60 text-sm hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-white/60 text-sm hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-white/60 text-sm hover:text-emerald-400 transition-colors">Services</Link></li>
              <li><Link to="/contact" className="text-white/60 text-sm hover:text-emerald-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-white/60 text-sm hover:text-emerald-400 transition-colors">Management Systems Services</Link></li>
              <li><Link to="/services" className="text-white/60 text-sm hover:text-emerald-400 transition-colors">GRC Advisory Services</Link></li>
              <li><Link to="/services" className="text-white/60 text-sm hover:text-emerald-400 transition-colors">ISO Excellence</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Contact Info</h4>
            <div className="space-y-2 text-white/60 text-sm">
              <p className="flex items-center gap-2"><i className="fas fa-building text-emerald-400 w-4" /> Professional Business Solutions</p>
              <p className="flex items-center gap-2"><i className="fas fa-calendar text-emerald-400 w-4" /> Available Monday - Friday</p>
              <p className="flex items-center gap-2"><i className="fas fa-clock text-emerald-400 w-4" /> 9:00 AM - 6:00 PM</p>
            </div>
            <br />
            <div className="flex gap-3 mt-4">
              <a href="https://www.instagram.com/oak_global" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-emerald-400 transition-colors text-lg" aria-label="Instagram"><i className="fab fa-instagram" /></a>
              <a href="https://www.facebook.com/share/1JxodipmbR" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-emerald-400 transition-colors text-lg" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
              <a href="https://www.linkedin.com/company/oak-global-international-business-solutions-ltd" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-emerald-400 transition-colors text-lg" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-white/50 text-xs">
          <p>&copy; {new Date().getFullYear()} OAK Global International Business Solutions. All rights reserved.</p>
          <p className="mt-2">Built by <a href="https://tmb.it.com" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline font-semibold">TMB</a></p>
        </div>
      </div>
    </footer>
  )
}
