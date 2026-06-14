import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

/**
 * ============================================================
 * COMPONENTE: StationsCard (Widget Statistico)
 * ============================================================
 * Analizza e visualizza il livello di occupazione globale delle
 * stazioni. Utilizza un grafico ad area per mostrare il trend
 * di disponibilità dei parcheggi/slot di ricarica.
 * 
 * Props:
 * - stations: array di stazioni con capacità e veicoli presenti
 * ============================================================
 */
export default function StationsCard({ stations }) {
  
  // ============================================================
  // LOGICA DI CALCOLO (Dati derivati)
  // ============================================================
  
  // Calcolo della capacità totale del sistema e del numero di veicoli attualmente parcheggiati
  const totalCapacity = stations.reduce((acc, s) => acc + (s.capacity || 0), 0);
  const totalVehicles = stations.reduce((acc, s) => acc + (s.vehicles_count || 0), 0);
  
  // Percentuale di occupazione globale attuale
  const currentOccupancy = totalCapacity > 0 ? Math.round((totalVehicles / totalCapacity) * 100) : 0;

  // DATI PER IL GRAFICO:
  // Simuliamo un trend temporale basato sull'occupazione attuale per rendere 
  // il widget visivamente "vivo" e mostrare l'andamento recente.
  const data = [
    { name: '1', occ: currentOccupancy - 10 },
    { name: '2', occ: currentOccupancy - 5 },
    { name: '3', occ: currentOccupancy },
    { name: '4', occ: currentOccupancy + 5 },
    { name: '5', occ: currentOccupancy - 2 },
  ];

  // Valore di picco minimo registrato (simulato)
  const minPeak = Math.max(0, currentOccupancy - 15);


  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="card">
      <h3 className="text-brand-testo text-base font-bold mb-3">Disponibilità stazioni</h3>
      
      {/* Indicatori numerici principali */}
      <div className="flex gap-5 mb-4">
        <div>
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Occupazione attuale</div>
          <div className="text-xl font-bold text-stato-attivo">{currentOccupancy}%</div>
        </div>
        <div>
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Picco minimo</div>
          <div className="text-xl font-bold text-stato-inricarica">{minPeak}%</div>
        </div>
      </div>

      {/* GRAFICO AREA (RECHARTS):
          Visualizza l'andamento dell'occupazione in modo fluido.
          ResponsiveContainer assicura che il grafico si adatti alla larghezza della card. */}
      <div className="w-full h-20 mb-3 border-b border-gray-100">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            {/* YAxis nascosto ma configurato su un range 0-100 per mantenere la proporzione corretta */}
            <YAxis hide domain={[0, 100]} />
            <Area 
              type="monotone" 
              dataKey="occ" 
              stroke="var(--color-stato-attivo)" 
              fill="var(--color-stato-attivo)" 
              fillOpacity={0.2} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legenda rapida */}
      <div className="flex gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-stato-attivo"></span> 
          Occupate
        </div>
      </div>
    </div>
  );
}