"use client";

import React, { useState } from 'react';
import RecepcionistasCRUD from './RecepcionistasCRUD';
import HabitacionesCRUD from './HabitacionesCRUD';

type TabType = 'recepcionistas' | 'habitaciones';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('recepcionistas');

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-[#222a54] overflow-hidden mb-6">
        <div className="bg-[#0a1445] border-b-[3px] border-[#b6a253] px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-center">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            Panel de Administración
          </h1>
          <p className="text-gray-300 mt-2 text-sm sm:text-base">
            Gestiona recepcionistas y habitaciones del hotel
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('recepcionistas')}
            className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-colors ${
              activeTab === 'recepcionistas'
                ? 'bg-[#0a1445] text-white border-b-2 border-[#b6a253]'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Recepcionistas
          </button>
          <button
            onClick={() => setActiveTab('habitaciones')}
            className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-colors ${
              activeTab === 'habitaciones'
                ? 'bg-[#0a1445] text-white border-b-2 border-[#b6a253]'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Habitaciones
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-[#222a54] overflow-hidden">
        {activeTab === 'recepcionistas' && <RecepcionistasCRUD />}
        {activeTab === 'habitaciones' && <HabitacionesCRUD />}
      </div>
    </div>
  );
}
