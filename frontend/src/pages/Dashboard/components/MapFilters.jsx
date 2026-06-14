import SearchInput from '../../../components/ui/SearchInput';

/**
 * ============================================================
 * COMPONENTE: MapFilters (Overlay di Controllo Mappa)
 * ============================================================
 * Fornisce un'interfaccia di filtraggio posizionata direttamente
 * sopra la mappa. Permette agli utenti di cercare asset specifici
 * o filtrare la visualizzazione per tipo di veicolo e stato.
 * 
 * Questo componente è "stateless": riceve i valori e le funzioni
 * di aggiornamento (setters) dal componente padre (MapView).
 * ============================================================
 */
export default function MapFilters({ 
  searchQuery, 
  setSearchQuery, 
  typeFilter, 
  setTypeFilter, 
  statusFilter, 
  setStatusFilter, 
  vehicleTypes = [], 
  statuses = [] 
}) {
  return (
    <div className="absolute top-5 left-5 z-10 flex gap-3 items-center">
      
      {/* RICERCA TESTUALE:
          Filtra i marker per ID, Targa o Nome Stazione. */}
      <SearchInput 
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Cerca ID, Targa, Stazione" 
        className="w-56"
      />

      {/* FILTRO TIPO VEICOLO:
          Permette di isolare sulla mappa solo un certo tipo di mezzo (es. solo Bici). */}
      <select 
        value={typeFilter}
        onChange={e => setTypeFilter(e.target.value)}
        className="px-4 py-2 bg-brand-sfondo rounded-xl shadow-md border border-gray-100 text-sm font-semibold text-brand-testo outline-none cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <option value="Ecosistema">Ecosistema</option>
        {vehicleTypes.map(type => (
          <option key={type.id} value={type.name}>{type.name}</option>
        ))}
      </select>

      {/* FILTRO STATO:
          Permette di visualizzare solo i veicoli in un determinato stato (es. solo Guasti). */}
      <select 
        value={statusFilter}
        onChange={e => setStatusFilter(e.target.value)}
        className="px-4 py-2 bg-brand-sfondo rounded-xl shadow-md border border-gray-100 text-sm font-semibold text-brand-testo outline-none cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <option value="Stato">Stato</option>
        {statuses.map(status => (
          <option key={status.id} value={status.name}>{status.name}</option>
        ))}
      </select>
      
    </div>
  );
}

