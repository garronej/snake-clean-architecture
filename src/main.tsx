import React from "react";
import ReactDOM from "react-dom/client";
import { triggerCoreBootstrap } from "core";
//import { Leaderboard } from "ui/Leaderboard";
import { Game } from "ui/Game";

triggerCoreBootstrap({
  apiBaseURL: undefined,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);
