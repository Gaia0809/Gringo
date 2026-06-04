import { useState } from 'react';
import LeftColumn from '../components/LeftColumn/LeftColumn';
import MapView from '../components/MapView/MapView';
import Agenda from '../components/Agenda/Agenda';
import MappaEspansa from '../components/MapView/MappaEspansa';

export default function Dashboard() {
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  if (isMapExpanded) {
    return <MappaEspansa onClose={() => setIsMapExpanded(false)} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_300px] gap-6 flex-1 min-h-0">
      <LeftColumn />
      <MapView onExpand={() => setIsMapExpanded(true)} />
      <Agenda />
    </div>
  );
}