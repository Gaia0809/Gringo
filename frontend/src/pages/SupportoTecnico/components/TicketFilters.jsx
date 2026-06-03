
import FilterButton from './FilterButton.jsx'

const TABS = [
  { label: 'Aperti', color: 'emerald' },
  { label: 'In Corso', color: 'orange' },
  { label: 'Chiusi', color: 'cyan' },
]

const TicketFilters = ({ counts, active, onChange }) => (
  <div className="flex items-center gap-3">
    {TABS.map(tab => (
      <FilterButton
        key={tab.label}
        label={tab.label}
        color={tab.color}
        isActive={active === tab.label}
        onClick={() => onChange(tab.label)}
        count={counts[tab.label] ?? 0}
      />
    ))}
  </div>
)

export default TicketFilters