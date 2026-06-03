import React from 'react';

const Sidebar = ({ paginaAttiva, setPaginaAttiva }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'veicoli', label: 'Gestione Veicoli', icon: '🚗' },
    { id: 'stazioni', label: 'Gestione Stazioni', icon: '⛽' },
    { id: 'supporto', label: 'Supporto Tecnico', icon: '🛠️' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col gap-4 min-h-screen">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-blue-600 tracking-wider">🛞 FLEET APP</h2>
        <p className="text-xs text-gray-400 font-medium">Esame Finale Frontend</p>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setPaginaAttiva(item.id)}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors
              ${paginaAttiva === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
