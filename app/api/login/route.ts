import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'candidates.json');

function getCandidates() {
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data || '[]');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json({ error: 'Name/Email and password are required' }, { status: 400 });
    }

    const candidates = getCandidates();
    const candidate = candidates.find((c: any) => {
      if (c.password !== password) return false;
      
      const searchStr = identifier.toLowerCase().trim();
      const matchEmail = c.email.toLowerCase() === searchStr;
      
      // Very forgiving name match (if they misspell or type part of it)
      const cName = c.name.toLowerCase();
      const matchName = cName.includes(searchStr) || searchStr.includes(cName);
      
      return matchEmail || matchName;
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
