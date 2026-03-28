# Mileon - Running Social Network

A Strava-inspired running application built with Next.js, Tailwind CSS, and PostgreSQL.

## Features

- GPS run tracking with interactive maps
- Social feed to share activities with friends
- Advanced statistics and analytics
- Weekly challenges and leaderboards
- Dark mode support
- Fully responsive design

## Getting Started

1. Click "Use this template" on GitHub to create your repository
2. Connect your repository to Vercel
3. Add environment variables in Vercel:
   - DATABASE_URL
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL
4. Deploy!

## Environment Variables

Create a `.env.local` file with:

DATABASE_URL=postgresql://username:password@localhost:5432/mileon
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

## Tech Stack

- **Frontend**: Next.js (Pages Router), Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Maps**: Leaflet.js
- **Charts**: Recharts
// README.md
