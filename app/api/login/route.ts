import { NextResponse } from 'next/server';
import { getCandidates } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json({ error: 'Name/Email and password are required' }, { status: 400 });
    }

    const candidates = await getCandidates();
    const candidate = candidates.find((c: any) => {
      const searchEmail = identifier.toLowerCase().trim();
      const dbEmail = c.email.toLowerCase().trim();
      
      // Must exactly match email and password
      return dbEmail === searchEmail && c.password === password;
    });

    if (!candidate) {
      return NextResponse.json({ error: 'Invalid credentials. Please check your details.' }, { status: 401 });
    }

    // Return candidate info (excluding password)
    const { password: _, ...candidateInfo } = candidate;

    return NextResponse.json({ message: 'Login successful', candidate: candidateInfo }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process login' }, { status: 500 });
  }
}
