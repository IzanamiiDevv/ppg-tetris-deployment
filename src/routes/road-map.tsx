import { createFileRoute } from "@tanstack/react-router";
import roadmap from "../assets/roadmap.jpeg";

export const Route = createFileRoute("/road-map")({
  component: RoadMap,
});

function RoadMap() {
  return (
    <div>
      <h1 className="text-4xl text-center mt-10">Cryptic Road Map</h1>
      <div className="flex item-center justify-center">
        <img
          src={roadmap}
          className="w-[100%] max-w-[1200px] mx-auto mt-4 opacity-80"
          alt="Road map"
        />
      </div>
    </div>
  );
}
