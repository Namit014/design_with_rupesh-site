import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const filePath = path.join(process.cwd(), 'submissions.json');
    
    let existingData = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      if (fileContent.trim()) {
        existingData = JSON.parse(fileContent);
      }
    }
    
    existingData.push({
      ...body,
      timestamp: new Date().toISOString()
    });
    
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    
    return NextResponse.json({ success: true, message: 'Data saved successfully.' });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ success: false, error: 'Failed to save data' }, { status: 500 });
  }
}
