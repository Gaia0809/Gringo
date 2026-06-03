import { useState } from 'react';

// COMPONENTI SEGNAPOSTO (Mock) 
// Servono a far funzionare la navigazione finché ognuno non collegherà la propria pagina reale
function DashboardMock() { 
  return <div className="p-8"><h1 className="text-2xl font-bold">📊 Schermata Dashboard (In sviluppo)</h1></div>; 
}
function VeicoliMock() { 
  return <div className="p-8"><h1 className="text-2xl font-bold">🚗 Schermata Gestione Veicoli (In sviluppo)</h1></div>; 
}
function StazioniMock() { 
  return <div className="p-8"><h1 className="text-2xl font-bold">⛽ Schermata Gestione Stazioni (In sviluppo)</h1></div>; 
}
function SupportoMock() { 
  return <div className="p-8"><h1 className="text-2xl font-bold">🛠️ Schermata Supporto Tecnico (In sviluppo)</h1></div>; 
}

function App() {
  // La lavagna parte sulla Dashboard come impostazione generale per il team
  const [paginaAttiva, setPaginaAttiva] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-brand-chiaro text-brand-scuro font-sans">
      
      {/* SIDEBAR - Il menu laterale sinistro comune */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col gap-4">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 tracking-wider">🛞 FLEET APP</h2>
          <p className="text-xs text-gray-400 font-medium">Esame Finale Frontend</p>
        </div>

        <nav className="flex flex-col gap-2">
          {/* Bottone Dashboard */}
          <button 
            onClick={() => setPaginaAttiva('dashboard')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors
              ${paginaAttiva === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          >
             Dashboard
          </button>

          {/* Bottone Gestione Veicoli */}
          <button 
            onClick={() => setPaginaAttiva('veicoli')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors
              ${paginaAttiva === 'veicoli' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          >
             Gestione Veicoli
          </button>

          {/* Bottone Gestione Stazioni */}
          <button 
            onClick={() => setPaginaAttiva('stazioni')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors
              ${paginaAttiva === 'stazioni' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          >
             Gestione Stazioni
          </button>

          {/* Bottone Supporto Tecnico */}
          <button 
            onClick={() => setPaginaAttiva('supporto')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors
              ${paginaAttiva === 'supporto' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          >
             Supporto Tecnico
          </button>
        </nav>
      </aside>

      {/* CONTENUTO PRINCIPALE DINAMICO */}
      <main className="flex-1">
        {paginaAttiva === 'dashboard' && <DashboardMock />}
        {paginaAttiva === 'veicoli' && <VeicoliMock />}
        {paginaAttiva === 'stazioni' && <StazioniMock />}
        {paginaAttiva === 'supporto' && <SupportoMock />}
      </main>

    </div>
  );
}

export default App;