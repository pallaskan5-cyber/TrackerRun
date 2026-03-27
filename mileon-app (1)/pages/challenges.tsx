import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Trophy, Target, Calendar } from 'lucide-react'
import { formatDistance } from '@/lib/utils'

interface ChallengesPageProps {
  user: {
    id: string
    name: string
  }
  activeChallenges: any[]
  completedChallenges: any[]
  leaderboard: any[]
}

export default function ChallengesPage({ user, activeChallenges, completedChallenges, leaderboard }: ChallengesPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white shadow dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Challenges</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 dark:text-gray-300">Welcome, {user.name}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Active Challenges */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Active Challenges</h2>
          {activeChallenges.length > 0 ? (
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
                        {formatDistance(challenge.currentValue)} / {formatDistance(challenge.goal)}
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
                        <span>{new Date(challenge.endDate).toLocaleDateString()}</span>
                      </div>
                      <span>{challenge.participants} participants</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow dark:bg-gray-800">
              <Target className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No active challenges</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                New challenges will be available soon!
              </p>
            </div>
          )}
        </div>
        
        {/* Leaderboard */}
        <div className="mb-12">
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
                  <tr key={entry.userId} className={index < 3 ? 'bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20' : ''}>
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
                            {entry.userName.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{entry.userName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDistance(entry.distance)}
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
        
        {/* Completed Challenges */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Completed Challenges</h2>
          {completedChallenges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedChallenges.map((challenge) => (
                <div key={challenge.id} className="bg-white rounded-lg shadow overflow-hidden dark:bg-gray-800">
                  <div className="p-4 bg-green-500">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-white">{challenge.title}</h3>
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-white text-opacity-90 mt-1">{challenge.description}</p>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Completed on {new Date(challenge.completedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between mt-3 text-sm text-gray-500 dark:text-gray-400">
                      <span>Goal: {formatDistance(challenge.goal)}</span>
                      <span>Your Result: {formatDistance(challenge.result)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow dark:bg-gray-800">
              <Trophy className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No completed challenges</h3>
              <p
