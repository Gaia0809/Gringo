import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, paginaAttiva, setPaginaAttiva }) => {
  // Mappatura titoli per l'header basata sulla pagina attiva
  const titles = {
    dashboard: 'Dashboard',
    veicoli: 'Gestione Veicoli',
    stazioni: 'Gestione Stazioni',
    supporto: 'Supporto Tecnico'
  };

  return (
    <div className="flex min-h-screen bg-brand-sfondoelementi text-brand-testo font-sans">
      <Sidebar paginaAttiva={paginaAttiva} setPaginaAttiva={setPaginaAttiva} />
      
      <div className="flex-1 flex flex-col">
        <Header title={titles[paginaAttiva] || paginaAttiva} />
        
        <main className="p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
