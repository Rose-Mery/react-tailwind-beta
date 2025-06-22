import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  PlusCircleIcon,
  PencilSquareIcon,
  EyeIcon,
  TruckIcon
} from '@heroicons/react/20/solid';

const FlotaView = ({ setIsNewVehicleModalOpen }) => {
  // Datos de ejemplo para la flota
  const fleet = [
    {
      id: 1,
      name: "Camión Grúa ABC-123",
      type: "Grúa",
      status: "En ruta",
      driver: "Juan Pérez",
      lastMaintenance: "15/06/2023",
      nextMaintenance: "15/07/2023",
      fuel: 65,
      location: "Santiago",
      capacity: "2 autos",
      servicesCompleted: 42,
      vehicleImage: "grua-1"
    },
    {
      id: 2,
      name: "Camión Plataforma XYZ-789",
      type: "Plataforma",
      status: "Disponible",
      driver: "María González",
      lastMaintenance: "20/06/2023",
      nextMaintenance: "20/07/2023",
      fuel: 42,
      location: "Valparaíso",
      capacity: "1 auto",
      servicesCompleted: 28,
      vehicleImage: "plataforma-1"
    },
    {
      id: 3,
      name: "Camión Grúa LMN-456",
      type: "Grúa",
      status: "En mantenimiento",
      driver: "Carlos Rojas",
      lastMaintenance: "10/06/2023",
      nextMaintenance: "En curso",
      fuel: 78,
      location: "Concepción",
      capacity: "2 autos",
      servicesCompleted: 35,
      vehicleImage: "grua-2"
    },
    {
      id: 4,
      name: "Camión Plataforma OPQ-012",
      type: "Plataforma",
      status: "Disponible",
      driver: "Federick González",
      lastMaintenance: "18/06/2023",
      nextMaintenance: "25/07/2023",
      fuel: 34,
      location: "Temuco",
      capacity: "1 auto",
      servicesCompleted: 19,
      vehicleImage: "plataforma-2"
    },
    {
      id: 5,
      name: "Camión Grúa RST-789",
      type: "Grúa",
      status: "En ruta",
      driver: "Juan Pérez",
      lastMaintenance: "12/06/2023",
      nextMaintenance: "12/07/2023",
      fuel: 58,
      location: "Santiago",
      capacity: "2 autos",
      servicesCompleted: 51,
      vehicleImage: "grua-3"
    },
    {
      id: 6,
      name: "Camión Plataforma UVW-345",
      type: "Plataforma",
      status: "Disponible",
      driver: "María González",
      lastMaintenance: "22/06/2023",
      nextMaintenance: "22/07/2023",
      fuel: 72,
      location: "Viña del Mar",
      capacity: "1 auto",
      servicesCompleted: 33,
      vehicleImage: "plataforma-3"
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'
  
  // Filtrar flota
  const filteredFleet = fleet.filter(vehicle => 
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para obtener el color según el estado
  const getStatusColor = (status) => {
    switch(status) {
      case "En ruta":
        return "bg-green-100 text-green-800";
      case "Disponible":
        return "bg-blue-100 text-blue-800";
      case "En mantenimiento":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-800">Gestión de Flota</h2>
          <p className="text-gray-600 mt-1">
            Vehículos disponibles y asignados para servicios de transporte
          </p>
        </div>
        
        <div className="flex space-x-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              placeholder="Buscar vehículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center hover:bg-indigo-700"
            onClick={() => setIsNewVehicleModalOpen(true)}
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Nuevo Vehículo
          </button>
        </div>
      </div>
      
      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg flex items-center ${
              viewMode === 'grid' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setViewMode('grid')}
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Cuadrícula
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg flex items-center ${
              viewMode === 'list' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setViewMode('list')}
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Lista
          </button>
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFleet.map((vehicle) => (
            <div key={vehicle.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{vehicle.name}</h3>
                    <p className="text-sm text-gray-500">{vehicle.type}</p>
                  </div>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status}
                  </span>
                </div>
                
                <div className="mt-4 flex justify-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
                    <TruckIcon className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Conductor</p>
                    <p className="font-medium">{vehicle.driver}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ubicación</p>
                    <p className="font-medium">{vehicle.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Capacidad</p>
                    <p className="font-medium">{vehicle.capacity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Servicios</p>
                    <p className="font-medium">{vehicle.servicesCompleted}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-1">Combustible</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        vehicle.fuel > 70 ? 'bg-green-500' : 
                        vehicle.fuel > 30 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} 
                      style={{ width: `${vehicle.fuel}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">0%</span>
                    <span className="text-xs font-medium">{vehicle.fuel}%</span>
                    <span className="text-xs text-gray-500">100%</span>
                  </div>
                </div>
                
                <div className="mt-5 border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Último mantenimiento</p>
                      <p className="text-sm font-medium">{vehicle.lastMaintenance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Próximo mantenimiento</p>
                      <p className="text-sm font-medium">{vehicle.nextMaintenance}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-5 py-3 flex justify-end space-x-3">
                <button className="text-sm text-indigo-600 hover:text-indigo-900 flex items-center">
                  <PencilSquareIcon className="h-4 w-4 mr-1" /> Editar
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
                  <EyeIcon className="h-4 w-4 mr-1" /> Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehículo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conductor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Combustible</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Mantenimiento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFleet.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                        <TruckIcon className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="font-medium text-gray-900">{vehicle.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                      {vehicle.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                        <span className="text-xs font-medium">{vehicle.driver.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div className="text-sm text-gray-900">{vehicle.driver}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            vehicle.fuel > 70 ? 'bg-green-500' : 
                            vehicle.fuel > 30 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} 
                          style={{ width: `${vehicle.fuel}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">{vehicle.fuel}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vehicle.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vehicle.lastMaintenance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3 flex items-center">
                      <PencilSquareIcon className="h-4 w-4 mr-1" /> Editar
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 flex items-center">
                      <EyeIcon className="h-4 w-4 mr-1" /> Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-gray-700">
          Mostrando <span className="font-medium">{filteredFleet.length}</span> de <span className="font-medium">{fleet.length}</span> vehículos
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Anterior
          </button>
          <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlotaView;