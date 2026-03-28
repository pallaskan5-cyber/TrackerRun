import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import Link from 'next/link'
import { MapPin, Calendar, BarChart } from 'lucide-react'

interface DashboardProps {
  user: {
    name: string
  }
}

export default function Dashboard({ user }: DashboardProps) {
  const stats = [
    { name: 'Total Distance', value: '24.5 km', icon: MapPin },
    { name: 'Total Time', value: '2h 15m', icon: Calendar },
    { name: 'Activities', value: '12', icon: BarChart },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white shadow dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 dark:text-gray-300">Welcome, {user.name}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
              <div className="flex items-center">
                <stat.icon className="h-10 w-10 text-primary-500" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{stat.name}</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/map" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 transition">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-primary-500" />
                <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">Track New Run</h3>
              </div>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Start recording your next running adventure.
              </p>
            </div>
          </Link>
          
          <Link href="/challenges" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 transition">
              <div className="flex items-center">
                <BarChart className="h-8 w-8 text-primary-500" />
                <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">View Challenges</h3>
              </div>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                See how you rank against other runners.
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)
  
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: {
        name: session.user?.name || 'Runner',
      },
    },
  }
}
// pages/dashboard.tsx
