/**
 * ============================================================
 * COMPONENTE: Agenda (Widget Laterale)
 * ============================================================
 * Visualizza una "timeline" giornaliera degli interventi tecnici.
 * Simula il layout di un calendario, permettendo di vedere a colpo
 * d'occhio quali asset sono sotto manutenzione e in quale orario.
 * 
 * Props:
 * - interventions: array di interventi recuperati dal backend
 * ============================================================
 */
export default function Agenda({ interventions }) {
  // Scala oraria visualizzata nell'agenda
  const ore = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  // LOGICA DI FILTRO:
  // In questa fase mostriamo solo i primi due interventi per evitare
  // di sovraffollare la UI, simulando una pianificazione giornaliera.
  // In futuro, questa logica potrebbe basarsi sull'orario reale 'created_at'.
  const plannedInterventions = (interventions || []).slice(0, 2);

  return (
    <div className="card flex flex-col relative h-full">
      {/* Testata del widget */}
      <h3 className="text-brand-testo text-base font-bold mb-5">Agenda</h3>
      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
        Eventi in programma oggi
      </div>
      
      {/* Area della Timeline: deve essere flex-1 per occupare tutto lo spazio disponibile nella card */}
      <div className="relative flex-1 flex flex-col justify-between">
        
        {/* LINEA ORARIO CORRENTE:
            Un indicatore visivo che mostra "dove siamo" nella giornata.
            Utilizza un posizionamento assoluto per sovrapporsi agli slot orari. */}
        <div className="absolute top-[30%] left-0 right-0 border-t-2 border-stato-disponibile z-10 flex items-center">
          <span className="bg-stato-disponibile text-brand-testo text-[10px] font-bold px-2 py-0.5 rounded-full ml-11 -translate-y-1/2 shadow-sm">
            11:30
          </span>
        </div>

        {/* SLOT ORARI:
            Vengono renderizzati come righe di base su cui "poggiano" le card degli interventi. */}
        {ore.map((ora) => (
          <div key={ora} className="flex items-center h-10 border-b border-gray-50 text-xs">
            <span className="w-12 text-gray-400 font-medium">{ora}</span>
          </div>
        ))}

        {/* CARD INTERVENTI REALI:
            Questi elementi vengono posizionati in 'absolute' sopra la timeline.
            Il calcolo dell'altezza e della posizione (top) simula l'allocazione temporale. */}
        {plannedInterventions.map((int, index) => (
          <div 
            key={int.id}
            className="absolute left-14 right-1 rounded-xl p-2.5 flex flex-col justify-center border"
            style={{ 
              // Posizionamento fittizio basato sull'indice per questa demo
              top: `${index * 80 + 10}px`, 
              height: '60px',
              // Colori dinamici per distinguere visivamente i blocchi consecutivi
              backgroundColor: index % 2 === 0 ? 'rgba(118, 232, 255, 0.1)' : 'rgba(255, 189, 83, 0.1)',
              borderColor: index % 2 === 0 ? 'rgba(118, 232, 255, 0.2)' : 'rgba(255, 189, 83, 0.2)'
            }}
          >
            {/* Titolo Intervento */}
            <div className={`font-bold text-xs ${index % 2 === 0 ? 'text-brand-testo' : 'text-stato-inricarica'}`}>
              {int.category?.name || 'Intervento'}
            </div>
            {/* Info sull'Asset (Targa Veicolo) */}
            <div className="text-gray-500 text-[10px] font-bold mt-0.5">
              Asset: {int.issue?.booking?.vehicle?.license_plate || 'n.d.'}
            </div>
          </div>
        ))}

        {/* FALLBACK: Mostrato se non ci sono interventi caricati */}
        {plannedInterventions.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs italic">
            Nessun evento oggi
          </div>
        )}

      </div>
    </div>
  );
}