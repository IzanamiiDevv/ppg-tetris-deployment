import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2 text-4xl font-bold text-center flex flex-col justify-center">
      <div className="text-xl mx-auto max-w-[800px] mt-56 font-recursive text-left">
        "We simplify mini-games deployment for game project builders and make
        GameFi really fun for every GameFi community."
      </div>
    </div>
  );
}
