import { useState } from 'react';
import LeftColumn from './components/LeftColumn';
import MapView from './components/MapView';
import Agenda from './components/Agenda';
import MappaEspansa from './components/MappaEspansa';
import { useInterventions } from '../../hooks/useInterventions';
import { useResource } from '../../hooks/useResource';

/**
 * ============================================================
 * COMPONENTE: Dashboard (Pagina Principale)
 * ============================================================
 * La Dashboard è il centro nevralgico dell'applicazione.
 * Si occupa di coordinare il caricamento di tutte le risorse 
 * principali (veicoli, stazioni, interventi, segnalazioni) e
 * di distribuirle ai componenti specializzati (Mappa, Agenda, ecc.).
 * ============================================================
 */
export default function Dashboard() {

  // ============================================================
  // USE STATE
  // ============================================================
  // Gestisce lo stato di espansione della mappa a tutto schermo.
  // Quando true, il componente renderizza un layout alternativo
  // (MappaEspansa) nascondendo le colonne laterali.
  const [isMapExpanded, setIsMapExpanded] = useState(false);


  // ============================================================
  // CUSTOM HOOKS (Caricamento Dati)
  // ============================================================
  // Utilizziamo 'useResource' per centralizzare il recupero delle
  // entità dal backend. Ogni chiamata restituisce 'data' e 'loading'.

  // Recupero Veicoli e Stazioni (core dell'ecosistema)
  const { data: vehicles, loading: vehiclesLoading } = useResource('/vehicles');
  const { data: stations, loading: stationsLoading } = useResource('/stations');
  
  // Recupero Interventi tecnici (utilizza un hook specializzato per logica complessa)
  const { interventions, loading: interventionsLoading } = useInterventions();
  
  // Recupero Segnalazioni/Ticket (Issues)
  const { data: issues, loading: issuesLoading } = useResource('/issues');
  
  // Tabelle di lookup (Stati e Tipi veicolo) per filtri e badge
  const { data: statuses } = useResource('/statuses');
  const { data: vehicleTypes } = useResource('/vehicle-types');
  

  // ============================================================
  // LOGICA DI RENDER
  // ============================================================

  // Calcolo aggregato dello stato di caricamento: la dashboard è
  // considerata "in caricamento" finché non arrivano tutti i dati core.
  const loading = vehiclesLoading || stationsLoading || interventionsLoading || issuesLoading;

  // CASO 1: Modalità Mappa Espansa
  // Se l'utente ha cliccato su "Espandi", mostriamo solo la mappa
  // passando i dati necessari per i marker e i filtri.
  if (isMapExpanded) {
    return (
      <MappaEspansa 
        onClose={() => setIsMapExpanded(false)} 
        stations={stations} 
        vehicles={vehicles} 
        issues={issues} 
      />
    );
  }

  // CASO 2: Layout Standard (Tre Colonne)
  // Layout responsive: 
  // - Colonna Sinistra (LeftColumn): Statistiche e stato stazioni
  // - Centro (MapView): La mappa interattiva (cuore della UI)
  // - Colonna Destra (Agenda): Elenco cronologico degli interventi
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_300px] gap-6 flex-1 min-h-0">
      
      {/* Colonna Sinistra: Report e panoramica stazioni */}
      <LeftColumn stations={stations} issues={issues} vehicles={vehicles} />
      
      {/* Centro: Visualizzazione geografica dell'ecosistema */}
      <MapView 
        onExpand={() => setIsMapExpanded(true)} 
        stations={stations} 
        vehicles={vehicles} 
        statuses={statuses} 
        vehicleTypes={vehicleTypes} 
      />
      
      {/* Colonna Destra: Attività tecniche pianificate/in corso */}
      <Agenda interventions={interventions} />
    </div>
  );
}