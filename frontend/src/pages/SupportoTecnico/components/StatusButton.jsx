const STATUS_STYLES = {
  Aperti: {
    default: 'bg-stato-attivo text-brand-testo hover:opacity-90',
    outline: 'bg-stato-attivo/10 text-brand-testo border border-stato-attivo hover:bg-stato-attivo/20',
    badge: 'bg-stato-attivo/20 text-brand-testo border border-stato-attivo/30',
  },
  'In Corso': {
    default: 'bg-stato-inricarica text-brand-testo hover:opacity-90',
    outline: 'bg-stato-inricarica/10 text-brand-testo border border-stato-inricarica hover:bg-stato-inricarica/20',
    badge: 'bg-stato-inricarica/20 text-brand-testo border border-stato-inricarica/30',
  },
  Chiusi: {
    default: 'bg-stato-disponibile text-brand-testo hover:opacity-90',
    outline: 'bg-stato-disponibile/10 text-brand-testo border border-stato-disponibile hover:bg-stato-disponibile/20',
    badge: 'bg-stato-disponibile/20 text-brand-testo border border-stato-disponibile/30',
  },
}

const StatusButton = ({ status, onClick, variant = 'default', className = '', disabled = false }) => {
  const styles = STATUS_STYLES[status] || STATUS_STYLES['Aperti']
  const style = styles[variant] || styles.default

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`font-semibold rounded-xl transition-all py-2 px-4 text-sm outline-none cursor-pointer ${style} ${className}`}
    >
      {status}
    </button>
  )
}

export { STATUS_STYLES }
export default StatusButton