const FilterButton = ({ label, isActive, onClick, count, color = 'emerald' }) => {
  const colorMap = {
    emerald: {
      active: 'bg-emerald-500 text-white shadow-emerald-200 shadow-md',
      inactive: 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50',
      badge: { active: 'bg-white/30 text-white', inactive: 'bg-emerald-100 text-emerald-700' },
    },
    orange: {
      active: 'bg-orange-500 text-white shadow-orange-200 shadow-md',
      inactive: 'bg-white text-orange-700 border border-orange-200 hover:bg-orange-50',
      badge: { active: 'bg-white/30 text-white', inactive: 'bg-orange-100 text-orange-700' },
    },
    cyan: {
      active: 'bg-cyan-500 text-white shadow-cyan-200 shadow-md',
      inactive: 'bg-white text-cyan-700 border border-cyan-200 hover:bg-cyan-50',
      badge: { active: 'bg-white/30 text-white', inactive: 'bg-cyan-100 text-cyan-700' },
    },
  }

  const s = colorMap[color]

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${isActive ? s.active : s.inactive}`}
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