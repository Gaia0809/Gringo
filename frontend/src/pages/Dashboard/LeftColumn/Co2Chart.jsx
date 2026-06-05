export default function Co2Chart({ vehicles }) {
  const radius = 40;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  // Raggruppiamo i veicoli per tipo
  const counts = vehicles.reduce((acc, v) => {
    const type = v.vehicle_model?.vehicle_type?.name;
    if (type) acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const total = vehicles.length || 1;
  const macchinePerc = ((counts['Macchina Elettrica'] || 0) / total) * 100;
  const monopattiniPerc = ((counts['Monopattino Elettrico'] || 0) / total) * 100;
  const biciPerc = ((counts['Bicicletta Elettrica'] || 0) / total) * 100;

  const macchineOffset = circumference - (circumference * macchinePerc) / 100;
  const monoOffset = circumference - (circumference * monopattiniPerc) / 100;
  const biciOffset = circumference - (circumference * biciPerc) / 100;

  // Calcolo fittizio CO2: 0.5kg per veicolo elettrico al giorno (esempio)
  const co2Saved = (vehicles.length * 0.82).toFixed(1);

  return (
    <div className="card flex flex-col items-center">
      <h3 className="self-start text-brand-testo text-base font-bold mb-4">Co2 Risparmiata</h3>
      
      <div className="relative w-36 h-36">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="transform -rotate-90">
          {/* Segmento Auto */}
          <circle
            cx="50" cy="50" r={radius}
            fill="transparent"
            stroke="var(--color-mezzo-auto)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={macchineOffset}
            strokeLinecap="round"
          />
          {/* Segmento Monopattini */}
          <circle
            cx="50" cy="50" r={radius}
            fill="transparent"
            stroke="var(--color-mezzo-moto)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={monoOffset}
            strokeLinecap="round"
            style={{ transform: `rotate(${(macchinePerc * 3.6)}deg)`, transformOrigin: '50px 50px' }}
          />
          {/* Segmento Bici */}
          <circle
            cx="50" cy="50" r={radius}
            fill="transparent"
            stroke="var(--color-mezzo-bici)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={biciOffset}
            strokeLinecap="round"
            style={{ transform: `rotate(${((macchinePerc + monopattiniPerc) * 3.6)}deg)`, transformOrigin: '50px 50px' }}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-2xl font-bold text-brand-testo">{co2Saved}</div>
          <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Kg Stimati</div>
        </div>
      </div>

      <div className="flex gap-4 mt-4 text-[11px] font-semibold text-gray-600">
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-mezzo-auto"></span> Auto</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-mezzo-moto"></span> Mono</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-mezzo-bici"></span> Bici</div>
      </div>
    </div>
  );
}