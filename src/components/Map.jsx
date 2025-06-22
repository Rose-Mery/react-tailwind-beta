import React from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Ruta desde Santiago a Valparaíso (Chile)
const route = [
  [-33.4489, -70.6693],   // Plaza de Armas, Santiago (Origen)
  [-33.4150, -70.7000],   // Punto intermedio 1
  [-33.3800, -70.7300],   // Punto intermedio 2
  [-33.3500, -70.7500],   // Punto intermedio 3
  [-33.3200, -70.8000],   // Punto intermedio 4
  [-33.3000, -70.8500],   // Punto intermedio 5
  [-33.2800, -70.9000],   // Punto intermedio 6
  [-33.2600, -70.9500],   // Punto intermedio 7
  [-33.2400, -71.0000],   // Punto intermedio 8
  [-33.2200, -71.0500],   // Punto intermedio 9
  [-33.2000, -71.1000],   // Punto intermedio 10
  [-33.1800, -71.1500],   // Punto intermedio 11
  [-33.1600, -71.2000],   // Punto intermedio 12
  [-33.1400, -71.2500],   // Punto intermedio 13
  [-33.1200, -71.3000],   // Punto intermedio 14
  [-33.1000, -71.3500],   // Punto intermedio 15
  [-33.0500, -71.6200]    // Muelle Barón, Valparaíso (Destino)
];

// Íconos minimalistas personalizados
const originIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149059.png?color=3B82F6', // Pin rojo
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const destinationIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/660/660624.png?color=10B981', // Pin azul
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const vehicleIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/656/656105.png?color=6B7280', // Grúa/camión
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38]
});

// Ícono intermedio (punto en ruta)
const intermediateIcon = L.divIcon({
  className: 'intermediate-marker',
  html: `
    <div style="
      width: 12px; 
      height: 12px; 
      background: #3B82F6; 
      border-radius: 50%; 
      border: 2px solid white;
      box-shadow: 0 0 5px rgba(0,0,0,0.3);
    "></div>
  `,
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

const Map = () => {
  // Punto de vehículo en movimiento (punto medio de la ruta)
  const vehiclePosition = route[Math.floor(route.length / 2)];

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-200">
      <MapContainer
        center={[-33.3000, -70.8000]} // Centro aproximado de la ruta
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Línea de ruta */}
        <Polyline 
          positions={route} 
          color="#3B82F6" 
          weight={4}
          dashArray="5, 10"
        />
        
        {/* Marcador de origen */}
        <Marker position={route[0]} icon={originIcon}>
          <Popup>
            <div className="font-medium">
              <div className="text-green-600">Destino</div>
              <div className="text-sm">Plaza de Armas, Santiago</div>
            </div>
          </Popup>
        </Marker>
        
        {/* Marcador de destino */}
        <Marker position={route[route.length - 1]} icon={destinationIcon}>
          <Popup>
            <div className="font-medium">
              <div className="text-red-600">Origen</div>
              <div className="text-sm">Muelle Barón, Valparaíso</div>
            </div>
          </Popup>
        </Marker>
        
        {/* Marcador de vehículo */}
        <Marker position={vehiclePosition} icon={vehicleIcon}>
          <Popup>
            <div className="font-medium">
              <div className="text-blue-600">Vehículo en ruta</div>
              <div className="text-sm">Aprox. 50% del recorrido</div>
            </div>
          </Popup>
        </Marker>
        
        {/* Puntos intermedios (opcionales) */}
        {route.slice(1, -1).map((position, index) => (
          <Marker 
            key={index} 
            position={position} 
            icon={intermediateIcon}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;