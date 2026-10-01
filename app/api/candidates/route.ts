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

function saveCandidates(data: any) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

function generatePassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
  let password = '';
  for (let i = 0; i < 10; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export async function GET() {
  try {
    const candidates = getCandidates();
    return NextResponse.json(candidates);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch candidates' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, interviewDate, interviewTime, queueNumber, googleMeetCode } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const candidates = getCandidates();
    
    // Check if email already exists
    if (candidates.some((c: any) => c.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json({ error: 'Candidate with this email already exists' }, { status: 400 });
    }

    const newCandidate = {
      id: body.id || Math.floor(1000 + Math.random() * 9000).toString(),
      name,
      email,
      password: (password && password.trim()) ? password.trim() : `${name.split(' ')[0]}@rebirth`,
      interviewDate: interviewDate || '',
      interviewTime: interviewTime || '',
      queueNumber: queueNumber || '',
      googleMeetCode: googleMeetCode || '',
      createdAt: new Date().toISOString()
    };

    candidates.push(newCandidate);
    saveCandidates(candidates);

    return NextResponse.json({ message: 'Candidate added successfully', candidate: newCandidate }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add candidate' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, email, password, interviewDate, interviewTime, queueNumber, googleMeetCode } = body;

    if (!id) {
      return NextResponse.json({ error: 'Candidate ID is required for update' }, { status: 400 });
    }

    const candidates = getCandidates();
    const index = candidates.findIndex((c: any) => c.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }

    candidates[index] = {
      ...candidates[index],
      name: name || candidates[index].name,
      email: email || candidates[index].email,
      password: password || candidates[index].password,
      interviewDate: interviewDate || candidates[index].interviewDate,
      interviewTime: interviewTime || candidates[index].interviewTime,
      queueNumber: queueNumber || candidates[index].queueNumber,
      googleMeetCode: googleMeetCode !== undefined ? googleMeetCode : candidates[index].googleMeetCode,
    };

    saveCandidates(candidates);
    return NextResponse.json({ message: 'Candidate updated successfully', candidate: candidates[index] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update candidate' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Candidate ID is required' }, { status: 400 });
    }

    const candidates = getCandidates();
    const filtered = candidates.filter((c: any) => c.id !== id);

    if (filtered.length === candidates.length) {
      return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }

    saveCandidates(filtered);
    return NextResponse.json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete candidate' }, { status: 500 });
  }
}
