// Test script for authentication system
const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5001/api';

async function testAuth() {
  console.log('Testing Campus Buzz Authentication System...\n');

  try {
    // Test 1: Health check
    console.log('1. Testing health check...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.message);

    // Test 2: User registration
    console.log('\n2. Testing user registration...');
    const registerData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@college.edu',
      password: 'testpassword123',
      phone: '+91 98765 43210',
      role: 'student',
      department: 'Computer Science',
      year: '3rd Year',
      studentId: 'STU2024001'
    };

    const registerResponse = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });

    if (registerResponse.ok) {
      const registerResult = await registerResponse.json();
      console.log('✅ Registration successful:', registerResult.user.name);
      
      // Test 3: User login
      console.log('\n3. Testing user login...');
      const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@college.edu',
          password: 'testpassword123'
        }),
      });

      if (loginResponse.ok) {
        const loginResult = await loginResponse.json();
        console.log('✅ Login successful:', loginResult.user.name);
        console.log('✅ Token received:', loginResult.token ? 'Yes' : 'No');
        
        // Test 4: Protected endpoint with token
        console.log('\n4. Testing protected endpoint...');
        const eventsResponse = await fetch(`${API_BASE_URL}/events`, {
          headers: {
            'Authorization': `Bearer ${loginResult.token}`
          }
        });
        
        if (eventsResponse.ok) {
          const events = await eventsResponse.json();
          console.log('✅ Protected endpoint access successful');
          console.log(`✅ Found ${events.length} events`);
        } else {
          console.log('❌ Protected endpoint failed');
        }
      } else {
        const loginError = await loginResponse.json();
        console.log('❌ Login failed:', loginError.error);
      }
    } else {
      const registerError = await registerResponse.json();
      console.log('❌ Registration failed:', registerError.error);
    }

  } catch (error) {
    console.log('❌ Test failed:', error.message);
    console.log('Make sure the backend server is running on port 5001');
  }
}

testAuth();
