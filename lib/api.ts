// API configuration for Campus Buzz
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// API client with error handling
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    // Get token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth-token');
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Set authentication token
  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth-token', token);
    }
  }

  // Clear authentication token
  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth-token');
    }
  }

  // Authentication endpoints
  async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    role: 'student' | 'admin';
    department: string;
    year?: string;
    studentId?: string;
    adminId?: string;
  }) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        role: userData.role,
        department: userData.department,
        year: userData.year,
        studentId: userData.studentId,
        adminId: userData.adminId,
      }),
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async login(email: string, password: string) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  // Events endpoints
  async getEvents(params?: {
    category?: string;
    search?: string;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const endpoint = `/events${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.request(endpoint);
  }

  async getEvent(id: number) {
    return this.request(`/events/${id}`);
  }

  async createEvent(eventData: {
    title: string;
    description: string;
    category: string;
    date: string;
    startTime: string;
    endTime: string;
    venue: string;
    price: number;
    maxParticipants: number;
    contactEmail: string;
    contactPhone?: string;
    published: boolean;
    featuredEvent: boolean;
  }) {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async registerForEvent(eventId: number, quantity: number = 1) {
    return this.request(`/events/${eventId}/register`, {
      method: 'POST',
      body: JSON.stringify({ quantity }),
    });
  }

  async submitFeedback(eventId: number, rating: number, comment?: string) {
    return this.request(`/events/${eventId}/feedback`, {
      method: 'POST',
      body: JSON.stringify({ rating, comment }),
    });
  }

  // User endpoints
  async getUserRegistrations() {
    return this.request('/user/registrations');
  }

  // Admin endpoints
  async getAdminDashboard() {
    return this.request('/admin/dashboard');
  }

  async getEventRegistrations(eventId: number) {
    return this.request(`/admin/events/${eventId}/registrations`);
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

// Create and export API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export types for TypeScript
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'student' | 'admin';
  department: string;
  year?: string;
  studentId?: string;
  adminId?: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  start_time: string;
  end_time: string;
  venue: string;
  price: number;
  max_participants: number;
  contact_email: string;
  contact_phone?: string;
  published: boolean;
  featured_event: boolean;
  image_url?: string;
  created_by: number;
  created_at: string;
}

export interface Registration {
  id: number;
  event_id: number;
  user_id: number;
  quantity: number;
  total_amount: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  payment_method?: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  created_at: string;
}

export interface Feedback {
  id: number;
  event_id: number;
  user_id: number;
  rating: number;
  comment?: string;
  created_at: string;
}