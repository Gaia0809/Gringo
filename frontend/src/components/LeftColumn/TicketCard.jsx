export default function TicketCard() {
  return (
    <div className="card" style={{ borderLeft: '4px solid dashed' }}>
      <span style={{ color: 'orange', fontSize: '12px', fontWeight: 'bold' }}>INTERVENTI APERTI</span>
      <h3 style={{ margin: '5px 0 2px 0', fontSize: '16px' }}>ID_Ticket: #901</h3>
      <p style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>Guasto Freno Anteriore</p>
      <span style={{ fontSize: '12px', color: '#666' }}>Asset: BICI-14 (ID_V:102)</span>
    </div>
  );
}