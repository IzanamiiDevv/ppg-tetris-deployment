import { createFileRoute } from "@tanstack/react-router";
import PlugPlayGo from "../assets/PlugPlayGo.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2 text-4xl font-bold text-center flex flex-col justify-center">
      <img
        src={PlugPlayGo}
        alt="Plug Play Go Logo"
        className="w-[100px] h-[100px] mx-auto"
      />
      <h3>
        <span className="text-blue-500">Plug</span>
        <span className="text-red-500">Play</span>
        <span className="text-green-500">Go🔌⚡</span>
      </h3>
      <div className="text-xl mx-auto max-w-[1000px] mt-56 font-recursive text-left">
        Plug Play Go: CORE Gaming Hackathon 🎮🚀 <br /> Code. Compete. Conquer.
        Welcome to Plug Play Go, the ultimate CORE Gaming Hackathon where
        developers, designers, and gamers come together to build, innovate, and
        dominate! <br />
        <div>
          🔹 Challenge: Create a unique spin on the classic tetris. <br /> 🔹
          Goal: Push your creativity, coding skills, and game mechanics to the
          limit <br /> 🔹 Who Can Join? Game devs, designers, coders, and anyone
          passionate about gaming! <br /> 💡 Are you ready to stack up the
          competition? 🔥 Plug in. 🎮 Play hard. 🚀 Go beyond.
        </div>
      </div>
    </div>
  );
}
