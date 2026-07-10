import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const btnRef = useRef(null)

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

  const radius = 18
  const circumference = 2 * Math.PI * radius
  const offset = circumference - progress * circumference

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          ref={btnRef}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 cursor-pointer group"
          aria-label="Back to top"
        >
          {/* Glow ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r={radius} fill="none" stroke="rgba(52,211,153,0.15)" strokeWidth="2.5" />
            <motion.circle
              cx="22" cy="22" r={radius} fill="none"
              stroke="rgba(52,211,153,0.7)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
          </svg>
          {/* Button */}
          <div className="relative w-11 h-11 bg-neutral-900 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-400 group-hover:shadow-[0_0_20px_-4px_rgba(52,211,153,0.3)] transition-all duration-300">
            <i className="fas fa-arrow-up text-white/60 text-sm group-hover:text-white transition-colors duration-300" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
