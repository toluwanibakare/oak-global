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
            assessments: '/api/assessments',
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
// ASSESSMENT ENDPOINTS
// ============================================

// POST - Create new assessment response
app.post('/api/assessments', async (req, res) => {
    try {
        const { email, name, company, category, score, status, total_questions, yes_count, no_count, unsure_count, answers } = req.body;

        // Validation
        if (!email || !category || score === undefined) {
            return res.status(400).json({ error: 'Email, category, and score are required' });
        }

        const connection = await pool.getConnection();

        try {
            const query = `
                INSERT INTO assessment_responses 
                (email, name, company, category, score, status, total_questions, yes_count, no_count, unsure_count, answers)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            // Attempting to save assessment to database
            const [result] = await connection.execute(query, [
                email,
                name || null,
                company || null,
                category,
                score,
                status || 'Pending',
                total_questions || 0,
                yes_count || 0,
                no_count || 0,
                unsure_count || 0,
                JSON.stringify(answers || {})
            ]);
            
            // Assessment saved to database

            // Send confirmation email with detailed results
            try {
                const statusColor = status === 'Excellent' ? '#10b981' : status === 'Good' ? '#3b82f6' : status === 'Needs Improvement' ? '#f59e0b' : '#ef4444';
                
                await transporter.sendMail({
                    from: `OAK Global <${process.env.SMTP_USER}>`,
                    to: email,
                    subject: `Your OAK Global Assessment Results - ${score}% Score`,
                    html: `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>
                                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background: #f3f4f6; margin: 0; padding: 0; }
                                .container { max-width: 700px; margin: 0 auto; padding: 20px; }
                                .email-wrapper { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                                .header { background: linear-gradient(135deg, #047857 0%, #1e40af 100%); color: white; padding: 40px 20px; text-align: center; }
                                .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
                                .score-box { background: linear-gradient(135deg,${statusColor},${statusColor}); margin: -40px 20px 0; padding: 40px 30px; border-radius: 12px; text-align: center; position: relative; z-index: 1; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
                                .score-display { color: #fff; font-size: 56px; font-weight: 700; margin: 0; padding: 0; }
                                .score-label{font-size:18px;color:#fff;margin:10px 0;font-weight:500}
                                .status-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; background: ${statusColor}; color: white; font-weight: 600; margin-top: 10px; }
                                .content { padding: 30px 20px; }
                                .section { margin: 25px 0; }
                                .section-title { font-size: 16px; font-weight: 700; color: #047857; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
                                .breakdown { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 15px 0; }
                                .breakdown-item { background: #f3f4f6; padding: 15px; border-radius: 8px; text-align: center; border-left: 4px solid #047857; }
                                .breakdown-number { font-size: 24px; font-weight: 700; color: #047857; }
                                .breakdown-label { font-size: 12px; color: #6b7280; margin-top: 5px; text-transform: uppercase; }
                                .recommendations { background: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981; margin: 15px 0; }
                                .recommendations h4 { color: #047857; margin: 0 0 10px 0; }
                                .recommendations li { color: #374151; margin: 8px 0; }
                                .msat-promo { background: linear-gradient(135deg, #fef3c7 0%, #fef08a 100%); padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #d97706; }
                                .msat-promo h3 { color: #92400e; margin: 0 0 10px 0; }
                                .msat-promo p { color: #78350f; margin: 8px 0; }
                                .cta-button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #047857 0%, #1e40af 100%); color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 5px 10px 0; }
                                .footer { background: #1f2937; color: white; padding: 20px; text-align: center; font-size: 12px; }
                                .contact-info { color: #d1d5db; margin-top: 10px; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="email-wrapper">
                                    <div class="header">
                                        <h1>Assessment Complete!</h1>
                                        <p>Your OAK Global Business Assessment Results</p>
                                    </div>
                                    <br/><br/>
                                    <div class="score-box">
                                        <div class="score-display">${score}%</div>
                                        <div class="score-label">Overall Health Score</div>
                                    </div>
                                    
                                    <div class="content">
                                        <div class="section">
                                            <p>Dear ${name || 'Valued Client'},</p>
                                            <p>Thank you for completing the OAK Global Business Assessment. We've analyzed your responses and generated your detailed health score report.</p>
                                        </div>
                                        
                                        <div class="section">
                                            <div class="section-title">Response Summary</div>
                                            <div class="breakdown">
                                                <div class="breakdown-item">
                                                    <div class="breakdown-number" style="color: #10b981;">${yes_count}</div>
                                                    <div class="breakdown-label">Yes Responses</div>
                                                </div>
                                                <div class="breakdown-item">
                                                    <div class="breakdown-number" style="color: #ef4444;">${no_count}</div>
                                                    <div class="breakdown-label">No Responses</div>
                                                </div>
                                                <div class="breakdown-item">
                                                    <div class="breakdown-number" style="color: #f59e0b;">${unsure_count}</div>
                                                    <div class="breakdown-label">Unsure Responses</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        ${status === 'Excellent' ? `
                                        <div class="recommendations">
                                            <h4>Congratulations!</h4>
                                            <p>Your organization demonstrates excellent practices and maturity. Continue to maintain these standards and look for areas of innovation and competitive advantage.</p>
                                        </div>
                                        ` : status === 'Good' ? `
                                        <div class="recommendations">
                                            <h4>Good Progress</h4>
                                            <p>Your organization shows good foundational practices. Focus on strengthening areas with lower scores to achieve operational excellence.</p>
                                        </div>
                                        ` : status === 'Needs Improvement' ? `
                                        <div class="recommendations">
                                            <h4>Improvement Needed</h4>
                                            <p>There are significant opportunities to improve. We recommend prioritizing quick wins while developing a long-term improvement roadmap.</p>
                                        </div>
                                        ` : `
                                        <div class="recommendations">
                                            <h4>Critical Action Required</h4>
                                            <p>Immediate action is needed. We strongly recommend consulting with our experts to develop a comprehensive improvement strategy.</p>
                                        </div>
                                        `}
                                        
                                        <div class="section msat-promo">
                                            <h3>Advance Your Assessment with MSAT</h3>
                                            <p><strong>Want a more detailed analysis?</strong> The Management Systems Assessment Tool (MSAT) provides comprehensive evaluation of your management system maturity across multiple dimensions.</p>
                                            <p style="margin: 15px 0; font-size: 14px;"><strong>MSAT Features:</strong></p>
                                            <ul style="margin: 8px 0; padding-left: 20px;">
                                                <li>Advanced maturity assessment</li>
                                                <li>Benchmarking against industry standards</li>
                                                <li>Detailed improvement roadmap</li>
                                                <li>Professional consultation support</li>
                                            </ul>
                                            <a href="https://assessment.ibmssp.org.ng/" class="cta-button">Access MSAT Platform →</a>
                                        </div>
                                        
                                        <div class="section">
                                            <p><strong>Next Steps:</strong></p>
                                            <ul style="padding-left: 20px; color: #374151;">
                                                <li>Review the detailed breakdown of your assessment</li>
                                                <li>Identify priority areas for improvement</li>
                                                <li>Contact our team for consultation and support</li>
                                                <li>Explore additional OAK Global services that align with your needs</li>
                                            </ul>
                                        </div>
                                        
                                        <div class="section">
                                            <p>For additional support or to discuss your results in detail, please don't hesitate to reach out to our team.</p>
                                            <p><strong>Best regards,</strong><br><strong>OAK Global Team</strong><br>Professional Business Solutions</p>
                                        </div>
                                    </div>
                                    
                                    <div class="footer">
                                        <p style="margin: 0;">© 2026 OAK Global International Business Solutions. All rights reserved.</p>
                                        <div class="contact-info">
                                            <p style="margin: 5px 0;">📧 femmyng2000@gmail.com | 📱 +2348099904338</p>
                                            <p style="margin: 5px 0;">🌐 www.oak-global.com.ng</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </body>
                        </html>
                    `
                });
                // Assessment email sent successfully
            } catch (emailError) {
                // Email sending failed but continue
            }

            res.status(201).json({
                success: true,
                id: result.insertId,
                message: 'Assessment submitted successfully'
            });
        } finally {
            connection.release();
        }
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to submit assessment',
            details: error.message 
        });
    }
});

// GET - Fetch all assessments (admin only)
app.get('/api/assessments', async (req, res) => {
    try {
        // TODO: Add proper authentication check
        const connection = await pool.getConnection();

        try {
            const query = `
                SELECT * FROM assessment_responses
                ORDER BY created_at DESC
            `;
            const [assessments] = await connection.execute(query);

            // Parse JSON answers
            const parsedAssessments = assessments.map(assessment => ({
                ...assessment,
                answers: typeof assessment.answers === 'string' ? JSON.parse(assessment.answers) : assessment.answers
            }));

            res.json(parsedAssessments);
        } finally {
            connection.release();
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch assessments' });
    }
});

// GET - Fetch assessments by category
app.get('/api/assessments/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const connection = await pool.getConnection();

        try {
            const query = `
                SELECT * FROM assessment_responses
                WHERE category = ?
                ORDER BY created_at DESC
            `;
            const [assessments] = await connection.execute(query, [category]);

            const parsedAssessments = assessments.map(assessment => ({
                ...assessment,
                answers: typeof assessment.answers === 'string' ? JSON.parse(assessment.answers) : assessment.answers
            }));

            res.json(parsedAssessments);
        } finally {
            connection.release();
        }
    } catch (error) {

        res.status(500).json({ error: 'Failed to fetch assessments' });
    }
});

// GET - Fetch assessments by email
app.get('/api/assessments/email/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const connection = await pool.getConnection();

        try {
            const query = `
                SELECT * FROM assessment_responses
                WHERE email = ?
                ORDER BY created_at DESC
            `;
            const [assessments] = await connection.execute(query, [email]);

            const parsedAssessments = assessments.map(assessment => ({
                ...assessment,
                answers: typeof assessment.answers === 'string' ? JSON.parse(assessment.answers) : assessment.answers
            }));

            res.json(parsedAssessments);
        } finally {
            connection.release();
        }
    } catch (error) {

        res.status(500).json({ error: 'Failed to fetch assessments' });
    }
});

// PUT - Update assessment
app.put('/api/assessments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { score, status } = req.body;

        const connection = await pool.getConnection();

        try {
            const query = 'UPDATE assessment_responses SET score = ?, status = ? WHERE id = ?';
            const [result] = await connection.execute(query, [score, status, id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Assessment not found' });
            }

            res.json({ success: true, message: 'Assessment updated' });
        } finally {
            connection.release();
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update assessment' });
    }
});

// DELETE - Delete assessment
app.delete('/api/assessments/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await pool.getConnection();

        try {
            const query = 'DELETE FROM assessment_responses WHERE id = ?';
            const [result] = await connection.execute(query, [id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Assessment not found' });
            }

            res.json({ success: true, message: 'Assessment deleted' });
        } finally {
            connection.release();
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete assessment' });
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
            const [assessmentsCount] = await connection.execute('SELECT COUNT(*) as count FROM assessment_responses');
            const [avgScore] = await connection.execute('SELECT AVG(score) as average FROM assessment_responses');

            res.json({
                totalContacts: contactsCount[0].count,
                unreadContacts: unreadContacts[0].count,
                totalAssessments: assessmentsCount[0].count,
                averageScore: avgScore[0].average ? Math.round(avgScore[0].average) : 0
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
