import {
  TruckIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/20/solid';

const CardCarrier = ({ carrier }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <TruckIcon className="h-5 w-5 text-indigo-600 mr-2" />
          <h3 className="text-sm font-medium text-gray-800">{carrier.name}</h3>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          carrier.status === 'active' 
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
        <div className="grid grid-cols-2 gap-4">
          {/* Contact Info */}
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
              {carrier.phone}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
              {carrier.email}
            </div>
          </div>

          {/* Location Info */}
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
              {carrier.location}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
              {carrier.hours}
            </div>
          </div>
        </div>

        {/* Vehicle Info */}
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

      {/* Footer */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex justify-end">
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          Ver detalles
        </button>
      </div>
    </div>
  );
};

export default CardCarrier;
