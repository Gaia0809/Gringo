import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function Co2Chart({ vehicles }) {
  // Raggruppiamo i veicoli per tipo
  const counts = vehicles.reduce((acc, v) => {
    const type = v.vehicle_model?.vehicle_type?.name;
    if (type) acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const data = [
    { name: 'Auto', value: counts['Macchina Elettrica'] || 0, color: 'var(--color-mezzo-auto)' },
    { name: 'Moto', value: counts['Moto Elettrica'] || 0, color: 'var(--color-mezzo-moto)' },
    { name: 'Bici', value: counts['Bicicletta Elettrica'] || 0, color: 'var(--color-mezzo-bici)' },
  ].filter(item => item.value > 0);

  // Calcolo CO2: 0.82kg per veicolo elettrico al giorno
  const co2Saved = (vehicles.length * 0.82).toFixed(1);

  return (
    <div className="card flex flex-col items-center">
      <h3 className="self-start text-brand-testo text-base font-bold mb-4">Co2 Risparmiata</h3>

      <div className="relative w-36 h-36">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={30}
              outerRadius={40}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-xl font-bold text-brand-testo">{co2Saved}</div>
          <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Kg Stimati</div>
        </div>
      </div>

      <div className="flex gap-4 mt-4 text-[11px] font-semibold text-gray-600">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}