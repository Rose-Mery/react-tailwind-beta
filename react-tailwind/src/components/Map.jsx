  import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
  
  
  {/* Mapa de ruta */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 pl-4">
            Ruta Actual
            </h4>
          <div className="relative h-56 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            {/* Componente de Mapa - React Leaflet */}
            <div className="absolute inset-0">
              <MapContainer
                center={[-12.0464, -77.0428]}
                zoom={13}
                scrollWheelZoom={false}
                className="h-full w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[-12.0564, -77.0228]} icon={originIcon}>
                  <Popup>Punto de llegada</Popup>
                </Marker>
                <Marker position={[-12.0364, -77.0628]} icon={destinationIcon}>
                  <Popup>Punto de partida</Popup>
                </Marker>
                <Polyline
                  positions={[
                    [-12.0564, -77.0228],
                    [-12.0464, -77.0428],
                    [-12.0364, -77.0628]
                  ]}
                  color="#3B82F6"
                />
                <Marker position={[-12.0464, -77.0428]} icon={vehicleIcon}>
                  <Popup>
                    <div className="font-medium">
                      <p>{carrier.name}</p>
                      <p className="text-blue-600">En ruta (45%)</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          {/* Leyenda del mapa */}
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-gray-600 pl-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              Origen
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
              Vehículo
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
              Destino
            </div>
          </div>
        </div>
