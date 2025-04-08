import CardCarrier from './CardCarrier';
import { useState } from 'react';
import {
  Bars3Icon,
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  ArrowRightEndOnRectangleIcon
} from '@heroicons/react/20/solid';



const SideNavbar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 w-full">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0`}>

        <div className="p-4 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full"
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="User"
              />
              {!sidebarCollapsed && <span className="ml-3 text-sm font-medium text-gray-700">Usuario</span>}
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-gray-500 hover:text-gray-700"
          >
            {sidebarCollapsed ? (
              <Bars3Icon className="h-6 w-10" />
            ) : (
              <ChevronLeftIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav className="mt-6">
          {[
            { name: 'Inicio', icon: <HomeIcon className="h-5 w-10" />, current: true },
            { name: 'Equipo', icon: <UsersIcon className="h-5 w-10" />, current: false },
            { name: 'Proyectos', icon: <FolderIcon className="h-5 w-10" />, current: false },
            { name: 'Calendario', icon: <CalendarIcon className="h-5 w-10" />, current: false },
          ].map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center px-4 py-3 text-sm font-medium ${item.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              <span className="mr-3">{item.icon}</span>
              {!sidebarCollapsed && item.name}
            </a>
          ))}
          {/* Company Name at bottom left of sidebar */}
          <div className="mt-auto p-4 py-60">
            {sidebarCollapsed ? (
              <div className="flex justify-center h-10">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">TA</span>
                </div>
              </div>
            ) : (
              <div className="text-sm font-medium text-gray-700 pl-4">Transportes Albornoz</div>
            )}
          </div>
        </nav>

      </div>


      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center flex-1">
              {/* Search Bar */}
              <div className="relative flex-1 mr-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border-0 leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                  placeholder="Buscar..."
                />
              </div>
            </div>

            <div className="flex items-center">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <BellIcon className="h-6 w-6" />
              </button>

              {/* User Dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                      alt="User"
                    />
                    <ChevronDownIcon className={`ml-1 h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                </div>

                {isOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <button
                      onClick={onLogout}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    >
                      <ArrowRightEndOnRectangleIcon
                        className={`h-4 w-4 text-gray-400 transition-transform`}
                      />
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4">
          {/* Contenido principal aquí */}
        </main>
      </div>
    </div>
  );
};

export default SideNavbar;
