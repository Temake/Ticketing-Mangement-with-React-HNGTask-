import type { ValidationError, TicketStatus } from '../types';

export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters';
  return null;
};

export const validateTicketTitle = (title: string): string | null => {
  if (!title || title.trim() === '') return 'Title is required';
  if (title.length > 100) return 'Title must not exceed 100 characters';
  return null;
};

export const validateTicketStatus = (status: string): string | null => {
  const validStatuses: TicketStatus[] = ['open', 'in_progress', 'closed'];
  if (!status) return 'Status is required';
  if (!validStatuses.includes(status as TicketStatus)) {
    return 'Status must be one of: open, in_progress, closed';
  }
  return null;
};

export const validateTicketDescription = (description?: string): string | null => {
  if (description && description.length > 500) {
    return 'Description must not exceed 500 characters';
  }
  return null;
};

export const validateLoginForm = (email: string, password: string): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  const emailError = validateEmail(email);
  if (emailError) errors.push({ field: 'email', message: emailError });
  
  const passwordError = validatePassword(password);
  if (passwordError) errors.push({ field: 'password', message: passwordError });
  
  return errors;
};

export const validateSignupForm = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  const nameError = validateName(name);
  if (nameError) errors.push({ field: 'name', message: nameError });
  
  const emailError = validateEmail(email);
  if (emailError) errors.push({ field: 'email', message: emailError });
  
  const passwordError = validatePassword(password);
  if (passwordError) errors.push({ field: 'password', message: passwordError });
  
  if (password !== confirmPassword) {
    errors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
  }
  
  return errors;
};

export const validateTicketForm = (
  title: string,
  status: string,
  description?: string
): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  const titleError = validateTicketTitle(title);
  if (titleError) errors.push({ field: 'title', message: titleError });
  
  const statusError = validateTicketStatus(status);
  if (statusError) errors.push({ field: 'status', message: statusError });
  
  const descriptionError = validateTicketDescription(description);
  if (descriptionError) errors.push({ field: 'description', message: descriptionError });
  
  return errors;
};
