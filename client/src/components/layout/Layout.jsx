import { Link } from 'react-router-dom'
import { useRoom } from '../../context/RoomContext'
import { useAuth } from '../../context/AuthContext'
import { 
  HomeIcon, 
  PencilSquareIcon, 
  CubeIcon,
  PlusIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'

const Header = () => {
  const { clearCurrentDesign } = useRoom()
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <svg className="h-8 w-8 text-blue-600 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                Furniture Visualizer
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-all duration-200 cursor-pointer"
            >
              Home
            </Link>
            {user ? (
              <>
                <Link 
                  to="/editor" 
                  onClick={clearCurrentDesign}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                >
                  <PlusIcon className="w-4 h-4 mr-1" />
                  New Design
                </Link>
                <Link 
                  to="/editor" 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                >
                  <PencilSquareIcon className="w-4 h-4 mr-1" />
                  2D Editor
                </Link>
                <Link 
                  to="/viewer" 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                >
                  <CubeIcon className="w-4 h-4 mr-1" />
                  3D Viewer
                </Link>
                
                {/* User Profile Section */}
                <div className="flex items-center ml-4 border-l pl-4">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={logout}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer"
                    >
                      <UserCircleIcon className="w-4 h-4 mr-1" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium border border-transparent hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}

export default Layout