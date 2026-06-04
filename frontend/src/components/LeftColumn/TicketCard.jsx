export default function TicketCard() {
  return (
    <div className="card border-l-4 border-l-stato-inricarica flex flex-col gap-1">
      <span className="text-stato-inricarica text-[10px] font-bold uppercase tracking-widest">Interventi Aperti</span>
      <div className="flex justify-between items-center mt-1">
        <h3 className="text-brand-testo text-base font-bold">ID_Ticket: #901</h3>
      </div>
      <p className="text-brand-testo text-sm font-semibold">Guasto Freno Anteriore</p>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-gray-400 text-[11px] font-medium">Asset: BICI-14 (ID_V:102)</span>
      </div>
    </div>
  );
}