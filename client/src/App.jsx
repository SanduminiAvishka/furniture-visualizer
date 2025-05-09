import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RoomProvider } from './context/RoomContext'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Editor2D from './pages/Editor2D'
import Viewer3D from './pages/Viewer3D'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <RoomProvider>
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/editor" element={
                <ProtectedRoute>
                  <Editor2D />
                </ProtectedRoute>
              } />
              <Route path="/viewer" element={
                <ProtectedRoute>
                  <Viewer3D />
                </ProtectedRoute>
              } />
            </Routes>
          </Layout>
        </RoomProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
