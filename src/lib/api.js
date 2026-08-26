import { supabase } from './supabase'

/**
 * Submits contact form data directly to the Supabase database
 * and triggers notification/confirmation emails.
 */
export async function submitContact(data) {
  const { data: inserted, error } = await supabase
    .from('contact_submissions')
    .insert([
      {
        name: data.name,
        email: data.email,
        company: data.company || null,
        service: data.service || null,
        message: data.message
      }
    ])
    .select()

  if (error) {
    console.error('Supabase contact submission error:', error)
    throw new Error(error.message || 'Failed to submit contact')
  }

  // Trigger emails
  try {
    await sendEmails({
      type: 'contact',
      recipientName: data.name,
      recipientEmail: data.email,
      payload: data
    })
  } catch (emailErr) {
    console.error('Non-critical email dispatch failure:', emailErr)
  }

  return { success: true, data: inserted }
}

/**
 * Submits demo request data directly to the Supabase database
 * and triggers notification/confirmation emails.
 */
export async function submitDemoRequest(data) {
  const { data: inserted, error } = await supabase
    .from('demo_requests')
    .insert([
      {
        product_name: data.productName,
        name: data.name,
        email: data.email,
        company: data.company,
        type: data.type,
        location: data.location || null,
        whatsapp: data.whatsapp || null,
        free_dates: data.freeDates || [],
        booked_slots: data.bookedSlots || []
      }
    ])
    .select()

  if (error) {
    console.error('Supabase demo request error:', error)
    throw new Error(error.message || 'Failed to submit demo request')
  }

  // Trigger emails
  try {
    await sendEmails({
      type: 'demo',
      recipientName: data.name,
      recipientEmail: data.email,
      payload: data
    })
  } catch (emailErr) {
    console.error('Non-critical email dispatch failure:', emailErr)
  }

  return { success: true, data: inserted }
}

/**
 * Retreives admin-blocked dates from the database.
 */
export async function getBlockedDates() {
  const { data, error } = await supabase
    .from('blocked_dates')
    .select('date')

  if (error) {
    console.error('Failed to retrieve blocked dates:', error)
    return []
  }
  return data.map((d) => d.date)
}

/**
 * Retrieves list of already booked slots across all users.
 */
export async function getBookedSlots() {
  const { data, error } = await supabase
    .from('demo_requests')
    .select('booked_slots')
    .eq('type', 'online')

  if (error) {
    console.error('Failed to retrieve booked slots:', error)
    return []
  }

  const slots = []
  data.forEach((row) => {
    if (row.booked_slots && Array.isArray(row.booked_slots)) {
      row.booked_slots.forEach((item) => {
        if (item.date && item.slot) {
          slots.push(item)
        }
      })
    }
  })
  return slots;
}


/**
 * Fetches all active products with their features, benefits, and details.
 */
export async function getProducts({ category, flagshipOnly, activeOnly = true } = {}) {
  let query = supabase.from('products').select(`
    *,
    product_features(feature_text, sort_order),
    product_benefits(benefit_text, metric_value, sort_order),
    product_details(subtitle, detail_text, detail_type, sort_order)
  `).order('sort_order', { ascending: true });

  if (activeOnly) query = query.eq('is_active', true);
  if (flagshipOnly) query = query.eq('is_flagship', true);
  if (category) query = query.eq('platform_category', category);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
}

/**
 * Fetches a single product by slug with all related data.
 */
export async function getProductBySlug(slug) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_features(feature_text, sort_order),
      product_benefits(benefit_text, metric_value, sort_order),
      product_details(subtitle, detail_text, detail_type, sort_order)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/**
 * Fetches platform differentiators (Why OakEIP).
 */
export async function getPlatformDifferentiators() {
  const { data, error } = await supabase
    .from('platform_differentiators')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });
  if (error) throw new Error(error.message);
  return data;
}

/**
 * Fetches industries served.
 */
export async function getIndustries() {
  const { data, error } = await supabase
    .from('industries')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });
  if (error) throw new Error(error.message);
  return data;
}

/**
 * Fetches commercial engagement models (Pilot, Enterprise Pricing).
 */
export async function getEngagementModels() {
  const { data, error } = await supabase
    .from('engagement_models')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });
  if (error) throw new Error(error.message);
  return data;
}

/**
 * Handles sending admin alerts & customer welcome/confirmation emails using the Resend API.
 */
