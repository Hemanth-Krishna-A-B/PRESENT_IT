import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export async function POST(request: Request) {
  try {
    const { identifier, password } = await request.json() // identifier can be username or email
    const { email: directEmail, username: directUsername } = await request.json().catch(() => ({}))
    
    const loginInput = identifier || directEmail || directUsername

    if (!loginInput || !password) {
      return NextResponse.json(
        { error: 'Email/Username and password are required' },
        { status: 400 }
      )
    }

    let targetEmail = loginInput

    if (!loginInput.includes('@')) {
      const { data: usersData, error: userError } = await supabaseAdmin.auth.admin.listUsers()
      
      if (userError) {
        return NextResponse.json({ error: 'Authentication failed' }, { status: 400 })
      }

      const matchedUser = usersData.users.find(
        (u) => u.user_metadata?.username?.toLowerCase() === loginInput.toLowerCase()
      )

      if (!matchedUser || !matchedUser.email) {
        return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
      }

      targetEmail = matchedUser.email
    }

    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email: targetEmail,
      password,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    return NextResponse.json(
      { 
        message: 'Logged in successfully', 
        session: data.session, 
        user: data.user 
      },
      { status: 200 }
    )
  } catch (err: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}