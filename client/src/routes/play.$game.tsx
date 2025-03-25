import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/play/$game")({
  component: Game,
});

function Game() {
  return <div className="flex">Dummy URL</div>;
}
