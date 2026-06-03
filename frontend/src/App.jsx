import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/dashboard.jsx';
import './App.css';

// COMPONENTI SEGNAPOSTO (Così non crasha nulla in locale e non crei conflitti a Gaia)
function SupportoMock() { 
  return <div style={{ padding: '30px', fontFamily: "'Outfit', sans-serif" }}><h1>Supporto Tecnico</h1><p>Schermata in sviluppo.</p></div>; 
}
function VeicoliMock() { 
  return <div style={{ padding: '30px', fontFamily: "'Outfit', sans-serif" }}><h1>Gestione Veicoli</h1><p>Schermata in sviluppo.</p></div>; 
}
function StazioniMock() { 
  return <div style={{ padding: '30px', fontFamily: "'Outfit', sans-serif" }}><h1>Gestione Stazioni</h1><p>Schermata in sviluppo.</p></div>; 
}

function Layout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f6f8', fontFamily: "'Outfit', sans-serif", padding: '24px', gap: '24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', padding: '12px 24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}><button style={{ padding: '8px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', backgroundColor: currentPath === '/dashboard' ? '#1a1a1a' : '#f1f5f9', color: currentPath === '/dashboard' ? '#ffffff' : '#475569' }}>Dashboard</button></Link>
          <Link to="/supporto" style={{ textDecoration: 'none' }}><button style={{ padding: '8px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', backgroundColor: currentPath === '/supporto' ? '#1a1a1a' : '#f1f5f9', color: currentPath === '/supporto' ? '#ffffff' : '#475569' }}>Supporto tecnico</button></Link>
          <Link to="/veicoli" style={{ textDecoration: 'none' }}><button style={{ padding: '8px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', backgroundColor: currentPath === '/veicoli' ? '#1a1a1a' : '#f1f5f9', color: currentPath === '/veicoli' ? '#ffffff' : '#475569' }}>Gestione veicoli</button></Link>
          <Link to="/stazioni" style={{ textDecoration: 'none' }}><button style={{ padding: '8px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', backgroundColor: currentPath === '/stazioni' ? '#1a1a1a' : '#f1f5f9', color: currentPath === '/stazioni' ? '#ffffff' : '#475569' }}>Gestione stazioni</button></Link>
        </div>
      </header>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/supporto" element={<SupportoMock />} />
          <Route path="/veicoli" element={<VeicoliMock />} />
          <Route path="/stazioni" element={<StazioniMock />} />
          <Route path="/*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}