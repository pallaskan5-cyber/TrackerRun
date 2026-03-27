import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { formatDistance, formatTime } from '@/lib/utils'
import Link from 'next/link'
import { BarChart, Calendar, MapPin, Users } from 'lucide-react'

interface DashboardProps {
  user: {
    id: string
    name: string
    email: string
  }
  recentActivities: any[]
  stats: {
    totalDistance: number
    totalTime: number
    activityCount: number
  }
}

export default function Dashboard({ user, recentActivities, stats }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white shadow dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 dark:text-gray-300">Welcome, {user.name}</span>
            <Link 
              href="/profile" 
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium dark:bg-gray-700 dark:text-gray-300"
            >
              {user.name.charAt(0)}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
            <div className="flex items-center">
              <MapPin className="h-10 w-10 text-primary-500" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Distance</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatDistance(stats.totalDistance)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
            <div className="flex items-center">
              <Calendar className="h-10 w-10 text-primary-500" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Time</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatTime(stats.totalTime)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
            <div className="flex items-center">
              <BarChart className="h-10 w-10 text-primary-500" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Activities</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.activityCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Recent Activities</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div key={activity.id} className="px-6 py-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        {new Date(activity.startedAt).toLocaleDateString()} • {formatDistance(activity.distance)} • {formatTime(activity.duration)}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Link 
                        href={`/activities/${activity.id}`}
                        className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No activities yet</h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  Get started by recording your first run.
                </p>
                <div className="mt-6">
                  <Link 
                    href="/map"
                    className="btn-primary inline-flex items-center px-4 py-2"
                  >
                    Start Tracking
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
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

  // Mock data - in a real app, you would fetch from your database
  const user = {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  }

  const recentActivities = [
    {
      id: '1',
      title: 'Morning Run',
      distance: 5200,
      duration: 1800,
      startedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '2',
      title: 'Evening Jog',
      distance: 3800,
      duration: 1200,
      startedAt: new Date(Date.now() - 172800000).toISOString(),
    },
  ]

  const stats = {
    totalDistance: 9000,
    totalTime: 3000,
    activityCount: 2,
  }

  return {
    props: {
      user,
      recentActivities,
      stats,
    },
  }
}
