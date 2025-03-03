import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import PlugPlayGo from "../assets/PlugPlayGoLogo.png";
import blueTriangle from "../assets/blue-triangle.png";
import greenSquare from "../assets/green-square.png";
import redX from "../assets/red-x.png";
import yellowCircle from "../assets/yellow-circle.png";

const colors = [
  // "bg-red-500/90",
  // "bg-yellow-500/90",
  // "bg-green-500/90",
  // "bg-blue-500/90",
  "bg-gradient-to-b from-blue-700 to-blue-400",
  "bg-gradient-to-b from-green-700 to-green-400",
  "bg-gradient-to-b from-red-700 to-red-400",
  "bg-gradient-to-b from-yellow-700 to-yellow-400",
  "bg-gradient-to-b from-green-700 to-green-400",
  "bg-gradient-to-b from-yellow-700 to-yellow-400",
  "bg-gradient-to-b from-red-700 to-red-400",
  "bg-gradient-to-b from-blue-700 to-blue-400",
];

const char = ["P", "P", "G", ""];

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex"></div>
      <div className="flex justify-between ml-16 mr-16 mt-2 items-center pointer-events-none">
        <img
          src={PlugPlayGo}
          alt="Plug Play Go Logo"
          className="w-[200px] h-[70px]"
        />
        <div className="flex gap-4 pointer-events-auto text-xl mt-2">
          <Link
            to="/"
            className="[&.active]:text-green-700 hover:text-green-700 [&.active]:font-bold"
          >
            <img
              src={blueTriangle}
              alt="Home Blue Triangle"
              className="w-[50px] h-[50px]"
            />
          </Link>
          <Link
            to="/play"
            className="[&.active]:text-green-700 [&.active]:font-bold hover:text-green-700"
          >
            <img
              src={yellowCircle}
              alt="Play Yellow Circle"
              className="w-[50px] h-[50px]"
            />
          </Link>
          <Link
            to="/about"
            className="[&.active]:text-green-700 [&.active]:font-bold hover:text-green-700"
          >
            <img src={redX} alt="Red X" className="w-[50px] h-[50px]" />
          </Link>
          <Link
            to="/play"
            className="[&.active]:text-green-700 [&.active]:font-bold hover:text-green-700"
          >
            <img src={greenSquare} alt="Red X" className="w-[50px] h-[50px]" />
          </Link>
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 w-full bg-white shadow-md">
        <div className="flex justify-center items-center flex-wrap">
          <footer className="fixed bottom-0 left-0 w-full bg-white shadow-md">
            <div className="flex justify-center items-center flex-wrap">
              {Array.from({ length: 48 }).map((_, i) => {
                const isFourth = (i + 1) % 4 === 0;
                const color = isFourth
                  ? "bg-gradient-to-b from-yellow-700 to-yellow-400"
                  : colors[i % colors.length];

                return (
                  <div
                    key={i}
                    className={`w-10 h-10 flex items-center justify-center ${color}`}
                  >
                    <span className="text-black font-bold text-xs">
                      {!isFourth ? char[i % char.length] : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          </footer>
        </div>
      </footer>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
