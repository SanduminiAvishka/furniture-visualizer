import { createContext, useContext, useState, useEffect } from 'react'

const RoomContext = createContext()

const DEFAULT_ROOM_CONFIG = {
  size: { width: 400, length: 300, height: 250 },
  colorScheme: {
    walls: '#FFFFFF',
    floor: '#F0F0F0',
    ceiling: '#FFFFFF'
  },
  lighting: {
    ambient: 0.5,
    shadowIntensity: 0.3
  },
  showGrid: false,
  showMeasurements: false
}

export function RoomProvider({ children }) {
  // Initialize state from localStorage or use defaults
  const [roomConfig, setRoomConfig] = useState(() => {
    const saved = localStorage.getItem('currentRoomConfig')
    return saved ? { ...DEFAULT_ROOM_CONFIG, ...JSON.parse(saved) } : DEFAULT_ROOM_CONFIG
  })

  const [furniture, setFurniture] = useState(() => {
    const saved = localStorage.getItem('currentFurniture')
    return saved ? JSON.parse(saved) : []
  })

  const [currentDesign, setCurrentDesign] = useState(() => {
    const saved = localStorage.getItem('currentDesign')
    return saved ? JSON.parse(saved) : null
  })

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('currentRoomConfig', JSON.stringify(roomConfig))
  }, [roomConfig])

  useEffect(() => {
    localStorage.setItem('currentFurniture', JSON.stringify(furniture))
  }, [furniture])

  useEffect(() => {
    localStorage.setItem('currentDesign', JSON.stringify(currentDesign))
  }, [currentDesign])

  const clearCurrentDesign = () => {
    setCurrentDesign(null)
    setRoomConfig(DEFAULT_ROOM_CONFIG)
    setFurniture([])
    // Clear current working state from localStorage
    localStorage.removeItem('currentDesign')
    localStorage.removeItem('currentRoomConfig')
    localStorage.removeItem('currentFurniture')
  }

  const updateRoomConfig = (newConfig) => {
    setRoomConfig(prev => ({ ...prev, ...newConfig }))
  }

  const addFurniture = (item) => {
    setFurniture(prev => [...prev, { ...item, id: Date.now() }])
  }

  const updateFurniture = (id, updates) => {
    setFurniture(prev => 
      prev.map(item => item.id === id ? { ...item, ...updates } : item)
    )
  }

  const deleteFurniture = (id) => {
    setFurniture(prev => prev.filter(item => item.id !== id))
  }

  const loadDesign = (design) => {
    setCurrentDesign(design)
    setRoomConfig(design.roomConfig)
    setFurniture(design.furniture)
  }

  const saveDesign = (name) => {
    const design = {
      id: currentDesign?.id || Date.now(),
      name,
      timestamp: Date.now(),
      roomConfig,
      furniture
    }

    const savedDesigns = JSON.parse(localStorage.getItem('savedDesigns') || '[]')
    const existingIndex = savedDesigns.findIndex(d => d.id === design.id)

    if (existingIndex !== -1) {
      // Update existing design
      savedDesigns[existingIndex] = design
    } else {
      // Add new design
      savedDesigns.push(design)
    }

    localStorage.setItem('savedDesigns', JSON.stringify(savedDesigns))
    setCurrentDesign(design)
    return design
  }

  const deleteDesign = (designId) => {
    const savedDesigns = JSON.parse(localStorage.getItem('savedDesigns') || '[]')
    const updatedDesigns = savedDesigns.filter(d => d.id !== designId)
    localStorage.setItem('savedDesigns', JSON.stringify(updatedDesigns))
    
    if (currentDesign?.id === designId) {
      clearCurrentDesign()
    }
  }

  return (
    <RoomContext.Provider value={{
      roomConfig,
      updateRoomConfig,
      furniture,
      addFurniture,
      updateFurniture,
      deleteFurniture,
      currentDesign,
      loadDesign,
      saveDesign,
      deleteDesign,
      clearCurrentDesign
    }}>
      {children}
    </RoomContext.Provider>
  )
}

export const useRoom = () => useContext(RoomContext) 