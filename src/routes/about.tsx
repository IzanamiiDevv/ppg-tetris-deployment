import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="p-2 text-2xl font-semibold text-center max-w-[1200px] mx-auto">
      <h1 className="text-4xl mb-4 mt-12">About Us</h1>
      <div className="text-xl mx-auto max-w-[1200px] font-recursive text-left">
        At PlugPlayGo, we believe GameFi should be fun, accessible, and truly
        engaging for every community. We simplify mini-game deployment for game
        projects, making it easy to integrate interactive, viral-ready games
        with real crypto utility. We’re starting with Tetris-style PvP battles,
        where players can wager community tokens in winner-takes-all matches.{" "}
        <br />
        <br />
        <div>
          What’s Next? <br /> 🔹 More Mini-Games – We’re building a library of
          simple, engaging games that communities can enjoy. <br /> 🔹
          White-Label Reskinning – GameFi projects can customize our games with
          their own IP and NFTs at low cost. <br /> 🔹 Plug & Play Integration –
          No need for complex dev work—just deploy, brand, and engage your
          community instantly.
        </div>
        <br />
        <div>
          But this is just the beginning. Our vision is to automate mini-game
          deployment, enabling any GameFi project to launch exciting,
          custom-branded games without spending a fortune on development. GameFi
          should be more than just staking and farming—it should be fun. With
          PlugPlayGo, we’re making sure it is.
        </div>
      </div>
    </div>
  );
}
