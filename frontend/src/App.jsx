import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/dashboard.jsx';
import GestioneVeicoli from './pages/GestioneVeicoli/GestioneVeicoli.jsx';
import SupportoTecnico from './pages/SupportoTecnico/SupportoTecnico.jsx';

// COMPONENTE SEGNAPOSTO
function StazioniMock() { 
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-brand-testo">Gestione Stazioni</h1>
      <p className="text-gray-500 mt-2">Schermata in sviluppo.</p>
    </div>
  ); 
}

function Layout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const getNavClass = (path) => {
    const isActive = currentPath === path;
    return `btn-nav ${isActive ? 'btn-nav-active' : 'btn-nav-inactive'}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-sfondoelementi text-brand-testo p-6 gap-6">
      
      {/* BARRA SUPERIORE ORIZZONTALE UNIFICATA */}
      <header className="flex justify-between items-center bg-brand-sfondo py-3 px-6 rounded-2xl shadow-sm z-30 border border-gray-100">
        <div className="flex gap-3 flex-1">
          
          <Link to="/dashboard" className="no-underline">
            <button className={getNavClass('/dashboard')}>
              Dashboard
            </button>
          </Link>

          <Link to="/supporto" className="no-underline">
            <button className={getNavClass('/supporto')}>
              Supporto tecnico
            </button>
          </Link>

          <Link to="/veicoli" className="no-underline">
            <button className={getNavClass('/veicoli')}>
              Gestione veicoli
            </button>
          </Link>

          <Link to="/stazioni" className="no-underline">
            <button className={getNavClass('/stazioni')}>
              Gestione stazioni
            </button>
          </Link>

        </div>
        
        <div className="flex items-center gap-4">
          <select className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold outline-none focus:border-brand-testo bg-brand-sfondo cursor-pointer">
            <option>Settimana</option>
            <option>Mese</option>
            <option>Giorno</option>
          </select>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-accent-purple to-accent-blue cursor-pointer shadow-sm border-2 border-white" />
        </div>
      </header>

      {/* CONTENUTO DELLA PAGINA CORRENTE */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/veicoli" element={<GestioneVeicoli />} />
          <Route path="/supporto" element={<SupportoTecnico />} />
          <Route path="/stazioni" element={<StazioniMock />} />
          <Route path="/*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}