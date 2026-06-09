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
  const [data, setData] = useState(options.initialData || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(endpoint);
      const processedData = options.transform ? options.transform(res.data) : res.data;
      setData(processedData);
      setError(null);
    } catch (err) {
      console.error(`Errore nel caricamento di ${endpoint}:`, err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, options.transform]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const create = async (payload) => {
    const res = await api.post(endpoint, payload);
    setData(prev => [...prev, res.data]);
    return res.data;
  };

  const update = async (id, payload) => {
    const res = await api.put(`${endpoint}/${id}`, payload);
    setData(prev => prev.map(item => item.id === id ? res.data : item));
    return res.data;
  };

  const remove = async (id) => {
    await api.delete(`${endpoint}/${id}`);
    setData(prev => prev.filter(item => item.id !== id));
  };

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
