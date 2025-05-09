import { useRoom } from '../../context/RoomContext'
import { useRef, useEffect } from 'react'
import { FURNITURE_MODELS, FURNITURE_CATEGORIES } from '../../constants/furniture'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Stage, useGLTF } from '@react-three/drei'

// Model component to show a 3D preview of the furniture item
function ModelPreview({ modelPath, color }) {
  // Load the model
  const { scene } = useGLTF(modelPath, true)
  
  // Clone the scene to avoid React warnings about modifying props
  const clonedScene = scene.clone()
  
  // Update materials with the furniture color
  clonedScene.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material = child.material.clone()
      child.material.color.set(color)
    }
  })

  return (
    <primitive 
      object={clonedScene} 
      scale={[0.5, 0.5, 0.5]}
      position={[0, -0.5, 0]}
      rotation={[0, Math.PI / 4, 0]} // Rotate to show a good angle
    />
  )
}

// Furniture card component with 3D preview
function FurnitureCard({ itemKey, onClick }) {
  const item = FURNITURE_MODELS[itemKey]
  const canvasRef = useRef(null)
  
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center p-3 bg-white rounded-lg shadow hover:shadow-md transition-all duration-200 hover:bg-blue-50"
    >
      <div className="w-full h-24 mb-2 bg-gray-100 rounded overflow-hidden">
        {item.model && (
          <Canvas
            ref={canvasRef}
            shadows
            gl={{ preserveDrawingBuffer: true }}
            className="w-full h-full"
          >
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={40} />
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
            <ModelPreview modelPath={item.model} color={item.color} />
          </Canvas>
        )}
      </div>
      <span className="text-sm font-medium text-gray-800">{item.name}</span>
      <span className="text-xs text-gray-500">{`${item.width}×${item.length} cm`}</span>
    </button>
  )
}

function FurnitureCatalog() {
  const { addFurniture } = useRoom()

  const handleAddFurniture = (itemKey) => {
    const item = FURNITURE_MODELS[itemKey]
    addFurniture({
      ...item,
      x: 100,
      y: 100,
      originalWidth: item.width,
      originalLength: item.length,
      width: item.width,
      length: item.length,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      shadowBlur: 0
    })
  }

  // Preload all models
  useEffect(() => {
    Object.values(FURNITURE_MODELS).forEach(item => {
      if (item.model) {
        useGLTF.preload(item.model)
      }
    })
    
    // Clean up when component unmounts
    return () => {
      Object.values(FURNITURE_MODELS).forEach(item => {
        if (item.model) {
          useGLTF.clear(item.model)
        }
      })
    }
  }, [])

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
        Furniture Catalog
      </h3>
      
      {Object.entries(FURNITURE_CATEGORIES).map(([category, items]) => (
        <div key={category} className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 capitalize">{category}</h4>
          <div className="grid grid-cols-2 gap-2">
            {items.map(itemKey => {
              const item = FURNITURE_MODELS[itemKey.toLowerCase()]
              if (!item) return null
              
              return (
                <FurnitureCard
                  key={itemKey}
                  itemKey={itemKey.toLowerCase()}
                  onClick={() => handleAddFurniture(itemKey.toLowerCase())}
                />
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FurnitureCatalog 