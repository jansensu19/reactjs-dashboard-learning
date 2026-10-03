import TicketsList from "../../components/dashboard/TicketList";
import { fetchTicketsData } from "../../services/ticketApi";

export default async function TicketsPage() {
  const { tickets } = await fetchTicketsData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Support Tickets
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage and resolve customer support inquiries.
        </p>
      </div>

      <TicketsList tickets={tickets} />
    </div>
  );
}