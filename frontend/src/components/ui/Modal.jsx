import React from 'react';

/**
 * Atomo: Modal riutilizzabile.
 * Gestisce l'overlay, il posizionamento e la testata standard.
 */
const Modal = ({ open, onClose, title, children, maxWidth = 'max-w-md' }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className={`relative bg-brand-sfondo rounded-3xl shadow-xl w-full ${maxWidth} overflow-hidden border border-gray-100 my-auto`}>
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-brand-testo">{title}</h2>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-full hover:bg-brand-sfondowidget transition-colors text-gray-400 hover:text-brand-testo cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
