import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet'
import { Play, Pause, Square } from 'lucide-react'

interface MapPageProps {
  user: {
    name: string
  }
}

export default function MapPage({ user }: MapPageProps) {
  const [isTracking, setIsTracking] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [distance, setDistance] = useState(0)
  const [coordinates] = useState([
    { lat: 48.8566, lng: 2.3522 },
    { lat: 48.8584, lng: 2.2945 },
    { lat: 48.8606, lng: 2.3376 },
  ])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTracking) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1)
        setDistance(prev => prev + 0.1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTracking])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white shadow dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Map Tracker</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 dark:text-gray-300">Welcome, {user.name}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 bg-white rounded-lg shadow p-6 dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Tracking Controls</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">Elapsed Time</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.floor(elapsedTime / 60)}:{String(elapsedTime % 60).padStart(2, '0')}
                </div>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">Distance</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {distance.toFixed(2)} km
                </div>
              </div>
              
              <div className="flex space-x-2 pt-4">
                {!isTracking ? (
                  <button
                    onClick={() => setIsTracking(true)}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Start
                  </button>
                ) : (
                  <button
                    onClick={() => setIsTracking(false)}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition"
                  >
                    <Pause className="h-5 w-5 mr-2" />
                    Pause
                  </button>
                )}
                
                <button
                  onClick={() => {
                    setIsTracking(false)
                    setElapsedTime(0)
                    setDistance(0)
                  }}
                  className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
                >
                  <Square className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 h-[600px] rounded-lg overflow-hidden shadow">
            <MapContainer 
              center={[48.8566, 2.3522]} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {coordinates.length > 0 && (
                <Polyline
                  positions={coordinates}
                  color="#0ea5e9"
                  weight={5}
                />
              )}
              
              {coordinates.length > 0 && (
                <Marker position={[coordinates[0].lat, coordinates[0].lng]} />
              )}
            </MapContainer>
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
// pages/map.tsx
