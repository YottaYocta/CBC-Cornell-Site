import "@fontsource/inika";
import React from "react";
import Icon from "./assets/tempIcon.svg?react";
import IsometricCornell from "./IsometricCornell";
import UpcomingEvents, { type Event } from "./UpcomingEvents";
import PersonRow from "./PersonRow";

interface Person {
  name: string;
  role: string;
  email?: string;
}

function App() {
  const [showAllEvents, setShowAllEvents] = React.useState(false);

  const teamMembers: Person[] = [
    {
      name: "Kalia Cheung",
      role: "Co-President",
      email: "kc2274@cornell.edu",
    },
    {
      name: "Christina Joseph",
      role: "Co-President",
      email: "cmj95@cornell.edu",
    },
    {
      name: "Ethan Yang",
      role: "Outreach Chair",
      email: "e.yang4518@gmail.com",
    },

    {
      name: "Adeeb Khan",
      role: "Hackathon Chair",
    },

    {
      name: "Katie Xiao",
      role: "Treasurer",
    },

    {
      name: "Clément Rozé",
      role: "DEI",
    },
    {
      name: "Ryan Qiu",
      role: "Website Chair",
    },
    {
      name: "Himani Agarwal",
      role: "Marketing Chair",
    },
    {
      name: "Vivian Ren",
      role: "Senior Advisor",
    },
    {
      name: "Juliet Crane",
      role: "Alumni Advisor",
    },
  ];

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
      date: new Date("2025-10-15T18:00:00-04:00"),
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
    {
      date: new Date("2026-02-26T17:00:00-05:00"),
      name: "Second Meeting",
    },
    {
      date: new Date("2026-03-06T18:30:00-05:00"),
      name: "Third Meeting",
    },
    {
      date: new Date("2026-03-18T17:30:00-05:00"),
      name: "Fourth Meeting",
    },
    {
      date: new Date("2026-04-10T17:30:00-05:00"),
      name: "Hackathon Social Mixer",
    },
    {
      date: new Date("2026-04-17T17:30:00-05:00"),
      name: "Fifth Meeting",
    },
  ].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="w-full min-h-screen flex flex-col bg-background font-inika sm:text-base text-sm leading-8">
      <nav className="w-full bg-white flex items-center justify-center border-b border-neutral-100 px-4">
        <div className="w-2xl max-w-full h-min flex justify-between py-3 items-center">
          <div className="flex gap-4 w-min items-center">
            <Icon className="w-10 h-10" />
            <p className="text-nowrap">CBC @ Cornell</p>
          </div>
          <div className="flex gap-8 items-center text-sm">
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

          <div className="w-full max-w-full flex flex-col gap-3">
            {teamMembers.map((member) => (
              <PersonRow
                key={member.name}
                role={member.role}
                name={member.name}
                email={member.email}
              />
            ))}
          </div>
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
