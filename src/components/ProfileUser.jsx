import React, { useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Victor Alfredo Albornoz",
    email: "valfredo@albornoz.cl",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    rut: "12.345.678-9",
    phone: "+56 9 8765 4321",
    address: "Av. Libertador Bernardo O'Higgins 123, Santiago",
    position: "Gerente de Operaciones",
    department: "Logística",
    lastLogin: "Hace 2 horas"
  });
  
  const [editingContact, setEditingContact] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [contactForm, setContactForm] = useState({
    phone: user.phone,
    address: user.address
  });

  // Manejar cambio de contraseña
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
    setPasswordError('');
  };

  // Validar y cambiar contraseña
  const submitPasswordChange = () => {
    // Validaciones
    if (!passwordForm.currentPassword) {
      setPasswordError('Debes ingresar tu contraseña actual');
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      setPasswordError('La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }
    
    // Simular cambio exitoso
    setPasswordSuccess(true);
    setTimeout(() => {
      setChangePasswordMode(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordSuccess(false);
    }, 2000);
  };

  // Manejar cambios en la información de contacto
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  // Guardar cambios en la información de contacto
  const saveContactChanges = () => {
    setUser(prev => ({
      ...prev,
      phone: contactForm.phone,
      address: contactForm.address
    }));
    setEditingContact(false);
  };

  // Cancelar cambios en contacto
  const cancelContactEdit = () => {
    setContactForm({
      phone: user.phone,
      address: user.address
    });
    setEditingContact(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
          {/* Encabezado del perfil */}
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
            
            <div className="absolute -bottom-2 left-8 flex items-end">
              <div className="relative">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-green-500 border-2 border-white animate-pulse"></div>
              </div>
              <div className="ml-4 mb-3">
                <h1 className="text-2xl font-bold text-white drop-shadow-md">{user.name}</h1>
                <p className="text-indigo-100">{user.position}</p>
              </div>
            </div>
            
            <div className="absolute top-4 right-4">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                {user.department}
              </span>
            </div>
          </div>
          
          <div className="pt-16 px-6 pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Columna izquierda: Información personal */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Información Personal
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Nombre completo</p>
                      <p className="font-medium text-gray-800">{user.name}</p>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Correo electrónico</p>
                      <p className="font-medium text-gray-800">{user.email}</p>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">RUT</p>
                      <p className="font-medium text-gray-800">{user.rut}</p>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-xs text-green-600 uppercase tracking-wide">Último acceso</p>
                      <p className="font-medium text-green-700">{user.lastLogin}</p>
                    </div>
                  </div>
                </div>
                
                {/* Credenciales */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Credenciales de Acceso
                  </h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Correo institucional</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                        Verificado
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Acceso de administrador</p>
                        <p className="text-sm text-gray-600">Nivel 3</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                        Activo
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Columna derecha: Información de contacto y contraseña */}
              <div className="lg:col-span-2">
                {/* Información de contacto - Editable */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transform transition-all duration-300 hover:shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      Información de Contacto
                    </h2>
                    
                    {!editingContact ? (
                      <button 
                        onClick={() => setEditingContact(true)}
                        className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium transition-colors duration-200 hover:bg-indigo-50 px-3 py-1 rounded-lg"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button 
                          onClick={cancelContactEdit}
                          className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          Cancelar
                        </button>
                        <button 
                          onClick={saveContactChanges}
                          className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                        >
                          Guardar
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {editingContact ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Número telefónico</label>
                        <input
                          type="text"
                          name="phone"
                          value={contactForm.phone}
                          onChange={handleContactChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200"
                          placeholder="Ingresa tu número telefónico"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                        <textarea
                          name="address"
                          value={contactForm.address}
                          onChange={handleContactChange}
                          rows="3"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200 resize-none"
                          placeholder="Ingresa tu dirección completa"
                        ></textarea>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Número telefónico</p>
                        <p className="font-medium text-gray-800">{user.phone}</p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Dirección</p>
                        <p className="font-medium text-gray-800">{user.address}</p>
                      </div>
                      
                      <div className="flex items-center pt-2 p-3 bg-green-50 rounded-lg border border-green-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-green-700 font-medium">Verificado con tu proveedor de telefonía</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Cambio de contraseña */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6 transform transition-all duration-300 hover:shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                      Cambiar Contraseña
                    </h2>
                    
                    {!changePasswordMode && (
                      <button 
                        onClick={() => setChangePasswordMode(true)}
                        className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium transition-colors duration-200 hover:bg-indigo-50 px-3 py-1 rounded-lg"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Cambiar
                      </button>
                    )}
                  </div>
                  
                  {!changePasswordMode ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-800">Contraseña actual</p>
                            <p className="text-sm text-gray-600">Última actualización: hace 3 meses</p>
                          </div>
                          <div className="text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-yellow-700">Se recomienda cambiar la contraseña cada 3 meses</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {passwordSuccess && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-green-700 font-medium">¡Contraseña cambiada exitosamente!</span>
                          </div>
                        </div>
                      )}
                      
                      {passwordError && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-red-700">{passwordError}</span>
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña actual</label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={passwordForm.currentPassword}
                          onChange={handlePasswordChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200"
                          placeholder="Ingresa tu contraseña actual"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nueva contraseña</label>
                        <input
                          type="password"
                          name="newPassword"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200"
                          placeholder="Ingresa tu nueva contraseña"
                        />
                        <p className="text-xs text-gray-500 mt-1">Mínimo 8 caracteres</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar nueva contraseña</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200"
                          placeholder="Confirma tu nueva contraseña"
                        />
                      </div>
                      
                      <div className="flex space-x-3 pt-4">
                        <button 
                          type="button"
                          onClick={() => {
                            setChangePasswordMode(false);
                            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                            setPasswordError('');
                          }}
                          className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                        >
                          Cancelar
                        </button>
                        <button 
                          type="button"
                          onClick={submitPasswordChange}
                          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
                        >
                          Cambiar Contraseña
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Actividad reciente */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6 transform transition-all duration-300 hover:shadow-md">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Actividad Reciente
                  </h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">Inicio de sesión exitoso</p>
                        <p className="text-xs text-gray-600">Hace 2 horas - Dispositivo: Chrome en Windows</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">Actualización de información de contacto</p>
                        <p className="text-xs text-gray-600">Hace 1 día - Teléfono actualizado</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">Cambio de contraseña</p>
                        <p className="text-xs text-gray-600">Hace 3 meses</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;