export type User = {
  id: string
  name: string
  email: string
  image?: string
  createdAt: Date
}

export type Activity = {
  id: string
  userId: string
  title: string
  description?: string
  distance: number // in meters
  duration: number // in seconds
  pace: number // seconds per km
  calories?: number
  coordinates: Array<{ lat: number; lng: number }>
  startedAt: Date
  endedAt: Date
  createdAt: Date
}

export type Friend = {
  id: string
  userId: string
  friendId: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: Date
}

export type Challenge = {
  id: string
  title: string
  description: string
  goal: number // e.g., 20km
  unit: 'km' | 'runs' | 'calories'
  startDate: Date
  endDate: Date
  createdAt: Date
}

export type Stats = {
  id: string
  userId: string
  weekStart: Date
  totalDistance: number
  totalTime: number
  runsCount: number
  createdAt: Date
}

export type LeaderboardEntry = {
  userId: string
  userName: string
  value: number
  rank: number
}
