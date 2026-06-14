import { useState, useEffect, useCallback } from 'react';
import api from '../api.js';

/**
 * Hook generico per la gestione delle risorse (CRUD).
 * Riduce la duplicazione del codice per il recupero dati, caricamento e gestione errori.
 * 
 * @param {string} endpoint - L'endpoint API (es. '/vehicles')
 * @param {Object} options - Opzioni extra (es. initialData, transform)
 */
export function useResource(endpoint, options = {}) {

  // ============================================================
  // USE STATE
  // ============================================================
  // useState crea variabili reattive: quando vengono aggiornate
  // tramite il loro setter, il componente che usa l'hook si
  // ri-renderizza automaticamente.
  // ============================================================

  // Dati della risorsa (es. lista veicoli). Valore iniziale opzionale
  // passato tramite options.initialData, altrimenti array vuoto.
  const [data, setData] = useState(options.initialData || []);

  // Flag di caricamento, utile per mostrare uno spinner durante il fetch
  const [loading, setLoading] = useState(true);

  // Eventuale errore catturato durante le chiamate API
  const [error, setError] = useState(null);


  // ============================================================
  // USE CALLBACK
  // ============================================================
  // useCallback memoizza la funzione fetchData: viene ricreata
  // solo se cambiano 'endpoint' o 'options.transform'.
  // Questo è importante perché fetchData è usata come dipendenza
  // di useEffect: se venisse ricreata ad ogni render, l'effetto
  // si rieseguirebbe continuamente, causando chiamate API infinite.
  //
  // NOTA: 'options.transform' è una funzione passata dall'esterno;
  // se il chiamante non la memoizza a sua volta (con useCallback),
  // potrebbe comunque cambiare riferimento ad ogni render del
  // componente padre, vanificando parzialmente questa ottimizzazione.
  // ============================================================
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(endpoint);

      // Se viene fornita una funzione di trasformazione (transform),
      // viene applicata ai dati grezzi prima di salvarli nello stato
      const processedData = options.transform ? options.transform(res.data) : res.data;

      setData(processedData);
      setError(null);
    } catch (err) {
      console.error(`Errore nel caricamento di ${endpoint}:`, err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, options.transform]); // <- si ricrea solo se cambiano questi valori


  // ============================================================
  // USE EFFECT
  // ============================================================
  // useEffect esegue il "side effect" (la chiamata API) dopo il
  // render. Grazie a useCallback, fetchData cambia riferimento solo
  // quando 'endpoint' o 'options.transform' cambiano: quindi questo
  // effetto si riesegue al montaggio iniziale e ogni volta che
  // 'endpoint' (o 'transform') cambiano, ricaricando i dati per
  // la nuova risorsa.
  // ============================================================
  useEffect(() => {
    fetchData();
  }, [fetchData]);


  // ============================================================
  // FUNZIONI CRUD
  // (non usano hook particolari, ma aggiornano lo stato 'data'
  // sopra, mantenendolo sincronizzato con il backend)
  // ============================================================

  // CREATE: invia il payload al backend e aggiunge il nuovo
  // elemento ricevuto in risposta alla fine dell'array
  const create = async (payload) => {
    const res = await api.post(endpoint, payload);
    setData(prev => [...prev, res.data]);
    return res.data;
  };

  // UPDATE: invia le modifiche al backend e sostituisce l'elemento
  // corrispondente nell'array con quello aggiornato ricevuto
  const update = async (id, payload) => {
    const res = await api.put(`${endpoint}/${id}`, payload);
    setData(prev => prev.map(item => item.id === id ? res.data : item));
    return res.data;
  };

  // DELETE: elimina l'elemento sul backend e lo rimuove
  // dall'array locale
  const remove = async (id) => {
    await api.delete(`${endpoint}/${id}`);
    setData(prev => prev.filter(item => item.id !== id));
  };


  // ============================================================
  // RETURN
  // ============================================================
  // Espone stato e funzioni al componente che usa l'hook
  return { 
    data, 
    loading, 
    error, 
    refresh: fetchData,
    create,
    update,
    remove
  };
}