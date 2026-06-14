import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import GestioneVeicoli from './pages/GestioneVeicoli/GestioneVeicoli.jsx';
import SupportoTecnico from './pages/SupportoTecnico/SupportoTecnico.jsx';
import GestioneStazioni from './pages/GestioneStazioni/GestioneStazioni.jsx';

/**
 * ============================================================
 * COMPONENTE: NavItem
 * ============================================================
 * Rappresenta un singolo tasto di navigazione nella testata.
 * Utilizza useLocation per determinare se il percorso attuale
 * corrisponde alla destinazione del link, applicando uno stile
 * "attivo" differenziato.
 * 
 * Props:
 * - to: percorso di destinazione (string)
 * - label: testo da mostrare (string)
 * ============================================================
 */
const NavItem = ({ to, label }) => {
  // Hook per ottenere informazioni sull'URL corrente
  const location = useLocation();
  
  // Calcolo booleano per lo stato attivo: evita di ricalcolare 
  // classi CSS complesse nel corpo del render
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} className="no-underline">
      <button className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
        isActive
          ? 'bg-brand-testo text-brand-sfondo' 
          : 'bg-brand-sfondowidget text-gray-500 hover:bg-gray-200' 
      }`}>
        {label}
      </button>
    </Link>
  );
};

/**
 * ============================================================
 * COMPONENTE: Layout
 * ============================================================
 * Fornisce la struttura portante dell'interfaccia (Shell).
 * Include l'header con la navigazione globale e il contenitore
 * principale per le pagine. Essendo un wrapper, garantisce che
 * la navigazione rimanga fissa e coerente tra i cambi pagina.
 * ============================================================
 */
function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-brand-sfondoelementi text-brand-testo font-sans p-6 gap-6">
      
      {/* Testata dell'applicazione: contiene Nav e controlli globali */}
      <header className="flex justify-between items-center bg-brand-sfondo py-3 px-6 rounded-2xl shadow-sm z-30">
        <nav className="flex gap-3 flex-1">
          <NavItem to="/dashboard" label="Dashboard" />
          <NavItem to="/supporto" label="Supporto tecnico" />
          <NavItem to="/veicoli" label="Gestione veicoli" />
          <NavItem to="/stazioni" label="Gestione stazioni" />
        </nav>
        
        {/* Controlli utente/sessione (placeholder) */}
        <div className="flex items-center gap-4">
          <select className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-brand-testo bg-brand-sfondo cursor-pointer">
            <option>Settimana</option>
            <option>Mese</option>
          </select>
          {/* Avatar utente */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 cursor-pointer" />
        </div>
      </header>

      {/* Main Content: l'area dove vengono iniettate le rotte */}
      <main className="flex-1 flex flex-col min-h-0">
        {children}
      </main>
    </div>
  );
}

/**
 * ============================================================
 * COMPONENTE: App (Root)
 * ============================================================
 * Punto di ingresso principale dell'applicazione React.
 * Configura il sistema di routing (React Router) e associa
 * i percorsi URL ai componenti pagina corrispondenti.
 * ============================================================
 */
export default function App() {
  return (
    <BrowserRouter>
      {/* Il Layout avvolge tutte le rotte per mantenere l'header fisso */}
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/veicoli" element={<GestioneVeicoli />} />
          <Route path="/supporto" element={<SupportoTecnico />} />
          <Route path="/stazioni" element={<GestioneStazioni />} />
          
          {/* Fallback: reindirizza alla dashboard per ogni rotta non trovata */}
          <Route path="/*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
