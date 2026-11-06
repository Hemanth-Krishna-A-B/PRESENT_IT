const crypto = require('crypto');

const SECRET_KEY = 'super-secret-key-change-this-in-production';
const code = '6000'; // Your 4-digit code

const getKey = (secret) => crypto.createHash('sha256').update(secret).digest().subarray(0, 16);

// AES-CBC requires a 16-byte IV
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv('aes-128-cbc', getKey(SECRET_KEY), iv);
let encrypted = cipher.update(code, 'utf8', 'base64url');
encrypted += cipher.final('base64url');

// Combine into a secure token
const tinyToken = `${iv.toString('base64url')}.${encrypted}`;

console.log(`\nYour Tiny Secure URL:\nhttp://localhost:3000/join_session?token=${tinyToken}\n`);