import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'candidates.json');

const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID;
const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY;

export async function getCandidates() {
  if (JSONBIN_BIN_ID) {
    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
        headers: {
          'X-Master-Key': JSONBIN_API_KEY || ''
        },
        cache: 'no-store'
      });
      if (res.ok) {
        const data = await res.json();
        return data.record || [];
      }
      console.error("JSONBin fetch error", res.statusText);
    } catch (e) {
      console.error("JSONBin fetch error", e);
    }
  }

  // Fallback to local file
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data || '[]');
}

export async function saveCandidates(data: any) {
  if (JSONBIN_BIN_ID) {
    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_API_KEY || ''
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        return;
      }
      console.error("JSONBin save error", res.statusText);
    } catch (e) {
      console.error("JSONBin save error", e);
    }
  }

  // Fallback to local file
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}
