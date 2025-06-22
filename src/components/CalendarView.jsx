import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, 
         startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays } from 'date-fns';
import { es } from 'date-fns/locale';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    time: '09:00',
    type: 'meeting',
    color: '#6366f1'
  });
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day'
  const [isLoading, setIsLoading] = useState(true);

  // Colores modernos para diferentes tipos de eventos
  const eventColors = {
    meeting: '#6366f1', // violeta
    note: '#10b981',    // verde esmeralda
    important: '#ef4444', // rojo
    personal: '#f59e0b', // ámbar
    deadline: '#8b5cf6'  // violeta intenso
  };

  // Generar eventos de ejemplo
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    const sampleEvents = [
      {
        id: 1,
        title: 'Reunión de estrategia',
        description: 'Discutir objetivos trimestrales con el equipo de liderazgo',
        date: today,
        time: '10:00',
        type: 'meeting',
        color: eventColors.meeting,
        attendees: ['Carlos', 'Laura', 'Miguel']
      },
      {
        id: 2,
        title: 'Entrega de reporte',
        description: 'Enviar reporte de ventas a gerencia',
        date: today,
        time: '14:30',
        type: 'deadline',
        color: eventColors.deadline
      },
      {
        id: 3,
        title: 'Llamada con cliente importante',
        description: 'Discutir requerimientos del proyecto Acme',
        date: tomorrow,
        time: '11:00',
        type: 'meeting',
        color: eventColors.meeting,
        attendees: ['Ana', 'Pedro']
      },
      {
        id: 4,
        title: 'Recordatorio: pago de facturas',
        description: 'Realizar pago de servicios antes de la fecha límite',
        date: addDays(today, 3),
        time: '09:00',
        type: 'note',
        color: eventColors.note
      },
      {
        id: 5,
        title: 'Mantención de transporte',
        description: 'Revisar  y reparar vehículo de la empresa',
        date: addDays(today, 5),
        time: '15:00',
        type: 'meeting',
        color: eventColors.meeting,
        attendees: ['Diseño', 'Desarrollo']
      },
      {
        id: 6,
        title: 'Reunión de equipo',
        description: 'Reunión semanal para revisar avances y bloqueos',
        date: addDays(today, 7),
        time: '10:00',
        type: 'personal',
        color: eventColors.personal
      }
    ];
    
    // Simular carga de datos
    setTimeout(() => {
      setEvents(sampleEvents);
      setIsLoading(false);
    }, 800);
  }, []);

  // Navegación del calendario
  const nextPeriod = () => {
    if (viewMode === 'month') setCurrentDate(addMonths(currentDate, 1));
    if (viewMode === 'week') setCurrentDate(addDays(currentDate, 7));
    if (viewMode === 'day') setCurrentDate(addDays(currentDate, 1));
  };
  
  const prevPeriod = () => {
    if (viewMode === 'month') setCurrentDate(subMonths(currentDate, 1));
    if (viewMode === 'week') setCurrentDate(addDays(currentDate, -7));
    if (viewMode === 'day') setCurrentDate(addDays(currentDate, -1));
  };
  
  const goToToday = () => setCurrentDate(new Date());

  // Manejar clic en día
  const handleDayClick = (day) => {
    setSelectedDate(day);
    setNewEvent({
      title: '',
      description: '',
      time: '09:00',
      type: 'meeting',
      color: eventColors.meeting
    });
    setShowEventModal(true);
  };

  // Guardar nuevo evento
  const saveEvent = () => {
    if (!newEvent.title.trim()) return;
    
    const eventToSave = {
      id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
      title: newEvent.title,
      description: newEvent.description,
      date: selectedDate,
      time: newEvent.time,
      type: newEvent.type,
      color: eventColors[newEvent.type],
      attendees: newEvent.attendees || []
    };
    
    setEvents([...events, eventToSave]);
    setShowEventModal(false);
  };

  // Eliminar evento
  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
    setShowEventModal(false);
  };

  // Obtener eventos para una fecha específica
  const getEventsForDate = (date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  // Generar celdas del calendario
  const renderMonthCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const dayEvents = getEventsForDate(cloneDay);
        const isToday = isSameDay(day, new Date());
        const isCurrentMonth = isSameMonth(day, monthStart);
        
        days.push(
          <div
            key={day}
            className={`relative min-h-32 p-3 transition-all duration-200 rounded-xl ${
              !isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white hover:bg-gray-50'
            } ${
              isToday ? 'ring-2 ring-indigo-500' : 'border border-gray-200'
            }`}
            onClick={() => handleDayClick(cloneDay)}
          >
            <div className="flex justify-between items-center">
              <span className={`text-sm font-medium ${
                isToday 
                  ? 'bg-indigo-500 text-white rounded-full w-7 h-7 flex items-center justify-center' 
                  : 'text-gray-700'
              }`}>
                {format(day, 'd')}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {format(day, 'EEE', { locale: es }).substring(0, 2)}
              </span>
            </div>
            
            <div className="mt-2 space-y-2 max-h-20 overflow-y-auto">
              {dayEvents.slice(0, 3).map(event => (
                <div 
                  key={event.id}
                  className="text-xs p-2 rounded-lg transition-transform hover:scale-[1.02] cursor-pointer"
                  style={{ 
                    backgroundColor: `${event.color}10`, 
                    borderLeft: `3px solid ${event.color}`
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setNewEvent(event);
                    setSelectedDate(event.date);
                    setShowEventModal(true);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{event.title}</span>
                    <span className="text-gray-500">{event.time}</span>
                  </div>
                  <div className="text-gray-600 truncate text-[0.7rem] mt-1">
                    {event.description}
                  </div>
                </div>
              ))}
              {dayEvents.length > 3 && (
                <div className="text-xs text-indigo-600 font-medium mt-1">
                  +{dayEvents.length - 3} más
                </div>
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="grid grid-cols-7 gap-3 mb-3">
          {days}
        </div>
      );
      days = [];
    }
    
    return rows;
  };

  // Vista de carga
  if (isLoading) {
    return (
      <div className="w-full p-8 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-700">Cargando eventos</h2>
          <p className="text-gray-500 mt-2">Preparando tu agenda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 p-4 bg-white rounded-2xl shadow-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Calendario</h1>
            <p className="text-gray-600 mt-1">
              {format(currentDate, 'MMMM yyyy', { locale: es })}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === 'month' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Mes
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === 'week' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Semana
              </button>
              <button
                onClick={() => setViewMode('day')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === 'day' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Día
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={prevPeriod}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button 
                onClick={goToToday}
                className="px-4 py-2 text-sm bg-indigo-50 text-indigo-600 font-medium rounded-lg hover:bg-indigo-100 transition-colors"
              >
                Hoy
              </button>
              
              <button 
                onClick={nextPeriod}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <button
              onClick={() => {
                setSelectedDate(new Date());
                setNewEvent({
                  title: '',
                  description: '',
                  time: '09:00',
                  type: 'meeting',
                  color: eventColors.meeting
                });
                setShowEventModal(true);
              }}
              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg flex items-center hover:bg-indigo-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Nuevo evento
            </button>
          </div>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-3 mb-2">
          {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
            <div key={day} className="p-3 text-center font-bold text-gray-700 text-sm uppercase tracking-wide">
              {day}
            </div>
          ))}
        </div>

        {/* Celdas del calendario */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          {renderMonthCells()}
        </div>

        {/* Eventos próximos */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Próximos eventos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events
              .filter(event => new Date(event.date) > new Date())
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .slice(0, 6)
              .map(event => (
                <div 
                  key={event.id}
                  className="p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setNewEvent(event);
                    setSelectedDate(event.date);
                    setShowEventModal(true);
                  }}
                >
                  <div className="flex items-start">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: event.color }}
                    >
                      {format(event.date, 'dd')}
                      <span className="text-[0.6rem] block -mt-1">
                        {format(event.date, 'MMM', { locale: es })}
                      </span>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-gray-800">{event.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {format(event.date, 'EEEE, d MMMM', { locale: es })} a las {event.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Modal para eventos */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div 
            className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="h-2 rounded-t-2xl"
              style={{ backgroundColor: newEvent.color }}
            ></div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {newEvent.id ? 'Detalles del evento' : 'Nuevo evento'}
                </h3>
                <button 
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-5">
                <div className="flex items-center text-gray-600 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">
                    {format(selectedDate, 'EEEE, d MMMM yyyy', { locale: es })}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Título del evento</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    placeholder="Título del evento"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Descripción</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
                    rows="3"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    placeholder="Agrega detalles sobre el evento"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1 font-medium">Hora</label>
                    <input
                      type="time"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1 font-medium">Tipo de evento</label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
                      value={newEvent.type}
                      onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                    >
                      <option value="meeting">Reunión</option>
                      <option value="note">Nota</option>
                      <option value="important">Importante</option>
                      <option value="personal">Personal</option>
                      <option value="deadline">Fecha límite</option>
                    </select>
                  </div>
                </div>
                
                {newEvent.attendees && newEvent.attendees.length > 0 && (
                  <div>
                    <label className="block text-gray-700 mb-1 font-medium">Participantes</label>
                    <div className="flex flex-wrap gap-2">
                      {newEvent.attendees.map((attendee, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                        >
                          {attendee}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                {newEvent.id && (
                  <button
                    onClick={() => deleteEvent(newEvent.id)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Eliminar
                  </button>
                )}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={saveEvent}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {newEvent.id ? 'Actualizar' : 'Guardar evento'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botón flotante para móviles */}
      <button
        onClick={() => {
          setSelectedDate(new Date());
          setNewEvent({
            title: '',
            description: '',
            time: '09:00',
            type: 'meeting',
            color: eventColors.meeting
          });
          setShowEventModal(true);
        }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all md:hidden"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  );
};

export default CalendarView;