import { User } from '../types';

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterResponse {
  user: User;
  token: string;
}

// Mock API service - replace with actual API calls
class AuthService {
  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  async login(email: string, password: string): Promise<LoginResponse> {
    await this.delay(1000); // Simulate network delay

    // Mock authentication - replace with actual API call
    if (email === 'demo@stayfinder.com' && password === 'password') {
      return {
        user: {
          id: '1',
          name: 'Demo User',
          email: 'demo@stayfinder.com',
          avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
        },
        token: 'mock-jwt-token-12345'
      };
    }

    throw new Error('Invalid credentials');
  }

  async register(name: string, email: string, password: string): Promise<RegisterResponse> {
    await this.delay(1000);

    // Mock registration - replace with actual API call
    return {
      user: {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      },
      token: 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9)
    };
  }
}

export const authService = new AuthService();