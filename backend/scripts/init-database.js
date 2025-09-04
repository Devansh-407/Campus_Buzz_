const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: 'postgres', // Connect to default database first
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

async function initializeDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Initializing Campus Buzz Database...');

    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'campus_buzz';
    await client.query(`CREATE DATABASE ${dbName}`);
    console.log(`✅ Database '${dbName}' created successfully`);
    
  } catch (error) {
    if (error.code === '42P04') {
      console.log('ℹ️  Database already exists, continuing...');
    } else {
      console.error('❌ Error creating database:', error.message);
      throw error;
    }
  } finally {
    client.release();
  }

  // Connect to the campus_buzz database
  const campusPool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'campus_buzz',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
  });

  const campusClient = await campusPool.connect();

  try {
    console.log('🔄 Creating tables...');

    // Create users table
    await campusClient.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'admin')),
        department VARCHAR(100),
        year VARCHAR(20),
        student_id VARCHAR(50),
        admin_id VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created');

    // Create events table
    await campusClient.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100) NOT NULL,
        date DATE NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL,
        venue VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) DEFAULT 0,
        max_participants INTEGER NOT NULL,
        contact_email VARCHAR(255) NOT NULL,
        contact_phone VARCHAR(20),
        published BOOLEAN DEFAULT false,
        featured_event BOOLEAN DEFAULT false,
        image_url TEXT,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Events table created');

    // Create registrations table
    await campusClient.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        quantity INTEGER DEFAULT 1,
        total_amount DECIMAL(10,2) NOT NULL,
        status VARCHAR(20) DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'completed')),
        payment_method VARCHAR(50),
        payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(event_id, user_id)
      )
    `);
    console.log('✅ Registrations table created');

    // Create feedback table
    await campusClient.query(`
      CREATE TABLE IF NOT EXISTS feedback (
        id SERIAL PRIMARY KEY,
        event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(event_id, user_id)
      )
    `);
    console.log('✅ Feedback table created');

    // Insert sample data
    console.log('🔄 Inserting sample data...');

    // Insert sample admin user
    const hashedPassword = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'; // password: "password"
    
    await campusClient.query(`
      INSERT INTO users (first_name, last_name, email, password, phone, role, department, admin_id)
      VALUES ('Admin', 'User', 'admin@college.edu', $1, '+91 98765 43210', 'admin', 'Student Affairs', 'ADM2024001')
      ON CONFLICT (email) DO NOTHING
    `, [hashedPassword]);

    await campusClient.query(`
      INSERT INTO users (first_name, last_name, email, password, phone, role, department, year, student_id)
      VALUES ('John', 'Doe', 'john.doe@college.edu', $1, '+91 98765 43211', 'student', 'Computer Science', '3rd Year', 'STU2024001')
      ON CONFLICT (email) DO NOTHING
    `, [hashedPassword]);

    // Insert sample events
    await campusClient.query(`
      INSERT INTO events (title, description, category, date, start_time, end_time, venue, price, max_participants, contact_email, contact_phone, published, featured_event, created_by)
      VALUES 
      ('Annual Tech Summit 2024', 'Join industry leaders and innovators for cutting-edge technology discussions and networking opportunities.', 'Technology', '2024-03-25', '10:00', '18:00', 'Engineering Block A, Main Auditorium', 299, 300, 'techsummit@college.edu', '+91 98765 43210', true, true, 1),
      ('Spring Music Festival', 'Experience amazing live performances from local and national artists in an outdoor setting.', 'Music', '2024-03-30', '18:00', '23:00', 'Main Campus Ground, Open Air Stage', 199, 500, 'cultural@college.edu', '+91 98765 43211', true, true, 1),
      ('Art Exhibition & Workshop', 'Showcase of student artwork followed by hands-on creative workshops and artist interactions.', 'Arts', '2024-04-05', '14:00', '20:00', 'Arts Building, Gallery Hall', 99, 150, 'arts@college.edu', '+91 98765 43212', true, false, 1),
      ('Gaming Championship 2024', 'Compete in various gaming tournaments including PUBG, FIFA, and CS:GO with amazing prizes.', 'Gaming', '2024-04-12', '09:00', '21:00', 'Computer Science Block, Gaming Lab', 49, 200, 'gaming@college.edu', '+91 98765 43213', true, false, 1),
      ('Photography Workshop', 'Learn professional photography techniques and editing skills from industry experts.', 'Photography', '2024-04-18', '10:00', '16:00', 'Arts Building, Studio 201', 149, 80, 'photo@college.edu', '+91 98765 43214', true, true, 1),
      ('Sports Day Championship', 'Inter-department sports competition featuring cricket, football, basketball, and track events.', 'Sports', '2024-04-22', '08:00', '18:00', 'Sports Complex, Main Ground', 0, 1000, 'sports@college.edu', '+91 98765 43215', true, false, 1)
      ON CONFLICT DO NOTHING
    `);

    console.log('✅ Sample data inserted successfully');
    console.log('🎉 Database initialization completed!');
    console.log('');
    console.log('📋 Sample Login Credentials:');
    console.log('   Admin: admin@college.edu / password');
    console.log('   Student: john.doe@college.edu / password');
    console.log('');

  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    throw error;
  } finally {
    campusClient.release();
    await campusPool.end();
  }

  await pool.end();
}

// Run initialization
initializeDatabase()
  .then(() => {
    console.log('✅ Database setup completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  });