export default function Navbar({ activeTab, setActiveTab }) {
  const menuItems = ['Dashboard', 'Supporto tecnico', 'Gestione veicoli', 'Gestione stazioni'];

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '12px 20px', borderRadius: '12px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item)}
            style={{
              padding: '10px 20px',
              borderRadius: '20px',
              border: '1px solid #e5e7eb',
              backgroundColor: activeTab === item ? '#111' : '#fff',
              color: activeTab === item ? '#fff' : '#111',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <select style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e5e7eb', fontWeight: '500' }}>
          <option>Settimana</option>
          <option>Giorno</option>
          <option>Mese</option>
        </select>
        <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#e5e7eb', overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #701a75, #2563eb)' }}></div>
        </div>
      </div>
    </header>
  );
}