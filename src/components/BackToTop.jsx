import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0)
      setVisible(scrollTop > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const radius = 17
  const circumference = 2 * Math.PI * radius
  const offset = circumference - progress * circumference

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.6, rotate: 90 }}
          transition={{ type: 'spring', stiffness: 250, damping: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-4 right-6 z-50 cursor-pointer group"
          aria-label="Back to top"
        >
          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
            <motion.circle
              cx="20" cy="20" r={radius} fill="none"
              stroke="rgba(52,211,153,0.6)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
            <circle cx="20" cy="20" r="16" fill="rgba(255,255,255,0.04)" className="group-hover:fill-emerald-500/10 transition-colors duration-300" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <i className="fas fa-arrow-up text-emerald-400/70 text-sm group-hover:text-emerald-400 transition-colors duration-300" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
