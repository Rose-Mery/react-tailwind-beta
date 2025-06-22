import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CollaboratorsView = () => {
  const [collaborators, setCollaborators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCollaborator, setCurrentCollaborator] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Datos mockeados para colaboradores
  const mockCollaborators = [
    {
      id: 1,
      name: "Carlos Mendoza",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      email: "cmendoza@albornoz.cl",
      rut: "12.345.678-9",
      phone: "+56 9 8765 4321",
      status: "Activo",
      statusColor: "bg-green-100 text-green-800",
      vehicle: {
        type: "Camión Grúa",
        plate: "ABC-123",
        capacity: "1.500 kg",
        year: 2020,
        brand: "Volvo",
        model: "FH16",
        insurance: "Vigente hasta 15/12/2024",
        maintenance: "Próxima: 15/08/2023"
      },
      tripsCompleted: 24,
      efficiency: "92%",
      lastActivity: "Hace 2 horas"
    },
    {
      id: 2,
      name: "Laura Torres",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      email: "ltorres@albornoz.cl",
      rut: "19.876.543-2",
      phone: "+56 9 1234 5678",
      status: "Inactivo",
      statusColor: "bg-gray-100 text-gray-800",
      vehicle: {
        type: "Camión 3/4",
        plate: "XYZ-789",
        capacity: "1.200 kg",
        year: 2019,
        brand: "Mercedes-Benz",
        model: "Actros",
        insurance: "Vigente hasta 30/11/2024",
        maintenance: "Próxima: 10/09/2023"
      },
      tripsCompleted: 18,
      efficiency: "85%",
      lastActivity: "Hace 3 días"
    },
    {
      id: 3,
      name: "Pedro Álvarez",
      avatar: "https://randomuser.me/api/portraits/men/65.jpg",
      email: "palvarez@albornoz.cl",
      rut: "17.654.321-0",
      phone: "+56 9 9999 8888",
      status: "En ruta",
      statusColor: "bg-blue-100 text-blue-800",
      vehicle: {
        type: "Camión Grande",
        plate: "LMN-456",
        capacity: "2.500 kg",
        year: 2022,
        brand: "Scania",
        model: "R 450",
        insurance: "Vigente hasta 20/10/2024",
        maintenance: "Próxima: 05/10/2023"
      },
      tripsCompleted: 30,
      efficiency: "95%",
      lastActivity: "En este momento"
    },
    {
      id: 4,
      name: "Ana Riquelme",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      email: "ariquelme@albornoz.cl",
      rut: "16.543.210-8",
      phone: "+56 9 7777 6666",
      status: "Descanso",
      statusColor: "bg-yellow-100 text-yellow-800",
      vehicle: {
        type: "Furgón",
        plate: "OPQ-012",
        capacity: "800 kg",
        year: 2021,
        brand: "Ford",
        model: "Transit",
        insurance: "Vigente hasta 05/01/2024",
        maintenance: "Próxima: 22/07/2023"
      },
      tripsCompleted: 15,
      efficiency: "88%",
      lastActivity: "Hace 5 horas"
    },
    {
    id: 5,
    name: "María Torres",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    email: "mtorres@albornoz.cl",
    rut: "19.876.543-2",
    phone: "+56 9 7643 2109",
    status: "Activo",
    statusColor: "bg-green-100 text-green-800",
    vehicle: {
      type: "Camión Liviano",
      plate: "DEF-456",
      capacity: "1.000 kg",
      year: 2021,
      brand: "Mercedes-Benz",
      model: "Atego",
      insurance: "Vigente hasta 10/01/2025",
      maintenance: "Próxima: 01/09/2023"
    },
    tripsCompleted: 31,
    efficiency: "95%",
    lastActivity: "Hace 1 hora"
  },
  {
    id: 6,
    name: "Jorge Ramírez",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    email: "jramirez@albornoz.cl",
    rut: "13.334.455-7",
    phone: "+56 9 9123 4567",
    status: "En descanso",
    statusColor: "bg-yellow-100 text-yellow-800",
    vehicle: {
      type: "Grúa Pluma",
      plate: "GHI-789",
      capacity: "2.000 kg",
      year: 2019,
      brand: "Scania",
      model: "P410",
      insurance: "Vigente hasta 20/11/2024",
      maintenance: "Próxima: 20/07/2023"
    },
    tripsCompleted: 18,
    efficiency: "88%",
    lastActivity: "Hace 6 horas"
  },
  {
    id: 7,
    name: "Ana Salinas",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    email: "asalinas@albornoz.cl",
    rut: "15.222.333-4",
    phone: "+56 9 6789 1234",
    status: "Inactivo",
    statusColor: "bg-red-100 text-red-800",
    vehicle: {
      type: "Camión Plataforma",
      plate: "JKL-012",
      capacity: "1.800 kg",
      year: 2018,
      brand: "MAN",
      model: "TGS",
      insurance: "Vencido el 01/06/2024",
      maintenance: "Próxima: 01/10/2023"
    },
    tripsCompleted: 12,
    efficiency: "75%",
    lastActivity: "Hace 3 días"
  },
  {
    id: 8,
    name: "Felipe Rojas",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    email: "frojas@albornoz.cl",
    rut: "14.111.789-5",
    phone: "+56 9 3344 5566",
    status: "Activo",
    statusColor: "bg-green-100 text-green-800",
    vehicle: {
      type: "Camión Grúa",
      plate: "MNO-345",
      capacity: "1.600 kg",
      year: 2022,
      brand: "Iveco",
      model: "Eurocargo",
      insurance: "Vigente hasta 05/04/2025",
      maintenance: "Próxima: 15/07/2023"
    },
    tripsCompleted: 27,
    efficiency: "91%",
    lastActivity: "Hace 40 minutos"
  },
  {
    id: 9,
    name: "Laura Contreras",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    email: "lcontreras@albornoz.cl",
    rut: "17.654.321-6",
    phone: "+56 9 5678 9012",
    status: "En mantenimiento",
    statusColor: "bg-blue-100 text-blue-800",
    vehicle: {
      type: "Camión Liviano",
      plate: "PQR-678",
      capacity: "900 kg",
      year: 2023,
      brand: "Renault",
      model: "D Wide",
      insurance: "Vigente hasta 20/09/2025",
      maintenance: "En curso"
    },
    tripsCompleted: 9,
    efficiency: "83%",
    lastActivity: "Hace 8 horas"
  },
  {
    id: 10,
    name: "Esteban Paredes",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    email: "eparedes@albornoz.cl",
    rut: "16.789.456-3",
    phone: "+56 9 4321 0987",
    status: "Activo",
    statusColor: "bg-green-100 text-green-800",
    vehicle: {
      type: "Camión Plataforma",
      plate: "STU-901",
      capacity: "2.300 kg",
      year: 2021,
      brand: "DAF",
      model: "CF",
      insurance: "Vigente hasta 30/06/2025",
      maintenance: "Próxima: 10/10/2023"
    },
    tripsCompleted: 40,
    efficiency: "97%",
    lastActivity: "Hace 15 minutos"
  }
    
  ];

  // Cargar datos iniciales
  useEffect(() => {
    setTimeout(() => {
      setCollaborators(mockCollaborators);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Abrir modal para nuevo colaborador
  const openNewCollaboratorModal = () => {
    setCurrentCollaborator({
      id: null,
      name: "",
      avatar: "",
      email: "",
      rut: "",
      phone: "",
      status: "Activo",
      vehicle: {
        type: "",
        plate: "",
        capacity: "",
        year: "",
        brand: "",
        model: "",
        insurance: "",
        maintenance: ""
      }
    });
    setIsModalOpen(true);
  };
  //Abrir modal para asignar ruta
  const openAssignRouteModal = (collaborator) => {
    setCurrentCollaborator(collaborator);
    setIsModalOpen(true);
  };

  // Abrir modal para editar colaborador
  const openEditCollaboratorModal = (collaborator) => {
    setCurrentCollaborator({ ...collaborator });
    setIsModalOpen(true);
  };

  // Guardar colaborador (crear o actualizar)
  const saveCollaborator = () => {
    if (currentCollaborator.id) {
      // Actualizar colaborador existente
      setCollaborators(
        collaborators.map(collab => 
          collab.id === currentCollaborator.id ? currentCollaborator : collab
        )
      );
    } else {
      // Crear nuevo colaborador
      const newId = Math.max(...collaborators.map(c => c.id), 0) + 1;
      setCollaborators([...collaborators, { ...currentCollaborator, id: newId }]);
    }
    setIsModalOpen(false);
  };

  // Eliminar colaborador
  const deleteCollaborator = () => {
    setCollaborators(collaborators.filter(c => c.id !== currentCollaborator.id));
    setIsDeleteConfirmOpen(false);
    setIsModalOpen(false);
  };

  // Filtrar colaboradores por búsqueda
  const filteredCollaborators = collaborators.filter(collaborator => 
    collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collaborator.vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Renderizar colaboradores
  const renderCollaborators = () => {
    if (isLoading) {
      return (
        <div className="w-full pt-60 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-700">Cargando colaboradores</h2>
          <p className="text-gray-500 mt-2">Obteniendo datos en tiempo real...</p>
        </div>
      </div>
      );
    }

    if (filteredCollaborators.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No se encontraron colaboradores</div>
          <button 
            onClick={openNewCollaboratorModal}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Agregar nuevo colaborador
          </button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCollaborators.map(collaborator => (
          <motion.div 
            key={collaborator.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-start">
                <div className="relative">
                  <img 
                    src={collaborator.avatar} 
                    alt={collaborator.name} 
                    className="w-16 h-16 rounded-full border-2 border-white shadow-md"
                  />
                  <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full ${collaborator.statusColor.includes('green') ? 'bg-green-500' : collaborator.statusColor.includes('blue') ? 'bg-blue-500' : collaborator.statusColor.includes('yellow') ? 'bg-yellow-500' : 'bg-gray-500'} border-2 border-white`}></span>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{collaborator.name}</h3>
                      <p className="text-sm text-gray-600">{collaborator.email}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${collaborator.statusColor}`}>
                      {collaborator.status}
                    </span>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-1">RUT:</span>
                      <span>{collaborator.rut}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-1">Tel:</span>
                      <span>{collaborator.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-1">Viajes:</span>
                      <span>{collaborator.tripsCompleted}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-1">Eficiencia:</span>
                      <span>{collaborator.efficiency}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="font-semibold text-gray-700 mb-2">Detalles del Vehículo</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-gray-500">Tipo</div>
                    <div className="font-medium">{collaborator.vehicle.type}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Patente</div>
                    <div className="font-medium">{collaborator.vehicle.plate}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Capacidad</div>
                    <div className="font-medium">{collaborator.vehicle.capacity}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Marca/Modelo</div>
                    <div className="font-medium">{collaborator.vehicle.brand} {collaborator.vehicle.model}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Seguro</div>
                    <div className="font-medium">{collaborator.vehicle.insurance}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Mantenimiento</div>
                    <div className="font-medium">{collaborator.vehicle.maintenance}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-5 py-3 flex justify-end border-t border-gray-100">
              <button
              onClick={() => openAssignRouteModal(collaborator)}
              className="px-3 py-1 text-sm text-gray-600 hover:text-green-600 ml-2 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Asignar Ruta
            </button>
              <button 
                onClick={() => openEditCollaboratorModal(collaborator)}
                className="px-3 py-1 text-sm text-gray-600 hover:text-indigo-600"
              >
                Editar
              </button>
              <button 
                onClick={() => {
                  setCurrentCollaborator(collaborator);
                  setIsDeleteConfirmOpen(true);
                }}
                className="px-3 py-1 text-sm text-gray-600 hover:text-red-600 ml-2"
              >
                Eliminar
              </button>
            </div>
      
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full p-4 md:p-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Gestión de Colaboradores</h1>
            <p className="text-gray-600 mt-2">
              Administra la información de tus colaboradores y sus vehículos
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar colaborador o patente..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <button
              onClick={openNewCollaboratorModal}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center hover:bg-indigo-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Nuevo Colaborador
            </button>
          </div>
        </div>
        
        {renderCollaborators()}
      </div>

      {/* Modal para agregar/editar colaborador */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {currentCollaborator.id ? "Editar Colaborador" : "Agregar Nuevo Colaborador"}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-md font-semibold text-gray-700 mb-4 pb-2 border-b">Información Personal</h3>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Nombre Completo</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
                      value={currentCollaborator.name}
                      onChange={(e) => setCurrentCollaborator({...currentCollaborator, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">RUT</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
                        value={currentCollaborator.rut}
                        onChange={(e) => setCurrentCollaborator({...currentCollaborator, rut: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Teléfono</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
                        value={currentCollaborator.phone}
                        onChange={(e) => setCurrentCollaborator({...currentCollaborator, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
                      value={currentCollaborator.email}
                      onChange={(e) => setCurrentCollaborator({...currentCollaborator, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Estado</label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
                      value={currentCollaborator.status}
                      onChange={(e) => setCurrentCollaborator({...currentCollaborator, status: e.target.value})}
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                      <option value="En ruta">En ruta</option>
                      <option value="Descanso">Descanso</option>
                      <option value="Vacaciones">Vacaciones</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-semibold text-gray-700 mb-4 pb-2 border-b">Detalles del Vehículo</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Tipo de Vehículo</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
                        value={currentCollaborator.vehicle.type}
                        onChange={(e) => setCurrentCollaborator({
                          ...currentCollaborator, 
                          vehicle: {...currentCollaborator.vehicle, type: e.target.value}
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Patente</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
                        value={currentCollaborator.vehicle.plate}
                        onChange={(e) => setCurrentCollaborator({
                          ...currentCollaborator, 
                          vehicle: {...currentCollaborator.vehicle, plate: e.target.value}
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Capacidad (kg)</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
                        value={currentCollaborator.vehicle.capacity}
                        onChange={(e) => setCurrentCollaborator({
                          ...currentCollaborator, 
                          vehicle: {...currentCollaborator.vehicle, capacity: e.target.value}
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Año</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
                        value={currentCollaborator.vehicle.year}
                        onChange={(e) => setCurrentCollaborator({
                          ...currentCollaborator, 
                          vehicle: {...currentCollaborator.vehicle, year: e.target.value}
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Marca</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
                        value={currentCollaborator.vehicle.brand}
                        onChange={(e) => setCurrentCollaborator({
                          ...currentCollaborator, 
                          vehicle: {...currentCollaborator.vehicle, brand: e.target.value}
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Modelo</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
                        value={currentCollaborator.vehicle.model}
                        onChange={(e) => setCurrentCollaborator({
                          ...currentCollaborator, 
                          vehicle: {...currentCollaborator.vehicle, model: e.target.value}
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Seguro</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
                        value={currentCollaborator.vehicle.insurance}
                        onChange={(e) => setCurrentCollaborator({
                          ...currentCollaborator, 
                          vehicle: {...currentCollaborator.vehicle, insurance: e.target.value}
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Mantenimiento</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
                        value={currentCollaborator.vehicle.maintenance}
                        onChange={(e) => setCurrentCollaborator({
                          ...currentCollaborator, 
                          vehicle: {...currentCollaborator.vehicle, maintenance: e.target.value}
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                {currentCollaborator.id && (
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setIsDeleteConfirmOpen(true);
                    }}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Eliminar
                  </button>
                )}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={saveCollaborator}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {currentCollaborator.id ? 'Actualizar' : 'Guardar'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Confirmación de eliminación */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-md"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Confirmar Eliminación</h3>
                <button 
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600">
                  ¿Estás seguro de que deseas eliminar al colaborador <span className="font-semibold">{currentCollaborator.name}</span>?
                </p>
                <p className="text-gray-600 mt-2">
                  Esta acción no se puede deshacer y eliminará toda la información asociada.
                </p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={deleteCollaborator}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Eliminar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CollaboratorsView;