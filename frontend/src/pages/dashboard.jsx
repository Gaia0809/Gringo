import { useState, useEffect } from 'react';
import LeftColumn from '../components/LeftColumn/LeftColumn';
import MapView from '../components/MapView/MapView';
import Agenda from '../components/Agenda/Agenda';
import MappaEspansa from '../components/MapView/MappaEspansa';
import api from '../api';

export default function Dashboard() {
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [data, setData] = useState({
    stations: [],
    vehicles: [],
    issues: [],
    interventions: [],
    loading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stations, vehicles, issues, interventions] = await Promise.all([
          api.get('/stations'),
          api.get('/vehicles'),
          api.get('/issues'),
          api.get('/interventions')
        ]);

        setData({
          stations: stations.data,
          vehicles: vehicles.data,
          issues: issues.data,
          interventions: interventions.data,
          loading: false
        });
      } catch (error) {
        console.error("Errore nel recupero dei dati della dashboard:", error);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  if (isMapExpanded) {
    return <MappaEspansa onClose={() => setIsMapExpanded(false)} stations={data.stations} vehicles={data.vehicles} issues={data.issues} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_300px] gap-6 flex-1 min-h-0">
      <LeftColumn stations={data.stations} issues={data.issues} vehicles={data.vehicles} />
      <MapView onExpand={() => setIsMapExpanded(true)} stations={data.stations} vehicles={data.vehicles} />
      <Agenda interventions={data.interventions} />
    </div>
  );
}