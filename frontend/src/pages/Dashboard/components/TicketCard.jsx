/**
 * ============================================================
 * COMPONENTE: TicketCard (Widget Riepilogativo)
 * ============================================================
 * Visualizza l'ultima segnalazione (Issue) aperta nel sistema.
 * Serve a dare visibilità immediata ai problemi tecnici urgenti
 * direttamente nella sidebar della Dashboard.
 * 
 * Props:
 * - issues: array di segnalazioni recuperate dal backend
 * ============================================================
 */
export default function TicketCard({ issues }) {
  
  // ============================================================
  // LOGICA DI SELEZIONE
  // ============================================================
  // Estraiamo l'ultimo ticket inserito (assumendo che l'array sia 
  // ordinato cronologicamente dal backend).
  const latestIssue = issues && issues.length > 0 ? issues[issues.length - 1] : null;

  // Render alternativo se non ci sono segnalazioni attive
  if (!latestIssue) {
    return (
      <div className="card border-l-4 border-l-gray-300 flex flex-col gap-1">
        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
          Nessun Intervento Aperto
        </span>
      </div>
    );
  }

  // Risoluzione dell'asset associato per mostrare informazioni contestuali
  const vehicle = latestIssue.booking?.vehicle;


  // ============================================================
  // RENDER
  // ============================================================
  return (
    // La card ha un bordo laterale colorato per indicare visivamente lo stato 'in corso'
    <div className="card border-l-4 border-l-stato-inricarica flex flex-col gap-1 shadow-sm hover:shadow-md transition-shadow">
      
      {/* Categoria del widget */}
      <span className="text-stato-inricarica text-[10px] font-bold uppercase tracking-widest">
        Interventi Aperti
      </span>
      
      {/* ID Unico della segnalazione */}
      <div className="flex justify-between items-center mt-1">
        <h3 className="text-brand-testo text-base font-bold">
          ID_Ticket: #{latestIssue.id}
        </h3>
      </div>
      
      {/* Descrizione breve del problema */}
      <p className="text-brand-testo text-sm font-semibold truncate">
        {latestIssue.title}
      </p>
      
      {/* Dettagli dell'asset coinvolto */}
      <div className="flex items-center gap-2 mt-1">
        <span className="text-gray-400 text-[11px] font-medium">
          Asset: {vehicle ? `${vehicle.license_plate || `ID:${vehicle.id}`}` : 'Nessun veicolo'}
          {vehicle && ` (ID_V:${vehicle.id})`}
        </span>
      </div>
      
    </div>
  );
}