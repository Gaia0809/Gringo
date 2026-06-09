import { useState } from 'react';
import LeftColumn from './components/LeftColumn';
import MapView from './components/MapView';
import Agenda from './components/Agenda';
import MappaEspansa from './components/MappaEspansa';
import { useInterventions } from '../../hooks/useInterventions';
import { useResource } from '../../hooks/useResource';

export default function Dashboard() {
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const { data: vehicles, loading: vehiclesLoading } = useResource('/vehicles');
  const { data: stations, loading: stationsLoading } = useResource('/stations');
  const { interventions, loading: interventionsLoading } = useInterventions();
  const { data: issues, loading: issuesLoading } = useResource('/issues');
  const { data: statuses } = useResource('/statuses');
  const { data: vehicleTypes } = useResource('/vehicle-types');
  
  const loading = vehiclesLoading || stationsLoading || interventionsLoading || issuesLoading;

  if (isMapExpanded) {
    return <MappaEspansa onClose={() => setIsMapExpanded(false)} stations={stations} vehicles={vehicles} issues={issues} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_300px] gap-6 flex-1 min-h-0">
      <LeftColumn stations={stations} issues={issues} vehicles={vehicles} />
      <MapView onExpand={() => setIsMapExpanded(true)} stations={stations} vehicles={vehicles} statuses={statuses} vehicleTypes={vehicleTypes} />
      <Agenda interventions={interventions} />
    </div>
  );
}