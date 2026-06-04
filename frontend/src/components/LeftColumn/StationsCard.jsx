export default function StationsCard() {
  return (
    <div className="card">
      <h3 className="text-brand-testo text-base font-bold mb-3">Disponibilità stazioni</h3>
      <div className="flex gap-5 mb-4">
        <div>
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Media attuale</div>
          <div className="text-xl font-bold text-stato-attivo">41%</div>
        </div>
        <div>
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Picco minimo</div>
          <div className="text-xl font-bold text-stato-inricarica">38%</div>
        </div>
      </div>

      {/* Grafico a Linee SVG */}
      <div className="w-full h-20 mb-3 border-b border-gray-100">
        <svg viewBox="0 0 200 80" className="w-full h-full">
          {/* Linea Libere (Verde) */}
          <path
            d="M 0 45 Q 50 60 100 50 T 200 35"
            fill="none"
            stroke="var(--color-stato-attivo)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Linea Occupate (Rossa) */}
          <path
            d="M 0 65 Q 50 50 100 55 T 200 70"
            fill="none"
            stroke="var(--color-stato-guasto)"
            strokeWidth="2.5"
            strokeDasharray="4 2"
            strokeLinecap="round"
          />
          {/* Punti di intersezione fittizi */}
          <circle cx="100" cy="50" r="3" fill="var(--color-stato-attivo)" className="shadow-sm" />
          <circle cx="100" cy="55" r="3" fill="var(--color-stato-guasto)" className="shadow-sm" />
        </svg>
      </div>
      <div className="flex gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-stato-attivo"></span> Libere</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-stato-guasto"></span> Occupate</div>
      </div>
    </div>
  );
}