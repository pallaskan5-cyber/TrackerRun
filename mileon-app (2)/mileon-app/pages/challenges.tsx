import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { Trophy, Target, Calendar } from 'lucide-react'

interface ChallengesPageProps {
  user: {
    name: string
  }
}

export default function ChallengesPage({ user }: ChallengesPageProps) {
  const activeChallenges = [
    {
      id: '1',
      title: 'Weekly 20K Challenge',
      description: 'Run 20 kilometers this week',
      progress: 75,
      currentValue: 15000,
      goal: 20000,
      endDate: '2023-12-31',
      participants: 124,
    },
    {
      id: '2',
      title: '5 Runs Challenge',
      description: 'Complete 5 runs this week',
      progress: 40,
      currentValue: 2,
      goal: 5,
      endDate: '2023-12-31',
      participants: 89,
    },
  ]

  const leaderboard = [
    { rank: 1, name: 'Alex Johnson', distance: 45.2, runs: 7 },
    { rank: 2, name: 'Sarah Williams', distance: 42.8, runs: 6 },
    { rank: 3, name: 'Mike Chen', distance: 38.5, runs: 5 },
    { rank: 4, name: 'Emma Davis', distance: 35.1, runs: 6 },
    { rank: 5, name: 'James Wilson', distance: 32.7, runs: 5 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white shadow dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Challenges</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 dark:text-gray-300">Welcome, {user.name}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Active Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeChallenges.map((challenge) => (
              <div key={challenge.id} className="bg-white rounded-lg shadow overflow-hidden dark:bg-gray-800">
                <div className={`p-4 ${
                  challenge.progress >= 100 
                    ? 'bg-green-500' 
                    : challenge.progress >= 50 
                      ? 'bg-yellow-500' 
                      : 'bg-blue-500'
                }`}>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-white">{challenge.title}</h3>
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-white text-opacity-90 mt-1">{challenge.description}</p>
                </div>
                <div className="p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Progress: {challenge.progress}%
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {(challenge.currentValue / 1000).toFixed(1)}km / {(challenge.goal / 1000).toFixed(1)}km
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div 
                      className={`h-2.5 rounded-full ${
                        challenge.progress >= 100 
                          ? 'bg-green-600' 
                          : challenge.progress >= 50 
                            ? 'bg-yellow-600' 
                            : 'bg-blue-600'
                      }`} 
                      style={{ width: `${challenge.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-3 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Ends {challenge.endDate}</span>
                    </div>
                    <span>{challenge.participants} participants</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Leaderboard</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden dark:bg-gray-800">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Runner
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Distance
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Runs
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {leaderboard.map((entry, index) => (
                  <tr key={index} className={index < 3 ? 'bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {index === 0 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                          #{entry.rank}
                        </span>
                      ) : index === 1 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100">
                          #{entry.rank}
                        </span>
                      ) : index === 2 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100">
                          #{entry.rank}
                        </span>
                      ) : (
                        `#${entry.rank}`
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium dark:bg-gray-700 dark:text-gray-300">
                            {entry.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{entry.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {entry.distance} km
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {entry.runs}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
// pages/challenges.tsx
