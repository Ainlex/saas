import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Redirigir a la API en puerto 3002
    const apiResponse = await fetch('http://localhost:3002/api/auth/current-user', {
      headers: {
        'Cookie': request.headers.get('cookie') || '',
        'Authorization': request.headers.get('authorization') || ''
      }
    })
    
    if (!apiResponse.ok) {
      throw new Error('API request failed')
    }
    
    const data = await apiResponse.json()
    return Response.json(data)
  } catch (error) {
    console.error('Error proxying to API:', error)
    return Response.json(
      { error: 'Failed to fetch user' }, 
      { status: 500 }
    )
  }
} 