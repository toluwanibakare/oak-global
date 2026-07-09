import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: (origin, callback) => {
        // List of allowed origins for development and production
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:5173',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:5173',
            process.env.FRONTEND_URL
        ];
        
        // Allow requests with no origin (mobile apps, curl requests, etc)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'OAK Global Backend Server',
        version: '1.0.0',
        status: 'running',
        endpoints: {
            health: '/api/health',
            contacts: '/api/contacts',
            submissions: '/api/submissions',
            admin: '/api/admin'
        }
    });
});

// Create MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'oak_global',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Email transporter configuration
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

// Test email connection on startup
transporter.verify((error, success) => {
    if (error) {
        // Email transporter error
    } else {
        // Email transporter ready
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// ============================================
// CONTACTS ENDPOINTS
// ============================================

// POST - Create new contact
app.post('/api/contacts', async (req, res) => {
    try {
        const { name, email, company, service, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required' });
        }

        const connection = await pool.getConnection();

        try {
            // Insert contact into database
            const query = `
                INSERT INTO contacts (name, email, company, service, message, read)
                VALUES (?, ?, ?, ?, ?, 0)
            `;
            const [result] = await connection.execute(query, [name, email, company || null, service || null, message]);

            // Send email notification to admin
            try {
                await transporter.sendMail({
                    from: `OAK Global <${process.env.SMTP_USER}>`,
                    to: process.env.ADMIN_EMAIL,
                    subject: `New Contact Form Submission from ${name}`,
                    html: `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>
                                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                                .header { background: linear-gradient(135deg, #047857 0%, #1e40af 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                                .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
                                .section { margin: 15px 0; }
                                .label { font-weight: bold; color: #047857; }
                                .footer { background: #374151; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h2>New Contact Form Submission</h2>
                                </div>
                                <div class="content">
                                    <div class="section">
                                        <span class="label">Name:</span> ${name}
                                    </div>
                                    <div class="section">
                                        <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
                                    </div>
                                    <div class="section">
                                        <span class="label">Company:</span> ${company || 'Not provided'}
                                    </div>
                                    <div class="section">
                                        <span class="label">Service Interest:</span> ${service || 'Not specified'}
                                    </div>
                                    <div class="section">
                                        <span class="label">Message:</span>
                                        <div style="background: white; padding: 10px; margin-top: 5px; border-left: 4px solid #047857; border-radius: 4px;">
                                            ${message.replace(/\n/g, '<br>')}
                                        </div>
                                    </div>
                                    <div class="section" style="border-top: 1px solid #e5e7eb; padding-top: 10px; margin-top: 20px; font-size: 12px; color: #6b7280;">
                                        Submitted at: ${new Date().toLocaleString()}
                                    </div>
                                </div>
                                <div class="footer">
                                    <p>OAK Global - Professional Business Solutions</p>
                                </div>
                            </div>
                        </body>
                        </html>
                    `
                });
            } catch (emailError) {
                // Email notification failed but continue
            }

            res.status(201).json({
                success: true,
                id: result.insertId,
                message: 'Contact submitted successfully'
            });
        } finally {
            connection.release();
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit contact' });
    }
});

// GET - Fetch all contacts (admin only)
app.get('/api/contacts', async (req, res) => {
    try {
        // TODO: Add proper authentication check
        const connection = await pool.getConnection();

        try {
            const query = `
                SELECT * FROM contacts
                ORDER BY created_at DESC
            `;
            const [contacts] = await connection.execute(query);
            res.json(contacts);
        } finally {
            connection.release();
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
});

// PUT - Mark contact as read
app.put('/api/contacts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { read } = req.body;

        const connection = await pool.getConnection();

        try {
            const query = 'UPDATE contacts SET read = ? WHERE id = ?';
            const [result] = await connection.execute(query, [read ? 1 : 0, id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Contact not found' });
            }

            res.json({ success: true, message: 'Contact updated' });
        } finally {
            connection.release();
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update contact' });
    }
});

// DELETE - Delete contact
app.delete('/api/contacts/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await pool.getConnection();

        try {
            const query = 'DELETE FROM contacts WHERE id = ?';
            const [result] = await connection.execute(query, [id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Contact not found' });
            }

            res.json({ success: true, message: 'Contact deleted' });
        } finally {
            connection.release();
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete contact' });
    }
});

// ============================================
// STATISTICS ENDPOINTS
// ============================================

// GET - Dashboard statistics
app.get('/api/stats/dashboard', async (req, res) => {
    try {
        const connection = await pool.getConnection();

        try {
            const [contactsCount] = await connection.execute('SELECT COUNT(*) as count FROM contacts');
            const [unreadContacts] = await connection.execute('SELECT COUNT(*) as count FROM contacts WHERE read = 0');

            res.json({
                totalContacts: contactsCount[0].count,
                unreadContacts: unreadContacts[0].count
            });
        } finally {
            connection.release();
        }
    } catch (error) {

        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});

// Start server
app.listen(PORT, () => {
    // OAK Global Backend Server running
});
