import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, password } = req.body

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' })
  }

  // In a real application, you would:
  // 1. Check if user already exists
  // 2. Hash the password
  // 3. Save to database
  // 4. Return success

  // For demo purposes, we'll just return success
  return res.status(200).json({ message: 'User created successfully' })
}
// pages/api/auth/register.ts
