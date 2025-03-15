import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/road-map")({
  component: RoadMap,
});

function RoadMap() {
  return <div>Hello "/road-map"!</div>;
}
