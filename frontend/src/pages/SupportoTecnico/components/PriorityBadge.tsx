const styles = {
    Alta: 'bg-stato-guasto/20 text-brand-testo border border-stato-guasto/30',
    Media: 'bg-stato-inricarica/20 text-brand-testo border border-stato-inricarica/30',
    Bassa: 'bg-gray-100 text-gray-600 border border-gray-200',
}

/** @param {{ priority: string }} props */
const PriorityBadge = ({ priority }) => (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${styles[priority] || styles.Bassa}`}>
        {priority}
    </span>
)

export default PriorityBadge