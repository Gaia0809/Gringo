import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

export default function StationsCard({ stations }) {
  const totalCapacity = stations.reduce((acc, s) => acc + (s.capacity || 0), 0);
  const totalVehicles = stations.reduce((acc, s) => acc + (s.vehicles_count || 0), 0);
  const currentOccupancy = totalCapacity > 0 ? Math.round((totalVehicles / totalCapacity) * 100) : 0;

  // Per dimostrazione, creiamo dati dinamici basati sulla capacità totale
  const data = [
    { name: '1', occ: currentOccupancy - 10 },
    { name: '2', occ: currentOccupancy - 5 },
    { name: '3', occ: currentOccupancy },
    { name: '4', occ: currentOccupancy + 5 },
    { name: '5', occ: currentOccupancy - 2 },
  ];

  const minPeak = Math.max(0, currentOccupancy - 15);

  return (
    <div className="card">
      <h3 className="text-brand-testo text-base font-bold mb-3">Disponibilità stazioni</h3>
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

      {/* Grafico Area Recharts */}
      <div className="w-full h-20 mb-3 border-b border-gray-100">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
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

      <div className="flex gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-stato-attivo"></span> Occupate</div>
      </div>
    </div>
  );
}