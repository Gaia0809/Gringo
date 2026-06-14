import TicketCard from './TicketCard';
import Co2Chart from './Co2Chart';
import StationsCard from './StationsCard';

/**
 * ============================================================
 * COMPONENTE: LeftColumn (Sidebar Sinistra)
 * ============================================================
 * Agisce come contenitore verticale per i widget informativi e
 * statistici della Dashboard. Organizza lo spazio per mostrare
 * riepiloghi rapidi su ticket, impatto ambientale e stato stazioni.
 * 
 * Props:
 * - stations: array di stazioni per il widget StationsCard
 * - issues: array di segnalazioni per il widget TicketCard
 * - vehicles: array di veicoli per il widget Co2Chart
 * ============================================================
 */
export default function LeftColumn({ stations, issues, vehicles }) {
  return (
    <div className="flex flex-col gap-5 overflow-y-auto pr-2 custom-scrollbar">
      
      {/* Riepilogo Segnalazioni: mostra i ticket aperti e la loro priorità */}
      <TicketCard issues={issues} />
      
      {/* Impatto Ambientale: visualizza il risparmio di CO2 calcolato sui veicoli attivi */}
      <Co2Chart vehicles={vehicles} />
      
      {/* Panoramica Stazioni: lista rapida delle stazioni con indicatori di stato */}
      <StationsCard stations={stations} />
      
    </div>
  );
}