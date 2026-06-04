const FilterButton = ({ label, isActive, onClick, count, color = 'emerald' }) => {
  const colorMap = {
    emerald: {
      active: 'bg-stato-attivo text-brand-testo shadow-md shadow-stato-attivo/20',
      inactive: 'bg-brand-sfondo text-brand-testo border border-gray-200 hover:bg-gray-50',
      badge: { active: 'bg-brand-testo/10 text-brand-testo', inactive: 'bg-stato-attivo/20 text-brand-testo' },
    },
    orange: {
      active: 'bg-stato-inricarica text-brand-testo shadow-md shadow-stato-inricarica/20',
      inactive: 'bg-brand-sfondo text-brand-testo border border-gray-200 hover:bg-gray-50',
      badge: { active: 'bg-brand-testo/10 text-brand-testo', inactive: 'bg-stato-inricarica/20 text-brand-testo' },
    },
    cyan: {
      active: 'bg-stato-disponibile text-brand-testo shadow-md shadow-stato-disponibile/20',
      inactive: 'bg-brand-sfondo text-brand-testo border border-gray-200 hover:bg-gray-50',
      badge: { active: 'bg-brand-testo/10 text-brand-testo', inactive: 'bg-stato-disponibile/20 text-brand-testo' },
    },
  }

  const s = colorMap[color]

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer ${isActive ? s.active : s.inactive}`}
    >
      {label}
      {count !== undefined && (
        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${isActive ? s.badge.active : s.badge.inactive}`}>
          {count}
        </span>
      )}
    </button>
  )
}

export default FilterButton