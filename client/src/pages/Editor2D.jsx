import { useState, useRef, useEffect } from 'react'
import { Stage, Layer, Rect, Transformer, Image } from 'react-konva'
import { useRoom } from '../context/RoomContext'
import { useNavigate } from 'react-router-dom'
import FurnitureCatalog from '../components/furniture/FurnitureCatalog'
import FurnitureControls from '../components/furniture/FurnitureControls'
import SaveDesign from '../components/SaveDesign'
import { FURNITURE_MODELS } from '../constants/furniture'

function RoomControls() {
  const { roomConfig, updateRoomConfig } = useRoom()
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <button
        onClick={() => navigate('/viewer')}
        className="w-full mb-6 flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
        Switch to 3D View
      </button>

      <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Configuration</h3>
      <div className="space-y-6">
        {/* Room Dimensions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Room Dimensions</label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500">Width (cm)</label>
              <input
                type="number"
                value={roomConfig.size.width}
                onChange={(e) => updateRoomConfig({
                  size: { ...roomConfig.size, width: Number(e.target.value) }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Length (cm)</label>
              <input
                type="number"
                value={roomConfig.size.length}
                onChange={(e) => updateRoomConfig({
                  size: { ...roomConfig.size, length: Number(e.target.value) }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Height (cm)</label>
              <input
                type="number"
                value={roomConfig.size.height}
                onChange={(e) => updateRoomConfig({
                  size: { ...roomConfig.size, height: Number(e.target.value) }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Color Scheme */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Color Scheme</label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500">Walls</label>
              <input
                type="color"
                value={roomConfig.colorScheme.walls}
                onChange={(e) => updateRoomConfig({
                  colorScheme: { ...roomConfig.colorScheme, walls: e.target.value }
                })}
                className="mt-1 block w-full h-8 rounded-md border-gray-300"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Floor</label>
              <input
                type="color"
                value={roomConfig.colorScheme.floor}
                onChange={(e) => updateRoomConfig({
                  colorScheme: { ...roomConfig.colorScheme, floor: e.target.value }
                })}
                className="mt-1 block w-full h-8 rounded-md border-gray-300"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Ceiling</label>
              <input
                type="color"
                value={roomConfig.colorScheme.ceiling}
                onChange={(e) => updateRoomConfig({
                  colorScheme: { ...roomConfig.colorScheme, ceiling: e.target.value }
                })}
                className="mt-1 block w-full h-8 rounded-md border-gray-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add this new component for furniture items
function FurnitureItem({ item, isSelected, onSelect, onDragEnd, onTransformEnd }) {
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);
  
  // Load thumbnail image if available
  useEffect(() => {
    const furnitureType = item.type || 'chair';
    const thumbnail = FURNITURE_MODELS[furnitureType]?.thumbnail;
    
    if (thumbnail) {
      const img = new window.Image();
      img.src = thumbnail;
      img.onload = () => {
        setImage(img);
      };
    }
  }, [item.type]);

  return (
    <>
      {image ? (
        <Image
          ref={imageRef}
          image={image}
          x={item.x}
          y={item.y}
          width={item.width}
          height={item.length}
          rotation={item.rotation || 0}
          opacity={item.opacity || 1}
          shadowBlur={item.shadowBlur || 0}
          shadowColor={item.shadowColor}
          shadowOpacity={item.shadowOpacity}
          fill={item.color}
          draggable
          onClick={() => onSelect(item.id)}
          onDragEnd={(e) => onDragEnd(e, item.id)}
          onTransformEnd={(e) => onTransformEnd(e, item.id)}
        />
      ) : (
        <Rect
          x={item.x}
          y={item.y}
          width={item.width}
          height={item.length}
          fill={item.color}
          rotation={item.rotation || 0}
          opacity={item.opacity || 1}
          shadowBlur={item.shadowBlur || 0}
          shadowColor={item.shadowColor}
          shadowOpacity={item.shadowOpacity}
          draggable
          onClick={() => onSelect(item.id)}
          onDragEnd={(e) => onDragEnd(e, item.id)}
          onTransformEnd={(e) => onTransformEnd(e, item.id)}
        />
      )}
    </>
  );
}

function Editor2D() {
  const { roomConfig, furniture, updateFurniture, deleteFurniture } = useRoom()
  const [selectedId, setSelectedId] = useState(null)
  const stageRef = useRef(null)
  const transformerRef = useRef()

  const handleDragEnd = (e, id) => {
    updateFurniture(id, {
      x: e.target.x(),
      y: e.target.y()
    })
  }

  const handleTransformEnd = (e, id) => {
    const node = e.target
    const scaleX = node.scaleX()
    const scaleY = node.scaleY()
    const rotation = node.rotation()
    
    // Reset scale to 1 after updating width and height
    node.scaleX(1)
    node.scaleY(1)
    
    const item = furniture.find(f => f.id === id)
    updateFurniture(id, {
      x: node.x(),
      y: node.y(),
      width: Math.max(20, item.originalWidth * scaleX),
      length: Math.max(20, item.originalLength * scaleY),
      scaleX: scaleX,
      scaleY: scaleY,
      rotation: rotation
    })
  }

  useEffect(() => {
    if (selectedId && !furniture.find(item => item.id === selectedId)) {
      setSelectedId(null)
    }
  }, [furniture, selectedId])

  const handleKeyDown = (e) => {
    if (selectedId) {
      const selectedItem = furniture.find(item => item.id === selectedId)
      if (!selectedItem) return

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (window.confirm('Are you sure you want to delete this item?')) {
          deleteFurniture(selectedId)
          setSelectedId(null)
        }
      } else if (e.key === 'r' || e.key === 'R') {
        // Rotate 90 degrees clockwise
        updateFurniture(selectedId, {
          rotation: ((selectedItem.rotation || 0) + 90) % 360
        })
      } else if (e.key === 'e' || e.key === 'E') {
        // Rotate 90 degrees counter-clockwise
        updateFurniture(selectedId, {
          rotation: ((selectedItem.rotation || 0) - 90 + 360) % 360
        })
      }
    }
  }

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6" onKeyDown={handleKeyDown} tabIndex={-1}>
      {/* Left Sidebar */}
      <div className="w-full lg:w-80 space-y-6">
        <RoomControls />
        {selectedId && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <FurnitureControls selectedId={selectedId} />
          </div>
        )}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <FurnitureCatalog />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <SaveDesign />
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
        <div className="relative w-full h-full min-h-[600px] bg-gray-50 rounded-lg overflow-hidden">
          <Stage 
            width={800} 
            height={600}
            ref={stageRef}
            className="mx-auto"
            style={{
              maxWidth: '100%',
              maxHeight: '100%'
            }}
            onClick={(e) => {
              if (e.target === e.target.getStage()) {
                setSelectedId(null)
              }
            }}
          >
            <Layer>
              {/* Room outline */}
              <Rect
                x={50}
                y={50}
                width={roomConfig.size.width}
                height={roomConfig.size.length}
                fill={roomConfig.colorScheme.walls}
                stroke="gray"
                strokeWidth={2}
              />
              
              {/* Furniture items - changed to use the new component */}
              {furniture.map(item => (
                <FurnitureItem
                  key={item.id}
                  item={item}
                  isSelected={item.id === selectedId}
                  onSelect={setSelectedId}
                  onDragEnd={handleDragEnd}
                  onTransformEnd={handleTransformEnd}
                />
              ))}
              
              {/* Transformer */}
              {selectedId && (
                <Transformer
                  ref={transformerRef}
                  rotateEnabled={true}
                  rotationSnaps={[0, 45, 90, 135, 180, 225, 270, 315]}
                  boundBoxFunc={(oldBox, newBox) => {
                    // Limit resize
                    return newBox;
                  }}
                />
              )}
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  )
}

export default Editor2D 