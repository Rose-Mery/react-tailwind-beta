import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  FunnelIcon,
  CurrencyDollarIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CreditCardIcon,
  BanknotesIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from '@heroicons/react/20/solid';

const FinanceView = () => {
  // Datos de ejemplo para transacciones financieras
  const transactions = [
    {
      id: 1,
      date: "22/06/2023",
      description: "Servicio #12345 - Transporte Toyota Corolla",
      client: "Roberto Soto",
      amount: "$120.000",
      type: "ingreso",
      status: "Completado",
      method: "Transferencia"
    },
    {
      id: 2,
      date: "22/06/2023",
      description: "Servicio #12346 - Transporte Honda Civic",
      client: "María López",
      amount: "$95.000",
      type: "ingreso",
      status: "Pendiente",
      method: "Efectivo"
    },
    {
      id: 3,
      date: "21/06/2023",
      description: "Servicio #12347 - Transporte múltiple",
      client: "AutoShop",
      amount: "$350.000",
      type: "ingreso",
      status: "Completado",
      method: "Transferencia"
    },
    {
      id: 4,
      date: "21/06/2023",
      description: "Mantenimiento camión LMN-456",
      amount: "$85.000",
      type: "gasto",
      status: "Completado",
      method: "Tarjeta de crédito"
    },
    {
      id: 5,
      date: "20/06/2023",
      description: "Servicio #12348 - Transporte Nissan Sentra",
      client: "Taller Rápido",
      amount: "$80.000",
      type: "ingreso",
      status: "Completado",
      method: "Transferencia"
    },
    {
      id: 6,
      date: "19/06/2023",
      description: "Combustible camión ABC-123",
      amount: "$45.000",
      type: "gasto",
      status: "Completado",
      method: "Tarjeta de débito"
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('Todos');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' });

  // Filtrar transacciones
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.client && transaction.client.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = typeFilter === 'Todos' || transaction.type === typeFilter;
    
    return matchesSearch && matchesType;
  });
  
  // Ordenar transacciones
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
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

  const typeOptions = ['Todos', 'ingreso', 'gasto'];

  // Calcular totales
  const totalIngresos = transactions
    .filter(t => t.type === 'ingreso' && t.status === 'Completado')
    .reduce((sum, t) => sum + parseInt(t.amount.replace('$', '').replace('.', '')), 0);
  
  const totalGastos = transactions
    .filter(t => t.type === 'gasto' && t.status === 'Completado')
    .reduce((sum, t) => sum + parseInt(t.amount.replace('$', '').replace('.', '')), 0);
  
  const balance = totalIngresos - totalGastos;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-800">Gestión Financiera</h2>
          <p className="text-gray-600 mt-1">
            Resumen de ingresos, gastos y balance financiero
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
              placeholder="Buscar transacciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              {typeOptions.map(option => (
                <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Resumen financiero */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">${totalIngresos.toLocaleString('es-CL')}</h3>
              <p className="text-emerald-100">Total Ingresos</p>
            </div>
            <div className="bg-green-400 p-3 rounded-lg">
              <ArrowDownIcon className="h-8 w-8 transform rotate-180" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">${totalGastos.toLocaleString('es-CL')}</h3>
              <p className="text-amber-100">Total Gastos</p>
            </div>
            <div className="bg-amber-400 p-3 rounded-lg">
              <ArrowUpIcon className="h-8 w-8" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">${balance.toLocaleString('es-CL')}</h3>
              <p className="text-blue-100">Balance Actual</p>
            </div>
            <div className="bg-blue-400 p-3 rounded-lg">
              <CurrencyDollarIcon className="h-8 w-8" />
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
                  Fecha
                  {sortConfig.key === 'date' && (
                    <ChevronDownIcon 
                      className={`ml-1 h-4 w-4 transition-transform ${sortConfig.direction === 'ascending' ? 'transform rotate-180' : ''}`} 
                    />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
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
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Método
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.date}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{transaction.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{transaction.client || '-'}</div>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                  transaction.type === 'ingreso' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'gasto' && '-'}{transaction.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.type === 'ingreso' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.type === 'ingreso' ? 'Ingreso' : 'Gasto'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {transaction.method === 'Transferencia' ? (
                      <BanknotesIcon className="h-5 w-5 text-gray-500 mr-2" />
                    ) : transaction.method === 'Efectivo' ? (
                      <CurrencyDollarIcon className="h-5 w-5 text-gray-500 mr-2" />
                    ) : (
                      <CreditCardIcon className="h-5 w-5 text-gray-500 mr-2" />
                    )}
                    <span className="text-sm text-gray-900">{transaction.method}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.status === "Completado" ? "bg-green-100 text-green-800" :
                    transaction.status === "Pendiente" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-gray-700">
          Mostrando <span className="font-medium">{sortedTransactions.length}</span> de <span className="font-medium">{transactions.length}</span> transacciones
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

export default FinanceView;