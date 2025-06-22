import React from 'react';
import {Alert} from "@heroui/react";

const RouteAssignmentModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 border border-gray-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Programar Nueva Ruta</h2>
          <p className="text-sm text-gray-600 mt-1">
            Asignar un nuevo viaje de remolque al transportista
          </p>
        </div>
        
        {/* Formulario */}
        <div className="p-4">
          <div className="space-y-1">
            {/* Transportista */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transportista
              </label>
              <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Transportista"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">Carlos Mendoza</p>
                  <p className="text-sm text-gray-600">Camión Grúa - ABC-123</p>
                </div>
              </div>
            </div>
            
            {/* Origen */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Origen
              </label>
              <input
                type="text"
                placeholder="Dirección de origen"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Destino */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destino
              </label>
              <input
                type="text"
                placeholder="Dirección de destino"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Fecha y Hora */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora
                </label>
                <input
                  type="time"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            {/* Detalles */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detalles del servicio
              </label>
              <textarea
                rows="3"
                placeholder="Descripción del vehículo a remolcar, tipo de servicio, etc."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </button>
           <button
            onClick={() => {
              onClose();     // Cierra el modal
              onAssign();    // Muestra el toast desde el componente padre
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Asignar Ruta
          </button>
          
        </div>
      </div>
    </div>
    
  );
};

export default RouteAssignmentModal;