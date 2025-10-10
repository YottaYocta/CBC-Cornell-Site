export type Event = {
  name: string;
  date: Date;
};

type UpcomingEventsProps = {
  events: Event[];
  showAll: boolean;
};

export default function UpcomingEvents({
  events,
  showAll,
}: UpcomingEventsProps) {
  const currentTime = Date.now();

  const filteredEvents = showAll
    ? events
    : events.filter((event) => event.date.getTime() >= currentTime).slice(0, 5);

  const eventsByMonth = filteredEvents.reduce((acc, event) => {
    const month = event.date.toLocaleDateString("en-US", { month: "long" });
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  const formatEventDate = (date: Date): string => {
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    const dateNum = date.getDate();
    const suffix =
      dateNum % 10 === 1 && dateNum !== 11
        ? "st"
        : dateNum % 10 === 2 && dateNum !== 12
        ? "nd"
        : dateNum % 10 === 3 && dateNum !== 13
        ? "rd"
        : "th";
    return `${day}, ${dateNum}${suffix}`;
  };

  const formatEventTime = (date: Date): string => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const EventRow = ({ event }: { event: Event }) => {
    const isPast = event.date.getTime() < currentTime;

    return (
      <div
        className={`flex items-start gap-4 ${isPast ? "text-neutral-300" : ""}`}
      >
        <div className="flex gap-8 items-start">
          <p className="w-20 flex-shrink-0">{formatEventDate(event.date)}</p>
          <p className="w-16 flex-shrink-0">{formatEventTime(event.date)}</p>
        </div>

        <div
          className={`items-end flex-1 min-w-0 ${isPast ? "line-through" : ""}`}
        >
          <p className="text-right">{event.name}</p>
        </div>
      </div>
    );
  };

  // Render a section of events grouped by month
  const EventSection = ({
    title,
    events,
  }: {
    title: string;
    events: Event[];
  }) => (
    <div className="flex flex-col gap-4">
      <h3 className="text-neutral-400 text-sm">{title}</h3>
      <div className="flex flex-col gap-3">
        {events.map((event, index) => (
          <EventRow key={index} event={event} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-full flex flex-col gap-8">
      {Object.entries(eventsByMonth).map(([month, monthEvents]) => (
        <EventSection key={month} title={month} events={monthEvents} />
      ))}
    </div>
  );
}
