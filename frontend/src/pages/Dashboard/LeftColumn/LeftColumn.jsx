import TicketCard from './TicketCard';
import Co2Chart from './Co2Chart';
import StationsCard from './StationsCard';

export default function LeftColumn({ stations, issues, vehicles }) {
  return (
    <div className="flex flex-col gap-5 overflow-y-auto">
      <TicketCard issues={issues} />
      <Co2Chart vehicles={vehicles} />
      <StationsCard stations={stations} />
    </div>
  );
}