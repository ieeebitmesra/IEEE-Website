import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface EventCardProps {
  title: string;
  date: string;
  status: "LIVE" | "UPCOMING";
  description: string;
  registrations: string;
  remainingTime: string | null;
}

export function EventCard({
  title,
  date,
  status,
  description,
  registrations,
  remainingTime,
}: EventCardProps) {
  return (
    <div className="rounded-lg bg-[#0A0A2C]/80 backdrop-blur-sm border border-white/10 p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2 text-blue-400">
        <Calendar className="w-4 h-4" />
        <span className="text-sm">{date}</span>
      </div>
      
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      
      {status === "LIVE" && (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-500 text-sm">LIVE</span>
        </div>
      )}
      
      {remainingTime && (
        <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm w-fit">
          {remainingTime}
        </div>
      )}
      
      <p className="text-gray-400">{description}</p>
      
      <div className="text-sm text-gray-500">
        {registrations}
      </div>
      
      <div className="flex flex-col gap-2 mt-auto">
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
          Register Now
        </Button>
        <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
          Add to Calendar
        </Button>
      </div>
    </div>
  );
} 