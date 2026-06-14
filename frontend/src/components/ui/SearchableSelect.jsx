import { useState, useRef, useEffect } from 'react'

/**
 * ============================================================
 * ATOMO: SearchableSelect (Select con Ricerca)
 * ============================================================
 * Un componente di selezione avanzata che permette di filtrare le
 * opzioni tramite un campo di ricerca interno. Ideale per liste
 * lunghe (es. centinaia di veicoli o decine di stazioni).
 * 
 * @param {Object} props
 * @param {string|number} props.value - L'ID dell'opzione selezionata
 * @param {Function} props.onChange - Callback invocata alla selezione
 * @param {Array} props.options - Lista di oggetti { id, label }
 * @param {string} [props.placeholder] - Testo se nulla è selezionato
 * ============================================================
 */
const SearchableSelect = ({ value, onChange, options, placeholder = 'Seleziona...' }) => {

  // ============================================================
  // USE STATE
  // ============================================================
  
  // Stato di apertura del menu a tendina
  const [open, setOpen] = useState(false)
  
  // Testo inserito nel campo di ricerca interno
  const [search, setSearch] = useState('')


  // ============================================================
  // USE REF
  // ============================================================
  
  // Riferimento al contenitore principale per gestire il click esterno
  const containerRef = useRef(null)
  
  // Riferimento all'input di ricerca per forzare il focus all'apertura
  const searchRef = useRef(null)


  // ============================================================
  // LOGICA DI FILTRAGGIO (Dati derivati)
  // ============================================================
  
  const safeOptions = options || []
  
  // Identifica l'oggetto opzione attualmente selezionato per mostrarne la label sul tasto
  const selected = safeOptions.find(o => String(o.id) === String(value))

  // Calcola in tempo reale la lista filtrata in base al testo 'search'
  const filtered = safeOptions.filter(o =>
    (o.label || '').toLowerCase().includes(search.toLowerCase())
  )


  // ============================================================
  // USE EFFECT
  // ============================================================

  // 1. FOCUS AUTOMATICO:
  // Quando il menu viene aperto, portiamo automaticamente il cursore
  // nel campo di ricerca per velocizzare l'esperienza utente.
  useEffect(() => {
    if (open) searchRef.current?.focus()
  }, [open])

  // 2. CHIUSURA AL CLICK ESTERNO:
  // Se l'utente clicca fuori dal componente, chiudiamo il menu.
  useEffect(() => {
    const handleClick = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])


  // ============================================================
  // GESTORE SELEZIONE
  // ============================================================
  const select = (id) => {
    onChange(id)     // Notifica il padre del cambio
    setOpen(false)   // Chiude il menu
    setSearch('')    // Reset della ricerca per la prossima apertura
  }


  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div ref={containerRef} className="relative">
      
      {/* TASTO TRIGGER: Mostra l'opzione selezionata o il placeholder */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full p-2.5 border border-gray-200 rounded-xl text-sm bg-brand-sfondowidget text-left flex justify-between items-center gap-2 focus:outline-none focus:border-brand-testo transition-colors"
      >
        <span className={selected ? 'text-brand-testo' : 'text-gray-400'}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* DROPDOWN MENU: Renderizzato solo se 'open' è true */}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-brand-sfondo border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          {/* Campo di ricerca interno */}
          <div className="p-2 border-b border-gray-100">
            <input
              ref={searchRef}
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cerca..."
              className="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-brand-testo bg-brand-sfondowidget text-brand-testo transition-colors"
            />
          </div>

          {/* Lista delle opzioni scrollabile */}
          <div className="overflow-y-auto max-h-48 custom-scrollbar">
            
            {/* Opzione "Vuota" (Reset) */}
            <div
              onClick={() => select('')}
              className="px-3 py-2 text-sm text-gray-400 cursor-pointer hover:bg-gray-50"
            >
              {placeholder}
            </div>

            {/* Rendering condizionale dei risultati filtrati */}
            {filtered.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-400">Nessun risultato</div>
            ) : (
              filtered.map(o => (
                <div
                  key={o.id}
                  onClick={() => select(o.id)}
                  className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                    String(o.id) === String(value)
                      ? 'bg-brand-testo text-brand-sfondo' // Evidenzia la selezione attuale
                      : 'text-brand-testo hover:bg-gray-50'
                  }`}
                >
                  {o.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchableSelect
