import React, { useState, useEffect, useRef } from 'react';

/**
 * ============================================================
 * ATOMO: ActionMenu (Menu Contestuale)
 * ============================================================
 * Fornisce un menu a tendina (dropdown) attivabile tramite
 * il classico pulsante con i "tre puntini".
 * Viene utilizzato nelle tabelle e nelle card per raggruppare
 * azioni secondarie (es. Modifica, Elimina).
 * 
 * @param {Object} props
 * @param {Array} props.actions - Lista di oggetti azione: [{ label, onClick, variant }]
 * ============================================================
 */
export default function ActionMenu({ actions = [] }) {

  // ============================================================
  // USE STATE
  // ============================================================
  // Controlla la visibilità del menu a tendina.
  const [open, setOpen] = useState(false);


  // ============================================================
  // USE REF
  // ============================================================
  // Punta all'elemento DOM del contenitore del menu.
  // È fondamentale per determinare se un click avviene "fuori"
  // dal menu per poterlo chiudere automaticamente.
  const menuRef = useRef(null);


  // ============================================================
  // USE EFFECT: Chiusura al click esterno
  // ============================================================
  // Gestisce la chiusura del menu quando l'utente clicca altrove
  // nella pagina (comportamento standard UX).
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Se abbiamo il riferimento e il click NON è nel menu...
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false); // ...chiudiamo il menu
      }
    };

    // Agganciamo il listener globale al documento
    document.addEventListener('mousedown', handleClickOutside);
    
    // CLEANUP: Rimuoviamo il listener quando il componente viene smontato
    // per evitare perdite di memoria (memory leaks).
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []); // Array vuoto: eseguito solo al montaggio


  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="relative" ref={menuRef}>
      
      {/* Tasto Trigger: Tre puntini verticali */}
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Evitiamo che il click selezioni anche la card/riga sottostante
          setOpen(!open);
        }}
        className="text-gray-400 hover:text-brand-testo transition-colors cursor-pointer p-1 rounded-lg hover:bg-gray-100 outline-none"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </button>

      {/* Menu a tendina: renderizzato condizionalmente */}
      {open && (
        <div className="absolute right-0 mt-1 w-36 bg-brand-sfondo border border-gray-100 rounded-xl shadow-lg py-1 z-30 overflow-hidden animate-in fade-in zoom-in duration-150">
          {actions.map((action, idx) => (
            <button 
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false); // Chiudiamo sempre il menu dopo un'azione
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
