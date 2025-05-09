import { useRoom } from '../../context/RoomContext'

function FurnitureControls({ selectedId }) {
  const { furniture, updateFurniture, deleteFurniture } = useRoom()
  const selectedItem = furniture.find(item => item.id === selectedId)

  if (!selectedItem) return null

  const handleScaleChange = (dimension, value) => {
    const scale = Number(value)
    const updates = {
      [`scale${dimension}`]: scale,
    }
    
    if (dimension === 'X') {
      updates.width = selectedItem.originalWidth * scale
    } else {
      updates.length = selectedItem.originalLength * scale
    }
    
    updateFurniture(selectedId, updates)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteFurniture(selectedId)
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3 className="font-semibold mb-3">Furniture Controls</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">{selectedItem.name}</span>
          <span className="text-xs text-gray-500">ID: {selectedItem.id}</span>
        </div>

        {/* Rotation Control */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Rotation (degrees)
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="360"
              value={selectedItem.rotation || 0}
              onChange={(e) => updateFurniture(selectedId, {
                rotation: Number(e.target.value)
              })}
              className="flex-1"
            />
            <input
              type="number"
              min="0"
              max="360"
              value={selectedItem.rotation || 0}
              onChange={(e) => updateFurniture(selectedId, {
                rotation: Number(e.target.value)
              })}
              className="w-16 px-2 py-1 text-sm border rounded-md"
            />
          </div>
          {/* Quick Rotation Buttons */}
          <div className="flex justify-center space-x-2 mt-2">
            <button
              onClick={() => updateFurniture(selectedId, {
                rotation: ((selectedItem.rotation || 0) - 90 + 360) % 360
              })}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <button
              onClick={() => updateFurniture(selectedId, {
                rotation: ((selectedItem.rotation || 0) + 90) % 360
              })}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Color and Material */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Appearance</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500">Color</label>
              <input
                type="color"
                value={selectedItem.color}
                onChange={(e) => updateFurniture(selectedId, {
                  color: e.target.value
                })}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Opacity</label>
              <input
                type="range"
                min="0.2"
                max="1"
                step="0.1"
                value={selectedItem.opacity || 1}
                onChange={(e) => updateFurniture(selectedId, {
                  opacity: Number(e.target.value)
                })}
                className="mt-1 block w-full"
              />
            </div>
          </div>
        </div>

        {/* Dimensions and Position */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Dimensions</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500">
                Width: {Math.round(selectedItem.width)}cm
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={selectedItem.scaleX || 1}
                onChange={(e) => handleScaleChange('X', e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">
                Length: {Math.round(selectedItem.length)}cm
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={selectedItem.scaleY || 1}
                onChange={(e) => handleScaleChange('Y', e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
          </div>
        </div>

        {/* Shading */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Shading</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500">Shadow Blur</label>
              <input
                type="range"
                min="0"
                max="20"
                value={selectedItem.shadowBlur || 0}
                onChange={(e) => updateFurniture(selectedId, {
                  shadowBlur: Number(e.target.value),
                  shadowColor: 'black',
                  shadowOpacity: 0.3
                })}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Shadow Opacity</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={selectedItem.shadowOpacity || 0.3}
                onChange={(e) => updateFurniture(selectedId, {
                  shadowOpacity: Number(e.target.value)
                })}
                className="mt-1 block w-full"
              />
            </div>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete Item
        </button>
      </div>
    </div>
  )
}

export default FurnitureControls 