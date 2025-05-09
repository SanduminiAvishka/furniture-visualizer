import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRoom } from '../context/RoomContext'

function SavedDesigns() {
  const [designs, setDesigns] = useState([])
  const navigate = useNavigate()
  const { loadDesign, deleteDesign } = useRoom()

  useEffect(() => {
    const savedDesigns = JSON.parse(localStorage.getItem('savedDesigns') || '[]')
    setDesigns(savedDesigns)
  }, [])

  const handleEdit = (design, view) => {
    loadDesign(design)
    navigate(view === '3d' ? '/viewer' : '/editor')
  }

  const handleDelete = (designId) => {
    deleteDesign(designId)
    setDesigns(prev => prev.filter(d => d.id !== designId))
  }

  if (designs.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-2xl">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No saved designs</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new design.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {designs.map((design) => (
        <div 
          key={design.id} 
          className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-200 hover:scale-105"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{design.name}</h3>
              <span className="text-sm text-gray-500">
                {new Date(design.timestamp).toLocaleDateString()}
              </span>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <span>Room Size: {design.roomConfig.size.width}×{design.roomConfig.size.length}cm</span>
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Furniture Items: {design.furniture.length}</span>
              </div>
            </div>

            <div className="space-y-3">
              {/* View buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleEdit(design, '2d')}
                  className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  2D View
                </button>
                <button
                  onClick={() => handleEdit(design, '3d')}
                  className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                  </svg>
                  3D View
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEdit(design, '2d')}
                  className="flex-1 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Edit Design
                </button>
                <button
                  onClick={() => handleDelete(design.id)}
                  className="flex items-center justify-center px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SavedDesigns 