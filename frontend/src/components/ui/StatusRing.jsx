import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

/**
 * Molecola: StatusRing.
 * Visualizza un grafico a ciambella multi-segmento per la distribuzione degli stati.
 * Utilizzato principalmente nelle dashboard e pagine di gestione.
 * 
 * @param {Object} props
 * @param {Object} props.data - Oggetto con i conteggi per ogni stato { disponibile, attivo, ... }
 * @param {string} props.label - Etichetta centrale (es. "Automobili")
 */
export default function StatusRing({ data = {}, label }) {
  const total = data.total || 0;
  
  const chartData = [
    { name: 'Disponibili', value: data.disponibile, color: 'var(--color-stato-disponibile)' },
    { name: 'Attivi', value: data.attivo, color: 'var(--color-stato-attivo)' },
    { name: 'In ricarica', value: data.inricarica, color: 'var(--color-stato-inricarica)' },
    { name: 'Manutenzione', value: data.manutenzione, color: 'var(--color-stato-manutenzione)' },
    { name: 'Offline', value: data.offline, color: 'var(--color-stato-offline)' },
    { name: 'Guasto', value: data.guasto, color: 'var(--color-stato-guasto)' },
    { name: 'Rubato', value: data.rubato, color: 'var(--color-stato-rubato)' },
  ].filter(s => s.value > 0);

  return (
    <div className="flex flex-col items-center relative group">
      <div className="w-32 h-32 transition-transform duration-300 group-hover:scale-105">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={40}
              outerRadius={50}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <span className="text-xl font-black block text-brand-testo">{total}</span>
        <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">{label}</span>
      </div>
    </div>
  );
}
