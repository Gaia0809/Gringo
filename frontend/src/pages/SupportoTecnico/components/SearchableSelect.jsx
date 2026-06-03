import { useState, useRef, useEffect } from 'react'

const SearchableSelect = ({ value, onChange, options, placeholder = 'Seleziona...' }) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef(null)
  const searchRef = useRef(null)

  const selected = options.find(o => String(o.id) === String(value))

  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    if (open) searchRef.current?.focus()
  }, [open])

  useEffect(() => {
    const handleClick = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const select = (id) => {
    onChange(id)
    setOpen(false)
    setSearch('')
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-white text-left flex justify-between items-center gap-2 focus:outline-none focus:border-slate-400 transition-colors"
      >
        <span className={selected ? 'text-slate-900' : 'text-slate-400'}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
          <div className="p-2 border-b border-slate-100">
            <input
              ref={searchRef}
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cerca..."
              className="w-full px-2.5 py-1.5 text-sm border border-slate-200 rounded-lg outline-none focus:border-slate-400 transition-colors"
            />
          </div>
          <div className="overflow-y-auto max-h-48">
            <div
              onClick={() => select('')}
              className="px-3 py-2 text-sm text-slate-400 cursor-pointer hover:bg-slate-50"
            >
              {placeholder}
            </div>
            {filtered.length === 0 ? (
              <div className="px-3 py-2 text-sm text-slate-400">Nessun risultato</div>
            ) : (
              filtered.map(o => (
                <div
                  key={o.id}
                  onClick={() => select(o.id)}
                  className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                    String(o.id) === String(value)
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-50'
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
