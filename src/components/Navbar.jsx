import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { path: '/', label: 'HOME', icon: 'fa-home' },
  { path: '/about', label: 'ABOUT', icon: 'fa-users' },
  { path: '/services', label: 'SERVICES', icon: 'fa-cogs' },
  { path: '/contact', label: 'CONTACT', icon: 'fa-envelope' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-neutral-900 py-1.5 px-4 max-md:hidden">
        <div className="max-w-6xl mx-auto flex justify-end items-center gap-6">
          <a href="mailto:o.kolawole@oak-global.com.ng" className="flex items-center gap-1.5 text-white/80 text-xs font-medium hover:text-emerald-400 transition-colors">
            <i className="fas fa-envelope text-emerald-400 text-[10px]" />
            o.kolawole@oak-global.com.ng
          </a>
          <span className="flex items-center gap-1.5 text-white/80 text-xs">
            <i className="fas fa-phone text-emerald-400 text-[10px]" />
            +2348099904338 | +234 802 364 4148
          </span>
        </div>
      </div>

      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-white/98 shadow-md backdrop-blur-lg' : 'bg-white/95'
        } ${window.innerWidth > 768 ? 'top-[34px]' : 'top-0'}`}
        style={{ top: window.innerWidth > 768 ? (scrolled ? '0' : '34px') : '0' }}
      >
        <nav className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src="/assets/img/logo.png" alt="OAK Global" className="h-[70px] w-auto object-contain transition-all duration-300 max-md:h-[50px]" />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 relative ${
                    isActive ? 'text-emerald-700 bg-emerald-50' : 'text-neutral-800 hover:text-emerald-700 hover:bg-emerald-50/50'
                  }`}
                >
                  <i className={`fas ${item.icon} text-[10px]`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div layoutId="nav-indicator" className="absolute -bottom-px left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-emerald-600 rounded-full" />
                  )}
                </Link>
              )
            })}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer z-50"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-neutral-800 rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-0.5 bg-neutral-800 rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-neutral-800 rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-xl transition-all ${
                      location.pathname === item.path ? 'text-emerald-700 bg-emerald-50' : 'text-neutral-800 hover:text-emerald-700'
                    }`}
                  >
                    <i className={`fas ${item.icon} w-6 text-center`} />
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
