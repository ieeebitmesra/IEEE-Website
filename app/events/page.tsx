import { EventCard } from "@/components/ui/events/EventCard";
import { Header1 } from "@/components/ui/header";

export default function EventsPage() {
  const events = [
    {
      title: "Mega Project",
      date: "Wednesday, January 29",
      status: "LIVE",
      description: "A symposium to encourage students to make projects that have the capability to change something",
      registrations: "100+ registrations",
      remainingTime: null
    },
    {
      title: "L.E.A.D",
      date: "Friday, February 16",
      status: "UPCOMING",
      description: "A symposium to encourage students to make projects that have the capability to change something",
      registrations: "100+ registrations",
      remainingTime: "35d 2h remaining"
    },
    {
      title: "Coding Weekender",
      date: "Wednesday, January 29",
      status: "UPCOMING",
      description: "A symposium to encourage students to make projects that have the capability to change something",
      registrations: "100+ registrations",
      remainingTime: "18d 8h remaining"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-[#030303] to-rose-900">
      <Header1 />
      <div className="container mx-auto px-4 pt-24">
        <div className="relative">
          <h1 className="text-6xl font-bold text-white mb-12 text-center">Events</h1>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-rose-500/20 blur-3xl -z-10" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          <div className="absolute inset-0 bg-grid opacity-20 -z-10" />
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
} 