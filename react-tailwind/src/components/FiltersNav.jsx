import React, { useState, useEffect } from 'react';

const FiltersNav = ({ filters, onFilterChange, sortOption, onSortChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...localFilters, [name]: value };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow mb-4 flex flex-wrap gap-4 items-center">
      {/* Filtrar por tipo de Vehículo */}
      <div>
        <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">
          Tipo de vehículo
        </label>
        <select
          id="vehicleType"
          name="vehicleType"
          value={localFilters.vehicleType}
          onChange={handleFilterChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Todos</option>
          <option value="Camión 3/4">Camión 3/4</option>
          <option value="Camión 5/6">Camión 5/6</option>
          <option value="Camión 10">Camión 10</option>
        </select>
      </div>

      {/* Filtrar por estados */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Estado
        </label>
        <select
          id="status"
          name="status"
          value={localFilters.status}
          onChange={handleFilterChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Todos</option>
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
        </select>
      </div>

      {/* Ordenar opciones */}
      <div>
        <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
          Ordenar por
        </label>
        <select
          id="sort"
          name="sort"
          value={sortOption}
          onChange={handleSortChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="name-asc">Nombre (A-Z)</option>
          <option value="name-desc">Nombre (Z-A)</option>
          <option value="status-asc">Estado (Ascendente)</option>
          <option value="status-desc">Estado (Descendente)</option>
        </select>
      </div>
    </div>
  );
};

export default FiltersNav;
