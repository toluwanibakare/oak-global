import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import OakEIPNav from './components/OakEIPNav'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import ProductsPage from './pages/ProductsPage'
import RequestDemoPage from './pages/RequestDemoPage'
import OakEIPPage from './pages/OakEIPPage'
import OakEIPPricingPage from './pages/OakEIPPricingPage'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const isOakEIPRoute = location.pathname.startsWith('/oakeip');

  return (
    <div className="min-h-screen flex flex-col">
      {!isOakEIPRoute && <Navbar />} {isOakEIPRoute && <OakEIPNav />}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/request-demo" element={<RequestDemoPage />} />
            <Route path="/oakeip" element={<OakEIPPage />} />\n            <Route path="/oakeip/request-demo" element={<RequestDemoPage />} />
            <Route path="/oakeip/pricing" element={<OakEIPPricingPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