async function sendEmails({ type, recipientName, recipientEmail, payload }) {
  const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || import.meta.env.RESEND_API_KEY
  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'o.kolawole@oak-global.com.ng'
  const DRIVE_LINK = import.meta.env.VITE_DEMO_DRIVE_LINK || ''

  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not defined. Skipping email dispatch.')
    return
  }

  const fromAddress = 'Oak Global <no-reply@oak-global.com.ng>'

  // 1. Send admin notification
  const adminSubject = type === 'contact' 
    ? `New Contact Form Submission from ${recipientName}`
    : `New Demo Request for ${payload.productName} from ${recipientName}`

  const adminHtml = type === 'contact'
    ? `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
         <h2 style="color: #047857;">New Contact Submission</h2>
         <p><strong>Name:</strong> ${recipientName}</p>
         <p><strong>Email:</strong> ${recipientEmail}</p>
         <p><strong>Company:</strong> ${payload.company || 'Not provided'}</p>
         <p><strong>Service Interest:</strong> ${payload.service || 'Not specified'}</p>
         <p><strong>Message:</strong></p>
         <div style="background: #f9fafb; padding: 15px; border-left: 4px solid #047857; border-radius: 4px;">
           ${payload.message.replace(/\n/g, '<br>')}
         </div>
       </div>`
    : `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
         <h2 style="color: #047857;">New Demo Request</h2>
         <p><strong>Product:</strong> ${payload.productName}</p>
         <p><strong>Name:</strong> ${recipientName}</p>
         <p><strong>Email:</strong> ${recipientEmail}</p>
         <p><strong>Company:</strong> ${payload.company}</p>
         <p><strong>Type:</strong> ${payload.type.toUpperCase()}</p>
         ${payload.type === 'live' 
           ? `<p><strong>Location:</strong> ${payload.location}</p>
              <p><strong>WhatsApp Number:</strong> ${payload.whatsapp}</p>
              <p><strong>Preferred Dates:</strong> ${payload.freeDates.join(', ')}</p>`
           : `<p><strong>Booked Slots:</strong></p>
              <ul>
                ${payload.bookedSlots.map(s => `<li>Date: ${s.date} · Slot: ${s.slot}</li>`).join('')}
              </ul>`
         }
       </div>`

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [ADMIN_EMAIL],
      subject: adminSubject,
      html: adminHtml
    })
  })

  // 2. Send confirmation to the customer
  const customerSubject = type === 'contact'
    ? 'We received your message!'
    : `Demo Request Received: ${payload.productName}`

  const customerHtml = type === 'contact'
    ? `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
         <div style="text-align: center; border-bottom: 2px solid #047857; padding-bottom: 10px; margin-bottom: 20px;">
           <h2 style="color: #047857; margin: 0;">OAK Global</h2>
         </div>
         <p>Dear ${recipientName},</p>
         <p>Thank you for reaching out to us. We have received your submission and our team is already reviewing it. You can expect a response within 24 hours.</p>
         <p>If you have any urgent requests, feel free to reply to this email.</p>
         <br>
         <p>Best regards,<br><strong>OAK Global Team</strong></p>
       </div>`
    : `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
         <div style="text-align: center; border-bottom: 2px solid #047857; padding-bottom: 10px; margin-bottom: 20px;">
           <h2 style="color: #047857; margin: 0;">OAK Global</h2>
         </div>
         <p>Dear ${recipientName},</p>
         <p>Thank you for requesting a demo for <strong>${payload.productName}</strong>. We are excited to show you how our platform works.</p>
         ${payload.type === 'live'
           ? `<p>You have selected a <strong>Live / In-Person Demo</strong>. The preferred dates you submitted are ${payload.freeDates.join(', ')}. Please note that a cost implication of transportation may apply depending on your location (${payload.location}), which will be communicated shortly via email alongside timing details.</p>`
           : `<p>You have requested an <strong>Online Demo</strong>. We have booked the following slot(s) for your session:</p>
              <ul>
                ${payload.bookedSlots.map(s => `<li>Date: ${s.date} · Slot: ${s.slot}</li>`).join('')}
              </ul>
              <p>We will review your selection and send a calendar invitation soon.</p>`
         }
         ${DRIVE_LINK ? `<p>In the meantime, you can explore some of our materials and documentation here: <a href="${DRIVE_LINK}" style="color: #047857; font-weight: bold; text-decoration: underline;">Google Drive Resources Link</a></p>` : ''}
         <br>
         <p>Best regards,<br><strong>OAK Global Team</strong></p>
       </div>`

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [recipientEmail],
      subject: customerSubject,
      html: customerHtml
    })
  })
}
