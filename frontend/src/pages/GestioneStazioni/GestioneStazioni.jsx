import { useState, useEffect } from 'react';
import api from '../../api';
import NewStationModal from './components/NewStationModal';

// Funzioni di supporto per colori e icone
const getStatusColor = (status) => {
  if (!status) return 'bg-gray-200 text-gray-700';
  
  const s = status.toUpperCase();
  if (s.includes('DISPONIBILE') || s.includes('ATTIV')) return 'bg-stato-attivo text-brand-testo';
  if (s.includes('GUASTO')) return 'bg-stato-guasto text-white';
  if (s.includes('MANUTENZIONE')) return 'bg-stato-manutenzione text-white';
  if (s.includes('CARICA') || s.includes('PIENA')) return 'bg-stato-inricarica text-brand-testo';
  return 'bg-gray-200 text-gray-700';
};

const getVehicleIcon = (type) => {
  if (!type) return null;
  const t = type.toUpperCase();

  if (t.includes('MACCHINA') || t.includes('AUTO')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3m10 0a2 2 0 1 1-4 0m4 0a2 2 0 1 0-4 0m-6 0a2 2 0 1 1-4 0m4 0a2 2 0 1 0-4 0"/></svg>
    );
  }
  if (t.includes('BICI')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/></svg>
    );
  }
  if (t.includes('MONOPATTINO')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 12l-3-3h-2"/><path d="M14 17l2-2V5h-2"/><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/></svg>
    );
  }
  return null;
};

const GestioneStazioni = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await api.get('/stations');
        const mappedData = res.data.map(s => ({
          id: s.id,
          name: s.name,
          address: s.position || 'N/A',
          type: s.vehicle_type?.name || 'N/A',
          capacity: s.capacity || 0,
          present: s.vehicles_count || 0,
          status: s.status?.name || 'Sconosciuto'
        }));
        setStations(mappedData);
      } catch (error) {
        console.error("Errore nel caricamento delle stazioni:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  // Chiude i menu a tendina se si clicca altrove nella pagina
  useEffect(() => {
    const handleOutsideClick = () => setOpenMenuId(null);
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  // Gestione eliminazione stazione
  const handleDeleteStation = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Sei sicuro di voler eliminare questa stazione?")) {
      try {
        await api.delete(`/stations/${id}`);
        setStations(prev => prev.filter(station => station.id !== id));
      } catch (error) {
        console.error("Errore durante l'eliminazione:", error);
        alert("Impossibile eliminare la stazione.");
      }
    }
  };

  const handleEditPlaceholder = (id, e) => {
    e.stopPropagation();
    alert(`Funzionalità di modifica per la stazione ID ${id} (da collegare a una modale di modifica).`);
  };

  // Filtraggio in tempo reale basato su Nome o Indirizzo
  const filteredStations = stations.filter(station => 
    station.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-sfondoelementi p-6 flex items-center justify-center">
        <p className="text-brand-testo font-bold">Caricamento stazioni...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-sfondoelementi p-6 font-sans flex flex-col">
      
      {/* Header Pagina */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-brand-testo">Gestione Stazioni</h1>
        <div className="flex gap-4">
          <div className="flex items-center bg-brand-sfondo px-4 py-2 rounded-xl border border-gray-200 shadow-sm w-72">
            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input 
              type="text" 
              placeholder="Cerca per nome o indirizzo..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-none outline-none text-sm w-full bg-transparent text-brand-testo" 
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-testo text-brand-sfondo px-4 py-2 rounded-xl font-bold text-sm shadow-md hover:opacity-90 transition-opacity cursor-pointer"
          >
            + Aggiungi Stazione
          </button>
        </div>
      </div>

      {/* Griglia Stazioni */}
      {filteredStations.length === 0 ? (
        <div className="flex-1 flex justify-center items-center">
          <p className="text-gray-500 font-bold">Nessuna stazione corrisponde ai criteri di ricerca.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {filteredStations.map((station) => {
            const available = Math.max(0, station.capacity - station.present);
            const fillPercentage = station.capacity > 0 ? (station.present / station.capacity) * 100 : 0;
            
            const displayStatus = (station.present >= station.capacity && station.capacity > 0) ? 'PIENA' : station.status;

            return (
              <div key={station.id} className="bg-brand-sfondo rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col h-full relative">
                
                {/* Intestazione */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${getStatusColor(displayStatus)}`}>
                    {displayStatus}
                  </span>
                  
                  {/* Menu Azioni Tre Puntini Interattivo */}
                  <div className="relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === station.id ? null : station.id);
                      }}
                      className="text-gray-400 hover:text-brand-testo transition-colors cursor-pointer p-1 rounded-lg hover:bg-gray-100"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                    </button>

                    {openMenuId === station.id && (
                      <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-20">
                        <button 
                          onClick={(e) => handleEditPlaceholder(station.id, e)}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Modifica
                        </button>
                        <button 
                          onClick={(e) => handleDeleteStation(station.id, e)}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Elimina
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4 flex-1">
                  <h3 className="text-lg font-bold text-brand-testo leading-tight">{station.name}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {station.address}
                  </p>
                </div>

                {/* Corpo Centrale */}
                <div className="mb-5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-brand-testo">{station.present}</span>
                    <span className="text-lg font-bold text-gray-400">/ {station.capacity}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1 mb-2">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Mezzi presenti / Capienza</span>
                    <span className="text-xs font-bold text-brand-testo bg-brand-sfondoelementi px-2 py-1 rounded-md">
                      {available} liberi
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${fillPercentage >= 100 ? 'bg-stato-inricarica' : 'bg-stato-attivo'}`}
                      style={{ width: `${Math.min(fillPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                    {getVehicleIcon(station.type)}
                    <span>{station.present} {station.type}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Componente Modale per Nuova Stazione */}
      <NewStationModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onStationAdded={(newStation) => {
          // Inietta direttamente il record nello stato senza ricaricare la pagina
          const mapped = {
            id: newStation.id,
            name: newStation.name,
            address: newStation.position || 'N/A',
            type: newStation.vehicle_type?.name || 'N/A',
            capacity: newStation.capacity || 0,
            present: newStation.vehicles_count || 0,
            status: newStation.status?.name || 'Disponibile'
          };
          setStations(prev => [...prev, mapped]);
        }}
      />
    </div>
  );
};

export default GestioneStazioni;