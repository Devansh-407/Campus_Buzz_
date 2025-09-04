# 🎓 Campus Buzz - Complete Setup Guide for Beginners

Welcome to Campus Buzz! This guide will help you set up the complete event management system for your Indian college.

## 📋 What You'll Need

1. **Computer Requirements:**
   - Windows 10/11, macOS, or Linux
   - At least 4GB RAM
   - 2GB free disk space
   - Internet connection

2. **Software to Install:**
   - Node.js (JavaScript runtime)
   - PostgreSQL (Database)
   - Code editor (VS Code recommended)

## 🛠️ Step-by-Step Installation

### Step 1: Install Node.js

1. **Download Node.js:**
   - Go to https://nodejs.org/
   - Download the LTS version (recommended)
   - Run the installer with default settings

2. **Verify installation:**
   - Open terminal/command prompt
   - Type: `node --version`
   - You should see something like `v18.17.0`

### Step 2: Install PostgreSQL Database

1. **Download PostgreSQL:**
   - Go to https://www.postgresql.org/download/
   - Choose your operating system
   - Download and run the installer

2. **During installation:**
   - Remember the password you set for 'postgres' user
   - Keep default port: 5432
   - Install pgAdmin (database management tool)

3. **Verify installation:**
   - Open pgAdmin
   - Connect using the password you set

### Step 3: Setup the Project

1. **Download the project:**
   - You already have the frontend code
   - The backend code is now created in the `backend` folder

2. **Setup Backend:**
   ```bash
   # Navigate to backend folder
   cd backend
   
   # Install dependencies
   npm install
   
   # Copy environment file
   cp .env.example .env
   ```

3. **Configure Environment Variables:**
   - Open `backend/.env` file in any text editor
   - Update these values:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=campus_buzz
   DB_USER=postgres
   DB_PASSWORD=your_postgres_password_here
   JWT_SECRET=make-this-a-very-long-random-string-for-security
   PORT=5000
   ```

4. **Initialize Database:**
   ```bash
   # This creates tables and sample data
   npm run init-db
   ```

5. **Start the Backend Server:**
   ```bash
   npm run dev
   ```
   You should see: "🚀 Server running on port 5000"

### Step 4: Setup Frontend

1. **Open new terminal window**
   - Keep the backend running in the first terminal
   - Open a new terminal for frontend

2. **Navigate to main project folder:**
   ```bash
   cd ..  # Go back to main project folder
   ```

3. **Install frontend dependencies:**
   ```bash
   npm install
   ```

4. **Start the Frontend:**
   ```bash
   npm run dev
   ```
   You should see: "Local: http://localhost:3000"

### Step 5: Test Everything

1. **Open your browser:**
   - Go to http://localhost:3000
   - You should see the Campus Buzz homepage

2. **Test login:**
   - Click "Sign In"
   - Use these test accounts:
     - **Admin:** admin@college.edu / password
     - **Student:** john.doe@college.edu / password

3. **Test features:**
   - Browse events
   - Add events to cart
   - Book tickets
   - Admin can create new events

## 🏫 Indian College Customization

### Pricing Structure (All in ₹)
- **Tech Events:** ₹199-₹299 (affordable for students)
- **Cultural Events:** ₹149-₹199 (popular pricing)
- **Workshops:** ₹99-₹149 (skill development)
- **Sports Events:** Free (encouraging participation)
- **Gaming Tournaments:** ₹49 (very affordable)

### Indian College Features
- **Departments:** Computer Science, Engineering, Business, Arts
- **Academic Years:** 1st Year to 4th Year
- **Contact Format:** Indian phone numbers (+91)
- **Currency:** Indian Rupees (₹) throughout
- **Events:** Typical Indian college events

## 🔧 Common Issues & Solutions

### Issue 1: Database Connection Error
**Problem:** "Error connecting to database"
**Solution:**
1. Make sure PostgreSQL is running
2. Check your `.env` file credentials
3. Verify database name exists

### Issue 2: Port Already in Use
**Problem:** "Port 5000 is already in use"
**Solution:**
1. Change PORT in `.env` to 5001
2. Restart the backend server

### Issue 3: Frontend Can't Connect to Backend
**Problem:** API calls failing
**Solution:**
1. Make sure backend is running on port 5000
2. Check browser console for errors
3. Verify CORS is enabled

### Issue 4: Login Not Working
**Problem:** "Invalid credentials"
**Solution:**
1. Use the sample credentials provided
2. Make sure database initialization completed
3. Check if users table has data

## 📱 Mobile-Friendly Features

The system is designed to work on:
- Desktop computers
- Laptops
- Tablets
- Mobile phones

## 🚀 Production Deployment (Advanced)

When ready to deploy for your college:

1. **Database:** Use cloud PostgreSQL (AWS RDS, Google Cloud SQL)
2. **Backend:** Deploy to Heroku, Railway, or DigitalOcean
3. **Frontend:** Deploy to Vercel, Netlify, or GitHub Pages
4. **Domain:** Get a college domain like events.yourcollege.edu

## 📞 Support

If you need help:
1. Check the error messages in terminal
2. Look at the browser console (F12)
3. Refer to this guide
4. Ask your computer science department for help

## 🎉 Success Checklist

- [ ] Node.js installed and working
- [ ] PostgreSQL installed and running
- [ ] Backend dependencies installed
- [ ] Environment variables configured
- [ ] Database initialized with sample data
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000
- [ ] Can login with sample credentials
- [ ] Can browse and book events
- [ ] Admin panel accessible

Once all items are checked, your Campus Buzz system is ready for your college! 🎊

## 🔄 Daily Usage

**To start the system each day:**
1. Open terminal
2. Start backend: `cd backend && npm run dev`
3. Open new terminal
4. Start frontend: `npm run dev`
5. Open browser to http://localhost:3000

**To stop the system:**
- Press `Ctrl + C` in both terminal windows