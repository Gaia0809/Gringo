import PriorityBadge from './PriorityBadge.js'

const TicketList = ({ tickets, selectedTicketId, onSelect }) => {
  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400 bg-white rounded-2xl border border-slate-100">
        <svg className="w-12 h-12 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-sm font-medium">Nessun ticket in questa categoria</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {tickets.map(ticket => {
        const isSelected = selectedTicketId === ticket.id
        return (
          <div
            key={ticket.id}
            onClick={() => onSelect(ticket.id)}
            className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
              isSelected
                ? 'bg-white border-slate-900 shadow-lg shadow-slate-100'
                : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-md hover:shadow-slate-50'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-400 tracking-wide">#{ticket.id}</span>
              <PriorityBadge priority={ticket.priority} />
            </div>
            <h3 className="font-semibold text-slate-900 text-sm mb-2 leading-snug">{ticket.title}</h3>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-medium text-slate-500">{ticket.vehicle}</span>
              <span>·</span>
              <span>{ticket.technician}</span>
              <span>·</span>
              <span>{ticket.createdAt}</span>
            </div>
            {ticket.notes.length > 0 && (
              <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span>{ticket.notes.length} nota{ticket.notes.length > 1 ? 'e' : ''}</span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default TicketList