import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  ChevronDownIcon,
  FunnelIcon,
  CalendarIcon,
  TruckIcon,
  UserCircleIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from '@heroicons/react/20/solid';

const ServiceView = ({ setIsNewServiceModalOpen }) => {
  // Datos de ejemplo para servicios
  const services = [
    {
      id: 1,
      client: "Roberto Soto",
      type: "Transporte",
      date: "22/06/2023",
      time: "10:30 AM",
      status: "Completado",
      amount: "$120.000",
      origin: "Av. Providencia 1234, Santiago",
      destination: "Taller Los Leones, Santiago",
      vehicle: "Toyota Corolla 2020",
      driver: "Juan Pérez",
      notes: "Neumático pinchado"
    },
    {
      id: 2,
      client: "María López",
      type: "Transporte",
      date: "22/06/2023",
      time: "11:45 AM",
      status: "En progreso",
      amount: "$95.000",
      origin: "Calle Prat 567, Valparaíso",
      destination: "Concesionario AutoStar, Viña del Mar",
      vehicle: "Honda Civic 2018",
      driver: "María González",
      notes: "Traslado por venta"
    },
    {
      id: 3,
      client: "AutoShop",
      type: "Transporte múltiple",
      date: "21/06/2023",
      time: "09:15 AM",
      status: "Completado",
      amount: "$350.000",
      origin: "Depósito Central, Santiago",
      destination: "Sucursal AutoShop, Concepción",
      vehicle: "3 vehículos diversos",
      driver: "Carlos Rojas",
      notes: "Entrega a sucursal"
    },
    {
      id: 4,
      client: "Juan Martínez",
      type: "Transporte",
      date: "21/06/2023",
      time: "04:20 PM",
      status: "Cancelado",
      amount: "$0",
      origin: "Autopista Central km 12",
      destination: "Taller Martínez, Santiago",
      vehicle: "Ford Ranger 2021",
      driver: "Federick González",
      notes: "Cliente canceló el servicio"
    },
    {
      id: 5,
      client: "Taller Rápido",
      type: "Transporte",
      date: "20/06/2023",
      time: "02:00 PM",
      status: "Completado",
      amount: "$80.000",
      origin: "Av. Matta 789, Santiago",
      destination: "Taller Rápido, Santiago",
      vehicle: "Nissan Sentra 2019",
      driver: "Juan Pérez",
      notes: "Reparación de motor"
    },
    {
      id: 6,
      client: "Concesionario AutoStar",
      type: "Recogida",
      date: "23/06/2023",
      time: "03:30 PM",
      status: "Programado",
      amount: "$65.000",
      origin: "Av. Libertador 567, Viña del Mar",
      destination: "Taller Central, Valparaíso",
      vehicle: "Mazda CX-5 2021",
      driver: "María González",
      notes: "Revisión técnica"
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' });

  // Filtrar servicios
  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'Todos' || service.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Ordenar servicios
  const sortedServices = [...filteredServices].sort((a, b) => {
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

  const statusOptions = ['Todos', 'Programado', 'En progreso', 'Completado', 'Cancelado'];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-800">Gestión de Servicios</h2>
          <p className="text-gray-600 mt-1">
            Lista de servicios programados, en curso y completados
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
              placeholder="Buscar servicios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => requestSort('date')}
              >
                <div className="flex items-center">
                  Fecha/Hora
                  {sortConfig.key === 'date' && (
                    <ChevronDownIcon 
                      className={`ml-1 h-4 w-4 transition-transform ${sortConfig.direction === 'ascending' ? 'transform rotate-180' : ''}`} 
                    />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ruta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehículo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Conductor
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => requestSort('amount')}
              >
                <div className="flex items-center">
                  Monto
                  {sortConfig.key === 'amount' && (
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
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedServices.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{service.date}</div>
                  <div className="text-sm text-gray-500">{service.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{service.client}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{service.type}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 flex items-start">
                    <MapPinIcon className="h-4 w-4 text-indigo-600 mr-1 mt-0.5" />
                    <div>
                      <div className="font-medium">Origen:</div>
                      <div className="text-gray-500">{service.origin}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-900 mt-2 flex items-start">
                    <MapPinIcon className="h-4 w-4 text-green-600 mr-1 mt-0.5" />
                    <div>
                      <div className="font-medium">Destino:</div>
                      <div className="text-gray-500">{service.destination}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <TruckIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <span>{service.vehicle}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <UserCircleIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <span>{service.driver}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {service.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    service.status === "Completado" ? "bg-green-100 text-green-800" :
                    service.status === "En progreso" ? "bg-yellow-100 text-yellow-800" :
                    service.status === "Programado" ? "bg-blue-100 text-blue-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {service.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                  <button className="text-gray-600 hover:text-gray-900">Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-gray-700">
          Mostrando <span className="font-medium">{sortedServices.length}</span> de <span className="font-medium">{services.length}</span> servicios
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

export default ServiceView;