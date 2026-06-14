import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

/**
 * ============================================================
 * MOLECOLA: StatusRing (Grafico a Ciambella)
 * ============================================================
 * Visualizza la distribuzione degli stati per una categoria di 
 * veicoli attraverso un grafico circolare (Donut Chart).
 * Utilizza la libreria Recharts per un rendering fluido e reattivo.
 * 
 * @param {Object} props
 * @param {Object} props.data - Mappa degli stati { disponibile: N, attivo: M... }
 * @param {string} props.label - Etichetta centrale (es. "Biciclette")
 * ============================================================
 */
export default function StatusRing({ data = {}, label }) {
  
  // Recupero del totale aggregato passato dall'hook raggruppatore
  const total = data.total || 0;
  
  /**
   * PREPARAZIONE DATI PER RECHARTS:
   * Trasformiamo l'oggetto 'data' in un array di oggetti compatibili
   * con il componente Pie. Colleghiamo ogni stato alla relativa
   * variabile CSS definita nel brand system.
   */
  const chartData = [
    { name: 'Disponibili', value: data.disponibile, color: 'var(--color-stato-disponibile)' },
    { name: 'Attivi', value: data.attivo, color: 'var(--color-stato-attivo)' },
    { name: 'In ricarica', value: data.inricarica, color: 'var(--color-stato-inricarica)' },
    { name: 'Manutenzione', value: data.manutenzione, color: 'var(--color-stato-manutenzione)' },
    { name: 'Offline', value: data.offline, color: 'var(--color-stato-offline)' },
    { name: 'Guasto', value: data.guasto, color: 'var(--color-stato-guasto)' },
    { name: 'Rubato', value: data.rubato, color: 'var(--color-stato-rubato)' },
  ].filter(s => s.value > 0); // MOSTRA SOLO GLI STATI CON ALMENO UN MEZZO

  return (
    <div className="flex flex-col items-center relative group">
      
      {/* CONTENITORE GRAFICO:
          ResponsiveContainer assicura che il grafico riempia lo spazio.
          InnerRadius > 0 crea l'effetto "buco" centrale. */}
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
              {/* Iterazione per colorare ogni fetta del grafico */}
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* TESTO CENTRALE:
          Posizionato in absolute per stare esattamente nel "buco" della ciambella.
          Pointer-events-none assicura che non interferisca con gli hover del grafico. */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <span className="text-xl font-black block text-brand-testo leading-none">
          {total}
        </span>
        <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
          {label}
        </span>
      </div>
      
    </div>
  );
}
