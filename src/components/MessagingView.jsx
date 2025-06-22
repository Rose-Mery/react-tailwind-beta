import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/20/solid';

const MessagingView = () => {
  // Datos de ejemplo para conversaciones
  const conversations = [
    {
      id: 1,
      name: "Juan Pérez",
      role: "Conductor",
      lastMessage: "He llegado al destino, el cliente ha recibido su vehículo",
      time: "10:45 AM",
      unread: 0
    },
    {
      id: 2,
      name: "María González",
      role: "Conductora",
      lastMessage: "¿Cuál es la dirección exacta del cliente?",
      time: "09:30 AM",
      unread: 3
    },
    {
      id: 3,
      name: "Roberto Soto",
      role: "Cliente",
      lastMessage: "Gracias por el servicio, muy profesional",
      time: "Ayer",
      unread: 0
    },
    {
      id: 4,
      name: "Carlos Rojas",
      role: "Conductor",
      lastMessage: "El camión necesita mantenimiento urgente",
      time: "Ayer",
      unread: 1
    },
    {
      id: 5,
      name: "AutoShop",
      role: "Cliente Corporativo",
      lastMessage: "Necesitamos programar 3 transportes para mañana",
      time: "22 Jun",
      unread: 0
    }
  ];

  // Mensajes de ejemplo
  const messages = {
    1: [
      { id: 1, sender: "Juan Pérez", text: "Buenos días, estoy en camino a recoger el vehículo", time: "10:00 AM" },
      { id: 2, sender: "Tú", text: "Gracias Juan, el cliente ya está esperando", time: "10:05 AM" },
      { id: 3, sender: "Juan Pérez", text: "He llegado al destino, el cliente ha recibido su vehículo", time: "10:45 AM" }
    ],
    2: [
      { id: 1, sender: "María González", text: "Buen día, tengo asignado el servicio de María López", time: "09:15 AM" },
      { id: 2, sender: "Tú", text: "Sí María, por favor confirma cuando estés en ruta", time: "09:20 AM" },
      { id: 3, sender: "María González", text: "Estoy en ruta, ETA 20 minutos", time: "09:25 AM" },
      { id: 4, sender: "María González", text: "¿Cuál es la dirección exacta del cliente?", time: "09:30 AM" }
    ]
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [activeConversation, setActiveConversation] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  // Filtrar conversaciones
  const filteredConversations = conversations.filter(conversation => 
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    // En una implementación real, aquí se enviaría el mensaje
    setNewMessage('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-800">Mensajería</h2>
          <p className="text-gray-600 mt-1">
            Comunicación con conductores y clientes
          </p>
        </div>
        
        <div className="flex space-x-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              placeholder="Buscar conversaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 h-[600px]">
        {/* Lista de conversaciones */}
        <div className="md:w-1/3 border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <h3 className="font-medium text-gray-800">Conversaciones</h3>
          </div>
          <div className="overflow-y-auto h-[500px]">
            {filteredConversations.map(conversation => (
              <div 
                key={conversation.id}
                className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
                  activeConversation === conversation.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => setActiveConversation(conversation.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="bg-indigo-100 rounded-full p-2 mr-3">
                      <UserCircleIcon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{conversation.name}</div>
                      <div className="text-xs text-gray-500">{conversation.role}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-xs text-gray-500">{conversation.time}</div>
                    {conversation.unread > 0 && (
                      <span className="mt-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600 truncate pl-11">
                  {conversation.lastMessage}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Área de chat */}
        <div className="md:w-2/3 flex flex-col border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-indigo-100 rounded-full p-2 mr-3">
                <UserCircleIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {conversations.find(c => c.id === activeConversation)?.name}
                </div>
                <div className="text-xs text-gray-500">
                  {conversations.find(c => c.id === activeConversation)?.role}
                </div>
              </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <EllipsisVerticalIcon className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages[activeConversation] ? (
              messages[activeConversation].map(message => (
                <div 
                  key={message.id}
                  className={`mb-4 ${message.sender === "Tú" ? 'text-right' : ''}`}
                >
                  <div className={`inline-block p-3 rounded-lg max-w-xs md:max-w-md ${
                    message.sender === "Tú" 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}>
                    {message.text}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {message.sender === "Tú" ? "Tú" : message.sender} • {message.time}
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <ChatBubbleLeftRightIcon className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No hay mensajes</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Comienza una nueva conversación enviando un mensaje
                </p>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Escribe un mensaje..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 flex items-center"
                onClick={handleSendMessage}
              >
                <PaperAirplaneIcon className="h-5 w-5 transform rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingView;