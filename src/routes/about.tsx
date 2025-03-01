import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="p-2 text-2xl font-semibold text-center max-w-[1000px] mx-auto">
      <h1 className="text-4xl mb-4 mt-12">About This Project</h1>
    </div>
  );
}
