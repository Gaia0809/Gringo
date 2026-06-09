export default function Agenda({ interventions }) {
  const ore = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  // Mostriamo solo gli interventi che hanno una data/ora valida o i primi della lista come esempio
  const plannedInterventions = (interventions || []).slice(0, 2);

  return (
    <div className="card flex flex-col relative h-full">
      <h3 className="text-brand-testo text-base font-bold mb-5">Agenda</h3>
      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Eventi in programma oggi</div>
      
      <div className="relative flex-1 flex flex-col justify-between">
        
        {/* Linea orario corrente (approssimativa) */}
        <div className="absolute top-[30%] left-0 right-0 border-t-2 border-stato-disponibile z-10 flex items-center">
          <span className="bg-stato-disponibile text-brand-testo text-[10px] font-bold px-2 py-0.5 rounded-full ml-11 -translate-y-1/2 shadow-sm">11:30</span>
        </div>

        {/* Slot Orari */}
        {ore.map((ora) => (
          <div key={ora} className="flex items-center h-10 border-b border-gray-50 text-xs">
            <span className="w-12 text-gray-400 font-medium">{ora}</span>
          </div>
        ))}

        {/* Card Interventi Reali (Posizionamento fittizio per demo) */}
        {plannedInterventions.map((int, index) => (
          <div 
            key={int.id}
            className="absolute left-14 right-1 rounded-xl p-2.5 flex flex-col justify-center border"
            style={{ 
              top: `${index * 80 + 10}px`, 
              height: '60px',
              backgroundColor: index % 2 === 0 ? 'rgba(118, 232, 255, 0.1)' : 'rgba(255, 189, 83, 0.1)',
              borderColor: index % 2 === 0 ? 'rgba(118, 232, 255, 0.2)' : 'rgba(255, 189, 83, 0.2)'
            }}
          >
            <div className={`font-bold text-xs ${index % 2 === 0 ? 'text-brand-testo' : 'text-stato-inricarica'}`}>
              {int.category?.name || 'Intervento'}
            </div>
            <div className="text-gray-500 text-[10px] font-bold mt-0.5">
              Asset: {int.issue?.booking?.vehicle?.license_plate || 'n.d.'}
            </div>
          </div>
        ))}

        {plannedInterventions.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs italic">
            Nessun evento oggi
          </div>
        )}

      </div>
    </div>
  );
}