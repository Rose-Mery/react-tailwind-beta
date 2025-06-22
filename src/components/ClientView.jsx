import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  PlusCircleIcon, 
  UserIcon, 
  ChevronDownIcon,
  PencilSquareIcon,
  EyeIcon
} from '@heroicons/react/20/solid';

const ClientView = ({ setIsNewClientModalOpen }) => {
  // Datos de ejemplo para clientes
  const clients = [
    {
      id: 1,
      name: "Roberto Soto",
      phone: "+56912345678",
      email: "roberto.soto@example.com",
      address: "Av. Providencia 1234, Santiago",
      vehicles: ["Toyota Corolla 2020"],
      assignedDriver: "Juan Pérez",
      lastService: "22/06/2023",
      status: "Servicio completado",
      rating: 4.8
    },
    {
      id: 2,
      name: "María López",
      phone: "+56987654321",
      email: "maria.lopez@example.com",
      address: "Calle Prat 567, Valparaíso",
      vehicles: ["Honda Civic 2018"],
      assignedDriver: "María González",
      lastService: "22/06/2023",
      status: "En ruta",
      rating: 4.5
    },
    {
      id: 3,
      name: "AutoShop",
      phone: "+56911223344",
      email: "contacto@autoshop.cl",
      address: "Depósito Central, Santiago",
      vehicles: ["3 vehículos diversos"],
      assignedDriver: "Carlos Rojas",
      lastService: "21/06/2023",
      status: "Servicio completado",
      rating: 4.7
    },
    {
      id: 4,
      name: "Juan Martínez",
      phone: "+56955667788",
      email: "juan.martinez@example.com",
      address: "Autopista Central km 12",
      vehicles: ["Ford Ranger 2021"],
      assignedDriver: "Federick González",
      lastService: "21/06/2023",
      status: "Cancelado",
      rating: 3.9
    },
    {
      id: 5,
      name: "Taller Rápido",
      phone: "+56999887766",
      email: "taller.rapido@example.com",
      address: "Av. Matta 789, Santiago",
      vehicles: ["Nissan Sentra 2019"],
      assignedDriver: "Juan Pérez",
      lastService: "20/06/2023",
      status: "Servicio completado",
      rating: 4.9
    },
    {
      id: 6,
      name: "Concesionario AutoStar",
      phone: "+56911224455",
      email: "ventas@autostar.cl",
      address: "Av. Libertador 567, Viña del Mar",
      vehicles: ["5 vehículos nuevos"],
      assignedDriver: "María González",
      lastService: "23/06/2023",
      status: "Programado",
      rating: 4.6
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  
  // Filtrar clientes
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.assignedDriver.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Ordenar clientes
  const sortedClients = [...filteredClients].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
  
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-800">Gestión de Clientes</h2>
          <p className="text-gray-600 mt-1">
            Lista completa de clientes y sus servicios asignados
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
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center hover:bg-indigo-700"
            onClick={() => setIsNewClientModalOpen(true)}
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Nuevo Cliente
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => requestSort('name')}
              >
                <div className="flex items-center">
                  Cliente
                  {sortConfig.key === 'name' && (
                    <ChevronDownIcon 
                      className={`ml-1 h-4 w-4 transition-transform ${sortConfig.direction === 'ascending' ? 'transform rotate-180' : ''}`} 
                    />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contacto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehículo(s)
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => requestSort('assignedDriver')}
              >
                <div className="flex items-center">
                  Conductor Asignado
                  {sortConfig.key === 'assignedDriver' && (
                    <ChevronDownIcon 
                      className={`ml-1 h-4 w-4 transition-transform ${sortConfig.direction === 'ascending' ? 'transform rotate-180' : ''}`} 
                    />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => requestSort('lastService')}
              >
                <div className="flex items-center">
                  Último Servicio
                  {sortConfig.key === 'lastService' && (
                    <ChevronDownIcon 
                      className={`ml-1 h-4 w-4 transition-transform ${sortConfig.direction === 'ascending' ? 'transform rotate-180' : ''}`} 
                    />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Calificación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedClients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="bg-indigo-100 rounded-full p-2 mr-3">
                      <UserIcon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.address}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{client.phone}</div>
                  <div className="text-sm text-gray-500">{client.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {client.vehicles.map((vehicle, index) => (
                    <div key={index} className="text-sm text-gray-900">{vehicle}</div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                      <span className="text-xs font-medium">{client.assignedDriver.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div className="text-sm text-gray-900">{client.assignedDriver}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.lastService}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    client.status === "Servicio completado" ? "bg-green-100 text-green-800" :
                    client.status === "En ruta" ? "bg-yellow-100 text-yellow-800" :
                    client.status === "Programado" ? "bg-blue-100 text-blue-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(client.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-gray-600">{client.rating.toFixed(1)}</span>
                  </div>
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
      
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-gray-700">
          Mostrando <span className="font-medium">{sortedClients.length}</span> de <span className="font-medium">{clients.length}</span> clientes
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

export default ClientView;