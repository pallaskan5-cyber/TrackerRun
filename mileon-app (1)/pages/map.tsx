import { useState, useEffect, useRef } from 'react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet'
import { Play, Pause, Square, RotateCcw } from 'lucide-react'
import { mockGpsData, simulateTracking } from '@/lib/maps'
import { formatTime, formatDistance } from '@/lib/utils'

interface MapPageProps {
  user: {
    id: string
    name: string
  }
}

export default function MapPage({ user }: MapPageProps) {
  const [isTracking, setIsTracking] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [distance, setDistance] = useState(0)
  const [coordinates, setCoordinates] = useState<Array<{ lat: number; lng: number }>>([])
  const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const startTracking = () => {
    setIsTracking(true)
    setElapsedTime(0)
    setDistance(0)
    setCoordinates([])
    setCurrentPosition(null)
    
    // Start timer
    const startTime = Date.now()
    timerRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)
    
    // Simulate GPS tracking
    const stopSimulation = simulateTracking(
      (position) => {
        setCurrentPosition(position)
        setCoordinates(prev => [...prev, position])
        
        // Calculate approximate distance (simplified)
        if (prev.length > 0) {
          const lastPoint = prev[prev.length - 1]
          const diffLat = position.lat - lastPoint.lat
          const diffLng = position.lng - lastPoint.lng
          const segmentDistance = Math.sqrt(diffLat * diffLat + diffLng * diffLng) * 111000 // rough conversion to meters
          setDistance(prevDist => prevDist + segmentDistance)
        }
      },
      () => {
        // Tracking completed
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
        setIsTracking(false)
      }
    )
  }

  const pauseTracking = () => {
    setIsTracking(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  const stopTracking = () => {
    setIsTracking(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    // Save activity logic would go here
  }

  const resetTracking = () => {
    setIsTracking(false)
    setElapsedTime(0)
    setDistance(0)
    setCoordinates([])
    setCurrentPosition(null)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
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
          {/* Controls Panel */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow p-6 dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Tracking Controls</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">Elapsed Time</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatTime(elapsedTime)}
                </div>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">Distance</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatDistance(distance)}
                </div>
              </div>
              
              <div className="flex space-x-2 pt-4">
                {!isTracking ? (
                  <button
                    onClick={startTracking}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Start
                  </button>
                ) : (
                  <button
                    onClick={pauseTracking}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition"
                  >
                    <Pause className="h-5 w-5 mr-2" />
                    Pause
                  </button>
                )}
                
                <button
                  onClick={stopTracking}
                  className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
                >
                  <Square className="h-5 w-5" />
                </button>
                
                <button
                  onClick={resetTracking}
                  className="flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition"
                >
                  <RotateCcw className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Route Info</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {coordinates.length > 0 ? (
                  <p>Your route has {coordinates.length} recorded points.</p>
                ) : (
                  <p>No route recorded yet.</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Map */}
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
              
              {currentPosition && (
                <Marker position={[currentPosition.lat, currentPosition.lng]}>
                  <Popup>
                    Current Position
                  </Popup>
                </Marker>
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

  const user = {
    id: session.user.id,
    name: session.user.name,
  }

  return {
    props: {
      user,
    },
  }
}
