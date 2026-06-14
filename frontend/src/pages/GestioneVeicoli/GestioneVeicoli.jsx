import { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import VehicleModal from './components/VehicleModal.jsx';
import Card from '../../components/ui/Card.jsx';
import StatusBadge from '../../components/ui/StatusBadge.jsx';
import ActionMenu from '../../components/ui/ActionMenu.jsx';
import LoadingState from '../../components/ui/LoadingState.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import PageHeader from '../../components/ui/PageHeader.jsx';
import { useResource } from '../../hooks/useResource.js';
import StatusRing from '../../components/ui/StatusRing.jsx';

/**
 * ============================================================
 * COMPONENTE: GestioneVeicoli (Pagina di Gestione Asset)
 * ============================================================
 * Pagina amministrativa per il controllo totale della flotta.
 * Offre una panoramica statistica (KPI) in alto e una tabella
 * dettagliata in basso con funzionalità di ricerca e CRUD.
 * ============================================================
 */
export default function GestioneVeicoli() {

  // ============================================================
  // CUSTOM HOOK: useResource
  // ============================================================
  // Centralizza tutte le operazioni API sui veicoli.
  // Espone lo stato e le funzioni per Creare, Aggiornare ed Eliminare.
  const { 
    data: veicoli, 
    loading, 
    refresh: refreshVehicles, 
    remove: deleteVehicle, 
    create: createVehicle, 
    update: updateVehicle 
  } = useResource('/vehicles');


  // ============================================================
  // USE STATE
  // ============================================================
  
  // Testo di ricerca per la tabella
  const [search, setSearch] = useState('');
  
  // Gestione Modale (Crea/Modifica/Visualizza)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit' | 'view'


  // ============================================================
  // GESTORI AZIONI
  // ============================================================

  // Elimina un veicolo previa conferma
  const handleDelete = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo veicolo?")) return;
    try {
      await deleteVehicle(id);
    } catch (err) {
      console.error("Errore eliminazione:", err);
      alert("Errore durante l'eliminazione.");
    }
  };

  // Salva o aggiorna un veicolo tramite modale
  const handleSave = async (formData) => {
    try {
      if (modalMode === 'edit' && selectedVehicle) {
        await updateVehicle(selectedVehicle.id, formData);
      } else {
        await createVehicle(formData);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Errore salvataggio:", err);
      alert("Errore durante il salvataggio.");
    }
  };

  // Funzioni helper per configurare lo stato della modale prima dell'apertura
  const openCreate = () => { setModalMode('create'); setSelectedVehicle(null); setIsModalOpen(true); };
  const openEdit = (vehicle) => { setModalMode('edit'); setSelectedVehicle(vehicle); setIsModalOpen(true); };
  const openView = (vehicle) => { setModalMode('view'); setSelectedVehicle(vehicle); setIsModalOpen(true); };


  // ============================================================
  // USE MEMO: Calcoli e Filtri
  // ============================================================

  // Filtro in tempo reale per targa o modello
  const filteredVeicoli = useMemo(() => {
    return (veicoli || []).filter(v => 
      v.license_plate?.toLowerCase().includes(search.toLowerCase()) ||
      v.vehicle_model?.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [veicoli, search]);

  // Aggregazione statistiche per KPI: raggruppa veicoli per tipo e stato
  const stats = useMemo(() => {
    const s = {
      auto: { total: 0, label: 'Automobili', stati: {} },
      bici: { total: 0, label: 'Biciclette', stati: {} },
      monopattini: { total: 0, label: 'Monopattini', stati: {} }
    };

    veicoli.forEach(v => {
      const type = v.vehicle_model?.vehicle_type?.name?.toLowerCase() || '';
      const statusName = v.status?.name || 'N/D';
      
      let key = 'auto';
      if (type.includes('bici')) key = 'bici';
      else if (type.includes('monopattino')) key = 'monopattini';

      s[key].total++;
      s[key].stati[statusName] = (s[key].stati[statusName] || 0) + 1;
    });
    return s;
  }, [veicoli]);
  
  // Dati simulati per il grafico di utilizzo settimanale
  const usageData = useMemo(() => [
    { day: 'LU', auto: 10, monopattini: 5, bici: 6 },
    { day: 'MA', auto: 6, monopattini: 7, bici: 5 },
    { day: 'ME', auto: 9, monopattini: 5, bici: 8 },
    { day: 'GI', auto: 7, monopattini: 4, bici: 3 },
    { day: 'VE', auto: 8, monopattini: 6, bici: 7 },
    { day: 'SA', auto: 3, monopattini: 2, bici: 4 },
    { day: 'DO', auto: 4, monopattini: 6, bici: 6 },
  ], []);


  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="flex flex-col gap-6 text-brand-testo flex-1 animate-in fade-in duration-500">
      
      {/* 1. KPI & GRAFICI SUPERIORI */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Panoramica Stati Flotta */}
        <Card className="flex flex-col md:flex-row justify-around items-center gap-6">
          {/* Legenda Colori Stati */}
          <div className="flex flex-col gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider self-start md:self-center">
            {['disponibile', 'attivo', 'inricarica', 'manutenzione', 'offline', 'guasto', 'rubato'].map(s => (
              <div key={s} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full bg-stato-${s}`}></span> 
                {s.charAt(0).toUpperCase() + s.slice(1).replace('inricarica', 'in ricarica')}
              </div>
            ))}
          </div>
          {/* Grafici a ciambella per categoria */}
          <StatusRing data={stats.auto.stati} total={stats.auto.total} label="Automobili" />
          <StatusRing data={stats.bici.stati} total={stats.bici.total} label="Biciclette" />
          <StatusRing data={stats.monopattini.stati} total={stats.monopattini.total} label="Monopattini" />
        </Card>

        {/* Grafico Utilizzo (Istogramma) */}
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-brand-testo">Utilizzo Mezzi</h3>
            <div className="flex gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-mezzo-auto"></span> Auto</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-mezzo-moto"></span> Monopattini</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-mezzo-bici"></span> Bici</div>
            </div>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 700 }} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="auto" fill="var(--color-mezzo-auto)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="monopattini" fill="var(--color-mezzo-moto)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="bici" fill="var(--color-mezzo-bici)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* 2. HEADER TABELLA (Ricerca e Aggiungi) */}
      <PageHeader 
        searchPlaceholder="Cerca per targa, ID o modello..." 
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        onActionClick={openCreate}
        actionLabel="+ Aggiungi Veicolo"
      />

      {/* 3. TABELLA DETTAGLIO VEICOLI */}
      <Card noPadding className="overflow-hidden border border-gray-100 shadow-sm">
        {loading && veicoli.length === 0 ? (
          <LoadingState />
        ) : filteredVeicoli.length === 0 ? (
          <EmptyState />
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em] bg-brand-sfondowidget/50">
                <th className="p-5">Targa / ID</th>
                <th className="p-5">Modello</th>
                <th className="p-5">Batteria</th>
                <th className="p-5">Km totali</th>
                <th className="p-5">Posizione</th>
                <th className="p-5">Stato</th>
                <th className="p-5 text-center">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredVeicoli.map((veicolo) => (
                <tr key={veicolo.id} className="hover:bg-brand-sfondowidget/30 transition-colors group">
                  <td className="p-5 font-bold text-brand-testo">{veicolo.license_plate || `ID: ${veicolo.id}`}</td>
                  <td className="p-5 text-sm font-semibold text-gray-600">{veicolo.vehicle_model?.name || '—'}</td>
                  
                  {/* Visualizzazione Batteria con barra di avanzamento colorata per soglia */}
                  <td className="p-5 w-60">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-brand-sfondowidget h-2 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            veicolo.battery_percentage > 50 ? 'bg-stato-attivo' : 
                            veicolo.battery_percentage > 20 ? 'bg-stato-inricarica' : 'bg-stato-guasto'
                          }`}
                          style={{ width: `${veicolo.battery_percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-gray-500 min-w-[35px]">{veicolo.battery_percentage}%</span>
                    </div>
                  </td>
                  
                  <td className="p-5 text-sm font-semibold text-gray-600">{veicolo.km_total} km</td>
                  <td className="p-5 text-sm font-semibold text-gray-600">{veicolo.station?.name || veicolo.position || 'In movimento'}</td>
                  
                  <td className="p-5">
                    <StatusBadge status={veicolo.status?.name} variant="soft" />
                  </td>
                  
                  {/* Menu Azioni Contestuali */}
                  <td className="p-5 text-center">
                    <ActionMenu actions={[
                      { label: 'Visualizza', onClick: () => openView(veicolo) },
                      { label: 'Modifica', onClick: () => openEdit(veicolo) },
                      { label: 'Elimina', onClick: () => handleDelete(veicolo.id), variant: 'danger' }
                    ]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* MODALE CRUD VEICOLO */}
      <VehicleModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave} 
        vehicle={selectedVehicle}
        mode={modalMode}
      />
    </div>
  );
}

