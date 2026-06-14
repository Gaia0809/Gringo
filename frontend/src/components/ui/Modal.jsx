import React from 'react';

/**
 * ============================================================
 * ATOMO: Modal (Finestra di Dialogo)
 * ============================================================
 * Gestisce la visualizzazione di contenuti in sovrapposizione
 * rispetto alla pagina principale. Si occupa dell'overlay scuro,
 * del blocco della visuale e del posizionamento centrato.
 * 
 * @param {Object} props
 * @param {boolean} props.open - Stato di visibilità
 * @param {Function} props.onClose - Funzione per chiudere la modale
 * @param {string} props.title - Titolo mostrato nell'header
 * @param {React.ReactNode} props.children - Contenuto interno
 * @param {string} [props.maxWidth] - Classe Tailwind per la larghezza max
 * ============================================================
 */
const Modal = ({ open, onClose, title, children, maxWidth = 'max-w-md' }) => {
  
  // EARLY RETURN:
  // Se la modale è chiusa, non renderizziamo nulla nel DOM.
  // Questo resetta anche lo stato degli eventuali form interni alla chiusura.
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      
      {/* SFONDO CLICCABILE:
          Un div trasparente che copre tutto lo schermo.
          Cliccare qui chiude la modale (comportamento "Cancel" implicito). */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      {/* BOX MODALE REALE:
          Contenitore bianco con bordi molto arrotondati (3xl) e ombreggiatura profonda. */}
      <div className={`relative bg-brand-sfondo rounded-3xl shadow-xl w-full ${maxWidth} overflow-hidden border border-gray-100 my-auto animate-in zoom-in-95 duration-200`}>
        
        {/* HEADER: Titolo e Tasto X di chiusura rapida */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-brand-testo">{title}</h2>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-full hover:bg-brand-sfondowidget transition-colors text-gray-400 hover:text-brand-testo cursor-pointer outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* CONTENT AREA: Spazio riservato al form o alle informazioni specifiche */}
        <div className="p-6">
          {children}
        </div>
        
      </div>
    </div>
  );
};

export default Modal;
