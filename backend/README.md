# Campus Buzz Backend API

A Node.js backend API for the Campus Buzz event management system, designed specifically for Indian colleges.

## 🚀 Quick Start Guide for Beginners

### Step 1: Install Prerequisites

Before starting, you need to install these on your computer:

1. **Node.js** (version 16 or higher)
   - Download from: https://nodejs.org/
   - Choose the LTS version
   - Install with default settings

2. **PostgreSQL Database**
   - Download from: https://www.postgresql.org/download/
   - During installation, remember the password you set for the 'postgres' user
   - Default port is 5432 (keep it as is)

### Step 2: Setup the Backend

1. **Open Terminal/Command Prompt**
   - Windows: Press `Win + R`, type `cmd`, press Enter
   - Mac: Press `Cmd + Space`, type `terminal`, press Enter
   - Linux: Press `Ctrl + Alt + T`

2. **Navigate to the backend folder**
   ```bash
   cd backend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Setup environment variables**
   - Copy the `.env.example` file and rename it to `.env`
   - Open the `.env` file in any text editor
   - Update the values:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=campus_buzz
   DB_USER=postgres
   DB_PASSWORD=your_postgres_password_here
   JWT_SECRET=your-super-secret-key-here-make-it-very-long
   PORT=5000
   ```

5. **Initialize the database**
   ```bash
   npm run init-db
   ```
   This will create all necessary tables and insert sample data.

6. **Start the server**
   ```bash
   npm run dev
   ```

### Step 3: Connect Frontend to Backend

1. **Create API configuration file**
   Create a new file in your frontend project: `lib/api.ts`

2. **Update your frontend authentication**
   The frontend will automatically connect to `http://localhost:5000/api`

### Step 4: Test the Connection

1. **Start both servers:**
   - Backend: `npm run dev` (in backend folder)
   - Frontend: `npm run dev` (in main project folder)

2. **Test login:**
   - Go to http://localhost:3000/auth
   - Use these test credentials:
     - Admin: `admin@college.edu` / `password`
     - Student: `john.doe@college.edu` / `password`

## 📊 Database Schema

### Users Table
- Stores student and admin information
- Includes Indian-specific fields like student_id, department, year

### Events Table
- Stores all campus events
- Prices in Indian Rupees (₹)
- Includes venue, timing, and capacity information

### Registrations Table
- Links users to events they've registered for
- Tracks payment status and quantity

### Feedback Table
- Stores event ratings and comments from students

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Events
- `GET /api/events` - Get all published events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (Admin only)
- `POST /api/events/:id/register` - Register for event
- `POST /api/events/:id/feedback` - Submit feedback

### Admin
- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/events/:id/registrations` - Get event registrations

## 🛠️ Troubleshooting

### Common Issues:

1. **Database connection error**
   - Make sure PostgreSQL is running
   - Check your `.env` file credentials
   - Ensure the database exists

2. **Port already in use**
   - Change the PORT in `.env` file to a different number (e.g., 5001)

3. **Permission denied**
   - Run terminal as administrator (Windows) or use `sudo` (Mac/Linux)

4. **Module not found**
   - Delete `node_modules` folder
   - Run `npm install` again

### Getting Help:
- Check the console for error messages
- Ensure all environment variables are set correctly
- Make sure both frontend and backend are running on different ports

## 🎯 Indian College Specific Features

- **Pricing**: All prices are in Indian Rupees (₹) and affordable for students
- **Departments**: Common Indian college departments included
- **Academic Years**: 1st Year to 4th Year system
- **Contact**: Indian phone number format (+91)
- **Events**: Typical Indian college events like Tech Summits, Cultural Nights, etc.

## 📱 Sample Events with Indian Pricing

- Tech Summit: ₹299 (was $399)
- Music Festival: ₹199 (was $299)  
- Art Workshop: ₹99 (was $149)
- Gaming Tournament: ₹49 (was $99)
- Photography Workshop: ₹149 (was $199)
- Sports Events: Free

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation
- SQL injection prevention
- CORS protection

## 📈 Next Steps

After setup, you can:
1. Add more events through the admin panel
2. Customize event categories
3. Set up payment integration (Razorpay for India)
4. Add email notifications
5. Implement SMS notifications for Indian mobile numbers