import TicketCard from './TicketCard';
import Co2Chart from './Co2Chart';
import StationsCard from './StationsCard';

export default function LeftColumn() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
      <TicketCard />
      <Co2Chart />
      <StationsCard />
    </div>
  );
}