export default function Agenda() {
  const ore = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Agenda</h3>
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px' }}>Ora Eventi in programma oggi</div>
      
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        {/* Linea orario corrente (10:00) */}
        <div style={{
          position: 'absolute', top: '23%', left: '0', right: '0',
          borderTop: '2px solid var(--blue-primary)', zIndex: 5, display: 'flex', alignItems: 'center'
        }}>
          <span style={{ backgroundColor: 'var(--blue-primary)', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '10px', marginLeft: '40px', transform: 'translateY(-50%)' }}>10:00</span>
        </div>

        {/* Slot Orari */}
        {ore.map((ora) => (
          <div key={ora} style={{ display: 'flex', alignItems: 'center', height: '40px', borderBottom: '1px solid #f3f4f6', fontSize: '13px' }}>
            <span style={{ width: '45px', color: 'var(--text-muted)' }}>{ora}</span>
          </div>
        ))}

        {/* Card Evento 1: Call Tecnici (Posizionata in Absolute sopra le ore 8-9) */}
        <div style={{
          position: 'absolute', top: '2px', left: '55px', right: '5px', height: '55px',
          backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '6px 10px', fontSize: '12px'
        }}>
          <div style={{ color: 'var(--blue-primary)', fontWeight: 'bold' }}>Call tecnici</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '10px' }}>Ore 08:00</div>
        </div>

        {/* Card Evento 2: Manutenzione (Posizionata sopra le ore 11-12) */}
        <div style={{
          position: 'absolute', top: '135px', left: '55px', right: '5px', height: '55px',
          backgroundColor: '#fef3c7', border: '1px solid #fde68a', borderRadius: '8px', padding: '6px 10px', fontSize: '12px'
        }}>
          <div style={{ color: '#b45309', fontWeight: 'bold' }}>Manutenzione bicicletta 002AS</div>
          <div style={{ color: '#b45309', fontSize: '10px' }}>Ore 11:00</div>
        </div>

      </div>
    </div>
  );
}