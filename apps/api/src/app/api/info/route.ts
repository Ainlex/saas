import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'ContaFácil Paraguay API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      modules: '/api/modulos',
      pos: '/api/pos'
    },
    documentation: 'API endpoints require authentication via JWT token'
  });
} 