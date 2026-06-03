import { useState } from 'react';
import LeftColumn from '../components/LeftColumn/LeftColumn';
import MapView from '../components/MapView/MapView';
import Agenda from '../components/Agenda/Agenda';
import MappaEspansa from '../components/MapView/MappaEspansa';

export default function Dashboard() {
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  // Se l'utente clicca su "Espandi Mappa", mostriamo l'overlay a schermo intero
  if (isMapExpanded) {
    return <MappaEspansa onClose={() => setIsMapExpanded(false)} />;
  }

  return (
    <div className="dashboard-content" style={{ display: 'flex', gap: '20px', height: '100%', alignItems: 'stretch' }}>
      <LeftColumn />
      <MapView onExpand={() => setIsMapExpanded(true)} />
      <Agenda />
    </div>
  );
}