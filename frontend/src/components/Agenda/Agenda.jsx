export default function Agenda() {
  const ore = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  return (
    <div className="card flex flex-col relative h-full">
      <h3 className="text-brand-testo text-base font-bold mb-5">Agenda</h3>
      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Eventi in programma oggi</div>
      
      <div className="relative flex-1 flex flex-col justify-between">
        
        {/* Linea orario corrente (10:00) */}
        <div className="absolute top-[23%] left-0 right-0 border-t-2 border-accent-blue z-10 flex items-center">
          <span className="bg-accent-blue text-white text-[10px] font-bold px-2 py-0.5 rounded-full ml-11 -translate-y-1/2 shadow-sm">10:00</span>
        </div>

        {/* Slot Orari */}
        {ore.map((ora) => (
          <div key={ora} className="flex items-center h-10 border-b border-gray-50 text-xs">
            <span className="w-12 text-gray-400 font-medium">{ora}</span>
          </div>
        ))}

        {/* Card Evento 1: Call Tecnici */}
        <div className="absolute top-0.5 left-14 right-1 h-14 bg-accent-blue/10 border border-accent-blue/20 rounded-xl p-2.5 flex flex-col justify-center">
          <div className="text-accent-blue font-bold text-xs">Call tecnici</div>
          <div className="text-accent-blue/60 text-[10px] font-bold mt-0.5">Ore 08:00</div>
        </div>

        {/* Card Evento 2: Manutenzione */}
        <div className="absolute top-[135px] left-14 right-1 h-14 bg-stato-inricarica/10 border border-stato-inricarica/20 rounded-xl p-2.5 flex flex-col justify-center">
          <div className="text-stato-inricarica font-bold text-xs">Manutenzione bicicletta 002AS</div>
          <div className="text-stato-inricarica/60 text-[10px] font-bold mt-0.5">Ore 11:00</div>
        </div>

      </div>
    </div>
  );
}