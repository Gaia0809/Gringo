import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

/**
 * ============================================================
 * COMPONENTE: Co2Chart (Widget Ambientale)
 * ============================================================
 * Calcola e visualizza l'impatto ecologico positivo della flotta.
 * Utilizza un grafico a "ciambella" (Donut Chart) per mostrare la
 * distribuzione dei tipi di veicoli attivi e stima il risparmio
 * di CO2 complessivo.
 * 
 * Props:
 * - vehicles: array di veicoli per il calcolo statistico
 * ============================================================
 */
export default function Co2Chart({ vehicles }) {
  
  // ============================================================
  // LOGICA DI AGGREGAZIONE (Dati derivati)
  // ============================================================
  
  // Raggruppiamo i veicoli per tipo per alimentare il grafico
  const counts = (vehicles || []).reduce((acc, v) => {
    const type = v.vehicle_model?.vehicle_type?.name;
    if (type) acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  // Mappatura dei dati per Recharts, associando ogni tipo al suo colore CSS custom
  const data = [
    { name: 'Auto', value: counts['Macchina Elettrica'] || 0, color: 'var(--color-mezzo-auto)' },
    { name: 'Moto', value: counts['Moto Elettrica'] || 0, color: 'var(--color-mezzo-moto)' },
    { name: 'Bici', value: counts['Bicicletta Elettrica'] || 0, color: 'var(--color-mezzo-bici)' },
  ].filter(item => item.value > 0);

  // CALCOLO CO2:
  // Formula semplificata: stimiamo un risparmio medio di 0.82kg 
  // di CO2 per ogni veicolo elettrico operativo al giorno.
  const co2Saved = (vehicles.length * 0.82).toFixed(1);


  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="card flex flex-col items-center">
      <h3 className="self-start text-brand-testo text-base font-bold mb-4">Co2 Risparmiata</h3>

      {/* Area del Grafico: Donut Chart con testo centrale */}
      <div className="relative w-36 h-36">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={30} // Raggio interno per creare l'effetto "buco" (ciambella)
              outerRadius={40}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {/* Applicazione dinamica dei colori ai segmenti */}
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Testo centrale: Valore aggregato di CO2 risparmiata */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <div className="text-xl font-bold text-brand-testo">{co2Saved}</div>
          <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Kg Stimati</div>
        </div>
      </div>

      {/* Legenda dinamica basata sui dati effettivamente presenti */}
      <div className="flex gap-4 mt-4 text-[11px] font-semibold text-gray-600">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <span 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}