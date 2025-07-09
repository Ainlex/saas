import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

function getApiUrl(path: string) {
  return `http://localhost:3002/api/auth${path}`
}

export async function GET(request: NextRequest) {
  const url = getApiUrl(request.nextUrl.pathname.replace('/api/auth', ''))
  const res = await fetch(url, {
    headers: {
      'cookie': request.headers.get('cookie') || '',
      'authorization': request.headers.get('authorization') || ''
    },
    cache: 'no-store'
  })
  const body = await res.text()
  return new Response(body, {
    status: res.status,
    headers: { 'content-type': res.headers.get('content-type') || 'application/json' }
  })
}

export async function POST(request: NextRequest) {
  const url = getApiUrl(request.nextUrl.pathname.replace('/api/auth', ''))
  
  // Clonar el body para poder leerlo
  const body = await request.text()
  
  console.log('🔗 Proxy POST:', url)
  console.log('📝 Body:', body)
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'cookie': request.headers.get('cookie') || '',
      'authorization': request.headers.get('authorization') || '',
      'content-type': request.headers.get('content-type') || 'application/x-www-form-urlencoded'
    },
    body: body,
    cache: 'no-store'
  } as any)
  
  const responseBody = await res.text()
  return new Response(responseBody, {
    status: res.status,
    headers: { 
      'content-type': res.headers.get('content-type') || 'application/json',
      'set-cookie': res.headers.get('set-cookie') || ''
    }
  })
} 