export default function Co2Chart() {
  const radius = 40;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;

  const autoDashoffset = circumference - (circumference * 60) / 100;
  const monoDashoffset = circumference - (circumference * 25) / 100;
  const biciDashoffset = circumference - (circumference * 15) / 100;

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3 style={{ alignSelf: 'flex-start', fontSize: '16px', marginBottom: '15px' }}>Co2 Risparmiata</h3>
      
      <div style={{ position: 'relative', width: '140px', height: '140px' }}>
        <svg width="140" height="140" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
          {/* Segmento Auto */}
          <circle
            cx="50" cy="50" r={radius}
            fill="transparent"
            stroke="#701a75"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={autoDashoffset}
          />
          {/* Segmento Monopattini */}
          <circle
            cx="50" cy="50" r={radius}
            fill="transparent"
            stroke="#b96ecf"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={monoDashoffset}
            style={{ transform: 'rotate(216deg)', transformOrigin: '50px 50px' }}
          />
          {/* Segmento Bici */}
          <circle
            cx="50" cy="50" r={radius}
            fill="transparent"
            stroke="#67e8f9"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={biciDashoffset}
            style={{ transform: 'rotate(306deg)', transformOrigin: '50px 50px' }}
          />
        </svg>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>12.4k</div>
          <div style={{ fontSize: '10px', color: '#666' }}>KG TOTALI</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '15px', fontSize: '12px' }}>
        <div><span style={{ color: '#701a75' }}>●</span> Auto</div>
        <div><span style={{ color: '#b96ecf' }}>●</span> Monopattini</div>
        <div><span style={{ color: '#67e8f9' }}>●</span> Bici</div>
      </div>
    </div>
  );
}