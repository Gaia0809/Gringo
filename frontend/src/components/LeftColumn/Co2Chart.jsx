export default function Co2Chart() {
  const radius = 40;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const autoDashoffset = circumference - (circumference * 60) / 100;
  const monoDashoffset = circumference - (circumference * 25) / 100;
  const biciDashoffset = circumference - (circumference * 15) / 100;

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
            strokeDashoffset={autoDashoffset}
            strokeLinecap="round"
          />
          {/* Segmento Monopattini */}
          <circle
            cx="50" cy="50" r={radius}
            fill="transparent"
            stroke="var(--color-mezzo-moto)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={monoDashoffset}
            strokeLinecap="round"
            style={{ transform: 'rotate(216deg)', transformOrigin: '50px 50px' }}
          />
          {/* Segmento Bici */}
          <circle
            cx="50" cy="50" r={radius}
            fill="transparent"
            stroke="var(--color-mezzo-bici)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={biciDashoffset}
            strokeLinecap="round"
            style={{ transform: 'rotate(306deg)', transformOrigin: '50px 50px' }}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-2xl font-bold text-brand-testo">12.4k</div>
          <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Kg Totali</div>
        </div>
      </div>

      <div className="flex gap-4 mt-4 text-[11px] font-semibold text-gray-600">
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-mezzo-auto"></span> Auto</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-mezzo-moto"></span> Moto</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-mezzo-bici"></span> Bici</div>
      </div>
    </div>
  );
}