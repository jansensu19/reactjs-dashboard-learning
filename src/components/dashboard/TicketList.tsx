import { useState, useMemo } from 'react'
import { useAuth } from "../../context/AuthContext";
import { Ticket, TicketCategory, TicketPriority, TicketStatus } from "../../types";
import TicketsEditor from '../ui/TicketsEditor';

interface TicketsListProps {
    tickets: Ticket[];
    deleteTicket?: (ticketId: string) => void;
}

export default function TicketsList({ tickets, deleteTicket }: TicketsListProps) {
    const { user } = useAuth();
    const isAdmin = user?.role === "Admin";
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<TicketCategory | "All">("All");
    const [sortBy, setSortBy] = useState<"status" | "priority">("priority");
    const [sortPriority, setSortPriority] = useState<"asc" | "desc">("desc");
    const [sortStatus, setSortStatus] = useState<"asc" | "desc">("desc");
    const categories = [...new Set(tickets.map((product) => product.category))] as TicketCategory[];
    const [ticketList, setTicketList] = useState(tickets);
    const [prevTickets, setPrevTickets] = useState(tickets);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (tickets !== prevTickets) {
        setPrevTickets(tickets);
        setTicketList(tickets);
    }

    const handleDelete = (ticketId: string) => {
        if (deleteTicket) {
            deleteTicket(ticketId);
        }
        setTicketList((prev) => prev.filter((p) => p.id !== ticketId));
    };

    const handleAddTicket = (newTicket: Ticket) => {
        setTicketList((prev) => [newTicket, ...prev]);
    };

    const processedTickets = useMemo(() => {
        const filtered = ticketList.filter((tickets) => {
            const matchesSearch = 
            tickets.title.toLowerCase().includes(search.toLowerCase()) || 
            tickets.id.toLowerCase().includes(search.toLowerCase());

            const matchesCategory =
                categoryFilter === "All" ||
                tickets.category === categoryFilter;

            return matchesSearch && matchesCategory;
        });

        const priorityOrder: Record<TicketPriority, number> = {
            Low: 1,
            Medium: 2,
            High: 3,
            Urgent: 4,
        };

        const statusOrder: Record<TicketStatus, number> = {
            Open: 1,
            "In Progress": 2,
            Resolved: 3,
            Closed: 4,
        };

        return [...filtered].sort((a, b) => {
            if (sortBy === "priority") {
                const priorityA = priorityOrder[a.priority as TicketPriority];
                const priorityB = priorityOrder[b.priority as TicketPriority];

                return sortPriority === "asc"
                    ? priorityA - priorityB
                    : priorityB - priorityA;
            }

            if (sortBy === "status") {
                const statusA = statusOrder[a.status as TicketStatus];
                const statusB = statusOrder[b.status as TicketStatus];

                return sortStatus === "asc"
                    ? statusA - statusB
                    : statusB - statusA;
            }

            return 0;
        });
    }, [
        ticketList,
        search,
        categoryFilter,
        sortBy,
        sortPriority,
        sortStatus,
    ]);

    const getStatusBadge = (status: TicketStatus) => {
        switch (status) {
            case "Open":
                return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";

            case "In Progress":
                return "bg-sky-500/10 text-sky-400 border-sky-500/20";

            case "Resolved":
            case "Closed":
                return "bg-slate-500/10 text-slate-400 border-slate-500/20";

            default:
                return "bg-slate-500/10 text-slate-400 border-slate-500/20";
        }
    };

    const getPriorityBadge = (priority: TicketPriority) => {
        switch (priority) {
            case "Low":
                return "bg-slate-500/10 text-slate-400 border-slate-500/20";

            case "Medium":
                return "bg-amber-500/10 text-amber-400 border-amber-500/20";

            case "High":
                return "bg-red-500/10 text-red-400 border-red-500/20";

            case "Urgent":
                return "bg-rose-500/10 text-rose-400 border-rose-500/20";

            default:
                return "bg-slate-500/10 text-slate-400 border-slate-500/20";
        }
    };

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-lg font-bold text-white">Ticket List</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Showing {processedTickets.length} filtered Tickets
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <input type="text" placeholder="Search ticket title..." value={search} onChange={(e) => setSearch(e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                    />

                    {isAdmin &&
                        <button onClick={() => setIsModalOpen(true)} className="bg-slate-900 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 px-3 py-2 rounded-lg transition-colors">Add Ticket</button>
                    }
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex flex-wrap items-center gap-3">
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value as TicketCategory)}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-sky-500 transition-colors">
                        <option value="All">All Tickets</option>
                        {categories.map((category) => {
                            return (
                                <option value={category}>{category}</option>
                            )
                        })}
                    </select>

                    <button
                        onClick={() => {
                            setSortBy("priority");
                            setSortPriority((prev) => (prev === "asc" ? "desc" : "asc"))
                        }
                        }
                        className="bg-slate-900 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 px-3 py-2 rounded-lg transition-colors"
                    >
                        Priority: {sortPriority === "asc" ? "Low → Urgent ↑" : "Urgent → Low ↓"}
                    </button>
                    <button
                        onClick={() => {
                            setSortBy("status");
                            setSortStatus((prev) => (prev === "asc" ? "desc" : "asc"))
                        }
                        }
                        className="bg-slate-900 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 px-3 py-2 rounded-lg transition-colors"
                    >
                        Status: {sortStatus === "asc" ? "Open → Closed ↑" : "Closed → Open ↓"}
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-700 text-xs font-semibold uppercase text-slate-400">
                            <th className="py-3 px-4">Ticket ID</th>
                            <th className="py-3 px-4">Title</th>
                            <th className="py-3 px-4">Description</th>
                            <th className="py-3 px-4">Assignee</th>
                            <th className="py-3 px-4">Category</th>
                            <th className="py-3 px-4">Created At</th>
                            <th className="py-3 px-4">Priority</th>
                            <th className="py-3 px-4 text-right">Status</th>
                            {isAdmin &&
                                <th className="py-3 px-4 text-right">Actions</th>
                            }
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50 text-sm">
                        {processedTickets.length > 0 ? (
                            processedTickets.map((ticket) => (
                                <tr key={ticket.id} className="hover:bg-slate-700/30 transition-colors">
                                    <td className="py-3.5 px-4 font-mono text-xs text-slate-400">{ticket.id}</td>
                                    <td className="py-3.5 px-4 text-white">{ticket.title}</td>
                                    <td className="py-3.5 px-4 text-slate-400">{ticket.description}</td>
                                    <td className="py-3.5 px-4 text-green-400">{ticket.assignee}</td>
                                    <td className="py-3.5 px-4 font-semibold text-slate-200">{ticket.category}</td>
                                    <td className="py-3.5 px-4 text-green-400">{ticket.createdAt}</td>
                                    <td className="py-3.5 px-4 text-green-400">
                                        <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getPriorityBadge(ticket.priority)}`}>{ticket.priority}</span>
                                    </td>
                                    <td className="py-3.5 px-4 text-right">
                                        <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getStatusBadge(ticket.status)}`}>{ticket.status}</span>
                                    </td>
                                    <td className="py-3.5 px-4 text-right">
                                        {isAdmin &&
                                            <button onClick={() => handleDelete(ticket.id)} className="bg-red-900 hover:bg-slate-700 border border-red-700 text-xs font-semibold text-red-300 px-3 py-2 rounded-lg transition-colors">Delete</button>
                                        }
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={isAdmin ? 9 : 8} className="py-8 text-center text-slate-500 text-sm">
                                    No ticket found matching your criteria
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <TicketsEditor
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddTicket}
                categories={categories}
            />
        </div>
    )
}
