"use client";

import React from 'react';
import { admin } from '@/utils/Tokens';

interface FilterOption {
  value: string;
  label: string;
}

interface FiltersPanelProps {
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterLabel?: string;
  filterValue: string;
  onFilterChange: (value: string) => void;
  filterOptions: FilterOption[];
  className?: string;
}

/**
 * Componente reutilizable para paneles de filtros y búsqueda
 * Totalmente responsive con diseño adaptativo
 */
export default function FiltersPanel({
  searchPlaceholder = "Buscar...",
  searchValue,
  onSearchChange,
  filterLabel = "Filtrar por Estado",
  filterValue,
  onFilterChange,
  filterOptions,
  className = '',
}: FiltersPanelProps) {
  return (
    <div className={`${admin.filters.container} ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
        <div className="w-full">
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
            Buscar
          </label>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b6a253] focus:border-transparent transition-all duration-200"
          />
        </div>
        <div className="w-full">
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
            {filterLabel}
          </label>
          <select
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b6a253] focus:border-transparent transition-all duration-200 bg-white"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
