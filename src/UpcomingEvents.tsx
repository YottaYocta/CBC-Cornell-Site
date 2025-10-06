type Event = {
  name: string;
  date: string;
  time: string;
  month: string;
};

type UpcomingEventsProps = {
  events: Event[];
};

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  // Group events by month
  const eventsByMonth = events.reduce((acc, event) => {
    const month = event.month;
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  // Render a single event row
  const EventRow = ({ event }: { event: Event }) => (
    <div className="flex items-start gap-4">
      <div className="flex-1 min-w-0">
        <p className="">{event.name}</p>
      </div>
      <div className="flex gap-8 items-start">
        <p className=" text-right w-20 flex-shrink-0">{event.date}</p>
        <p className=" text-right w-16 flex-shrink-0">{event.time}</p>
      </div>
    </div>
  );

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
