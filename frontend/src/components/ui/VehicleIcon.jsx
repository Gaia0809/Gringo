import React from 'react';
import { FaCar, FaBicycle } from 'react-icons/fa';
import { PiScooterFill } from 'react-icons/pi';

/**
 * Atomo: Icona veicolo.
 * Utilizza react-icons per rendere il codice più pulito e manutenibile.
 * 
 * @param {Object} props
 * @param {string} props.type - Tipo di veicolo
 * @param {string} [props.className] - Classi extra
 */
export default function VehicleIcon({ type, className = "" }) {
  if (!type) return null;
  const t = type.toUpperCase();
  const iconClass = `w-[18px] h-[18px] ${className}`;

  if (t.includes('MACCHINA') || t.includes('AUTO')) {
    return <FaCar className={iconClass} />;
  }
  if (t.includes('BICI')) {
    return <FaBicycle className={iconClass} />;
  }
  if (t.includes('MONOPATTINO')) {
    return <PiScooterFill className={iconClass} />;
  }
  return null;
}

