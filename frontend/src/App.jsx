import { useState } from 'react';
import Navbar from './components/Navbar';
import LeftColumn from './components/LeftColumn/LeftColumn';
import MapView from './components/MapView/MapView';
import Agenda from './components/Agenda/Agenda';
import MappaEspansa from './components/MapView/MappaEspansa';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  // Se la mappa è espansa, renderizziamo solo il componente a schermo intero
  if (isMapExpanded) {
    return <MappaEspansa onClose={() => setIsMapExpanded(false)} />;
  }

  return (
    <div className="dashboard-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="dashboard-content">
        <LeftColumn />
        <MapView onExpand={() => setIsMapExpanded(true)} />
        <Agenda />
      </div>
    </div>
  );
}