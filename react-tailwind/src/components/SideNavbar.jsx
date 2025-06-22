import { CardCarrier } from './CardCarrier';
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
  ArrowRightEndOnRectangleIcon,
  TruckIcon
} from '@heroicons/react/20/solid';

const SideNavbar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
 
  return (
    <div className="flex bg-gray-50 w-full h-screen fixed top-0 left-0">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-20' : 'w-55'} bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0`}>

        <div className="p-4 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full"
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="User"
              />
              {!sidebarCollapsed && <span className="ml-3 text-sm font-medium text-gray-700">Víctor Alfredo Albornoz</span>}
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
            { name: 'Seguimiento', icon: <TruckIcon className="h-5 w-10" />, current: false },
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
          {/* Nombre de la empresa Albornoz en menú lateral */}
          <div className="mt-auto p-4 py-150">
            {sidebarCollapsed ? (
              <div className="flex justify-center h-10">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">TA</span>
                </div>
              </div>
            ) : (
              <div className="text-sm font-medium text-gray-700 pl-5 fixed bottom-10">Transportes Albornoz</div>
            )}
          </div>
        </nav>

      </div>

      {/* Contenido del menú */}
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

        {/* Contenido de la Card del Transportista */}
        <main className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
            <CardCarrier carrier={{
              name: "Juan Pérez",
              company: "Transportes Albornoz",
              status: "active",
              phone: "+569-12345678",
              email: "jperez@albornoz.cl",
              location: "Santiago, Chile",
              hours: "Lun-Vie 8:00-18:00",
              vehicle: {
                type: "Camión 3/4",
                plate: "AB123CD",
                capacity: "1.500 kg"
              }
            }} />
            <CardCarrier carrier={{
              name: "María González",
              company: "Transportes Albornoz",
              status: "active",
              phone: "+569-87654321",
              email: "mgonzales@albornoz.cl",
              location: "Valparaíso, Chile",
              hours: "Lun-Vie 9:00-17:00",
              vehicle: {
                type: "Camión 3/4",
                plate: "EF456GH",
                capacity: "1.500 kg"
              }
            }} />
            <CardCarrier carrier={{
              name: "Carlos Rojas",
              company: "Transportes Albornoz",
              status: "inactivo",
              phone: "+569-11223344",
              email: "crojas@albornoz.cl",
              location: "Concepción, Chile",
              hours: "Lun-Vie 7:00-19:00",
              vehicle: {
                type: "Camión 3/4",
                plate: "IJ789KL",
                capacity: "1.500 kg"
              }
            }} />
            <CardCarrier carrier={{
              name: "Federick González",
              company: "Transportes Albornoz",
              status: "inactivo",
              phone: "+569-88456677",
              email: "fgonzalez@albornoz.cl",
              location: "Chillan, Chile",
              hours: "Lun-Vie 8:00-17:00",
              vehicle: {
                type: "Camión 3/4",
                plate: "EF456GH",
                capacity: "1.500 kg"
              }
            }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SideNavbar;
