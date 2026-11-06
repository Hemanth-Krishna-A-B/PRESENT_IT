import { NextResponse } from 'next/server';
import crypto from 'crypto';

const SECRET_KEY = process.env.SESSION_SECRET_KEY || 'super-secret-key-change-this-in-production';

const getKey = (secret: string) => crypto.createHash('sha256').update(secret).digest().subarray(0, 16);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Token is missing' }, { status: 400 });
  }

  try {
    const [ivB64, ctB64] = token.split('.');
    if (!ivB64 || !ctB64) {
      throw new Error('Malformed token format');
    }

    const iv = Buffer.from(ivB64, 'base64url');
    const encryptedText = Buffer.from(ctB64, 'base64url');

    const decipher = crypto.createDecipheriv('aes-128-cbc', getKey(SECRET_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    
    const sessionCode = decrypted.toString('utf8');

    return NextResponse.json({ sessionCode }, { status: 200 });
  } catch (error: any) {
    console.error("Decryption failed:", error.message);
    return NextResponse.json({ error: 'Invalid or expired session link' }, { status: 400 });
  }
}