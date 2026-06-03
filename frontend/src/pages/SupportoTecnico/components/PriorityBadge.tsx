const styles = {
    Alta: 'bg-red-100 text-red-700 border border-red-200',
    Media: 'bg-amber-100 text-amber-700 border border-amber-200',
    Bassa: 'bg-slate-100 text-slate-600 border border-slate-200',
}

/** @param {{ priority: string }} props */
const PriorityBadge = ({ priority }) => (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${styles[priority] || styles.Bassa}`}>
        {priority}
    </span>
)

export default PriorityBadge