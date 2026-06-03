import LeftColumn from '../../components/LeftColumn/LeftColumn';
import MapView from '../../components/MapView/MapView';
import Agenda from '../../components/Agenda/Agenda';

export default function Dashboard({ setIsMapExpanded }) {
  return (
    <div className="dashboard-content" style={{ display: 'flex', gap: '20px', height: '100%', alignItems: 'stretch' }}>
      <LeftColumn />
      <MapView onExpand={() => setIsMapExpanded(true)} />
      <Agenda />
    </div>
  );
}