import { useState, useMemo } from 'react';
import { useResource } from '../../hooks/useResource';
import NewStationModal from './components/NewStationModal';
import Card from '../../components/ui/Card.jsx';
import StatusBadge from '../../components/ui/StatusBadge.jsx';
import VehicleIcon from '../../components/ui/VehicleIcon.jsx';
import ActionMenu from '../../components/ui/ActionMenu.jsx';
import LoadingState from '../../components/ui/LoadingState.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import PageHeader from '../../components/ui/PageHeader.jsx';

const GestioneStazioni = () => {
  const { data: stations, loading, remove: deleteStation, refresh: refreshStations } = useResource('/stations');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtraggio in tempo reale basato su Nome o Indirizzo
  const filteredStations = useMemo(() => {
    return (stations || []).filter(station => 
      station.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (station.position || station.address)?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [stations, searchQuery]);

  // Gestione eliminazione stazione
  const handleDelete = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questa stazione?")) {
      try {
        await deleteStation(id);
      } catch (error) {
        console.error("Errore durante l'eliminazione:", error);
        alert("Impossibile eliminare la stazione.");
      }
    }
  };

  const handleEdit = (id) => {
    alert(`Funzionalità di modifica per la stazione ID ${id} (da collegare a una modale di modifica).`);
  };

  if (loading && stations.length === 0) {
    return <LoadingState message="Caricamento stazioni..." />;
  }

  return (
    <div className="flex flex-col flex-1">
      
      <PageHeader 
        searchPlaceholder="Cerca per nome o indirizzo..." 
        searchValue={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onActionClick={() => setIsModalOpen(true)}
        actionLabel="+ Aggiungi Stazione"
      />

      {filteredStations.length === 0 ? (
        <EmptyState message="Nessuna stazione trovata" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {filteredStations.map((station) => {
            const capacity = station.capacity || 0;
            const present = station.vehicles_count || 0;
            const available = Math.max(0, capacity - present);
            const fillPercentage = capacity > 0 ? (present / capacity) * 100 : 0;
            const typeName = station.vehicle_type?.name || 'N/A';
            const statusName = station.status?.name || 'Disponibile';
            
            // Pulizia del nome
            const cleanName = station.name.split(' - ')[0];

            const isFull = present >= capacity && capacity > 0;
            const isAlert = isFull || statusName.toLowerCase() !== 'disponibile';
            const displayStatus = isFull ? 'PIENA' : statusName;

            const actions = [
              { label: 'Modifica', onClick: () => handleEdit(station.id) },
              { label: 'Elimina', onClick: () => handleDelete(station.id), variant: 'danger' }
            ];

            return (
              <Card key={station.id} className="flex flex-col h-full relative">
                
                <div className="flex justify-between items-start mb-1 h-8">
                  <h3 className="text-lg font-extrabold text-brand-testo leading-tight truncate mr-2" title={cleanName}>
                    {cleanName}
                  </h3>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <StatusBadge 
                      status={displayStatus} 
                      variant={isAlert ? 'solid' : 'soft'} 
                    />
                    <ActionMenu actions={actions} />
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 flex items-center gap-1.5 mb-6 font-medium">
                  <svg className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate">{station.position || station.address}</span>
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-4xl font-black text-brand-testo tracking-tighter">{present}</span>
                    <span className="text-lg font-bold text-gray-300">/ {capacity}</span>
                  </div>
                  
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner mb-2">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${isFull ? 'bg-stato-inricarica' : 'bg-stato-attivo'}`}
                      style={{ width: `${Math.min(fillPercentage, 100)}%` }}
                    />
                  </div>

                  <div className="flex justify-end text-[10px] font-bold uppercase tracking-widest">
                    <span className={available === 0 ? 'text-stato-guasto' : 'text-brand-testo'}>
                      {available} posti liberi
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide truncate mr-2">
                    <VehicleIcon type={typeName} />
                    <span className="truncate">{typeName}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Componente Modale per Nuova Stazione */}
      <NewStationModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onStationAdded={refreshStations}
      />
    </div>
  );
};

export default GestioneStazioni;
