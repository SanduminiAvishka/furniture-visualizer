import { Link } from 'react-router-dom'
import { useRoom } from '../context/RoomContext'
import SavedDesigns from '../components/SavedDesigns'

function Home() {
  const { clearCurrentDesign } = useRoom()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Furniture Design
          <span className="text-blue-600"> Visualizer</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Transform your space with our professional furniture visualization tool. Design, customize, and visualize your dream room in both 2D and 3D.
        </p>
        <div className="space-x-4">
          <Link 
            to="/editor"
            onClick={clearCurrentDesign}
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-xl hover:bg-blue-700 transition-colors duration-200"
          >
            Create New Design
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Saved Designs Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Saved Designs</h2>
        <SavedDesigns />
      </div>
    </div>
  )
}

export default Home 