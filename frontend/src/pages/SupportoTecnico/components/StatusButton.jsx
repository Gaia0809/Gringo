const STATUS_STYLES = {
  Aperti: {
    default: 'bg-emerald-500 text-white hover:bg-emerald-600',
    outline: 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100',
    badge: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  },
  'In Corso': {
    default: 'bg-orange-500 text-white hover:bg-orange-600',
    outline: 'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100',
    badge: 'bg-orange-100 text-orange-700 border border-orange-200',
  },
  Chiusi: {
    default: 'bg-cyan-500 text-white hover:bg-cyan-600',
    outline: 'bg-cyan-50 text-cyan-700 border border-cyan-200 hover:bg-cyan-100',
    badge: 'bg-cyan-100 text-cyan-700 border border-cyan-200',
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
      className={`font-semibold rounded-lg transition-all py-2 px-4 text-sm outline-none ${style} ${className}`}
    >
      {status}
    </button>
  )
}

export { STATUS_STYLES }
export default StatusButton