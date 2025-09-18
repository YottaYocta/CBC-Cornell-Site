import "@fontsource/inika";
import Icon from "./assets/tempIcon.svg?react";
import IsometricCornell from "./IsometricCornell";

function App() {
  return (
    <div className="w-full h-screen min-h-screen flex flex-col bg-background font-inika sm:text-base text-sm">
      <nav className="w-full bg-white flex items-center justify-center border-b border-neutral-100 px-4">
        <div className="w-xl max-w-full h-min flex justify-between py-3 items-center">
          <div className="flex gap-4 w-min items-center">
            <Icon className="w-10 h-10" />
            <p className="text-nowrap">CBC @ Cornell</p>
          </div>
          <div className="flex gap-8 items-center">
            <button className="bg-neutral-900 text-white hover:bg-neutral-700 active:bg-neutral-500 px-3 py-2 rounded-md text-sm transition duration-75 cursor-pointer">
              Join our Newsletter
            </button>
            {/* <a href="#about" className="text-nowrap">
              About
            </a>
            <a href="#projects" className="text-nowrap">
              Projects
            </a>
            <a href="#our-team" className="text-nowrap">
              Our Team
            </a> */}
          </div>
        </div>
      </nav>
      <main className="w-full h-full flex flex-col items-center bg-background gap-8 py-8 text-neutral-800 px-4 text-justify">
        <div className="w-xl relative max-w-full flex justify-between items-start sm:text-lg sm:leading-6">
          <h1 className="flex flex-col font-bold text-start">
            <span>What Will You</span>
            <span>Make?</span>
            {/* What Will You Make? */}
          </h1>
          <h2 className="text-end flex flex-col">
            <span>Claude Builders Club</span>
            <span>@ Cornell</span>
          </h2>
        </div>
        <IsometricCornell
          width={10}
          height={6}
          className="w-xl max-w-full -mt-4"
        ></IsometricCornell>

        <section id="about" className="w-xl max-w-full flex flex-row gap-8">
          <div className="flex-1 flex flex-col items-start justify-center gap-2">
            <h2 className="text-sm text-neutral-400">About</h2>
            <p>
              Cornell's Claude Builders Club is a student-run branch of the
              Claude Builders Club. We aim to build, learn, and share projects
              that push the boundaries of what's possible with modern AI tools.{" "}
              <span className="font-bold">
                We meet Fridays 6-8pm in Kennedy Hall{" "}
              </span>
            </p>
          </div>
          {/* <div className="flex-1 bg-green-200 h-48"></div>{" "} */}
          {/* Empty image slot */}
        </section>

        {/* <section id="projects" className="w-xl max-w-full flex flex-row gap-8">
          <div className="flex-1 flex flex-col items-start justify-center">
            <h2 className="text-sm text-neutral-400">Projects</h2>
            <p>No projects</p>
          </div>
          <div className="flex-1 bg-green-200 h-48"></div>{" "}
        </section> */}

        <section id="our-team" className="w-xl max-w-full flex flex-row gap-8">
          <div className="flex-1 flex flex-col items-start justify-center gap-2">
            <h2 className="text-sm text-neutral-400">Our Team</h2>
            <p>
              CBC @ Cornell is open to anyone to join, regardless of technical
              background. Just sign up for the newsletter and attend weekly
              meetings{" "}
            </p>
            <p>
              Membership perks include free Claude API credits, a Claude Pro
              account, and the opportunity to collaborate with some of the best
              designers, developers, and creatives at Cornell
            </p>
          </div>
          {/* <div className="flex-1 bg-green-200 h-48"></div>{" "} */}
          {/* Empty image slot */}
        </section>
      </main>
    </div>
  );
}

export default App;
