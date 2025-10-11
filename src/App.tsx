import "@fontsource/inika";
import React from "react";
import Icon from "./assets/tempIcon.svg?react";
import IsometricCornell from "./IsometricCornell";
import UpcomingEvents, { type Event } from "./UpcomingEvents";

function App() {
  const [showAllEvents, setShowAllEvents] = React.useState(false);
  const [timeRemaining, setTimeRemaining] = React.useState("");

  // Calculate deadline: 48 hours from 7:15 PM today
  const deadline = React.useMemo(() => {
    const today = new Date();
    today.setHours(19, 15, 0, 0); // 7:15 PM
    return new Date(today.getTime() + 48 * 60 * 60 * 1000); // Add 48 hours
  }, []);

  React.useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = Math.max(0, deadline.getTime() - now.getTime());

      if (diff === 0) {
        setTimeRemaining("0hr 0min 0s");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours}hr ${minutes}min ${seconds}s`);
    };

    // Update immediately
    updateTimer();

    // Then update every second
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  const allEvents: Event[] = [
    {
      date: new Date("2025-09-23T12:00:00-08:00"),
      name: "Societal Impacts of AI Seminar",
    },
    {
      date: new Date("2025-09-24T16:00:00-08:00"),
      name: "Claude Code Workshop",
    },
    {
      date: new Date("2025-09-30T13:00:00-08:00"),
      name: "AI Research Salon",
    },
    {
      date: new Date("2025-10-01T16:00:00-08:00"),
      name: "Building Agents Workshop",
    },
    {
      date: new Date("2025-10-07T12:00:00-08:00"),
      name: "Claude Code Workshop",
    },
    {
      date: new Date("2025-10-08T16:00:00-08:00"),
      name: "Societal Impacts of AI",
    },
    {
      date: new Date("2025-10-10T19:15:00-04:00"),
      name: "Club Meeting @ CTown Ehub",
    },
    {
      date: new Date("2025-10-21T12:00:00-08:00"),
      name: "Building Agents Workshop",
    },
    {
      date: new Date("2025-10-22T16:00:00-08:00"),
      name: "AI Research Salon",
    },
    {
      date: new Date("2025-10-24T18:15:00-04:00"),
      name: "Club Meeting @ CTown Ehub",
    },
    {
      date: new Date("2025-10-28T12:00:00-08:00"),
      name: "Building with MCP Workshop",
    },
    {
      date: new Date("2025-10-29T16:00:00-08:00"),
      name: "Building with MCP Workshop",
    },
    {
      date: new Date("2025-11-07T18:15:00-05:00"),
      name: "Club Meeting @ CTown Ehub",
    },
    {
      date: new Date("2025-11-12T12:00:00-08:00"),
      name: "Claude Code Workshop",
    },
    {
      date: new Date("2025-11-12T16:00:00-08:00"),
      name: "Entering the workforce in a post AI world",
    },
    {
      date: new Date("2025-11-15T08:00:00-05:00"),
      name: "Claude Hackathon",
    },
    {
      date: new Date("2025-11-21T18:15:00-05:00"),
      name: "Club Meeting @ CTown Ehub",
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col bg-background font-inika sm:text-base text-sm leading-8">
      <nav className="w-full bg-white flex items-center justify-center border-b border-neutral-100 px-4">
        <div className="w-2xl max-w-full h-min flex justify-between py-3 items-center">
          <div className="flex gap-4 w-min items-center">
            <Icon className="w-10 h-10" />
            <p className="text-nowrap">CBC @ Cornell</p>
          </div>
          <div className="flex gap-8 items-center text-sm">
            {/* <a href="#about" className="text-nowrap">
              About
            </a>
            <a href="#upcoming-events" className="text-nowrap">
              Upcoming
            </a>
            <a href="#our-team" className="text-nowrap">
              Our Team
            </a> */}
            <a
              href="https://join.slack.com/t/cornellclaude-suc1909/shared_invite/zt-3cyow4z6c-Ql14rUGf3JIj9T6P_efZ0g"
              target="_blank"
              className="bg-neutral-900 text-white hover:bg-neutral-700 active:bg-neutral-500 px-3 py-2 rounded-md transition duration-75 cursor-pointer text-nowrap"
            >
              Join our Slack
            </a>
          </div>
        </div>
      </nav>
      <main className="w-full min-h-full h-full flex flex-col items-center bg-background gap-12 py-8 text-neutral-600 px-4 text-justify">
        <div className="w-2xl max-w-full border border-[#a2d89e] drop-shadow-amber-300 shadow rounded-md bg-white flex-col gap-4 overflow-clip">
          <div className="w-full flex items-center justify-center py-1 bg-[#d9f3c7]">
            <p className="text-[#75b470]">Announcement</p>
          </div>

          <div className="w-full flex items-center justify-center p-4 border-t border-[#a2d89e]">
            <div className="w-full flex flex-col justify-between items-center text-nowrap">
              <p className="font-bold">
                48-hour App Building Challenge Now Live!
              </p>
              <p>Time remaining: {timeRemaining}</p>
            </div>
            <p>
              <a
                className="bg-neutral-900 text-white hover:bg-neutral-700 active:bg-neutral-500 px-3 py-2 rounded-md transition duration-75 cursor-pointer text-nowrap mr-8"
                href="mailto:jlc565@cornell.edu?subject=48 Hour App Challenge - [Your Name]"
              >
                Submit your Creations
              </a>
            </p>
          </div>
        </div>

        <IsometricCornell
          width={window.innerWidth < 500 ? 6 : 10}
          height={window.innerWidth < 500 ? 6 : 6}
          className="w-xl max-w-full -mt-4 min-h-64 sm:min-h-96 "
        ></IsometricCornell>

        <section
          id="about"
          className="w-2xl max-w-full flex flex-col gap-2 justify-center"
        >
          <p>
            <span className="font-bold">Cornell's Claude Builders Club </span>
            is a student-run branch of Anthropic's Claude Builders Club Program.
            We aim to build, learn, and share projects that push the boundaries
            of what's possible with modern AI tools.{" "}
          </p>
        </section>

        <section
          id="upcoming-events"
          className="w-2xl max-w-full flex flex-col gap-8"
        >
          <div className="w-full flex items-center justify-between border-b border-b-neutral-300">
            <h2 className="sm:text-lg text-neutral-900 font-bold">Events</h2>
            <button
              onClick={() => setShowAllEvents(!showAllEvents)}
              className="text-sm underline hover:no-underline cursor-pointer"
            >
              {showAllEvents ? "Show less" : "Show all events"}
            </button>
          </div>

          <UpcomingEvents
            events={allEvents}
            showAll={showAllEvents}
            handleShowAll={setShowAllEvents}
          />
        </section>

        <section
          id="our-team"
          className="w-2xl max-w-full flex flex-col justify-center items-start gap-8"
        >
          <h2 className="w-full text-neutral-900 border-b border-b-neutral-300 text-nowrap sm:text-lg font-bold">
            Our Team
          </h2>
          <p>
            CBC @ Cornell is open to all, regardless of technical background.
            Just join{" "}
            <a
              href="https://join.slack.com/t/cornellclaude-suc1909/shared_invite/zt-3cyow4z6c-Ql14rUGf3JIj9T6P_efZ0g"
              className="underline font-bold cursor-pointer"
            >
              our slack
            </a>{" "}
            and attend weekly meetings{" "}
          </p>
          <p>
            Membership perks include free Claude API credits, a Claude Pro
            account, and the opportunity to collaborate with some of the best
            designers, developers, and creatives at Cornell
          </p>
        </section>
        <footer className="w-full h-min flex items-center justify-center px-4 py-1 sm:py-2 mt-8 sm:mt-16">
          <div className="w-2xl max-w-full flex items-center justify-center gap-4">
            <a
              href="https://www.instagram.com/claudeatcornell/"
              className="cursor-pointer underline text-neutral-400"
              target="_blank"
            >
              Instagram
            </a>
            <a
              href="https://claude.com/programs/campus"
              className="cursor-pointer underline text-neutral-400"
              target="_blank"
            >
              Claude Campus Programs
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
