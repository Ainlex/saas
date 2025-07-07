// Shared constants for the entire application

export const APP_NAME = 'ContaFácil Paraguay';
export const APP_VERSION = '1.0.0';

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  USERS: '/api/users',
  COMPANIES: '/api/companies',
  ACCOUNTING: '/api/accounting',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const; 