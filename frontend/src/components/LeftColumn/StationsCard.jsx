export default function StationsCard() {
  return (
    <div className="card">
      <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Disponibilità stazioni</h3>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
        <div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Media attuale</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--green-main)' }}>41%</div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Picco minimo</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--orange-ticket)' }}>38%</div>
        </div>
      </div>

      {/* Grafico a Linee SVG */}
      <svg viewBox="0 0 200 80" style={{ width: '100%', height: 'auto', borderBottom: '1px solid #eee' }}>
        {/* Linea Libere (Verde) */}
        <path
          d="M 0 45 Q 50 60 100 50 T 200 35"
          fill="none"
          stroke="var(--green-main)"
          strokeWidth="2"
        />
        {/* Linea Occupate (Rossa) */}
        <path
          d="M 0 65 Q 50 50 100 55 T 200 70"
          fill="none"
          stroke="var(--red-alert)"
          strokeWidth="2"
          strokeDasharray="3"
        />
        {/* Punti di intersezione fittizi */}
        <circle cx="100" cy="50" r="3" fill="var(--green-main)" />
        <circle cx="100" cy="55" r="3" fill="var(--red-alert)" />
      </svg>
      <div style={{ display: 'flex', gap: '15px', marginTop: '10px', fontSize: '11px' }}>
        <div><span style={{ color: 'var(--green-main)' }}>●</span> Libere</div>
        <div><span style={{ color: 'var(--red-alert)' }}>●</span> Occupate</div>
      </div>
    </div>
  );
}