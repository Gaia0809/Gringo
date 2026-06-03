import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import SupportoTecnico from './pages/SupportoTecnico/SupportoTecnico.jsx';
import MappaEspansa from './components/MapView/MappaEspansa';
import './App.css';

function VeicoliMock() { 
  return (
    <div style={{ padding: '30px', fontFamily: "'Outfit', sans-serif" }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>🚗 Gestione Veicoli</h1>
      <p style={{ color: '#64748b', marginTop: '8px' }}>Schermata in sviluppo.</p>
    </div>
  ); 
}

function StazioniMock() { 
  return (
    <div style={{ padding: '30px', fontFamily: "'Outfit', sans-serif" }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>⛽ Gestione Stazioni</h1>
      <p style={{ color: '#64748b', marginTop: '8px' }}>Schermata in sviluppo.</p>
    </div>
  ); 
}

function Layout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f6f8', fontFamily: "'Outfit', sans-serif", padding: '24px', gap: '24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', padding: '12px 24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
          
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '8px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', backgroundColor: currentPath === '/dashboard' ? '#1a1a1a' : '#f1f5f9', color: currentPath === '/dashboard' ? '#ffffff' : '#475569' }}>
              Dashboard
            </button>
          </Link>

          <Link to="/supporto" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '8px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', backgroundColor: currentPath === '/supporto' ? '#1a1a1a' : '#f1f5f9', color: currentPath === '/supporto' ? '#ffffff' : '#475569' }}>
              Supporto tecnico
            </button>
          </Link>

          <Link to="/veicoli" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '8px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', backgroundColor: currentPath === '/veicoli' ? '#1a1a1a' : '#f1f5f9', color: currentPath === '/veicoli' ? '#ffffff' : '#475569' }}>
              Gestione veicoli
            </button>
          </Link>

          <Link to="/stazioni" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '8px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', backgroundColor: currentPath === '/stazioni' ? '#1a1a1a' : '#f1f5f9', color: currentPath === '/stazioni' ? '#ffffff' : '#475569' }}>
              Gestione stazioni
            </button>
          </Link>

        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <select style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontFamily: "'Outfit', sans-serif" }}>
            <option>Settimana</option>
            <option>Mese</option>
          </select>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)', cursor: 'pointer' }} />
        </div>
      </header>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>

    </div>
  );
}

export default function App() {
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  if (isMapExpanded) {
    return <MappaEspansa onClose={() => setIsMapExpanded(false)} />;
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard setIsMapExpanded={setIsMapExpanded} />} />
          <Route path="/supporto" element={<SupportoTecnico />} />
          <Route path="/veicoli" element={<VeicoliMock />} />
          <Route path="/stazioni" element={<StazioniMock />} />
          <Route path="/*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}