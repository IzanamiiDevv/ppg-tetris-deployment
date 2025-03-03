import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/play")({
  component: Play,
});

function Play() {
  return <div>Hello "/play"!</div>;
}
