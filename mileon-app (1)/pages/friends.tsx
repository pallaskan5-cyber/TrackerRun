import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Search, UserPlus, UserCheck } from 'lucide-react'

interface FriendsPageProps {
  user: {
    id: string
    name: string
  }
  friends: any[]
  pendingRequests: any[]
}

export default function FriendsPage({ user, friends, pendingRequests }: FriendsPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white shadow dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Friends</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 dark:text-gray-300">Welcome, {user.name}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for friends..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
        
        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Pending Requests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-lg shadow p-4 flex items-center dark:bg-gray-800">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium dark:bg-gray-700 dark:text-gray-300">
                      {request.name.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{request.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Sent you a friend request</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700">
                      <UserCheck className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500">
                      <UserPlus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Friends List */}
        <div>
          <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            Your Friends ({friends.length})
          </h2>
          {friends.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {friends.map((friend) => (
                <div key={friend.id} className="bg-white rounded-lg shadow p-4 flex items-center dark:bg-gray-800">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium dark:bg-gray-700 dark:text-gray-300">
                      {friend.name.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{friend.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {friend.lastActivity 
                        ? `Last active ${new Date(friend.lastActivity).toLocaleDateString()}` 
                        : 'Recently joined'}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <UserPlus className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <UserPlus className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No friends yet</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Find and connect with other runners in your community.
              </p>
            </div>
          )}
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

  const user = {
    id: session.user.id,
    name: session.user.name,
  }

  // Mock data - in a real app, you would fetch from your database
  const friends = [
    { id: '1', name: 'Alex Johnson', lastActivity: new Date(Date.now() - 86400000).toISOString() },
    { id: '2', name: 'Sarah Williams', lastActivity: new Date(Date.now() - 172800000).toISOString() },
    { id: '3', name: 'Mike Chen', lastActivity: new Date(Date.now() - 259200000).toISOString() },
  ]

  const pendingRequests = [
    { id: '4', name: 'Emma Davis' },
    { id: '5', name: 'James Wilson' },
  ]

  return {
    props: {
      user,
      friends,
      pendingRequests,
    },
  }
}
