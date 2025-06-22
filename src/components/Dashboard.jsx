import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Componentes de vistas
import CollaboratorsView from './CollaboratorsView';
import CalendarView from './CalendarView';
import ReportView from './ReportView';
import TrackingView from './TrackingView';
import ProfileUser from './ProfileUser';
import ClientView from './ClientView';
import FlotaView from './FlotaView';
import ServiceView from './ServiceView';
import MessagingView from './MessagingView';
import FinanceView from './FinanceView';
import SettingView from './SettingsView';

// Iconos
import {
  Bars3Icon,
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
  HomeIcon,
  UserIcon,
  CalendarIcon,
  ArrowRightEndOnRectangleIcon,
  TruckIcon,
  MapIcon,
  WrenchScrewdriverIcon,
  PresentationChartBarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  PlusCircleIcon,
  ClipboardDocumentIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/20/solid';

// Solución para los iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Icono personalizado para vehículos
const createVehicleIcon = (color = '#6366f1') => {
  return L.divIcon({
    className: 'vehicle-marker',
    html: `
      <div style="
        position: relative;
        width: 36px;
        height: 36px;
        background: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
        "></div>
        <div style="
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid ${color};
        "></div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36]
  });
};

const Dashboard = ({ onLogout = () => { window.location.href = '/login'; } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [services, setServices] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [stats, setStats] = useState({
    totalServices: 0,
    completedServices: 0,
    activeServices: 0,
    monthlyRevenue: 0
  });
  const [isNewServiceModalOpen, setIsNewServiceModalOpen] = useState(false);
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [isNewVehicleModalOpen, setIsNewVehicleModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedDate, setSelectedDate] = useState('Hoy, 22 Jun 2023');
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Nuevo servicio asignado', message: 'Tienes un nuevo servicio para hoy a las 15:00', read: false, date: '2023-06-22' },
    { id: 2, title: 'Mantenimiento requerido', message: 'El vehículo ABC-123 necesita mantenimiento', read: false, date: '2023-06-21' },
    { id: 3, title: 'Pago recibido', message: 'Se ha recibido el pago del servicio #12345', read: false, date: '2023-06-20' },
    { id: 4, title: 'Servicio completado', message: 'El servicio #12345 ha sido completado con éxito', read: true, date: '2023-06-19' },
  ]);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedVehicleForMaintenance, setSelectedVehicleForMaintenance] = useState(null);
  
  const userDropdownRef = useRef(null);
  const notificationsDropdownRef = useRef(null);
  const calendarDropdownRef = useRef(null);

  // Datos de transportistas
  const carriers = [
    {
      id: 1,
      name: "Juan Pérez",
      status: "active",
      phone: "+569-12345678",
      email: "jperez@albornoz.cl",
      location: [-33.4489, -70.6693], // Santiago
      hours: "Lun-Vie 8:00-18:00",
      vehicle: {
        type: "Camión Grúa",
        plate: "AB123CD",
        capacity: "2 autos"
      },
      rating: 4.8,
      lastService: "Hace 2 horas"
    },
    {
      id: 2,
      name: "María González",
      status: "active",
      phone: "+569-87654321",
      email: "mgonzales@albornoz.cl",
      location: [-33.0458, -71.6197], // Valparaíso
      hours: "Lun-Vie 9:00-17:00",
      vehicle: {
        type: "Camión Plataforma",
        plate: "EF456GH",
        capacity: "1 auto"
      },
      rating: 4.5,
      lastService: "Hace 4 horas"
    },
    {
      id: 3,
      name: "Carlos Rojas",
      status: "inactivo",
      phone: "+569-11223344",
      email: "crojas@albornoz.cl",
      location: [-36.8269, -73.0503], // Concepción
      hours: "Lun-Vie 7:00-19:00",
      vehicle: {
        type: "Camión Grúa",
        plate: "IJ789KL",
        capacity: "2 autos"
      },
      rating: 4.3,
      lastService: "Ayer"
    },
    {
      id: 4,
      name: "Federick González",
      status: "inactivo",
      phone: "+569-88456677",
      email: "fgonzalez@albornoz.cl",
      location: [-38.7359, -72.5903], // Temuco
      hours: "Lun-Vie 8:00-17:00",
      vehicle: {
        type: "Camión Plataforma",
        plate: "EF456GH",
        capacity: "1 auto"
      },
      rating: 4.6,
      lastService: "Hace 3 días"
    }
  ];

  // Inicializar datos
  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const mockServices = [
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
        }
      ];
      
      const mockVehicles = [
        {
          id: 1,
          name: "Camión Grúa ABC-123",
          type: "Grúa",
          capacity: "2 autos",
          status: "En ruta",
          location: [-33.4489, -70.6693],
          driver: "Juan Pérez",
          fuel: 65,
          nextMaintenance: "15/07/2023"
        },
        {
          id: 2,
          name: "Camión Plataforma XYZ-789",
          type: "Plataforma",
          capacity: "1 auto",
          status: "En ruta",
          location: [-33.0458, -71.6197],
          driver: "María González",
          fuel: 42,
          nextMaintenance: "20/07/2023"
        },
        {
          id: 3,
          name: "Camión Grúa LMN-456",
          type: "Grúa",
          capacity: "2 autos",
          status: "En mantenimiento",
          location: [-36.8269, -73.0503],
          driver: "Carlos Rojas",
          fuel: 78,
          nextMaintenance: "En curso"
        },
        {
          id: 4,
          name: "Camión Plataforma OPQ-012",
          type: "Plataforma",
          capacity: "1 auto",
          status: "Disponible",
          location: [-38.7359, -72.5903],
          driver: "Federick González",
          fuel: 34,
          nextMaintenance: "25/07/2023"
        }
      ];
      
      const mockStats = {
        totalServices: 127,
        completedServices: 112,
        activeServices: 8,
        monthlyRevenue: 2850000
      };
      
      setServices(mockServices);
      setVehicles(mockVehicles);
      setStats(mockStats);
    }, 800);
  }, []);

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (notificationsDropdownRef.current && !notificationsDropdownRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (calendarDropdownRef.current && !calendarDropdownRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filtrar servicios por término de búsqueda
  const filteredServices = services.filter(service => 
    service.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Elementos de navegación
  const navItems = [
    { 
      name: 'Dashboard', 
      icon: <HomeIcon className="h-5 w-5" />, 
      view: 'dashboard',
      current: currentView === 'dashboard' 
    },
     { 
      name: 'Perfil', 
      icon: <UserIcon className="h-5 w-5" />, 
      view: 'profile',
      current: currentView === 'profile' 
    },
    { 
      name: 'Seguimiento', 
      icon: <MapIcon className="h-5 w-5" />, 
      view: 'tracking',
      current: currentView === 'tracking' 
    },
    { 
      name: 'Servicios', 
      icon: <ClipboardDocumentIcon className="h-5 w-5" />, 
      view: 'services',
      current: currentView === 'services' 
    },
    { 
      name: 'Flota', 
      icon: <TruckIcon className="h-5 w-5" />, 
      view: 'fleet',
      current: currentView === 'fleet' 
    },
    { 
      name: 'Conductores', 
      icon: <UserGroupIcon className="h-5 w-5" />, 
      view: 'drivers',
      current: currentView === 'drivers' 
    },
    { 
      name: 'Clientes', 
      icon: <UserIcon className="h-5 w-5" />, 
      view: 'clients',
      current: currentView === 'clients' 
    },
    { 
      name: 'Finanzas', 
      icon: <CurrencyDollarIcon className="h-5 w-5" />, 
      view: 'finances',
      current: currentView === 'finances' 
    },
    { 
      name: 'Eventos', 
      icon: <CalendarIcon className="h-5 w-5" />, 
      view: 'calendar',
      current: currentView === 'calendar' 
    },
    { 
      name: 'Reportes', 
      icon: <PresentationChartBarIcon className="h-5 w-5" />, 
      view: 'reports',
      current: currentView === 'reports' 
    },
    { 
      name: 'Mensajería', 
      icon: <ChatBubbleLeftRightIcon className="h-5 w-5" />, 
      view: 'messaging',
      current: currentView === 'messaging' 
    },
    { 
      name: 'Ajustes', 
      icon: <WrenchScrewdriverIcon className="h-5 w-5" />, 
      view: 'settings',
      current: currentView === 'settings' 
    },
  ];

  // Definición de las vistas disponibles
  const views = {
    dashboard: (
      <div className="space-y-6">
        {/* Tarjetas de resumen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{stats.totalServices}</h3>
                <p className="text-blue-100">Servicios Totales</p>
              </div>
              <div className="bg-blue-400 p-3 rounded-lg">
                <DocumentTextIcon className="h-8 w-8" />
              </div>
            </div>
            <div className="mt-4 text-sm text-blue-200">
              <span className="inline-flex items-center">
                <ArrowRightEndOnRectangleIcon className="h-4 w-4 mr-1" />
                +12% desde el mes pasado
              </span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{stats.completedServices}</h3>
                <p className="text-emerald-100">Servicios Completados</p>
              </div>
              <div className="bg-green-400 p-3 rounded-lg">
                <CheckCircleIcon className="h-8 w-8" />
              </div>
            </div>
            <div className="mt-4 text-sm text-emerald-200">
              <span className="inline-flex items-center">
                <ArrowRightEndOnRectangleIcon className="h-4 w-4 mr-1" />
                92% tasa de éxito
              </span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{stats.activeServices}</h3>
                <p className="text-amber-100">Servicios Activos</p>
              </div>
              <div className="bg-amber-400 p-3 rounded-lg">
                <ClockIcon className="h-8 w-8" />
              </div>
            </div>
            <div className="mt-4 text-sm text-amber-200">
              <span className="inline-flex items-center">
                <TruckIcon className="h-4 w-4 mr-1" />
                6 en ruta, 2 en espera
              </span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">${(stats.monthlyRevenue / 1000000).toFixed(1)}M</h3>
                <p className="text-violet-100">Ingresos Mensuales</p>
              </div>
              <div className="bg-purple-400 p-3 rounded-lg">
                <CurrencyDollarIcon className="h-8 w-8" />
              </div>
            </div>
            <div className="mt-4 text-sm text-violet-200">
              <span className="inline-flex items-center">
                <ArrowRightEndOnRectangleIcon className="h-4 w-4 mr-1" />
                +18% desde el mes pasado
              </span>
            </div>
          </div>
        </div>

        {/* Mapa y alertas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mapa - Ahora más grande */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-0 overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold text-gray-800">Seguimiento en Tiempo Real</h3>
              <button 
                className="text-sm text-indigo-600 font-medium"
                onClick={() => setCurrentView('tracking')}
              >
                Ver mapa completo
              </button>
            </div>
            <div className="h-[550px]">
              <MapContainer 
                center={[-33.4489, -70.6693]} 
                zoom={6} 
                style={{ height: '100%', width: '100%' }}
                className="z-0"
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                {vehicles.map((vehicle) => (
                  <Marker 
                    key={vehicle.id} 
                    position={vehicle.location}
                    icon={createVehicleIcon(
                      vehicle.status === "En ruta" ? "#10b981" : 
                      vehicle.status === "Disponible" ? "#6366f1" : "#f59e0b"
                    )}
                  >
                    <Popup className="custom-popup">
                      <div className="font-bold text-lg">{vehicle.name}</div>
                      <div className="flex items-center mt-1">
                        <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                          vehicle.status === "En ruta" ? "bg-green-500" : 
                          vehicle.status === "Disponible" ? "bg-blue-500" : "bg-yellow-500"
                        }`}></span>
                        <span>{vehicle.status}</span>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-1 text-sm">
                        <span className="text-gray-600">Conductor:</span>
                        <span className="font-medium">{vehicle.driver}</span>
                        <span className="text-gray-600">Tipo:</span>
                        <span className="font-medium">{vehicle.type}</span>
                        <span className="text-gray-600">Combustible:</span>
                        <span className="font-medium">{vehicle.fuel}%</span>
                      </div>
                      <button
                        className="mt-3 w-full py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                        onClick={() => {
                          setSelectedDriver(vehicle.driver);
                          setIsMessageModalOpen(true);
                        }}
                      >
                        Notificar conductor
                      </button>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          {/* Alertas y acciones rápidas */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Alertas y Acciones</h3>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                3 pendientes
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-xl">
                <div className="flex items-start">
                  <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Mantenimiento programado</h4>
                    <p className="text-sm text-yellow-700 mt-1">El camión LMN-456 necesita mantenimiento preventivo</p>
                    <div className="mt-2 flex space-x-2">
                      <button 
                        className="text-sm bg-white px-3 py-1 rounded border border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                        onClick={() => {
                          setSelectedVehicleForMaintenance("Camión Grúa LMN-456");
                          setIsMaintenanceModalOpen(true);
                        }}
                      >
                        Programar
                      </button>
                      <button className="text-sm text-yellow-700 hover:text-yellow-900">
                        Posponer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-red-200 bg-red-50 rounded-xl">
                <div className="flex items-start">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800">Combustible bajo</h4>
                    <p className="text-sm text-red-700 mt-1">El camión OPQ-012 tiene solo 34% de combustible</p>
                    <div className="mt-2 flex space-x-2">
                      <button 
                        className="text-sm bg-white px-3 py-1 rounded border border-red-300 text-red-700 hover:bg-red-100"
                        onClick={() => {
                          setShowSuccessNotification(true);
                          setSuccessMessage('Conductor notificado sobre combustible');
                          setTimeout(() => setShowSuccessNotification(false), 3000);
                        }}
                      >
                        Notificar conductor
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-blue-200 bg-blue-50 rounded-xl">
                <div className="flex items-start">
                  <PlusCircleIcon className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Nuevo servicio disponible</h4>
                    <p className="text-sm text-blue-700 mt-1">Transporte en Av. Providencia para las 15:00</p>
                    <div className="mt-2 flex space-x-2">
                      <button 
                        className="text-sm bg-white px-3 py-1 rounded border border-blue-300 text-blue-700 hover:bg-blue-100"
                        onClick={() => setIsNewServiceModalOpen(true)}
                      >
                        Asignar ahora
                      </button>
                      <button className="text-sm text-blue-700 hover:text-blue-900">
                        Ver detalles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Acciones Rápidas</h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  className="flex items-center justify-center p-3 bg-indigo-50 rounded-lg text-indigo-700 hover:bg-indigo-100 transition-colors"
                  onClick={() => setIsNewServiceModalOpen(true)}
                >
                  <PlusCircleIcon className="h-5 w-5 mr-2" />
                  Nuevo Servicio
                </button>
                <button 
                  className="flex items-center justify-center p-3 bg-emerald-50 rounded-lg text-emerald-700 hover:bg-emerald-100 transition-colors"
                  onClick={() => setIsNewClientModalOpen(true)}
                >
                  <UserIcon className="h-5 w-5 mr-2" />
                  Agregar Cliente
                </button>
                <button 
                  className="flex items-center justify-center p-3 bg-amber-50 rounded-lg text-amber-700 hover:bg-amber-100 transition-colors"
                  onClick={() => setIsNewVehicleModalOpen(true)}
                >
                  <TruckIcon className="h-5 w-5 mr-2" />
                  Registrar Vehículo
                </button>
                <button 
                  className="flex items-center justify-center p-3 bg-violet-50 rounded-lg text-violet-700 hover:bg-violet-100 transition-colors"
                  onClick={() => setCurrentView('reports')}
                >
                  <DocumentTextIcon className="h-5 w-5 mr-2" />
                  Generar Reporte
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Servicios recientes */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Servicios Recientes</h3>
            <div className="relative w-64">
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
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha/Hora</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehículo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conductor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredServices.slice(0, 5).map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{service.client}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{service.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{service.date} {service.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{service.vehicle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{service.driver}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        service.status === "Completado" ? "bg-green-100 text-green-800" :
                        service.status === "En progreso" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {service.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ),
    services: <ServiceView setIsNewServiceModalOpen={setIsNewServiceModalOpen} />,
    fleet: <FlotaView setIsNewVehicleModalOpen={setIsNewVehicleModalOpen} />,
    drivers: <CollaboratorsView />,
    clients: <ClientView setIsNewClientModalOpen={setIsNewClientModalOpen} />,
    finances: <FinanceView  />,
    tracking: <TrackingView />,
    calendar: <CalendarView />,
    reports: <ReportView />,
    messaging: <MessagingView />,
    settings: <SettingView />,
    profile: <ProfileUser />
  };

  // Modal para nuevo servicio
  const RouteAssignmentModal = () => {
    if (!isNewServiceModalOpen) return null;

    const handleSubmit = (e) => {
      e.preventDefault();
      // Simulamos guardar
      setShowSuccessNotification(true);
      setSuccessMessage('Nuevo servicio creado con éxito');
      setTimeout(() => {
        setShowSuccessNotification(false);
        setIsNewServiceModalOpen(false);
      }, 3000);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Asignar Nuevo Servicio</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Nombre del cliente"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="+569 ..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Servicio</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500" required>
                    <option value="">Seleccionar</option>
                    <option>Transporte estándar</option>
                    <option>Transporte múltiple</option>
                    <option>Asistencia en ruta</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehículo a Transportar</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Modelo, Marca, Año"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Origen</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Dirección de origen"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destino</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Dirección de destino"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={() => setIsNewServiceModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Asignar Servicio
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Modal para programar mantenimiento
  const MaintenanceModal = () => {
    if (!isMaintenanceModalOpen) return null;

    const handleSubmit = () => {
      setShowSuccessNotification(true);
      setSuccessMessage('Mantenimiento programado correctamente');
      setTimeout(() => {
        setShowSuccessNotification(false);
        setIsMaintenanceModalOpen(false);
        setSelectedVehicleForMaintenance(null);
      }, 3000);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Programar Mantenimiento</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehículo</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500" 
                value={selectedVehicleForMaintenance || ''}
                onChange={(e) => setSelectedVehicleForMaintenance(e.target.value)}
                required
              >
                <option value="">Seleccionar vehículo</option>
                {vehicles.map(vehicle => (
                  <option key={vehicle.id} value={vehicle.name}>{vehicle.name}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                <input 
                  type="time" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Mantenimiento</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500" required>
                <option value="">Seleccionar tipo</option>
                <option>Preventivo</option>
                <option>Correctivo</option>
                <option>Cambio de aceite</option>
                <option>Revisión general</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notas adicionales</label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                rows="3"
                placeholder="Detalles del mantenimiento..."
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                type="button" 
                onClick={() => {
                  setIsMaintenanceModalOpen(false);
                  setSelectedVehicleForMaintenance(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button 
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Programar Mantenimiento
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Modal para enviar mensajes a conductores
  const MessageModal = () => {
    if (!isMessageModalOpen || !selectedDriver) return null;

    const messageOptions = [
      "Ruta en mal estado - buscar alternativa",
      "Revisar nivel de combustible",
      "Cliente esperando - priorizar servicio",
      "Reportar estado actual del servicio",
      "Cambio en destino final",
      "Retraso justificado - notificar al cliente"
    ];

    const [selectedMessage, setSelectedMessage] = useState('');
    const [customMessage, setCustomMessage] = useState('');

    const handleSubmit = () => {
      setShowSuccessNotification(true);
      setSuccessMessage(`Mensaje enviado a ${selectedDriver}`);
      setTimeout(() => {
        setShowSuccessNotification(false);
        setIsMessageModalOpen(false);
        setSelectedDriver(null);
      }, 3000);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Enviar Mensaje</h2>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Conductor:</p>
              <p className="font-medium">{selectedDriver}</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje predefinido</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={selectedMessage}
                onChange={(e) => setSelectedMessage(e.target.value)}
              >
                <option value="">Seleccionar mensaje</option>
                {messageOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">O mensaje personalizado</label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                rows="3"
                placeholder="Escribe tu mensaje aquí..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                type="button" 
                onClick={() => {
                  setIsMessageModalOpen(false);
                  setSelectedDriver(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button 
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Enviar Mensaje
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Modal para nuevo cliente
  const NewClientModal = () => {
    if (!isNewClientModalOpen) return null;

    const handleSubmit = (e) => {
      e.preventDefault();
      setShowSuccessNotification(true);
      setSuccessMessage('Cliente agregado correctamente');
      setTimeout(() => {
        setShowSuccessNotification(false);
        setIsNewClientModalOpen(false);
      }, 3000);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Agregar Nuevo Cliente</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Nombre completo"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="+569 ..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="email@ejemplo.com"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Empresa (opcional)</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Nombre de la empresa"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={() => setIsNewClientModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Agregar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Modal para nuevo vehículo
  const NewVehicleModal = () => {
    if (!isNewVehicleModalOpen) return null;

    const handleSubmit = (e) => {
      e.preventDefault();
      setShowSuccessNotification(true);
      setSuccessMessage('Vehículo registrado correctamente');
      setTimeout(() => {
        setShowSuccessNotification(false);
        setIsNewVehicleModalOpen(false);
      }, 3000);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Registrar Nuevo Vehículo</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Patente</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Ej: AB123CD"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500" required>
                    <option value="">Seleccionar</option>
                    <option>Camion Grúa</option>
                    <option>Camion Plataforma</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Ej: 2 autos"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Ej: Ford F-150"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Año</label>
                <input 
                  type="number" 
                  min="1900" 
                  max={new Date().getFullYear()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Ej: 2020"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={() => setIsNewVehicleModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Registrar Vehículo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Selector de fecha con calendario
  const DateSelector = () => (
    <div className="relative" ref={calendarDropdownRef}>
      <button
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
      >
        <CalendarIcon className="h-5 w-5 mr-2" />
        {selectedDate}
      </button>
      
      {isCalendarOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <button className="text-gray-500 hover:text-gray-700">
                &lt;
              </button>
              <span className="font-medium">Junio 2023</span>
              <button className="text-gray-500 hover:text-gray-700">
                &gt;
              </button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-xs text-center text-gray-500 mb-1">
              <div>L</div><div>M</div><div>M</div><div>J</div><div>V</div><div>S</div><div>D</div>
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {[...Array(35)].map((_, index) => {
                const day = index - 4 + 1;
                const isCurrent = day === 22;
                return (
                  <button
                    key={index}
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${
                      day > 0 && day <= 30 
                        ? isCurrent 
                          ? 'bg-indigo-600 text-white' 
                          : 'hover:bg-gray-100'
                        : 'text-gray-300'
                    }`}
                    onClick={() => {
                      if (day > 0 && day <= 30) {
                        setSelectedDate(`Hoy, ${day} Jun 2023`);
                        setIsCalendarOpen(false);
                      }
                    }}
                  >
                    {day > 0 && day <= 30 ? day : ''}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-4 text-center">
              <button 
                className="text-sm text-indigo-600 hover:text-indigo-800"
                onClick={() => setCurrentView('calendar')}
              >
                Ver calendario completo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex bg-gray-50 w-full h-screen fixed top-0 left-0">
      {/* Sidebar - Nuevo color indigo-800 */}
      <div className={`${sidebarCollapsed ? 'w-20' : 'w-56'} bg-indigo-800 border-r border-indigo-700 transition-all duration-300 flex-shrink-0 flex flex-col`}>
        <div className="p-4 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full"
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="User"
              />
              <span className="ml-3 text-sm font-medium text-white">Víctor Alfredo Albornoz</span>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-white hover:text-indigo-200 p-2"
          >
            {sidebarCollapsed ? (
              <Bars3Icon className="h-6 w-6" />
            ) : (
              <ChevronLeftIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Menú con scroll para pantallas pequeñas */}
        <nav className="mt-6 flex-1 px-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setCurrentView(item.view)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-1 ${
                item.current 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-700'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {!sidebarCollapsed && item.name}
            </button>
          ))}
        </nav>

        {/* Pie de página */}
        <div className="mt-auto p-4 border-t border-indigo-700">
          {sidebarCollapsed ? (
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center">
                <span className="text-xs font-medium text-indigo-200">TA</span>
              </div>
            </div>
          ) : (
            <div className="text-sm font-medium text-indigo-200">Transportes Albornoz S.A</div>
          )}
        </div>
      </div>

      {/* Contenido del menú */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header con barra de búsqueda actualizada */}
        <header className="bg-white shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center flex-1">
              <div className="relative flex-1 mr-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border-0 leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative" ref={notificationsDropdownRef}>
                <button 
                  className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none relative"
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                >
                  <BellIcon className="h-6 w-6" />
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                </button>
                
                {isNotificationsOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-800">Notificaciones</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`border-b border-gray-200 p-4 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                          onClick={() => {
                            setNotifications(notifications.map(n => 
                              n.id === notification.id ? {...n, read: true} : n
                            ));
                          }}
                        >
                          <div className="flex justify-between">
                            <h4 className="font-bold text-gray-800">{notification.title}</h4>
                            <span className="text-xs text-gray-500">{notification.date}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 text-center bg-gray-50">
                      <button 
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                        onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))}
                      >
                        Marcar todas como leídas
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Dropdown */}
              <div className="relative" ref={userDropdownRef}>
                <div>
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://randomuser.me/api/portraits/men/75.jpg"
                      alt="User"
                    />
                    <ChevronDownIcon className={`ml-1 h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                </div>

                {isOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <button
                      onClick={() => setCurrentView('profile')}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    >
                      <UserCircleIcon className="h-4 w-4" />
                      Perfil
                    </button>
                    <button
                      onClick={() => {
                        if (typeof onLogout === 'function') {
                          onLogout();
                        } else {
                          window.location.href = '/login';
                        }
                      }}
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
        
        {/* Contenido principal */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {navItems.find(item => item.view === currentView)?.name}
              </h1>
              <p className="h-8 text-big text-gray-600 mt-1">
                Panel de control para la gestión de servicios de transporte
              </p>
            </div>
            <div className="flex space-x-3">
              <DateSelector />
              <button 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center hover:bg-indigo-700"
                onClick={() => setIsNewServiceModalOpen(true)}
              >
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                Nuevo Servicio
              </button>
            </div>
          </div>
          
          {views[currentView]}
          
          {/* Notificación de éxito */}
          {showSuccessNotification && (
            <div className="fixed top-4 right-4 z-50">
              <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center">
                <CheckCircleIcon className="h-6 w-6 mr-2" />
                <div>
                  <p className="font-medium">Operación exitosa!</p>
                  <p className="text-sm">{successMessage}</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      
      {/* Modales */}
      <RouteAssignmentModal />
      <MaintenanceModal />
      <MessageModal />
      <NewClientModal />
      <NewVehicleModal />
    </div>
  );
};

export default Dashboard;