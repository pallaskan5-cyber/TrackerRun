import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-800 dark:text-primary-200">
          Mileon
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Track your runs, connect with friends, and conquer challenges together.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/dashboard" className="btn-primary text-lg py-3 px-8">
            Get Started
          </Link>
          <Link href="/login" className="btn-secondary text-lg py-3 px-8">
            Sign In
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-primary-600 dark:text-primary-400">GPS Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Record your runs with precise GPS tracking and visualize your routes on interactive maps.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-primary-600 dark:text-primary-400">Social Feed</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Share your achievements with friends and discover new running buddies in your community.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-primary-600 dark:text-primary-400">Challenges</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Compete in weekly challenges and climb the leaderboard to become the ultimate runner.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)
  
  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }
  
  return {
    props: {},
  }
}
