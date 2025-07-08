import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  return Response.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'contafacil-api'
  })
} 