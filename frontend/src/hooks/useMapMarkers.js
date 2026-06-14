import { useMemo } from 'react';

/**
 * Hook per centralizzare la logica di calcolo dei marker.
 * Garantisce determinismo, coerenza nei dati e logica condivisa.
 */

// ============================================================
// useMapMarkers
// ============================================================
// Hook che riceve stazioni e veicoli "grezzi" (così come arrivano
// dal backend) e restituisce un array unico di "marker" pronti
// per essere disegnati su una mappa, già:
// - normalizzati in un formato comune (stazioni e veicoli hanno
//   la stessa "forma" di oggetto)
// - colorati in base allo stato
// - filtrati in base a ricerca testuale, tipo veicolo e stato
//
// Parametri:
// - stations: array di stazioni dal backend
// - vehicles: array di veicoli dal backend
// - searchQuery: testo di ricerca inserito dall'utente
// - typeFilter: filtro per tipo di veicolo ('Ecosistema' = nessun filtro)
// - statusFilter: filtro per stato ('Stato' = nessun filtro)
// ============================================================
export function useMapMarkers(stations = [], vehicles = [], searchQuery = '', typeFilter = 'Ecosistema', statusFilter = 'Stato') {

  // ============================================================
  // USE MEMO
  // ============================================================
  // Tutto il calcolo (normalizzazione + filtri) viene ricalcolato
  // SOLO quando cambia uno dei valori in dipendenza:
  // stations, vehicles, searchQuery, typeFilter, statusFilter.
  // Questo evita di ricostruire l'intero array di marker ad ogni
  // render se nessuno di questi input è cambiato.
  // ============================================================
  const markers = useMemo(() => {

    // ----------------------------------------------------------
    // 1. PROCESSO STAZIONI
    // ----------------------------------------------------------
    // Trasforma ogni stazione in un oggetto "marker" con un
    // formato uniforme (id, type, name, latitude, longitude, ecc.)
    let sMarkers = (stations || []).map(s => ({
      id: `s-${s.id}`,          // prefisso 's-' per distinguere dalle id dei veicoli
      type: 'stazione',
      name: s.name,
      latitude: s.coordinates?.[0],
      longitude: s.coordinates?.[1],
      vehicleTypeName: s.vehicle_type?.name,   // tipo di veicolo associato alla stazione
      statusName: s.status?.name,
      // testo informativo mostrato nel popup/tooltip della mappa
      info: `Capacità: ${s.capacity} | Veicoli: ${s.vehicles_count}`,
      // colore del marker: verde ('bg-stato-attivo') se la stazione
      // è 'Disponibile', grigio altrimenti
      colorClass: s.status?.name === 'Disponibile' ? 'bg-stato-attivo' : 'bg-gray-400'
    }));

    // ----------------------------------------------------------
    // 2. PROCESSO VEICOLI (mapping robusto, data-driven, con jitter stabile)
    // ----------------------------------------------------------
    let vMarkers = (vehicles || []).map(v => {

      // 'seed' è un numero derivato dall'id del veicolo, usato
      // per generare uno scostamento (jitter) PSEUDO-RANDOM ma
      // STABILE: lo stesso veicolo produce sempre lo stesso jitter
      // (così il marker non "salta" ad ogni render).
      // Se l'id non è un numero valido, seed = 0.
      const seed = parseInt(v.id) || 0;

      // JITTER: piccolo spostamento di latitudine/longitudine.
      // Serve per evitare che più veicoli fermi nello stesso punto
      // (es. parcheggiati nella stessa stazione) si sovrappongano
      // esattamente sulla mappa, rendendoli illeggibili.
      //
      // - Se il veicolo è IN MOVIMENTO (in_movement = true), il
      //   jitter è 0: la posizione mostrata è quella reale/precisa.
      // - Se è FERMO, si applica un piccolo offset calcolato da 'seed':
      //   (seed % 1000) / 1000 => numero tra 0 e 1
      //   - 0.5 => numero tra -0.5 e 0.5
      //   * 0.0004 => scostamento massimo di circa ±0.0002 gradi
      //               (pochi metri sulla mappa)
      //   Per la longitudine si usa seed * 7 per ottenere un
      //   pattern diverso da quello della latitudine (altrimenti
      //   il jitter sarebbe sempre sulla stessa diagonale).
      const jitterLat = v.in_movement ? 0 : ((seed % 1000) / 1000 - 0.5) * 0.0004;
      const jitterLng = v.in_movement ? 0 : (((seed * 7) % 1000) / 1000 - 0.5) * 0.0004;

      // Stato visualizzato e colore di default
      let displayStatus = v.status?.name || 'n.d.';
      let colorClass = 'bg-gray-400';

      if (v.in_movement) {
        // Se il veicolo è in movimento, ha priorità su qualsiasi
        // altro stato: viene mostrato come "In Movimento" con
        // colore "attivo", a prescindere dallo stato reale (v.status)
        displayStatus = 'In Movimento';
        colorClass = 'bg-stato-attivo';
      } else {
        // Altrimenti il colore dipende dallo stato specifico del veicolo
        switch (v.status?.name) {
          case 'Disponibile': colorClass = 'bg-stato-disponibile'; break;
          case 'Guasto': colorClass = 'bg-stato-guasto'; break;
          case 'In Manutenzione': colorClass = 'bg-stato-manutenzione'; break;
          case 'In Carica': colorClass = 'bg-stato-inricarica'; break;
          // Nota: se lo stato non corrisponde a nessuno di questi
          // case, colorClass resta 'bg-gray-400' (default)
        }
      }

      return {
        id: `v-${v.id}`,          // prefisso 'v-' per distinguere dalle id delle stazioni
        type: 'veicolo',
        // Nome composito: modello veicolo + targa (o id se manca la targa)
        name: `${v.vehicle_model?.name || 'Veicolo'} - ${v.license_plate || v.id}`,
        // Posizione reale + jitter (jitter = 0 se in movimento)
        latitude: (v.coordinates?.[0] || 0) + jitterLat,
        longitude: (v.coordinates?.[1] || 0) + jitterLng,
        vehicleTypeName: v.vehicle_model?.vehicle_type?.name,
        statusName: v.status?.name,     // stato "reale" (non sovrascritto da in_movement)
        in_movement: v.in_movement,
        // testo informativo mostrato nel popup/tooltip della mappa
        info: `Batteria: ${v.battery_percentage}% | Stato: ${displayStatus}`,
        colorClass: colorClass
      };
    });

    // ----------------------------------------------------------
    // UNIONE STAZIONI + VEICOLI
    // ----------------------------------------------------------
    // Combina i due array in uno unico, poi rimuove i marker
    // senza coordinate valide (latitude/longitude undefined),
    // che non potrebbero essere disegnati sulla mappa
    let allMarkers = [...sMarkers, ...vMarkers].filter(m => m.latitude !== undefined && m.longitude !== undefined);

    // ----------------------------------------------------------
    // 3. FILTRI
    // ----------------------------------------------------------

    // FILTRO PER RICERCA TESTUALE
    // Se l'utente ha digitato qualcosa in searchQuery, mantiene
    // solo i marker il cui nome o id contiene il testo cercato
    // (case-insensitive)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      allMarkers = allMarkers.filter(m => 
        m.name.toLowerCase().includes(q) || 
        m.id.toLowerCase().includes(q)
      );
    }

    // FILTRO PER TIPO VEICOLO
    // 'Ecosistema' = nessun filtro (mostra tutto)
    // Altrimenti: le STAZIONI vengono SEMPRE mostrate (non hanno
    // un "tipo veicolo" da filtrare in senso stretto, quindi
    // passano sempre il filtro), mentre i VEICOLI vengono mostrati
    // solo se il loro vehicleTypeName corrisponde al filtro scelto
    if (typeFilter !== 'Ecosistema') {
      allMarkers = allMarkers.filter(m => m.type === 'stazione' || m.vehicleTypeName === typeFilter);
    }

    // FILTRO PER STATO
    // 'Stato' = nessun filtro (mostra tutto)
    // Stessa logica del filtro precedente: le stazioni passano
    // sempre, i veicoli solo se il loro statusName corrisponde
    // al filtro scelto.
    //
    // NOTA: questo filtro usa 'statusName' (lo stato REALE del
    // veicolo), non 'displayStatus'. Quindi un veicolo "In Movimento"
    // ma con statusName 'Disponibile' verrebbe filtrato in base
    // a 'Disponibile', non a 'In Movimento'.
    if (statusFilter !== 'Stato') {
      allMarkers = allMarkers.filter(m => m.type === 'stazione' || m.statusName === statusFilter);
    }

    return allMarkers;
  }, [stations, vehicles, searchQuery, typeFilter, statusFilter]);

  // Restituisce direttamente l'array di marker pronti per la mappa
  return markers;
}