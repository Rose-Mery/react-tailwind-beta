import React, { useState } from 'react';
import {
  Cog6ToothIcon,
  UserCircleIcon,
  BuildingOffice2Icon,
  ShieldCheckIcon,
  BellIcon,
  CreditCardIcon,
  PaintBrushIcon,
  ServerStackIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  PlusCircleIcon
} from '@heroicons/react/20/solid';

const SettingsView = () => {
  // Estados para los diferentes ajustes
  const [userData, setUserData] = useState({
    name: "Víctor Alfredo Albornoz",
    email: "victor.albornoz@albornoz.cl",
    phone: "+56912345678",
    role: "Administrador",
    notifications: true,
    language: "es-CL"
  });
  
  const [companyData, setCompanyData] = useState({
    name: "Transportes Albornoz S.A",
    rut: "76.123.456-7",
    address: "Av. Providencia 1234, Santiago",
    phone: "+56223456789",
    website: "www.transportesalbornoz.cl",
    industry: "Transporte de vehículos"
  });
  
  const [billingData, setBillingData] = useState({
    plan: "Premium",
    nextBilling: "15/07/2023",
    cardEnding: "•••• 4567",
    status: "Activo"
  });
  
  const [securityData, setSecurityData] = useState({
    twoFactor: true,
    lastLogin: "22/06/2023 09:45 AM",
    devices: [
      { id: 1, name: "MacBook Pro", location: "Santiago, CL", lastActive: "Hoy" },
      { id: 2, name: "iPhone 13", location: "Santiago, CL", lastActive: "Hace 2 horas" }
    ]
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    newService: true,
    serviceUpdates: true,
    maintenanceAlerts: true,
    paymentReminders: true
  });
  
  const [appearance, setAppearance] = useState({
    theme: "light",
    density: "normal",
    sidebarCollapsed: false
  });

  // Funciones para manejar cambios
  const handleInputChange = (setter, field) => (e) => {
    setter(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleCheckboxChange = (setter, field) => (e) => {
    setter(prev => ({ ...prev, [field]: e.target.checked }));
  };

  const handleSelectChange = (setter, field) => (e) => {
    setter(prev => ({ ...prev, [field]: e.target.value }));
  };

  const saveSettings = (section) => {
    // En una implementación real, aquí se enviarían los cambios al servidor
    alert(`Configuración de ${section} guardada correctamente`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Cog6ToothIcon className="h-8 w-8 text-indigo-600 mr-3" />
          Configuración del Sistema
        </h2>
        <p className="text-gray-600 mt-1">
          Administra las configuraciones de tu cuenta, empresa y preferencias del sistema
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navegación lateral */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-4 sticky top-4">
            <h3 className="font-medium text-gray-800 mb-3">Secciones</h3>
            <ul className="space-y-2">
              <li>
                <a href="#cuenta" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <UserCircleIcon className="h-5 w-5 mr-2" />
                  Cuenta
                </a>
              </li>
              <li>
                <a href="#empresa" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <BuildingOffice2Icon className="h-5 w-5 mr-2" />
                  Empresa
                </a>
              </li>
              <li>
                <a href="#facturacion" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <CreditCardIcon className="h-5 w-5 mr-2" />
                  Facturación
                </a>
              </li>
              <li>
                <a href="#seguridad" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <ShieldCheckIcon className="h-5 w-5 mr-2" />
                  Seguridad
                </a>
              </li>
              <li>
                <a href="#notificaciones" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <BellIcon className="h-5 w-5 mr-2" />
                  Notificaciones
                </a>
              </li>
              <li>
                <a href="#apariencia" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <PaintBrushIcon className="h-5 w-5 mr-2" />
                  Apariencia
                </a>
              </li>
              <li>
                <a href="#integraciones" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <ServerStackIcon className="h-5 w-5 mr-2" />
                  Integraciones
                </a>
              </li>
              <li>
                <a href="#usuarios" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <UserGroupIcon className="h-5 w-5 mr-2" />
                  Usuarios y Permisos
                </a>
              </li>
              <li>
                <a href="#avanzado" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <DocumentTextIcon className="h-5 w-5 mr-2" />
                  Avanzado
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="lg:col-span-2 space-y-10">
          {/* Sección Cuenta */}
          <section id="cuenta" className="border-b pb-8">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-6">
              <UserCircleIcon className="h-6 w-6 text-indigo-600 mr-2" />
              Configuración de Cuenta
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={userData.name}
                  onChange={handleInputChange(setUserData, 'name')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={userData.email}
                  onChange={handleInputChange(setUserData, 'email')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={userData.phone}
                  onChange={handleInputChange(setUserData, 'phone')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Idioma</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={userData.language}
                  onChange={handleSelectChange(setUserData, 'language')}
                >
                  <option value="es-CL">Español (Chile)</option>
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <div className="flex items-center">
                  <input
                    id="notifications"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    checked={userData.notifications}
                    onChange={handleCheckboxChange(setUserData, 'notifications')}
                  />
                  <label htmlFor="notifications" className="ml-2 block text-sm text-gray-900">
                    Recibir notificaciones por correo electrónico
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                onClick={() => saveSettings('cuenta')}
              >
                Guardar cambios
              </button>
            </div>
          </section>

          {/* Sección Empresa */}
          <section id="empresa" className="border-b pb-8">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-6">
              <BuildingOffice2Icon className="h-6 w-6 text-indigo-600 mr-2" />
              Información de la Empresa
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la empresa</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={companyData.name}
                  onChange={handleInputChange(setCompanyData, 'name')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">RUT</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={companyData.rut}
                  onChange={handleInputChange(setCompanyData, 'rut')}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={companyData.address}
                  onChange={handleInputChange(setCompanyData, 'address')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={companyData.phone}
                  onChange={handleInputChange(setCompanyData, 'phone')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sitio web</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={companyData.website}
                  onChange={handleInputChange(setCompanyData, 'website')}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Industria</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={companyData.industry}
                  onChange={handleInputChange(setCompanyData, 'industry')}
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                onClick={() => saveSettings('empresa')}
              >
                Guardar cambios
              </button>
            </div>
          </section>

          {/* Sección Facturación */}
          <section id="facturacion" className="border-b pb-8">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-6">
              <CreditCardIcon className="h-6 w-6 text-indigo-600 mr-2" />
              Facturación y Plan
            </h3>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-blue-800">Plan Actual: {billingData.plan}</h4>
                  <p className="text-sm text-blue-700">Próxima facturación: {billingData.nextBilling}</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {billingData.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Método de pago</h4>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Tarjeta Visa terminada en {billingData.cardEnding}</div>
                    <div className="text-sm text-gray-500">Vence el 12/25</div>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    Cambiar
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Historial de facturación</h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm">Junio 2023</div>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      Descargar
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Mayo 2023</div>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      Descargar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100">
                Actualizar plan
              </button>
              <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                Cancelar suscripción
              </button>
            </div>
          </section>

          {/* Sección Seguridad */}
          <section id="seguridad" className="border-b pb-8">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-6">
              <ShieldCheckIcon className="h-6 w-6 text-indigo-600 mr-2" />
              Seguridad y Acceso
            </h3>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium text-gray-800">Autenticación de dos factores</h4>
                  <p className="text-sm text-gray-600">Añade una capa adicional de seguridad a tu cuenta</p>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    id="twoFactorToggle"
                    className="sr-only"
                    checked={securityData.twoFactor}
                    onChange={handleCheckboxChange(setSecurityData, 'twoFactor')}
                  />
                  <label 
                    htmlFor="twoFactorToggle" 
                    className={`block h-6 w-12 rounded-full cursor-pointer ${
                      securityData.twoFactor ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  >
                    <div 
                      className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                        securityData.twoFactor ? 'transform translate-x-6' : ''
                      }`}
                    ></div>
                  </label>
                </div>
              </div>
              
              <p className="text-sm text-gray-500">
                Último inicio de sesión: {securityData.lastLogin}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Dispositivos conectados</h4>
              <div className="space-y-4">
                {securityData.devices.map(device => (
                  <div key={device.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">{device.name}</div>
                        <div className="text-sm text-gray-500">{device.location}</div>
                      </div>
                      <div className="text-sm text-gray-500">{device.lastActive}</div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                onClick={() => saveSettings('seguridad')}
              >
                Guardar cambios
              </button>
            </div>
          </section>

          {/* Sección Notificaciones */}
          <section id="notificaciones" className="border-b pb-8">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-6">
              <BellIcon className="h-6 w-6 text-indigo-600 mr-2" />
              Preferencias de Notificación
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Métodos de notificación</h4>
                <div className="flex space-x-6">
                  <div className="flex items-center">
                    <input
                      id="email-notif"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      checked={notifications.email}
                      onChange={handleCheckboxChange(setNotifications, 'email')}
                    />
                    <label htmlFor="email-notif" className="ml-2 block text-sm text-gray-900">
                      Correo electrónico
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="sms-notif"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      checked={notifications.sms}
                      onChange={handleCheckboxChange(setNotifications, 'sms')}
                    />
                    <label htmlFor="sms-notif" className="ml-2 block text-sm text-gray-900">
                      SMS
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="push-notif"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      checked={notifications.push}
                      onChange={handleCheckboxChange(setNotifications, 'push')}
                    />
                    <label htmlFor="push-notif" className="ml-2 block text-sm text-gray-900">
                      Notificaciones push
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Tipos de notificación</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      id="new-service"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      checked={notifications.newService}
                      onChange={handleCheckboxChange(setNotifications, 'newService')}
                    />
                    <label htmlFor="new-service" className="ml-2 block text-sm text-gray-900">
                      Nuevos servicios asignados
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-updates"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      checked={notifications.serviceUpdates}
                      onChange={handleCheckboxChange(setNotifications, 'serviceUpdates')}
                    />
                    <label htmlFor="service-updates" className="ml-2 block text-sm text-gray-900">
                      Actualizaciones de servicios
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="maintenance-alerts"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      checked={notifications.maintenanceAlerts}
                      onChange={handleCheckboxChange(setNotifications, 'maintenanceAlerts')}
                    />
                    <label htmlFor="maintenance-alerts" className="ml-2 block text-sm text-gray-900">
                      Alertas de mantenimiento
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="payment-reminders"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      checked={notifications.paymentReminders}
                      onChange={handleCheckboxChange(setNotifications, 'paymentReminders')}
                    />
                    <label htmlFor="payment-reminders" className="ml-2 block text-sm text-gray-900">
                      Recordatorios de pagos
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                onClick={() => saveSettings('notificaciones')}
              >
                Guardar cambios
              </button>
            </div>
          </section>

          {/* Sección Apariencia */}
          <section id="apariencia" className="border-b pb-8">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-6">
              <PaintBrushIcon className="h-6 w-6 text-indigo-600 mr-2" />
              Apariencia
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tema</label>
                <div className="flex space-x-4">
                  <button 
                    className={`p-4 rounded-lg border ${
                      appearance.theme === 'light' 
                        ? 'border-indigo-600 ring-2 ring-indigo-600' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setAppearance(prev => ({ ...prev, theme: 'light' }))}
                  >
                    <div className="bg-white w-24 h-16 rounded shadow"></div>
                    <div className="mt-2 text-sm">Claro</div>
                  </button>
                  
                  <button 
                    className={`p-4 rounded-lg border ${
                      appearance.theme === 'dark' 
                        ? 'border-indigo-600 ring-2 ring-indigo-600' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setAppearance(prev => ({ ...prev, theme: 'dark' }))}
                  >
                    <div className="bg-gray-800 w-24 h-16 rounded shadow"></div>
                    <div className="mt-2 text-sm">Oscuro</div>
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Densidad</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={appearance.density}
                  onChange={handleSelectChange(setAppearance, 'density')}
                >
                  <option value="compact">Compacto</option>
                  <option value="normal">Normal</option>
                  <option value="spacious">Espacioso</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                onClick={() => saveSettings('apariencia')}
              >
                Guardar cambios
              </button>
            </div>
          </section>

          {/* Sección Integraciones */}
          <section id="integraciones" className="border-b pb-8">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-6">
              <ServerStackIcon className="h-6 w-6 text-indigo-600 mr-2" />
              Integraciones
            </h3>
            
            <div className="space-y-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <div className="bg-blue-500 w-8 h-8 rounded"></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Google Calendar</h4>
                      <p className="text-sm text-gray-600">Sincronización con calendario</p>
                    </div>
                  </div>
                  <div className="relative inline-block w-12 align-middle select-none">
                    <input 
                      type="checkbox" 
                      className="sr-only"
                      checked={true}
                      readOnly
                    />
                    <label className="block h-6 w-12 rounded-full bg-indigo-600 cursor-pointer">
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transform translate-x-6"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <div className="bg-green-500 w-8 h-8 rounded"></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Stripe</h4>
                      <p className="text-sm text-gray-600">Procesamiento de pagos</p>
                    </div>
                  </div>
                  <div className="relative inline-block w-12 align-middle select-none">
                    <input 
                      type="checkbox" 
                      className="sr-only"
                      checked={true}
                      readOnly
                    />
                    <label className="block h-6 w-12 rounded-full bg-indigo-600 cursor-pointer">
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transform translate-x-6"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                      <div className="bg-yellow-500 w-8 h-8 rounded"></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Mailchimp</h4>
                      <p className="text-sm text-gray-600">Email marketing</p>
                    </div>
                  </div>
                  <div className="relative inline-block w-12 align-middle select-none">
                    <input 
                      type="checkbox" 
                      className="sr-only"
                      checked={false}
                      readOnly
                    />
                    <label className="block h-6 w-12 rounded-full bg-gray-300 cursor-pointer">
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sección Usuarios y Permisos */}
          <section id="usuarios" className="border-b pb-8">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-6">
              <UserGroupIcon className="h-6 w-6 text-indigo-600 mr-2" />
              Usuarios y Permisos
            </h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-indigo-100 rounded-full p-2 mr-3">
                          <UserCircleIcon className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Víctor Albornoz</div>
                          <div className="text-sm text-gray-500">victor.albornoz@albornoz.cl</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                        Administrador
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Activo
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                      <button className="text-gray-600 hover:text-gray-900">Permisos</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-indigo-100 rounded-full p-2 mr-3">
                          <UserCircleIcon className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">María González</div>
                          <div className="text-sm text-gray-500">maria@albornoz.cl</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Operador
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Activo
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                      <button className="text-gray-600 hover:text-gray-900">Permisos</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                Agregar usuario
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100">
                Gestionar roles
              </button>
            </div>
          </section>

          {/* Sección Avanzado */}
          <section id="avanzado">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-6">
              <DocumentTextIcon className="h-6 w-6 text-indigo-600 mr-2" />
              Configuración Avanzada
            </h3>
            
            <div className="space-y-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-3">Exportar datos</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Exporta todos los datos de tu cuenta en formato CSV para realizar copias de seguridad o análisis.
                </p>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 flex items-center">
                  <ArrowPathIcon className="h-5 w-5 mr-2" />
                  Exportar todos los datos
                </button>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-3">API Access</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Configura las claves de API para integraciones con otros sistemas.
                </p>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100">
                    Generar nueva clave
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100">
                    Ver documentación
                  </button>
                </div>
              </div>
              
              <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-800 mb-3">Zona peligrosa</h4>
                <p className="text-sm text-red-700 mb-4">
                  Estas acciones son irreversibles. Por favor, procede con precaución.
                </p>
                <div className="space-y-3">
                  <button className="px-4 py-2 bg-white border border-red-300 text-red-700 rounded-lg hover:bg-red-100">
                    Desactivar cuenta temporalmente
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Eliminar cuenta permanentemente
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;