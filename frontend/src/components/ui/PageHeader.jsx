import React from 'react';
import SearchInput from './SearchInput';
import Button from './Button';

/**
 * Molecola: PageHeader.
 * Centralizza la barra di ricerca e le azioni principali della pagina.
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
      <div className="flex items-center gap-4 w-full sm:w-auto">
        {onSearchChange && (
          <SearchInput 
            placeholder={searchPlaceholder} 
            value={searchValue}
            onChange={onSearchChange}
            className="w-full sm:w-80"
          />
        )}
        {children}
      </div>
      
      {onActionClick && actionLabel && (
        <Button onClick={onActionClick} className="w-full sm:w-auto">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
