import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import { submitDemoRequest, getBlockedDates, getBookedSlots } from '../lib/api'

// Defined time slot blocks
const TIME_SLOTS = [
  '09:00 - 11:00',
  '11:30 - 13:30',
  '14:00 - 16:00',
  '16:30 - 18:30'
]

export default function RequestDemoPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const selectedProduct = searchParams.get('product') || 'Full Suite'

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    type: 'online', // 'online' or 'live'
    location: '',
    whatsapp: '',
    preferredDates: [], // Used for live session preferences or online dates list
    bookedSlots: [] // Array of { date: 'YYYY-MM-DD', slot: 'HH:MM - HH:MM' } for Online Sessions
  })

  const [blockedDates, setBlockedDates] = useState([])
  const [allBookedSlots, setAllBookedSlots] = useState([]) // Loaded from DB: array of { date, slot }
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  // Calendar rendering boundaries
  const todayDate = new Date()
  const [currentYear, setCurrentYear] = useState(todayDate.getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(todayDate.getMonth()) // 0-11

  // Fetch blocked dates and already booked slots from database
  useEffect(() => {
    async function loadData() {
      const [dates, slots] = await Promise.all([getBlockedDates(), getBookedSlots()])
      setBlockedDates(dates)
      setAllBookedSlots(slots)
    }
    loadData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  // Toggle date selection for Live Presentation (just dates)
  const handleLiveDateClick = (dateStr) => {
    if (form.preferredDates.includes(dateStr)) {
      setForm((prev) => ({
        ...prev,
        preferredDates: prev.preferredDates.filter((d) => d !== dateStr)
      }))
    } else {
      setForm((prev) => ({
        ...prev,
        preferredDates: [...prev.preferredDates, dateStr]
      }))
    }
    if (errors.preferredDates) setErrors((prev) => ({ ...prev, preferredDates: '' }))
  }

  // Toggle time slot selection for Online Presentation
  const handleSlotClick = (dateStr, slot) => {
    const isSelected = form.bookedSlots.some(s => s.date === dateStr && s.slot === slot)

    if (isSelected) {
      setForm((prev) => ({
        ...prev,
        bookedSlots: prev.bookedSlots.filter(s => !(s.date === dateStr && s.slot === slot))
      }))
    } else {
      setForm((prev) => ({
        ...prev,
        bookedSlots: [...prev.bookedSlots, { date: dateStr, slot }]
      }))
    }
    if (errors.bookedSlots) setErrors((prev) => ({ ...prev, bookedSlots: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email'
    if (!form.company.trim()) errs.company = 'Company is required'

    if (form.type === 'live') {
      if (!form.location.trim()) errs.location = 'Location is required'
      if (!form.whatsapp.trim()) errs.whatsapp = 'WhatsApp number is required'
      if (form.preferredDates.length === 0) {
        errs.preferredDates = 'Please select at least one preferred date'
      }
    } else {
      if (form.bookedSlots.length === 0) {
        errs.bookedSlots = 'Please select at least one available date and time slot'
      }
    }
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
      await submitDemoRequest({
        productName: selectedProduct,
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        type: form.type,
        location: form.type === 'live' ? form.location.trim() : null,
        whatsapp: form.type === 'live' ? form.whatsapp.trim() : null,
        freeDates: form.type === 'live' ? form.preferredDates : form.bookedSlots.map(s => s.date),
        bookedSlots: form.type === 'online' ? form.bookedSlots : []
      })
      setStatus({ type: 'success' })
    } catch (err) {
      console.error(err)
      setStatus({ type: 'error', text: err.message || 'Failed to submit request.' })
    } finally {
      setLoading(false)
    }
  }

  // Generate calendar days for the selected month in this year
  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1)
    const days = []
    while (date.getMonth() === month) {
      days.push(new Date(date))
      date.setDate(date.getDate() + 1)
    }
    return days
  }

  const calendarDays = getDaysInMonth(selectedMonth, currentYear)
  const monthName = new Date(currentYear, selectedMonth, 1).toLocaleString('default', { month: 'long' })

  // Handle month boundary logic
  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11)
      setCurrentYear(prev => prev - 1)
    } else {
      setSelectedMonth(prev => prev - 1)
    }
  }

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0)
      setCurrentYear(prev => prev + 1)
    } else {
      setSelectedMonth(prev => prev - 1 + 2) // work around React state update edge
    }
  }

  // Next-month button disability rules
  const isPrevDisabled = currentYear < todayDate.getFullYear() || (currentYear === todayDate.getFullYear() && selectedMonth <= todayDate.getMonth())
  const isNextDisabled = currentYear > todayDate.getFullYear() + 1 || (currentYear === todayDate.getFullYear() + 1 && selectedMonth >= 11)

  if (status?.type === 'success') {
    const driveLink = import.meta.env.VITE_DEMO_DRIVE_LINK || ''
    return (
      <PageTransition>
        <section className="py-32 bg-neutral-50 min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full mx-auto px-4 text-center bg-white p-8 rounded-2xl shadow-xl border border-neutral-100">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
              <i className="fas fa-check-circle" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Request Accepted</h2>
            <p className="text-neutral-600 mb-6">
              Thank you for requesting a demo. We have sent a confirmation email to <strong>{form.email}</strong>.
              {form.type === 'live' && ' The date, time, and logistics for your Live / In-Person demo will be speculated via email.'}
            </p>
            {driveLink && (
              <div className="mb-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-sm">
                <p className="text-emerald-800 font-semibold mb-1">Explore Resources</p>
                <a href={driveLink} target="_blank" rel="noopener noreferrer" className="text-sky-700 hover:underline inline-block break-all">
                  Google Drive Resource Folder
                </a>
              </div>
            )}
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-sky-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Back to Products
            </button>
          </div>
        </section>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <section className="py-32 bg-neutral-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wide mb-3 border border-emerald-200">
              Demo Booking
            </span>
            <h2 className="text-3xl font-extrabold text-neutral-900 mb-2">
              Request Demo for {selectedProduct}
            </h2>
            <p className="text-neutral-600">
              Fill in your details below to schedule an online or live presentation.
            </p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-neutral-100 max-w-3xl mx-auto">
            {status?.type === 'error' && (
              <div className="mb-6 p-3 rounded-lg flex items-center gap-2 text-sm font-medium bg-red-100 text-red-800 border border-red-200">
                <i className="fas fa-exclamation-triangle" />
                {status.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-800 mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all ${
                      errors.name ? 'border-red-400 focus:border-red-400' : 'border-neutral-200 focus:border-emerald-500'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-800 mb-1.5">Business Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all ${
                      errors.email ? 'border-red-400 focus:border-red-400' : 'border-neutral-200 focus:border-emerald-500'
                    }`}
                    placeholder="john@company.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-1.5">Company Name *</label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all ${
                    errors.company ? 'border-red-400 focus:border-red-400' : 'border-neutral-200 focus:border-emerald-500'
                  }`}
                  placeholder="ACME Corp"
                />
                {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-2">Demo Presentation Format *</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${form.type === 'online' ? 'border-emerald-500 bg-emerald-50/50' : 'border-neutral-200'}`}>
                    <input
                      type="radio"
                      name="type"
                      value="online"
                      checked={form.type === 'online'}
                      onChange={() => setForm((p) => ({ ...p, type: 'online', preferredDates: [], bookedSlots: [] }))}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <p className="text-sm font-bold text-neutral-900">Online Presentation</p>
                      <p className="text-xs text-neutral-500">Live webinar or virtual meeting</p>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${form.type === 'live' ? 'border-emerald-500 bg-emerald-50/50' : 'border-neutral-200'}`}>
                    <input
                      type="radio"
                      name="type"
                      value="live"
                      checked={form.type === 'live'}
                      onChange={() => setForm((p) => ({ ...p, type: 'live', preferredDates: [], bookedSlots: [] }))}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <p className="text-sm font-bold text-neutral-900">Live / In-Person</p>
                      <p className="text-xs text-neutral-500">Site visit (subject to travel costs)</p>
                    </div>
                  </label>
                </div>
              </div>

              {form.type === 'live' ? (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-800 mb-1.5">Site Location *</label>
                      <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all ${
                          errors.location ? 'border-red-400 focus:border-red-400' : 'border-neutral-200 focus:border-emerald-500'
                        }`}
                        placeholder="City, Country"
                      />
                      {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-neutral-800 mb-1.5">WhatsApp Number *</label>
                      <input
                        type="text"
                        name="whatsapp"
                        value={form.whatsapp}
                        onChange={handleChange}
                        className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all ${
                          errors.whatsapp ? 'border-red-400 focus:border-red-400' : 'border-neutral-200 focus:border-emerald-500'
                        }`}
                        placeholder="+123456789"
                      />
                      {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-800 mb-1">Select Preferred Days (Mon - Fri) *</label>
                    <p className="text-xs text-neutral-500 mb-3">Choose the days you are free. Timing will be speculated via email afterwards.</p>
                    
                    {/* Month selector */}
                    <div className="flex justify-between items-center mb-4">
                      <button
                        type="button"
                        disabled={isPrevDisabled}
                        onClick={handlePrevMonth}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md disabled:bg-neutral-200 disabled:text-neutral-400 disabled:shadow-none flex items-center gap-1.5 cursor-pointer"
                      >
                        <i className="fas fa-chevron-left text-[10px]" />
                        <span>Prev Month</span>
                      </button>
                      <span className="text-sm font-extrabold text-neutral-900 bg-neutral-100 px-4 py-2 rounded-xl border border-neutral-200">{monthName} {currentYear}</span>
                      <button
                        type="button"
                        disabled={isNextDisabled}
                        onClick={handleNextMonth}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md disabled:bg-neutral-200 disabled:text-neutral-400 disabled:shadow-none flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Next Month</span>
                        <i className="fas fa-chevron-right text-[10px]" />
                      </button>
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 border border-neutral-200 p-3 rounded-xl">
                      {calendarDays.map((date) => {
                        const dateStr = date.toISOString().slice(0, 10)
                        const isPast = date < todayDate
                        const day = date.getDay()
                        const isWeekend = day === 0 || day === 6
                        const isBlocked = blockedDates.includes(dateStr) || isPast || isWeekend
                        const isSelected = form.preferredDates.includes(dateStr)

                        return (
                          <button
                            key={dateStr}
                            type="button"
                            disabled={isBlocked}
                            onClick={() => handleLiveDateClick(dateStr)}
                            className={`p-2 rounded-lg border text-center transition-all flex flex-col items-center justify-center ${
                              isWeekend
                                ? 'bg-neutral-50 text-neutral-300 border-neutral-200 cursor-not-allowed'
                                : isBlocked
                                ? 'bg-neutral-100 text-neutral-300 border-neutral-100 cursor-not-allowed'
                                : isSelected
                                ? 'bg-emerald-600 text-white border-emerald-600 font-semibold'
                                : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-800 font-semibold'
                            }`}
                          >
                            <span className="text-[10px] uppercase font-bold opacity-60">
                              {date.toLocaleDateString(undefined, { weekday: 'short' })}
                            </span>
                            <span className="text-sm mt-0.5">{date.getDate()}</span>
                          </button>
                        )
                      })}
                    </div>
                    {errors.preferredDates && <p className="text-red-500 text-xs mt-2">{errors.preferredDates}</p>}

                    {/* Date Request Prompt */}
                    <div className="mt-4 p-3.5 bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 rounded-xl leading-relaxed flex items-start gap-2.5">
                      <i className="fas fa-circle-info text-emerald-600 mt-0.5" />
                      <div>
                        If none of these days work for you, feel free to submit a custom date/time proposal by contacting us directly at{' '}
                        <a href="mailto:info@oak-global.com.ng" className="text-emerald-600 font-bold hover:underline">
                          info@oak-global.com.ng
                        </a>{' '}
                        or through our{' '}
                        <a href="/contact" className="text-emerald-600 font-bold hover:underline">
                          Contact Form
                        </a>. We will review your request immediately.
                      </div>
                    </div>

                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-neutral-800 mb-1">Select Available Dates & Time Slots (Mon - Fri) *</label>
                  <p className="text-xs text-neutral-500 mb-3">Sessions last 2 hours followed by a 30-minute break. Select a day, then toggle your time slots.</p>
                  
                  {/* Month selector */}
                  <div className="flex justify-between items-center mb-4">
                    <button
                      type="button"
                      disabled={isPrevDisabled}
                      onClick={handlePrevMonth}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md disabled:bg-neutral-200 disabled:text-neutral-400 disabled:shadow-none flex items-center gap-1.5 cursor-pointer"
                    >
                      <i className="fas fa-chevron-left text-[10px]" />
                      <span>Prev Month</span>
                    </button>
                    <span className="text-sm font-extrabold text-neutral-900 bg-neutral-100 px-4 py-2 rounded-xl border border-neutral-200">{monthName} {currentYear}</span>
                    <button
                      type="button"
                      disabled={isNextDisabled}
                      onClick={handleNextMonth}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md disabled:bg-neutral-200 disabled:text-neutral-400 disabled:shadow-none flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Next Month</span>
                      <i className="fas fa-chevron-right text-[10px]" />
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[350px] overflow-y-auto border border-neutral-200 p-3 rounded-xl">
                    {calendarDays.map((date) => {
                      const dateStr = date.toISOString().slice(0, 10)
                      const isPast = date < todayDate
                      const day = date.getDay()
                      const isWeekend = day === 0 || day === 6
                      const isBlocked = blockedDates.includes(dateStr) || isPast || isWeekend

                      if (isWeekend) return null // Hide weekends in Online presentation slots manager to save space

                      return (
                        <div key={dateStr} className={`p-3 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 ${isBlocked ? 'bg-neutral-50 border-neutral-100 opacity-60' : 'bg-white border-neutral-200'}`}>
                          <div>
                            <span className="text-xs uppercase font-bold text-emerald-600 block">
                              {date.toLocaleDateString(undefined, { weekday: 'long' })}
                            </span>
                            <span className="text-sm font-bold text-neutral-900">
                              {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                            {isBlocked && <span className="text-xs text-red-500 ml-2">(Unavailable)</span>}
                          </div>

                          {!isBlocked && (
                            <div className="grid grid-cols-2 gap-1.5 shrink-0">
                              {TIME_SLOTS.map((slot) => {
                                const isSelected = form.bookedSlots.some(s => s.date === dateStr && s.slot === slot)
                                const isAlreadyBooked = allBookedSlots.some(s => s.date === dateStr && s.slot === slot)

                                return (
                                  <button
                                    key={slot}
                                    type="button"
                                    disabled={isAlreadyBooked}
                                    onClick={() => handleSlotClick(dateStr, slot)}
                                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                                      isAlreadyBooked
                                        ? 'bg-neutral-100 text-neutral-400 border-neutral-150 cursor-not-allowed line-through'
                                        : isSelected
                                        ? 'bg-emerald-600 text-white border-emerald-600'
                                        : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-700'
                                    }`}
                                  >
                                    {slot} {isAlreadyBooked && '(Booked)'}
                                  </button>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  {errors.bookedSlots && <p className="text-red-500 text-xs mt-2">{errors.bookedSlots}</p>}

                  {/* Date Request Prompt */}
                  <div className="mt-4 p-3.5 bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 rounded-xl leading-relaxed flex items-start gap-2.5">
                    <i className="fas fa-circle-info text-emerald-600 mt-0.5" />
                    <div>
                      If none of these days work for you, feel free to submit a custom date/time proposal by contacting us directly at{' '}
                      <a href="mailto:info@oak-global.com.ng" className="text-emerald-600 font-bold hover:underline">
                        info@oak-global.com.ng
                      </a>{' '}
                      or through our{' '}
                      <a href="/contact" className="text-emerald-600 font-bold hover:underline">
                        Contact Form
                      </a>. We will review your request immediately.
                    </div>
                  </div>

                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-sky-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Submitting Request...' : 'Book Demo Session'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
