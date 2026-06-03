import { useState } from 'react';
import LeftColumn from './components/LeftColumn/LeftColumn';
import MapView from './components/MapView/MapView';
import Agenda from './components/Agenda/Agenda';
import MappaEspansa from './components/MapView/MappaEspansa';
import './App.css';

// COMPONENTI SEGNAPOSTO DI GAIA (Mock)
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

function SupportoMock() { 
  return (
    <div style={{ padding: '30px', fontFamily: "'Outfit', sans-serif" }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>🛠️ Supporto Tecnico</h1>
      <p style={{ color: '#64748b', marginTop: '8px' }}>Schermata in sviluppo.</p>
    </div>
  ); 
}

export default function App() {
  const [paginaAttiva, setPaginaAttiva] = useState('dashboard');
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  // Se la mappa è espansa, renderizziamo l'overlay a schermo intero
  if (isMapExpanded) {
    return <MappaEspansa onClose={() => setIsMapExpanded(false)} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f6f8', fontFamily: "'Outfit', sans-serif", padding: '24px', gap: '24px' }}>
      
      {/* BARRA SUPERIORE ORIZZONTALE (MENU DI NAVIGAZIONE) */}
      <header style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', backgroundColor: '#ffffff', padding: '12px 24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        
        {/* Gruppo Bottoni di Navigazione */}
        <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
          <button 
            onClick={() => setPaginaAttiva('dashboard')}
            style={{
              padding: '8px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.2s',
              backgroundColor: paginaAttiva === 'dashboard' ? '#1a1a1a' : '#f1f5f9',
              color: paginaAttiva === 'dashboard' ? '#ffffff' : '#475569'
            }}
          >
            Dashboard
          </button>

          <button 
            onClick={() => setPaginaAttiva('supporto')}
            style={{
              padding: '8px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.2s',
              backgroundColor: paginaAttiva === 'supporto' ? '#1a1a1a' : '#f1f5f9',
              color: paginaAttiva === 'supporto' ? '#ffffff' : '#475569'
            }}
          >
            Supporto tecnico
          </button>

          <button 
            onClick={() => setPaginaAttiva('veicoli')}
            style={{
              padding: '8px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.2s',
              backgroundColor: paginaAttiva === 'veicoli' ? '#1a1a1a' : '#f1f5f9',
              color: paginaAttiva === 'veicoli' ? '#ffffff' : '#475569'
            }}
          >
            Gestione veicoli
          </button>

          <button 
            onClick={() => setPaginaAttiva('stazioni')}
            style={{
              padding: '8px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.2s',
              backgroundColor: paginaAttiva === 'stazioni' ? '#1a1a1a' : '#f1f5f9',
              color: paginaAttiva === 'stazioni' ? '#ffffff' : '#475569'
            }}
          >
            Gestione stazioni
          </button>
        </div>

        {/* Selettore e Profilo a Destra */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <select style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontFamily: "'Outfit', sans-serif" }}>
            <option>Settimana</option>
            <option>Mese</option>
          </select>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)', cursor: 'pointer' }} />
        </div>
      </header>

      {/* CONTENUTO PRINCIPALE DINAMICO A TUTTO SCHERMO */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {paginaAttiva === 'dashboard' && (
          <div className="dashboard-content" style={{ display: 'flex', gap: '20px', height: '100%', alignItems: 'stretch' }}>
            <LeftColumn />
            <MapView onExpand={() => setIsMapExpanded(true)} />
            <Agenda />
          </div>
        )}
        {paginaAttiva === 'veicoli' && <VeicoliMock />}
        {paginaAttiva === 'stazioni' && <StazioniMock />}
        {paginaAttiva === 'supporto' && <SupportoMock />}
      </main>

    </div>
  );
}