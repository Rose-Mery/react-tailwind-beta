import { useState } from 'react'
import './App.css'
import SideNavbar from './components/SideNavbar'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (email && password) {
        setIsAuthenticated(true)
      } else {
        setError('Por favor ingrese correo y contraseña')
      }
    } catch (err) {
      setError('Error de autenticación. Intente nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setEmail('')
    setPassword('')
    setRemember(false)
  }

  return (
    <>
      {isAuthenticated ? (
        <div className="flex h-screen bg-gray-50">
          <SideNavbar onLogout={handleLogout} />
          <div className="flex-1 flex flex-col overflow-hidden">
            
            <main className="flex-1 overflow-y-auto p-4">
              <div className="max-w-7xl mx-auto">
                {/* Contenido del menú aquí */}
              </div>
            </main>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-700 dark:text-white text-center mb-6">
                  Transportes Albornoz
                </h1>
                
                <h5 className="text-2xl font-bold text-gray-600 dark:text-white text-center mb-6">
                  Iniciar sesión
                </h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2" htmlFor="email">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2" htmlFor="password">
                      Contraseña
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <input
                        id="remember"
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                      />
                      <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Recordarme
                      </label>
                    </div>
                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? 'Cargando...' : 'Iniciar sesión'}
                  </button>
                </form>
              </div>
              <div className="px-8 py-4 bg-gray-50 dark:bg-gray-700 text-center">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  ¿No tienes una cuenta?{' '}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 font-medium">
                    Regístrate
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App