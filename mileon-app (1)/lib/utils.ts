export const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)} m`
  }
  return `${(meters / 1000).toFixed(2)} km`
}

export const formatPace = (secondsPerKm: number): string => {
  const mins = Math.floor(secondsPerKm / 60)
  const secs = Math.round(secondsPerKm % 60)
  return `${mins}:${secs.toString().padStart(2, '0')} /km`
}

export const calculateStats = (activities: any[]) => {
  const totalDistance = activities.reduce((sum, activity) => sum + activity.distance, 0)
  const totalTime = activities.reduce((sum, activity) => sum + activity.duration, 0)
  
  const averageSpeed = totalTime > 0 ? (totalDistance / 1000) / (totalTime / 3600) : 0
  
  return {
    totalDistance,
    totalTime,
    averageSpeed: parseFloat(averageSpeed.toFixed(2)),
    activityCount: activities.length
  }
}
