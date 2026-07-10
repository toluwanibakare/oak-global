import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const products = [
  { label: 'OakAudix', desc: 'Audit Management', icon: 'fa-clipboard-check' },
  { label: 'OakComply', desc: 'Compliance Management', icon: 'fa-shield-halved' },
  { label: 'OakHSE360', desc: 'Health, Safety & Environment', icon: 'fa-leaf' },
  { label: 'OakExec', desc: 'Executive Intelligence', icon: 'fa-chart-pie' },
]

const links = [
  { label: 'Home', to: '/', icon: 'fa-house' },
  { label: 'About', to: '/about', icon: 'fa-building' },
  { label: 'Services', to: '/services', icon: 'fa-briefcase' },
  { label: 'Products', icon: 'fa-cubes', dropdown: products },
  { label: 'Resources', icon: 'fa-folder-open' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const lastScrollY = useRef(0)
  const navHiddenRef = useRef(false)
  const hideTimer = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    navHiddenRef.current = navHidden
  }, [navHidden])

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      const direction = currentY > lastScrollY.current ? 'down' : 'up'
      lastScrollY.current = currentY

      if (direction === 'down' && currentY > 80) {
        setNavHidden(true)
      } else if (direction === 'up') {
        setNavHidden(false)
      }

      setScrolled(currentY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onMouseMove = (e) => {
      if (e.clientY < 130) {
        setNavHidden(false)
        if (hideTimer.current) {
          clearTimeout(hideTimer.current)
          hideTimer.current = null
        }
      } else if (!navHiddenRef.current && window.scrollY > 100) {
        if (!hideTimer.current) {
          hideTimer.current = setTimeout(() => {
            setNavHidden(true)
            hideTimer.current = null
          }, 2000)
        }
      } else if (e.clientY >= 130 && hideTimer.current) {
        clearTimeout(hideTimer.current)
        hideTimer.current = null
      }
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      if (hideTimer.current) clearTimeout(hideTimer.current)
    }
  }, [])

  useEffect(() => {
    setOpen(false)
    document.body.style.overflow = ''
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-neutral-900 max-lg:hidden">
        <div className="mx-auto max-w-[1440px] h-9 flex items-center justify-between px-10 lg:px-16">
          <div className="flex items-center gap-8 text-white/50 text-[11px]">
            <a href="mailto:o.kolawole@oak-global.com.ng" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <i className="fas fa-envelope text-[9px] text-emerald-500" />
              o.kolawole@oak-global.com.ng
            </a>
            <span className="flex items-center gap-1.5">
              <i className="fas fa-phone text-[9px] text-emerald-500" />
              +234 809 990 4338
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="text-white/50 hover:text-white text-[11px] transition-colors flex items-center gap-1.5">
              <i className="fas fa-headset text-[9px]" />
              Support
            </Link>
            <span className="text-white/20 text-[11px]">|</span>
            <Link to="/contact" className="text-white/50 hover:text-white text-[11px] transition-colors flex items-center gap-1.5">
              <i className="fas fa-lock text-[9px]" />
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className="fixed left-0 right-0 z-40 transition-[top] duration-300 ease-out"
        style={{
          top: mobile ? '0' : navHidden ? '-120px' : '36px',
          backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.95)',
          boxShadow: scrolled ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(0,0,0,0.04)',
        }}
      >
        <nav className="mx-auto max-w-[1440px] flex items-center justify-between h-16 lg:h-20 px-10 lg:px-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 shrink-0 group">
            <img
              src="/logo.png"
              alt="OAK Global"
              className="h-10 lg:h-[52px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="leading-tight hidden sm:block">
              <div className="text-sm lg:text-base font-extrabold text-neutral-800 tracking-tight">OAK Global</div>
              <div className="text-[9px] lg:text-[10px] font-semibold text-emerald-600 tracking-[0.2em] uppercase">Enterprise Platform</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-3">
            {links.map((item) => {
              if (item.dropdown) {
                return (
                  <div key={item.label} className="relative group">
                    <button className="flex items-center gap-1.5 px-5 py-2 text-sm font-semibold text-neutral-600 hover:text-emerald-600 transition-all duration-200">
                      <i className={`fas ${item.icon} text-[11px]`} />
                      {item.label}
                      <i className="fas fa-chevron-down text-[8px] ml-0.5 group-hover:-rotate-180 transition-transform duration-300" />
                    </button>
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                      <div className="bg-white rounded-none shadow-xl border border-neutral-200 p-2 w-72">
                        {item.dropdown.map((product) => (
                          <a key={product.label} href="#" className="flex items-center gap-3 px-4 py-3 rounded-none hover:bg-emerald-50 transition-colors">
                            <div className="w-9 h-9 bg-emerald-100 rounded-none flex items-center justify-center shrink-0">
                              <i className={`fas ${product.icon} text-emerald-600 text-sm`} />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-neutral-800">{product.label}</div>
                              <div className="text-xs text-neutral-500">{product.desc}</div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }
              if (!item.to) {
                return (
                  <span
                    key={item.label}
                    className="px-3 py-2 text-sm text-neutral-300 cursor-default select-none flex items-center gap-1.5"
                  >
                    <i className={`fas ${item.icon} text-[10px]`} />
                    {item.label}
                  </span>
                )
              }
              const active = pathname === item.to
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative px-5 py-2 text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? 'text-emerald-600'
                      : 'text-neutral-600 hover:text-emerald-600'
                  }`}
                >
                  <i className={`fas ${item.icon} text-[11px]`} />
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="underline"
                      className="absolute -bottom-px left-5 right-5 h-0.5 bg-emerald-600"
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-sky-700 rounded-none shadow-lg hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-0.5 active:scale-[0.97] whitespace-nowrap transition-all duration-300"
            >
              <span>Get Started</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden flex flex-col items-end gap-1 p-3 rounded-none hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2.5px] bg-neutral-700 rounded-full origin-center"
            />
            <motion.span
              animate={open ? { opacity: 0, x: 12 } : { opacity: 1, x: 0 }}
              className="block w-6 h-[2.5px] bg-neutral-700 rounded-full"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2.5px] bg-neutral-700 rounded-full origin-center"
            />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-96 max-w-[90vw] bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full pt-6 pb-10">
                {/* Mobile logo */}
                <div className="px-8 pb-8 border-b border-neutral-100">
                  <Link to="/" className="flex items-center gap-4" onClick={() => setOpen(false)}>
                    <img src="/logo.png" alt="OAK Global" className="h-10 w-auto object-contain" />
                    <div className="leading-tight">
                      <div className="text-base font-extrabold text-neutral-800">OAK Global</div>
                      <div className="text-[10px] font-semibold text-emerald-600 tracking-[0.2em] uppercase">Enterprise Platform</div>
                    </div>
                  </Link>
                </div>

                {/* Nav links */}
                <div className="flex-1 overflow-y-auto px-6 pt-8 space-y-2">
                  {links.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      {item.dropdown ? (
                        <div>
                          <button
                            onClick={() => setProductsOpen(!productsOpen)}
                            className="flex items-center justify-between w-full px-5 py-3 text-base font-semibold text-neutral-600 rounded-none hover:bg-emerald-50/60 transition-all"
                          >
                            <span className="flex items-center gap-3">
                              <i className="fas fa-cubes w-5 text-center text-neutral-400" />
                              {item.label}
                            </span>
                            <motion.i
                              animate={{ rotate: productsOpen ? 180 : 0 }}
                              className="fas fa-chevron-down text-neutral-300 text-sm"
                            />
                          </button>
                          <AnimatePresence>
                            {productsOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="ml-3 mt-1 space-y-1 pl-4 border-l-2 border-emerald-100">
                                  {item.dropdown.map((product) => (
                                    <a key={product.label} href="#" className="flex items-center gap-3 px-4 py-3 rounded-none hover:bg-emerald-50 transition-colors">
                                      <div className="w-8 h-8 bg-emerald-100 rounded-none flex items-center justify-center shrink-0">
                                        <i className={`fas ${product.icon} text-emerald-600 text-xs`} />
                                      </div>
                                      <div>
                                        <div className="text-sm font-semibold text-neutral-800">{product.label}</div>
                                        <div className="text-[11px] text-neutral-500">{product.desc}</div>
                                      </div>
                                    </a>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : !item.to ? (
                        <div className="px-5 py-2.5 text-sm font-semibold text-neutral-400 flex items-center gap-3">
                          <i className={`fas ${item.icon} w-5 text-center`} />
                          {item.label}
                        </div>
                      ) : (
                        <Link
                          to={item.to}
                          className={`flex items-center justify-between px-5 py-3 text-base font-semibold rounded-none transition-all ${
                            pathname === item.to
                              ? 'text-emerald-700 bg-emerald-50'
                              : 'text-neutral-600 hover:text-emerald-700 hover:bg-emerald-50/60'
                          }`}
                          onClick={() => setOpen(false)}
                        >
                          <span className="flex items-center gap-3">
                            <i className={`fas ${item.icon} w-5 text-center text-base ${
                              pathname === item.to ? 'text-emerald-600' : 'text-neutral-400'
                            }`} />
                            {item.label}
                          </span>
                          <svg
                            className={`w-5 h-5 transition-all duration-200 ${
                              pathname === item.to ? 'text-emerald-600 translate-x-0.5' : 'text-neutral-300'
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <div className="px-6 pt-6 border-t border-neutral-100">
                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-center gap-3 w-full px-6 py-3.5 text-base font-bold text-white bg-gradient-to-r from-emerald-600 to-sky-700 rounded-none shadow-lg hover:shadow-xl hover:shadow-emerald-500/20 transition-all"
                  >
                    <span>Get Started</span>
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
