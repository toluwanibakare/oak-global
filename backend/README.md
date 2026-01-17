# OAK Global Backend - Node.js, Express & MySQL

This is the backend server for OAK Global's website, built with Node.js, Express, and MySQL.

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server (running locally or remotely)
- npm (comes with Node.js)

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up the database:**
   - Open MySQL and run the SQL schema:
   ```sql
   source ../supabase/schema.sql
   ```
   This will create the `oak_global` database and tables automatically.

3. **Configure environment variables:**
   Edit `.env` file with your settings:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=oak_global
   FRONTEND_URL=http://localhost:5173
   ```

4. **Email Configuration (Optional):**
   To enable email notifications, configure SMTP:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   ADMIN_EMAIL=admin@oakglobal.com
   ```

## Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check server status

### Contacts
- `POST /api/contacts` - Submit a contact form
- `GET /api/contacts` - Get all contacts (admin)
- `PUT /api/contacts/:id` - Update contact (mark as read)
- `DELETE /api/contacts/:id` - Delete contact (admin)

### Assessments
- `POST /api/assessments` - Submit assessment response
- `GET /api/assessments` - Get all assessments (admin)
- `GET /api/assessments/category/:category` - Get assessments by category
- `GET /api/assessments/email/:email` - Get assessments by email
- `PUT /api/assessments/:id` - Update assessment (admin)
- `DELETE /api/assessments/:id` - Delete assessment (admin)

### Statistics
- `GET /api/stats/dashboard` - Get dashboard statistics

## Frontend Integration

The frontend is configured to connect to this backend via the `VITE_API_URL` environment variable in `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

### Frontend Files Updated:
- `assets/js/script.js` - Contact form submission
- `assets/js/assessment.js` - Assessment submission
- `assets/js/admin.js` - Admin panel data loading

## Database Schema

### Contacts Table
- `id` - UUID (primary key)
- `name` - Contact person's name
- `email` - Email address
- `company` - Company name (optional)
- `service` - Service interested in (optional)
- `message` - Contact message
- `created_at` - Submission timestamp
- `read` - Read status (boolean)

### Assessment Responses Table
- `id` - UUID (primary key)
- `email` - User email
- `name` - User name (optional)
- `company` - User company (optional)
- `category` - Assessment category
- `score` - Assessment score (0-100)
- `status` - Assessment status
- `total_questions` - Number of questions
- `yes_count`, `no_count`, `unsure_count` - Answer counts
- `answers` - JSON with detailed answers
- `created_at` - Submission timestamp

## Testing the API

Use curl or Postman to test endpoints:

```bash
# Test health
curl http://localhost:5000/api/health

# Submit contact form
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "company": "ACME Corp",
    "service": "business-performance",
    "message": "I would like to learn more about your services."
  }'

# Get all contacts
curl http://localhost:5000/api/contacts

# Submit assessment
curl -X POST http://localhost:5000/api/assessments \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "Jane Smith",
    "company": "TechCorp",
    "category": "overall",
    "score": 85,
    "status": "Excellent",
    "total_questions": 25,
    "yes_count": 20,
    "no_count": 3,
    "unsure_count": 2,
    "answers": {}
  }'
```

## Troubleshooting

### Database Connection Error
- Ensure MySQL is running
- Check DB credentials in `.env`
- Verify database name matches

### CORS Issues
- Check `FRONTEND_URL` in `.env` matches your frontend URL
- Ensure CORS middleware is enabled in `server.js`

### Port Already in Use
- Change `PORT` in `.env` to a different value
- Or kill the process using port 5000

## Security Notes

For production deployment:
1. Change admin credentials in `.env`
2. Use HTTPS instead of HTTP
3. Add proper authentication/authorization
4. Implement rate limiting
5. Use environment-specific configurations
6. Keep dependencies updated

## Dependencies

- **express** - Web framework
- **mysql2** - MySQL driver with promise support
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management
- **nodemailer** - Email sending

## License

All rights reserved - OAK Global
