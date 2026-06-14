import { useState } from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import NewTicketModal from '../../SupportoTecnico/components/NewTicketModal';
import MapFilters from './MapFilters';
import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';
import { SmartForm, SmartSearchableSelect } from '../../../components/SmartForm';
import { useMapMarkers } from '../../../hooks/useMapMarkers';
import { useResource } from '../../../hooks/useResource';
import api from '../../../api';

/**
 * Componente interno: SidebarTab
 * Gestisce lo stile e l'interazione dei pulsanti nella sidebar.
 */
const SidebarTab = ({ label, active, onClick }) => (
  <button
    className={`flex-1 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
      active ? 'bg-brand-sfondo text-brand-testo shadow-sm' : 'text-gray-500 hover:text-gray-700'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

/**
 * ============================================================
 * COMPONENTE: MappaEspansa (Visualizzazione Full-Screen)
 * ============================================================
 * Modalità a tutto schermo della mappa, attivata dalla Dashboard.
 * Offre un'esperienza focalizzata sul monitoraggio geografico,
 * integrando una sidebar complessa per la gestione di:
 * 1. Ecosistema (Stazioni e asset)
 * 2. Segnalazioni rapide (Tecnico)
 * 3. Gestione Ticket ed Interventi (Assegnazione tecnici)
 * 
 * Props:
 * - onClose: chiude la modalità espansa
 * - stations, vehicles, issues: dati passati dalla Dashboard
 * ============================================================
 */
export default function MappaEspansa({ onClose, stations, vehicles, issues }) {

  // ============================================================
  // USE STATE
  // ============================================================
  
  // Tab attiva nella sidebar: 'Ecosistema' | 'Tecnico' | 'Interventi'
  const [subTab, setSubTab] = useState('Ecosistema');
  
  // Stati per la ricerca e i filtri (sincronizzati con MapFilters)
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('Ecosistema');
  const [statusFilter, setStatusFilter] = useState('Stato');
  
  // Gestione modali (Creazione Ticket e Assegnazione Tecnico)
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [assignModal, setAssignModal] = useState({ open: false, issue: null });
  
  // Configurazione iniziale della visuale mappa (focus su area operativa)
  const [viewState, setViewState] = useState({
    longitude: 12.6606,
    latitude: 45.9566,
    zoom: 14
  });


  // ============================================================
  // CUSTOM HOOKS
  // ============================================================
  
  // Recupero e normalizzazione dei tecnici per la modale di assegnazione
  const { data: technicians } = useResource('/technicians', {
    transform: (data) => (data || []).map(t => ({ id: t.id, label: t.name }))
  });

  // Logica centralizzata per i marker (condivisa con MapView)
  const markers = useMapMarkers(stations, vehicles, searchQuery, typeFilter, statusFilter);


  // ============================================================
  // GESTORI AZIONI (Mutazioni)
  // ============================================================

  // Creazione rapida di un nuovo intervento tecnico
  const handleCreateTicket = async (ticketData) => {
    try {
      const payload = {
        title: ticketData.title,
        description: ticketData.note,
        category_id: 1, // Default: Meccanico
        status_id: 1,   // Default: Aperto
      };
      await api.post('/interventions', payload);
      setIsTicketModalOpen(false);
    } catch (err) {
      console.error('Errore creazione ticket:', err);
    }
  };

  // Aggiornamento dell'assegnazione di un tecnico a una segnalazione esistente
  const handleConfirmAssign = async (values) => {
    if (!assignModal.issue) return;
    try {
      await api.put(`/issues/${assignModal.issue.id}`, { assigned_to: values.assigned_to });
      setAssignModal({ open: false, issue: null });
    } catch (err) {
      console.error('Errore assegnazione tecnico:', err);
    }
  };


  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="fixed inset-0 flex z-[9999] bg-brand-sfondoelementi animate-in fade-in duration-300">
      
      {/* 1. AREA MAPPA (占据左侧) */}
      <div className="flex-1 relative bg-gray-200">
        
        {/* Filtri overlay sulla mappa */}
        <MapFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Motore della mappa */}
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapLib={import('maplibre-gl')}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
          style={{ width: '100%', height: '100%' }}
        >
          {markers.map((marker) => (
            <Marker key={marker.id} latitude={marker.latitude} longitude={marker.longitude}>
              <div 
                className={`w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer transform hover:scale-125 transition-transform ${marker.colorClass}`} 
                title={marker.name} 
              />
            </Marker>
          ))}
        </Map>

        {/* Legenda stati sempre visibile in modalità espansa */}
        <div className="absolute bottom-5 left-5 bg-brand-sfondo/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 w-44 z-10">
          <h4 className="text-xs font-bold text-brand-testo uppercase tracking-widest mb-3">Legenda</h4>
          <ul className="flex flex-col gap-2">
            {[
              { color: 'bg-stato-attivo', label: 'Attivi' },
              { color: 'bg-stato-offline', label: 'Offline' },
              { color: 'bg-stato-disponibile', label: 'Disponibili' },
              { color: 'bg-stato-guasto', label: 'Guasti' },
              { color: 'bg-stato-manutenzione', label: 'Manutenzione' },
            ].map(item => (
              <li key={item.label} className="flex items-center gap-2 text-[11px] font-semibold text-gray-600">
                <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} /> {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Tasto per ripristinare la visuale standard */}
        <button
          className="absolute bottom-5 right-5 w-10 h-10 bg-brand-sfondo border border-gray-200 rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:bg-gray-50 transition-colors z-10 text-brand-testo font-bold"
          onClick={onClose}
        >
          🗗
        </button>
      </div>

      {/* 2. SIDEBAR DI GESTIONE (占据右侧) */}
      <div className="w-96 bg-brand-sfondo/80 backdrop-blur-xl border-l border-white/20 p-6 flex flex-col gap-5 shadow-[-10px_0_30px_rgba(0,0,0,0.05)]">
        
        {/* Switcher Tab della Sidebar */}
        <div className="flex bg-brand-sfondowidget p-1 rounded-full gap-1">
          {['Ecosistema', 'Tecnico', 'Interventi'].map(tab => (
            <SidebarTab 
              key={tab} 
              label={tab} 
              active={subTab === tab} 
              onClick={() => setSubTab(tab)} 
            />
          ))}
        </div>

        {/* Input di ricerca rapida nella sidebar */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cerca per targa o id..."
            className="w-full pl-9 pr-4 py-2.5 bg-brand-sfondo border border-gray-200 rounded-xl text-sm outline-none focus:border-brand-testo transition-colors"
          />
        </div>

        {/* Area scrollabile dei contenuti per singola Tab */}
        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
          
          {/* TAB 1: Ecosistema (Overview Asset) */}
          {subTab === 'Ecosistema' && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="card !bg-brand-sfondowidget/50 border-none">
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  Mappa interattiva sincronizzata con coordinate GPS reali e stato degli asset in tempo reale.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-bold text-brand-testo uppercase tracking-widest mb-1">Stazioni</h4>
                {stations.slice(0, 10).map(s => (
                  <div key={s.id} className="bg-brand-sfondo/50 p-3 rounded-xl flex justify-between items-center border border-white/20">
                    <span className="text-sm font-semibold">{s.name}</span>
                    <span className="text-xs text-gray-500">{s.vehicles_count}/{s.capacity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Tecnico (Segnalazione rapida guasti) */}
          {subTab === 'Tecnico' && (
            <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
              {/* Form rapido di segnalazione (placeholder logico) */}
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold text-brand-testo uppercase tracking-widest">Segnala Guasto</h4>
                <input type="text" placeholder="ID Mezzo | Targa" className="w-full px-4 py-2.5 bg-brand-sfondo border border-gray-200 rounded-xl text-sm outline-none focus:border-brand-testo" />
                <select className="w-full px-4 py-2.5 bg-brand-sfondo border border-gray-200 rounded-xl text-sm outline-none focus:border-brand-testo cursor-pointer">
                  <option>Meccanico</option>
                  <option>Elettrico</option>
                  <option>Software</option>
                </select>
                <Button className="w-full py-3">Aggiungi segnalazione</Button>
              </div>

              {/* Elenco segnalazioni che attendono ancora l'apertura di un intervento */}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-brand-testo uppercase tracking-widest">Segnalazioni in attesa</h4>
                <div className="flex flex-col gap-2">
                  {issues.filter(i => !i.interventions || i.interventions.length === 0).slice(0, 5).map(i => (
                    <div key={i.id} className="bg-brand-sfondo border border-gray-100 p-3 rounded-xl flex justify-between items-center shadow-sm">
                      <div>
                        <strong className="text-sm text-brand-testo block">{i.title}</strong>
                        <small className="text-[10px] text-gray-400 font-bold">{i.booking?.vehicle?.license_plate || `ID:${i.id}`}</small>
                      </div>
                      <span className="px-2 py-1 rounded-lg text-[9px] font-bold uppercase bg-stato-guasto/10 text-stato-guasto border border-stato-guasto/20">Aperto</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Interventi (Workflow operativo) */}
          {subTab === 'Interventi' && (
            <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <button
                onClick={() => setIsTicketModalOpen(true)}
                className="w-full py-2.5 bg-brand-sfondo border-2 border-dashed border-gray-200 text-gray-400 rounded-xl font-bold text-xs hover:border-brand-testo hover:text-brand-testo transition-all cursor-pointer"
              >
                + Nuovo Ticket
              </button>

              <div className="flex flex-col gap-3">
                <h5 className="text-[10px] font-bold text-stato-guasto uppercase tracking-[0.2em]">⚠️ Guasti in corso</h5>
                {issues.slice(0, 5).map(i => (
                  <div key={i.id} className="card border-l-4 border-l-stato-guasto !p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-gray-400">ID:#TK-{i.id}</span>
                    </div>
                    <div className="mb-4">
                      <strong className="text-sm text-brand-testo block">{i.title}</strong>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        {i.description || 'Segnalazione in attesa di diagnosi.'}
                      </p>
                    </div>
                    <Button
                      variant="primary"
                      className="w-full !py-2 !text-[11px] bg-stato-attivo"
                      onClick={() => setAssignModal({ open: true, issue: i })}
                    >
                      Assegna tecnico
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODALI DI SUPPORTO */}
      
      {/* Modale creazione ticket */}
      <NewTicketModal
        open={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        onSave={handleCreateTicket}
      />

      {/* Modale assegnazione tecnico a segnalazione */}
      <Modal 
        open={assignModal.open} 
        onClose={() => setAssignModal({ open: false, issue: null })} 
        title="Assegna Tecnico"
        maxWidth="max-w-sm"
      >
        <p className="text-sm text-gray-600 mb-4">
          Ticket: <span className="font-semibold text-brand-testo">{assignModal.issue?.title}</span>
        </p>
        
        <SmartForm
          initialValues={{ assigned_to: assignModal.issue?.assigned_to?.id || '' }}
          onSubmit={handleConfirmAssign}
          onCancel={() => setAssignModal({ open: false, issue: null })}
          submitLabel="Conferma Assegnazione"
        >
          <SmartSearchableSelect
            name="assigned_to"
            label="Seleziona Tecnico"
            options={technicians}
            placeholder="Seleziona tecnico..."
          />
        </SmartForm>
      </Modal>
    </div>
  );
}

