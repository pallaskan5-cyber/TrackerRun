import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/login',
  },
})

export const config = {
  matcher: [
    '/dashboard',
    '/profile/:path*',
    '/map',
    '/stats',
    '/friends',
    '/challenges',
    '/settings',
    '/api/:path*',
  ]
}
