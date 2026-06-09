import { useMemo } from 'react';

/**
 * Hook per centralizzare la logica di calcolo dei marker.
 * Garantisce determinismo, coerenza nei dati e logica condivisa.
 */
export function useMapMarkers(stations = [], vehicles = [], searchQuery = '', typeFilter = 'Ecosistema', statusFilter = 'Stato') {
  
  const markers = useMemo(() => {
    // 1. Process Stations
    let sMarkers = (stations || []).map(s => ({
      id: `s-${s.id}`,
      type: 'stazione',
      name: s.name,
      latitude: s.coordinates?.[0],
      longitude: s.coordinates?.[1],
      vehicleTypeName: s.vehicle_type?.name,
      statusName: s.status?.name,
      info: `Capacità: ${s.capacity} | Veicoli: ${s.vehicles_count}`,
      colorClass: s.status?.name === 'Disponibile' ? 'bg-stato-attivo' : 'bg-gray-400'
    }));

    // 2. Process Vehicles (Robust, data-driven mapping with stable jitter)
    let vMarkers = (vehicles || []).map(v => {
      const seed = parseInt(v.id) || 0;
      const jitterLat = v.in_movement ? 0 : ((seed % 1000) / 1000 - 0.5) * 0.0004;
      const jitterLng = v.in_movement ? 0 : (((seed * 7) % 1000) / 1000 - 0.5) * 0.0004;

      let displayStatus = v.status?.name || 'n.d.';
      let colorClass = 'bg-gray-400';

      if (v.in_movement) {
        displayStatus = 'In Movimento';
        colorClass = 'bg-stato-attivo';
      } else {
        switch (v.status?.name) {
          case 'Disponibile': colorClass = 'bg-stato-disponibile'; break;
          case 'Guasto': colorClass = 'bg-stato-guasto'; break;
          case 'In Manutenzione': colorClass = 'bg-stato-manutenzione'; break;
          case 'In Carica': colorClass = 'bg-stato-inricarica'; break;
        }
      }

      return {
        id: `v-${v.id}`,
        type: 'veicolo',
        name: `${v.vehicle_model?.name || 'Veicolo'} - ${v.license_plate || v.id}`,
        latitude: (v.coordinates?.[0] || 0) + jitterLat,
        longitude: (v.coordinates?.[1] || 0) + jitterLng,
        vehicleTypeName: v.vehicle_model?.vehicle_type?.name,
        statusName: v.status?.name,
        in_movement: v.in_movement,
        info: `Batteria: ${v.battery_percentage}% | Stato: ${displayStatus}`,
        colorClass: colorClass
      };
    });

    let allMarkers = [...sMarkers, ...vMarkers].filter(m => m.latitude !== undefined && m.longitude !== undefined);

    // 3. Robust Filtering
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      allMarkers = allMarkers.filter(m => 
        m.name.toLowerCase().includes(q) || 
        m.id.toLowerCase().includes(q)
      );
    }

    if (typeFilter !== 'Ecosistema') {
      allMarkers = allMarkers.filter(m => m.type === 'stazione' || m.vehicleTypeName === typeFilter);
    }

    if (statusFilter !== 'Stato') {
      allMarkers = allMarkers.filter(m => m.type === 'stazione' || m.statusName === statusFilter);
    }

    return allMarkers;
  }, [stations, vehicles, searchQuery, typeFilter, statusFilter]);

  return markers;
}
