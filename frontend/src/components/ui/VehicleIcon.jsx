import React from 'react';
import { FaCar, FaBicycle } from 'react-icons/fa';
import { PiScooterFill } from 'react-icons/pi';

/**
 * ============================================================
 * ATOMO: VehicleIcon (Icona Tipologia Mezzo)
 * ============================================================
 * Centralizza la rappresentazione visiva delle diverse categorie 
 * di veicoli. Utilizza la libreria 'react-icons' per fornire
 * simboli vettoriali scalabili e coerenti.
 * 
 * @param {Object} props
 * @param {string} props.type - La tipologia di mezzo (es. "AUTO", "BICI")
 * @param {string} [props.className] - Classi extra per dimensioni/colori
 * ============================================================
 */
export default function VehicleIcon({ type, className = "" }) {
  
  // Se non viene passato il tipo, non possiamo mostrare nulla
  if (!type) return null;
  
  // Normalizziamo il tipo in maiuscolo per rendere la ricerca case-insensitive
  const t = type.toUpperCase();
  
  // Classe base per garantire dimensioni coerenti in tutta la UI
  const iconClass = `w-[18px] h-[18px] ${className}`;

  /**
   * LOGICA DI SELEZIONE:
   * Mappiamo parole chiave contenute nel nome del tipo all'icona corretta.
   * Usiamo .includes() per gestire variazioni (es. "Macchina Elettrica", "Auto Privata").
   */

  // 1. Categoria Automobili
  if (t.includes('MACCHINA') || t.includes('AUTO')) {
    return <FaCar className={iconClass} />;
  }
  
  // 2. Categoria Biciclette
  if (t.includes('BICI')) {
    return <FaBicycle className={iconClass} />;
  }
  
  // 3. Categoria Monopattini
  if (t.includes('MONOPATTINO')) {
    return <PiScooterFill className={iconClass} />;
  }
  
  // Fallback: se il tipo non è riconosciuto, il componente non renderizza nulla
  return null;
}

