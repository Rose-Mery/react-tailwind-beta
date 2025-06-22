import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Solución para los iconos de Leaflet en React
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
        width: 24px;
        height: 24px;
        background: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      ">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

const TrackingView = () => {
  const [activeVehicle, setActiveVehicle] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trafficData, setTrafficData] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [viewMode, setViewMode] = useState('map'); // 'map' o 'list'

  // Datos mockeados para vehículos
  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const mockVehicles = [
        {
          id: 1,
          name: "Camión Grúa ABC-123",
          driver: "Carlos Mendoza",
          status: "En ruta",
          statusColor: "text-green-500",
          statusBg: "bg-green-100",
          speed: 68,
          location: [-33.4489, -70.6693], // Santiago
          destination: "Valparaíso",
          origin: "Santiago",
          routeProgress: 45,
          lastUpdate: "Hace 5 min",
          cargo: "Materiales de construcción",
          weight: "12.5 ton",
          eta: "14:30",
          fuel: 65,
          temperature: 18,
          distance: 120,
          duration: "2h 15m",
          alerts: 0,
          iconColor: "#6366f1"
        },
        {
          id: 2,
          name: "Camión 3/4 XYZ-789",
          driver: "Laura Torres",
          status: "En descanso",
          statusColor: "text-yellow-500",
          statusBg: "bg-yellow-100",
          speed: 0,
          location: [-33.0458, -71.6197], // Valparaíso
          destination: "Santiago",
          origin: "Valparaíso",
          routeProgress: 0,
          lastUpdate: "Hace 20 min",
          cargo: "Productos electrónicos",
          weight: "8.2 ton",
          eta: "16:45",
          fuel: 42,
          temperature: 22,
          distance: 115,
          duration: "2h 10m",
          alerts: 1,
          iconColor: "#f59e0b"
        },
        {
          id: 3,
          name: "Camión Grande LMN-456",
          driver: "Pedro Álvarez",
          status: "En ruta",
          statusColor: "text-green-500",
          statusBg: "bg-green-100",
          speed: 72,
          location: [-36.8269, -73.0503], // Concepción
          destination: "Temuco",
          origin: "Concepción",
          routeProgress: 28,
          lastUpdate: "Hace 2 min",
          cargo: "Productos alimenticios",
          weight: "18.7 ton",
          eta: "17:15",
          fuel: 78,
          temperature: 16,
          distance: 305,
          duration: "4h 45m",
          alerts: 0,
          iconColor: "#10b981"
        },
        {
          id: 4,
          name: "Furgón OPQ-012",
          driver: "Ana Riquelme",
          status: "Retrasado",
          statusColor: "text-red-500",
          statusBg: "bg-red-100",
          speed: 55,
          location: [-38.7359, -72.5903], // Temuco
          destination: "Puerto Montt",
          origin: "Temuco",
          routeProgress: 63,
          lastUpdate: "Hace 8 min",
          cargo: "Productos farmacéuticos",
          weight: "5.8 ton",
          eta: "18:40",
          fuel: 34,
          temperature: 12,
          distance: 420,
          duration: "6h 20m",
          alerts: 2,
          iconColor: "#ef4444"
        }
      ];

      const mockRoutes = [
        {
          vehicleId: 1,
          path: [
            [-33.4489, -70.6693], // Santiago
            [-33.6119, -70.5758],
            [-33.3922, -70.5256],
            [-33.0458, -71.6197]  // Valparaíso
          ]
        },
        {
          vehicleId: 3,
          path: [
            [-36.8269, -73.0503], // Concepción
            [-37.4697, -72.3537],
            [-38.7359, -72.5903]  // Temuco
          ]
        },
        {
          vehicleId: 4,
          path: [
            [-38.7359, -72.5903], // Temuco
            [-39.8142, -73.2459],
            [-41.4687, -72.9429]  // Puerto Montt
          ]
        }
      ];

      const mockAlerts = [
        { 
          id: 1, 
          vehicleId: 2,
          vehicle: "Camión 3/4 XYZ-789", 
          type: "Mantenimiento", 
          message: "Cambio de aceite requerido", 
          time: "Hace 2 horas", 
          priority: "media",
          status: "pending",
        },
        { 
          id: 2, 
          vehicleId: 4,
          vehicle: "Furgón OPQ-012", 
          type: "Retraso", 
          message: "Retraso por condiciones climáticas", 
          time: "Hace 45 min", 
          priority: "alta",
          status: "active"
        },
        { 
          id: 3, 
          vehicleId: 4,
          vehicle: "Furgón OPQ-012", 
          type: "Combustible", 
          message: "Nivel de combustible bajo (34%)", 
          time: "Hace 30 min", 
          priority: "alta",
          status: "active"
        }
      ];

      const mockTrafficData = [
        { location: [-33.4489, -70.6693], level: "moderate", delay: "10 min" }, // Santiago
        { location: [-33.0458, -71.6197], level: "low", delay: "5 min" }, // Valparaíso
        { location: [-33.3922, -70.5256], level: "high", delay: "25 min" }, // Carretera central
        { location: [-38.7359, -72.5903], level: "moderate", delay: "15 min" }, // Temuco
      ];

      const mockWeatherData = {
        [-33.4489]: { temp: 22, condition: "sunny", wind: 12 }, // Santiago
        [-33.0458]: { temp: 18, condition: "cloudy", wind: 18 }, // Valparaíso
        [-36.8269]: { temp: 15, condition: "rainy", wind: 25 }, // Concepción
        [-38.7359]: { temp: 10, condition: "rainy", wind: 30 }, // Temuco
      };

      setVehicles(mockVehicles);
      setRoutes(mockRoutes);
      setAlerts(mockAlerts);
      setTrafficData(mockTrafficData);
      setWeatherData(mockWeatherData);
      setIsLoading(false);
      
      // Establecer el primer vehículo como activo
      if (mockVehicles.length > 0) {
        setActiveVehicle(mockVehicles[0]);
      }
    }, 1200);
  }, []);

  // Actualizar ubicaciones periódicamente (simulación)
  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        setVehicles(prevVehicles => 
          prevVehicles.map(vehicle => {
            if (vehicle.status === "En ruta") {
              // Simular movimiento aleatorio
              const randomLat = Math.random() * 0.01 - 0.005;
              const randomLng = Math.random() * 0.01 - 0.005;
              return {
                ...vehicle,
                location: [vehicle.location[0] + randomLat, vehicle.location[1] + randomLng],
                lastUpdate: "Hace 0 min",
                speed: Math.floor(Math.random() * 20) + 60,
                routeProgress: Math.min(vehicle.routeProgress + 1, 100)
              };
            }
            return vehicle;
          })
        );
      }, 30000); // Actualizar cada 30 segundos

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleVehicleSelect = (vehicle) => {
    setActiveVehicle(vehicle);
  };

  const resolveAlert = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? {...alert, status: "resolved"} : alert
    ));
  };

  const getWeatherIcon = (condition) => {
    switch(condition) {
      case 'sunny': return '☀️';
      case 'cloudy': return '☁️';
      case 'rainy': return '🌧️';
      case 'stormy': return '⛈️';
      default: return '🌤️';
    }
  };

  if (isLoading) {
    return (
      <div className="w-full p-8 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-700">Cargando seguimiento</h2>
          <p className="text-gray-500 mt-2">Obteniendo datos en tiempo real...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Seguimiento en Tiempo Real</h1>
            <p className="text-gray-600 mt-2">
              Monitoreo de toda tu flota de transporte en un solo lugar
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === 'map' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Vista Mapa
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Vista Lista
              </button>
            </div>
            
            <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-sm text-gray-700">{vehicles.filter(v => v.status === "En ruta").length} en ruta</span>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center hover:bg-indigo-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Exportar reporte
            </button>
          </div>
        </div>

        {viewMode === 'map' ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Panel izquierdo: Lista de vehículos */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-sm p-6 h-full">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Vehículos en Operación</h2>
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {vehicles.length} vehículos
                    </span>
                  </div>
                  
                  <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                    {vehicles.map(vehicle => (
                      <div 
                        key={vehicle.id}
                        className={`p-4 border rounded-xl cursor-pointer transition-all ${
                          activeVehicle?.id === vehicle.id 
                            ? 'border-indigo-500 bg-indigo-50 shadow-sm' 
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => handleVehicleSelect(vehicle)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-800">{vehicle.name}</h3>
                            <p className="text-sm text-gray-600">{vehicle.driver}</p>
                          </div>
                          <span className={`text-sm font-medium ${vehicle.statusColor}`}>
                            {vehicle.status}
                          </span>
                        </div>
                        
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="text-xs text-gray-600">{vehicle.speed} km/h</span>
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-xs text-gray-600">{vehicle.destination}</span>
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs text-gray-600">{vehicle.eta}</span>
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                            </svg>
                            <span className="text-xs text-gray-600">{vehicle.fuel}%</span>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Progreso de ruta</span>
                            <span>{vehicle.routeProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full" 
                              style={{ width: `${vehicle.routeProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Panel central: Mapa de seguimiento */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm p-1 h-full">
                  <MapContainer 
                    center={[-33.4489, -70.6693]} 
                    zoom={6} 
                    style={{ height: '100%', minHeight: '600px', borderRadius: '1rem' }}
                    className="z-0"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    
                    {vehicles.map(vehicle => (
                      <Marker 
                        key={vehicle.id} 
                        position={vehicle.location}
                        icon={createVehicleIcon(vehicle.iconColor)}
                        eventHandlers={{ click: () => handleVehicleSelect(vehicle) }}
                      >
                        <Popup>
                          <div className="font-bold">{vehicle.name}</div>
                          <div>Conductor: {vehicle.driver}</div>
                          <div>Estado: <span className={vehicle.statusColor}>{vehicle.status}</span></div>
                          <div>Velocidad: {vehicle.speed} km/h</div>
                          <div>Destino: {vehicle.destination}</div>
                        </Popup>
                      </Marker>
                    ))}
                    
                    {routes.map((route, index) => {
                      if (activeVehicle && route.vehicleId === activeVehicle.id) {
                        return (
                          <Polyline 
                            key={index} 
                            positions={route.path} 
                            color="#6366f1" 
                            dashArray="5, 10"
                            weight={3}
                          />
                        );
                      }
                      return null;
                    })}
                    
                    {/* Marcadores de tráfico */}
                    {trafficData.map((traffic, index) => (
                      <CircleMarker
                        key={index}
                        center={traffic.location}
                        radius={8}
                        color={traffic.level === "high" ? "#ef4444" : traffic.level === "moderate" ? "#f59e0b" : "#10b981"}
                        fillOpacity={0.6}
                      >
                        <Popup>
                          <div className="font-bold">Condiciones de tráfico</div>
                          <div>Nivel: {traffic.level === "high" ? "Alto" : traffic.level === "moderate" ? "Moderado" : "Bajo"}</div>
                          <div>Retraso estimado: {traffic.delay}</div>
                        </Popup>
                      </CircleMarker>
                    ))}
                  </MapContainer>
                </div>
              </div>
            </div>
            
            {/* Panel inferior: Detalles y alertas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              {/* Detalles del vehículo seleccionado */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                      {activeVehicle ? `Detalles: ${activeVehicle.name}` : 'Seleccione un vehículo'}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${activeVehicle?.statusColor} bg-opacity-20 ${activeVehicle?.statusColor.replace('text', 'bg')}`}>
                      {activeVehicle?.status}
                    </span>
                  </div>
                  
                  {activeVehicle && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-md font-semibold text-gray-700 mb-3">Información del Viaje</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Conductor:</span>
                            <span className="font-medium">{activeVehicle.driver}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Origen:</span>
                            <span className="font-medium">{activeVehicle.origin}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Destino:</span>
                            <span className="font-medium">{activeVehicle.destination}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Distancia:</span>
                            <span className="font-medium">{activeVehicle.distance} km</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Duración estimada:</span>
                            <span className="font-medium">{activeVehicle.duration}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">ETA:</span>
                            <span className="font-medium">{activeVehicle.eta}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Última actualización:</span>
                            <span className="font-medium">{activeVehicle.lastUpdate}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Velocidad actual:</span>
                            <span className="font-medium">{activeVehicle.speed} km/h</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-md font-semibold text-gray-700 mb-3">Detalles Técnicos</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Tipo de carga:</span>
                            <span className="font-medium">{activeVehicle.cargo}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Peso:</span>
                            <span className="font-medium">{activeVehicle.weight}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Combustible:</span>
                            <div className="flex items-center w-32">
                              <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    activeVehicle.fuel < 20 ? 'bg-red-500' : 
                                    activeVehicle.fuel < 40 ? 'bg-yellow-500' : 'bg-green-500'
                                  }`} 
                                  style={{ width: `${activeVehicle.fuel}%` }}
                                ></div>
                              </div>
                              <span className="font-medium">{activeVehicle.fuel}%</span>
                            </div>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Temperatura:</span>
                            <span className="font-medium">{activeVehicle.temperature}°C</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Progreso de ruta:</span>
                            <span className="font-medium">{activeVehicle.routeProgress}%</span>
                          </div>
                          
                          {/* Clima en ubicación actual */}
                          {weatherData[activeVehicle.location[0]] && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                              <h4 className="font-medium text-gray-700 mb-2">Condiciones climáticas</h4>
                              <div className="flex items-center">
                                <span className="text-2xl mr-2">
                                  {getWeatherIcon(weatherData[activeVehicle.location[0]].condition)}
                                </span>
                                <div>
                                  <span className="font-medium">{weatherData[activeVehicle.location[0]].temp}°C</span>
                                  <div className="text-sm text-gray-600">
                                    Viento: {weatherData[activeVehicle.location[0]].wind} km/h
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Alertas recientes */}
              <div>
                <div className="bg-white rounded-2xl shadow-sm p-6 h-full">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Alertas Recientes</h2>
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {alerts.filter(a => a.status !== "resolved").length} activas
                    </span>
                  </div>
                  
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {alerts
                      .filter(a => a.status !== "resolved")
                      .map(alert => (
                        <div 
                          key={alert.id}
                          className={`p-4 border rounded-xl ${
                            alert.priority === 'alta' 
                              ? 'border-red-200 bg-red-50' 
                              : 'border-yellow-200 bg-yellow-50'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                <span className={`w-3 h-3 rounded-full mr-2 ${
                                  alert.priority === 'alta' ? 'bg-red-500' : 'bg-yellow-500'
                                }`}></span>
                                <span className={`font-medium ${
                                  alert.priority === 'alta' ? 'text-red-700' : 'text-yellow-700'
                                }`}>{alert.type}</span>
                              </div>
                              <h3 className="font-bold text-gray-800 mt-1">{alert.vehicle}</h3>
                            </div>
                            <span className="text-xs text-gray-500">{alert.time}</span>
                          </div>
                          <p className="mt-2 text-sm text-gray-600">{alert.message}</p>
                          <div className="flex justify-between mt-3">
                            <button 
                              className="text-sm text-gray-600 font-medium hover:text-gray-800"
                              onClick={() => handleVehicleSelect(vehicles.find(v => v.id === alert.vehicleId))}
                            >
                              Ver vehículo →
                            </button>
                            <button 
                              className="text-sm bg-white px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
                              onClick={() => resolveAlert(alert.id)}
                            >
                              Resolver
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Vista de lista (modo tabla)
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehículo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conductor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ruta
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progreso
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Velocidad
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Combustible
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ETA
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vehicles.map((vehicle) => (
                    <tr 
                      key={vehicle.id} 
                      className={`${
                        activeVehicle?.id === vehicle.id ? 'bg-indigo-50' : 'hover:bg-gray-50'
                      } cursor-pointer`}
                      onClick={() => handleVehicleSelect(vehicle)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                              style={{ backgroundColor: vehicle.iconColor }}
                            >
                              {vehicle.name.charAt(0)}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{vehicle.name}</div>
                            <div className="text-sm text-gray-500">{vehicle.cargo}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{vehicle.driver}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{vehicle.origin} → {vehicle.destination}</div>
                        <div className="text-sm text-gray-500">{vehicle.distance} km</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${vehicle.statusBg} ${vehicle.statusColor}`}>
                          {vehicle.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-32">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>{vehicle.routeProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full" 
                              style={{ width: `${vehicle.routeProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vehicle.speed} km/h
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full ${
                                vehicle.fuel < 20 ? 'bg-red-500' : 
                                vehicle.fuel < 40 ? 'bg-yellow-500' : 'bg-green-500'
                              }`} 
                              style={{ width: `${vehicle.fuel}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{vehicle.fuel}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vehicle.eta}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Lógica para ver detalles
                          }}
                        >
                          Detalles
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingView;