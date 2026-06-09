export default function TicketCard({ issues }) {
  const latestIssue = issues && issues.length > 0 ? issues[issues.length - 1] : null;

  if (!latestIssue) {
    return (
      <div className="card border-l-4 border-l-gray-300 flex flex-col gap-1">
        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Nessun Intervento Aperto</span>
      </div>
    );
  }

  const vehicle = latestIssue.booking?.vehicle;

  return (
    <div className="card border-l-4 border-l-stato-inricarica flex flex-col gap-1">
      <span className="text-stato-inricarica text-[10px] font-bold uppercase tracking-widest">Interventi Aperti</span>
      <div className="flex justify-between items-center mt-1">
        <h3 className="text-brand-testo text-base font-bold">ID_Ticket: #{latestIssue.id}</h3>
      </div>
      <p className="text-brand-testo text-sm font-semibold">{latestIssue.title}</p>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-gray-400 text-[11px] font-medium">
          Asset: {vehicle ? `${vehicle.license_plate || `ID:${vehicle.id}`}` : 'Nessun veicolo'}
          {vehicle && ` (ID_V:${vehicle.id})`}
        </span>
      </div>
    </div>
  );
}