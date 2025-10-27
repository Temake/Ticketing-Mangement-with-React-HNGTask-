import type { User } from '../types';
import { storage } from './storage';

// Mock users database (for demo purposes)
const MOCK_USERS = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'password123',
    name: 'Demo User'
  }
];

export const mockLogin = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = MOCK_USERS.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  const token = `mock_token_${Date.now()}_${user.id}`;
  const userData: User = {
    id: user.id,
    email: user.email,
    name: user.name
  };
  
  return { user: userData, token };
};

export const mockSignup = async (
  name: string,
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Check if user already exists
  const existingUser = MOCK_USERS.find(u => u.email === email);
  if (existingUser) {
    throw new Error('An account with this email already exists');
  }
  
  // Create new user
  const newUser = {
    id: String(MOCK_USERS.length + 1),
    email,
    password,
    name
  };
  
  MOCK_USERS.push(newUser);
  
  const token = `mock_token_${Date.now()}_${newUser.id}`;
  const userData: User = {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name
  };
  
  return { user: userData, token };
};

export const mockLogout = (): void => {
  storage.clearSession();
};

export const validateSession = (token: string | null): boolean => {
  if (!token) return false;
  // In a real app, you'd validate the token with the backend
  return token.startsWith('mock_token_');
};
