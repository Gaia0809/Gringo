import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/dashboard.jsx';
import GestioneVeicoli from './pages/GestioneVeicoli/GestioneVeicoli.jsx';
import SupportoTecnico from './pages/SupportoTecnico/SupportoTecnico.jsx';
import GestioneStazioni from './pages/GestioneStazioni/GestioneStazioni.jsx'; // <-- L'IMPORT DELLA TUA NUOVA PAGINA!

function Layout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const getNavClass = (path) => {
    const isActive = currentPath === path;
    return `px-5 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
      isActive
        ? 'bg-brand-testo text-brand-sfondo' 
        : 'bg-brand-sfondowidget text-gray-500 hover:bg-gray-200' 
    }`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-sfondoelementi text-brand-testo font-sans p-6 gap-6">
      
      <header className="flex justify-between items-center bg-brand-sfondo py-3 px-6 rounded-2xl shadow-sm z-30">
        <div className="flex gap-3 flex-1">
          <Link to="/dashboard" className="no-underline">
            <button className={getNavClass('/dashboard')}>Dashboard</button>
          </Link>
          <Link to="/supporto" className="no-underline">
            <button className={getNavClass('/supporto')}>Supporto tecnico</button>
          </Link>
          <Link to="/veicoli" className="no-underline">
            <button className={getNavClass('/veicoli')}>Gestione veicoli</button>
          </Link>
          <Link to="/stazioni" className="no-underline">
            <button className={getNavClass('/stazioni')}>Gestione stazioni</button>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <select className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-brand-testo bg-brand-sfondo">
            <option>Settimana</option>
            <option>Mese</option>
          </select>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 cursor-pointer" />
        </div>
      </header>

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
          <Route path="/stazioni" element={<GestioneStazioni />} /> {/* <-- ORA CARICA LA VERA PAGINA! */}
          <Route path="/*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}