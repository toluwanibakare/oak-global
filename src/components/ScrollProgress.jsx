import { useState, useEffect } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[100] pointer-events-none">
      <div
        className="h-full bg-emerald-400 transition-[width] duration-150 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}