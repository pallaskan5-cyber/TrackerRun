// Mock GPS coordinates for running routes
export const mockGpsData = [
  { lat: 48.8566, lng: 2.3522 }, // Paris
  { lat: 48.8584, lng: 2.2945 }, // Eiffel Tower
  { lat: 48.8606, lng: 2.3376 }, // Louvre Museum
  { lat: 48.8529, lng: 2.3498 }, // Notre-Dame
  { lat: 48.8566, lng: 2.3522 }, // Back to start
]

// Function to simulate GPS tracking
export const simulateTracking = (
  onUpdate: (position: { lat: number; lng: number }) => void,
  onComplete: () => void
) => {
  let index = 0
  const interval = setInterval(() => {
    if (index < mockGpsData.length) {
      onUpdate(mockGpsData[index])
      index++
    } else {
      clearInterval(interval)
      onComplete()
    }
  }, 1000)
  
  return () => clearInterval(interval)
}
