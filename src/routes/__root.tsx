import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import PlugPlayGo from "../assets/PlugPlayGoLogo.png";
import blueTriangle from "../assets/blue-triangle.png";
import greenSquare from "../assets/green-square.png";
import redX from "../assets/red-x.png";
import yellowCircle from "../assets/yellow-circle.png";
import Footer from "../components/footer";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex justify-between ml-16 mr-16 mt-2 items-center pointer-events-none">
        <img
          src={PlugPlayGo}
          alt="Plug Play Go Logo"
          className="w-[200px] h-[70px]"
        />
        <div className="flex gap-8 pointer-events-auto text-xl mt-2">
          <Link
            to="/"
            className="relative group btn text-black ease-out hover:translate-y-1 transition-all rounded"
          >
            <img
              src={blueTriangle}
              alt="Home Blue Triangle"
              className="w-[40px] h-[40px] transition-transform duration-500 ease-in-out hover:scale-110"
            />
            <span className="absolute left-1/2 -translate-x-1/2 top-[40px] text-blue-700 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-[&.active]:opacity-100">
              Home
            </span>
          </Link>
          <Link
            to="/play"
            className="relative group btn text-black ease-out hover:translate-y-1 transition-all rounded"
          >
            <img
              src={yellowCircle}
              alt="Play Yellow Circle"
              className="w-[40px] h-[40px] transition-transform duration-500 ease-in-out hover:scale-110 rounded-full"
            />
            <span className="absolute left-1/2 -translate-x-1/2 top-[40px] text-blue-700 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-[&.active]:opacity-100">
              Play
            </span>
          </Link>
          <Link
            to="/about"
            className="relative group btn bg-transparent ease-out hover:translate-y-1 transition-all rounded"
          >
            <img
              src={redX}
              alt="Red X"
              className="w-[40px] h-[40px] transition-transform duration-500 ease-in-out hover:scale-110"
            />
            <span className="absolute left-1/2 -translate-x-1/2 top-[40px] text-blue-700 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-[&.active]:opacity-100">
              About
            </span>
          </Link>
          <Link
            to="/road-map"
            className="relative group btn text-black ease-out hover:translate-y-1 transition-all rounded"
          >
            <img
              src={greenSquare}
              alt="Green Square"
              className="w-[40px] h-[40px] transition-transform duration-500 ease-in-out hover:scale-110"
            />
            <span className="absolute left-1/2 -translate-x-1/2 top-[40px] text-blue-700 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-[&.active]:opacity-100">
              Road Map
            </span>
          </Link>
        </div>
      </div>
      <Footer />
      <Outlet />
    </>
  ),
});
