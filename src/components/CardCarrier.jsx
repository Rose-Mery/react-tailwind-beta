import { useState } from 'react';
import {
  TruckIcon,
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/20/solid';
import RouteAssignmentModal from './RouteAssignmentModal';
import Map from './Map'; 

export const CardCarrier = ({ carrier }) => {

  const [showMap, setShowMap] = useState(false);
  const [showRouteModal, setShowRouteModal] = useState(false);

  const toggleMap = () => setShowMap(!showMap);

  const handleAssignRoute = (route) => {
    console.log('Ruta asignada:', route);
    // Actualizar la base de datos si tuvieramos
  };

  return (
    <>
      {!showRouteModal && (
        <RouteAssignmentModal
          onClose={() => setShowRouteModal(false)}
          onAssign={handleAssignRoute}
        />
      )}
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <TruckIcon className="h-5 w-5 text-indigo-600 mr-2" />
            <h3 className="text-sm font-medium text-gray-800">{carrier.company}</h3>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${carrier.status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'

            }`}>
            {carrier.status === 'active' ? (
              <CheckCircleIcon className="h-3 w-3 mr-1" />
            ) : (
              <ExclamationCircleIcon className="h-3 w-3 mr-1" />
            )}
            {carrier.status}
          </span>
        </div>

        {/* Body */}
        <div className="p-4">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            detalles del usuario
          </h4>
          <div className="grid grid-cols-2 gap-16">
            {/* Info Contacto */}
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <UserCircleIcon className="h-4 w-4 mr-2 text-gray-400" />
                {carrier.name}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                {carrier.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                {carrier.email}
              </div>
            </div>

            {/* Info Localizacion */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {carrier.location}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {carrier.hours}
                </div>
              </div>
            </div>
          </div>

          {/* Info Vehiculo*/}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Vehículo
            </h4>
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-gray-800 font-medium">{carrier.vehicle.type}</p>
                <p className="text-gray-600">{carrier.vehicle.plate}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-800 font-medium">{carrier.vehicle.capacity}</p>
                <p className="text-gray-600">Capacidad</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mapa que se muestra solo cuando showMap es true */}
        {showMap && (
          <div className="mt-4">
            <Map />
          </div>
        )}

        {/* Footer */}
        <div className="mt-1 flex justify-between items-center bg-gray-50 px-4 py-3 border-t border-gray-200">
            <button
              onClick={() => setShowRouteModal(true)}
              className="ml-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md">
              Programar nueva ruta
            </button>
             {/* Modal para asignar rutas */}
            <RouteAssignmentModal
            show={showRouteModal}
            onClose={() => setShowRouteModal(false)} />
           <button
              onClick={toggleMap}
              className="text-sm font-medium text-blue-600 hover:text-indigo-400">
              {showMap ? 'Ocultar' : 'Ver ubicación'}
            </button>
           
        </div>
      </div>
    </>
  );
};

