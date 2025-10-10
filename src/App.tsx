import "@fontsource/inika";
import Icon from "./assets/tempIcon.svg?react";
import IsometricCornell from "./IsometricCornell";
import UpcomingEvents, { type Event } from "./UpcomingEvents";

function App() {
  const allEvents: Event[] = [
    {
      date: new Date("2025-09-23T12:00:00-08:00"),
      name: "Societal Impacts of AI",
    },
    {
      date: new Date("2025-09-24T16:00:00-08:00"),
      name: "Claude Code",
    },
    {
      date: new Date("2025-09-30T13:00:00-08:00"),
      name: "AI Research Salon",
    },
    {
      date: new Date("2025-10-01T16:00:00-08:00"),
      name: "Building Agents",
    },
    {
      date: new Date("2025-10-07T12:00:00-08:00"),
      name: "Claude Code",
    },
    {
      date: new Date("2025-10-08T16:00:00-08:00"),
      name: "Societal Impacts of AI",
    },
    {
      date: new Date("2025-10-10T19:15:00-04:00"),
      name: "Club Meeting",
    },
    {
      date: new Date("2025-10-21T12:00:00-08:00"),
      name: "Building Agents",
    },
    {
      date: new Date("2025-10-22T16:00:00-08:00"),
      name: "AI Research Salon",
    },
    {
      date: new Date("2025-10-24T19:15:00-04:00"),
      name: "Club Meeting",
    },
    {
      date: new Date("2025-10-28T12:00:00-08:00"),
      name: "Building with MCP",
    },
    {
      date: new Date("2025-10-29T16:00:00-08:00"),
      name: "Building with MCP",
    },
    {
      date: new Date("2025-11-07T19:15:00-05:00"),
      name: "Club Meeting",
    },
    {
      date: new Date("2025-11-12T12:00:00-08:00"),
      name: "Claude Code",
    },
    {
      date: new Date("2025-11-12T16:00:00-08:00"),
      name: "Entering the workforce in a post AI world",
    },
    {
      date: new Date("2025-11-21T19:15:00-05:00"),
      name: "Club Meeting",
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
      <main className="w-full min-h-full h-full flex flex-col items-center bg-background gap-8 py-8 text-neutral-800 px-4 text-justify">
        <IsometricCornell
          width={10}
          height={6}
          className="w-2xl max-w-full -mt-4 min-h-64 sm:min-h-96 "
        ></IsometricCornell>

        <section
          id="about"
          className="w-2xl max-w-full flex flex-col gap-2 justify-center"
        >
          {/* <h2 className="w-full sm:text-lg text-neutral-400 border-b border-b-neutral-300">
            About
          </h2> */}
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
          <h2 className="w-full sm:text-lg text-neutral-800 border-b border-b-neutral-300">
            Events
          </h2>

          <UpcomingEvents events={allEvents} />
        </section>

        <section
          id="our-team"
          className="w-2xl max-w-full flex flex-col justify-center items-start gap-8"
        >
          <h2 className="w-full text-neutral-800 border-b border-b-neutral-300 text-nowrap sm:text-lg">
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
