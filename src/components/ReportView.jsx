import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line,
  AreaChart, Area,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

const ReportesView = () => {
  // Estado para controlar el período de tiempo
  const [timeRange, setTimeRange] = useState('mensual');
  
  // Datos mockeados para el rubro de transporte
  const datosTransportes = [
    { name: 'Camión 3/4', viajes: 24, toneladas: 120, eficiencia: 85 },
    { name: 'Camión Grúa', viajes: 18, toneladas: 90, eficiencia: 78 },
    { name: 'Camión Grande', viajes: 30, toneladas: 180, eficiencia: 92 },
    { name: 'Furgón', viajes: 15, toneladas: 45, eficiencia: 65 },
  ];

  const datosTipoCarga = [
    { name: 'Materiales de construcción', value: 35 },
    { name: 'Productos alimenticios', value: 25 },
    { name: 'Electrónicos', value: 20 },
    { name: 'Productos químicos', value: 15 },
    { name: 'Otros', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const datosIngresos = [
    { mes: 'Ene', ingresos: 4000, gastos: 2400 },
    { mes: 'Feb', ingresos: 3000, gastos: 1398 },
    { mes: 'Mar', ingresos: 9800, gastos: 2000 },
    { mes: 'Abr', ingresos: 3908, gastos: 2780 },
    { mes: 'May', ingresos: 4800, gastos: 1890 },
    { mes: 'Jun', ingresos: 3800, gastos: 2390 },
    { mes: 'Jul', ingresos: 4300, gastos: 3490 },
  ];

  const datosKilometraje = [
    { mes: 'Ene', km: 4000 },
    { mes: 'Feb', km: 3000 },
    { mes: 'Mar', km: 9800 },
    { mes: 'Abr', km: 3908 },
    { mes: 'May', km: 4800 },
    { mes: 'Jun', km: 3800 },
    { mes: 'Jul', km: 4300 },
  ];

  const datosEficiencia = [
    { name: 'Lunes', eficiencia: 85 },
    { name: 'Martes', eficiencia: 78 },
    { name: 'Miércoles', eficiencia: 92 },
    { name: 'Jueves', eficiencia: 65 },
    { name: 'Viernes', eficiencia: 88 },
    { name: 'Sábado', eficiencia: 45 },
    { name: 'Domingo', eficiencia: 30 },
  ];

  const datosCombustible = [
    { tipo: 'Camión 3/4', consumo: 8.5, distancia: 1200 },
    { tipo: 'Camión Grúa', consumo: 6.2, distancia: 950 },
    { tipo: 'Camión Grande', consumo: 5.8, distancia: 1800 },
    { tipo: 'Furgón', consumo: 12.5, distancia: 650 },
  ];

  const datosRutas = [
    { ruta: 'Santiago-Valparaíso', viajes: 24, ingresos: 4200, tiempo: 1.5 },
    { ruta: 'Santiago-Concepción', viajes: 18, ingresos: 7800, tiempo: 6 },
    { ruta: 'Santiago-Antofagasta', viajes: 12, ingresos: 10500, tiempo: 18 },
    { ruta: 'Santiago-Temuco', viajes: 15, ingresos: 6800, tiempo: 8 },
    { ruta: 'Santiago-Iquique', viajes: 8, ingresos: 9200, tiempo: 24 },
  ];

  // Métricas rápidas
  const metricas = [
    { titulo: 'Total de Viajes', valor: '87', cambio: '+12%', icono: '🚚' },
    { titulo: 'Toneladas Transportadas', valor: '435 t', cambio: '+8%', icono: '⚖️' },
    { titulo: 'Eficiencia Promedio', valor: '80%', cambio: '+5%', icono: '📈' },
    { titulo: 'Combustible Promedio', valor: '12.5 km/L', cambio: '-2%', icono: '⛽' },
  ];

  return (
    <div className="w-full p-4 md:p-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Reportes y Estadísticas</h1>
            <p className="text-gray-600 mt-2">
              Análisis detallado del desempeño de tu flota de transporte
            </p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              <option value="diario">Vista Diaria</option>
              <option value="semanal">Vista Semanal</option>
              <option value="mensual">Vista Mensual</option>
              <option value="anual">Vista Anual</option>
            </select>
            
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center hover:bg-indigo-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Exportar
            </button>
          </div>
        </div>
        
        {/* Métricas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricas.map((metrica, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="flex items-start">
                <span className="text-3xl mr-3">{metrica.icono}</span>
                <div>
                  <h3 className="text-gray-600 text-sm font-medium mb-1">{metrica.titulo}</h3>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-800">{metrica.valor}</span>
                    <span className="ml-2 text-sm font-medium text-green-500 bg-green-50 px-2 py-1 rounded-full">
                      {metrica.cambio}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Gráficos principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Ingresos vs Gastos */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Ingresos vs Gastos</h3>
              <div className="flex space-x-2">
                <span className="flex items-center">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mr-1"></div>
                  <span className="text-xs">Ingresos</span>
                </span>
                <span className="flex items-center">
                  <div className="w-3 h-3 bg-rose-500 rounded-full mr-1"></div>
                  <span className="text-xs">Gastos</span>
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={datosIngresos}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="mes" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="ingresos" fill="#6366f1" name="Ingresos" radius={[4, 4, 0, 0]} />
                <Bar dataKey="gastos" fill="#f43f5e" name="Gastos" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Distribución de tipo de carga */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Distribución de Tipo de Carga</h3>
            <div className="flex items-center">
              <ResponsiveContainer width="50%" height={250}>
                <PieChart>
                  <Pie
                    data={datosTipoCarga}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {datosTipoCarga.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Porcentaje']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="ml-4 flex-1">
                <div className="space-y-3">
                  {datosTipoCarga.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-sm mr-3" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.value}% del total</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Segunda fila de gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Kilometraje mensual */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Kilometraje Recorrido</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={datosKilometraje}>
                <defs>
                  <linearGradient id="colorKm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="mes" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="km" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorKm)" 
                  activeDot={{ r: 8, fill: "#059669" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* Eficiencia por día de la semana */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Eficiencia por Día de la Semana</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={datosEficiencia}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="eficiencia" 
                  stroke="#8b5cf6" 
                  strokeWidth={2} 
                  activeDot={{ r: 8, fill: "#7c3aed" }}
                  dot={{ r: 4, fill: "#8b5cf6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Comparación de transportes */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Comparación de Transportes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-4 text-center">Viajes por Tipo de Transporte</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={datosTransportes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="viajes" fill="#f59e0b" name="Viajes" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-4 text-center">Toneladas Transportadas</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={datosTransportes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="toneladas" fill="#10b981" name="Toneladas" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Análisis de rutas y combustible */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Rutas más frecuentes */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Rutas Más Frecuentes</h3>
            <div className="space-y-4">
              {datosRutas.map((ruta, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800">{ruta.ruta}</div>
                    <div className="text-sm text-gray-500">{ruta.tiempo} horas estimadas</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{ruta.viajes} viajes</div>
                    <div className="text-sm text-indigo-600">${ruta.ingresos.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Eficiencia de combustible */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Eficiencia de Combustible</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={datosCombustible}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="tipo" stroke="#666" />
                <PolarRadiusAxis angle={30} domain={[0, 15]} stroke="#666" />
                <Radar 
                  name="Consumo (km/L)" 
                  dataKey="consumo" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.3} 
                />
                <Radar 
                  name="Distancia (km)" 
                  dataKey="distancia" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.3} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportesView;