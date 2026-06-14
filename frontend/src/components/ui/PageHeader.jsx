import React from 'react';
import SearchInput from './SearchInput';
import Button from './Button';

/**
 * ============================================================
 * MOLECOLA: PageHeader (Testata di Pagina)
 * ============================================================
 * Componente strutturale che standardizza l'aspetto delle pagine.
 * Combina in un unico layout:
 * 1. Barra di ricerca (opzionale)
 * 2. Elementi figli extra (es. filtri specifici)
 * 3. Pulsante di azione primaria (es. "Aggiungi")
 * 
 * @param {Object} props
 * @param {string} [props.searchPlaceholder] - Testo per la barra di ricerca
 * @param {string} [props.searchValue] - Valore corrente della ricerca
 * @param {Function} [props.onSearchChange] - Handler per l'input di ricerca
 * @param {Function} [props.onActionClick] - Handler per il pulsante d'azione
 * @param {string} [props.actionLabel] - Testo del pulsante d'azione
 * @param {React.ReactNode} [props.children] - Ulteriori elementi tra ricerca e pulsante
 * ============================================================
 */
export default function PageHeader({ 
  searchPlaceholder = "Cerca...", 
  searchValue, 
  onSearchChange, 
  onActionClick, 
  actionLabel,
  children 
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      
      {/* SEZIONE SINISTRA: Ricerca e Filtri extra */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        
        {/* Renderizziamo la ricerca solo se viene passata una callback di gestione */}
        {onSearchChange && (
          <SearchInput 
            placeholder={searchPlaceholder} 
            value={searchValue}
            onChange={onSearchChange}
            className="w-full sm:w-80"
          />
        )}
        
        {/* Slot per filtri specifici della pagina o ulteriori bottoni */}
        {children}
      </div>
      
      {/* SEZIONE DESTRA: Azione Principale (es. "+ Aggiungi Veicolo") */}
      {onActionClick && actionLabel && (
        <Button onClick={onActionClick} className="w-full sm:w-auto">
          {actionLabel}
        </Button>
      )}
      
    </div>
  );
}
