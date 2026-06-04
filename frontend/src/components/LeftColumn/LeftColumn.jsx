import TicketCard from './TicketCard';
import Co2Chart from './Co2Chart';
import StationsCard from './StationsCard';

export default function LeftColumn() {
  return (
    <div className="flex flex-col gap-5 overflow-y-auto">
      <TicketCard />
      <Co2Chart />
      <StationsCard />
    </div>
  );
}