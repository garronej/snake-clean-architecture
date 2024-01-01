
import React from "react";
import ReactDOM from "react-dom/client";
import { createCoreProvider } from "core";
import { Leaderboard } from "ui/Leaderboard";

const { CoreProvider } = createCoreProvider({
    "apiBaseURL": undefined
});



const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <CoreProvider>
            <Leaderboard />
        </CoreProvider>
    </React.StrictMode>
);
