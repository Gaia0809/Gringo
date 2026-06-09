import React, { useState, useEffect, useRef } from 'react';

/**
 * Atomo: Menu azioni (tre puntini).
 * Fornisce un menu a tendina per azioni contestuali su una riga o card.
 * 
 * @param {Object} props
 * @param {Array} props.actions - Lista di azioni [{ label, onClick, variant }]
 */
export default function ActionMenu({ actions = [] }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="text-gray-400 hover:text-brand-testo transition-colors cursor-pointer p-1 rounded-lg hover:bg-gray-100 outline-none"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-36 bg-brand-sfondo border border-gray-100 rounded-xl shadow-lg py-1 z-30 overflow-hidden animate-in fade-in zoom-in duration-150">
          {actions.map((action, idx) => (
            <button 
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                action.onClick(e);
              }}
              className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors hover:bg-brand-sfondowidget ${
                action.variant === 'danger' ? 'text-stato-guasto' : 'text-gray-600'
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
