
import { getCoreSync, useCoreState } from "core";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
    className?: string;
}

export function Leaderboard(props: Props) {

    const { className } = props;

    const {
      functions: { leaderboard },
    } = getCoreSync();

    useEffect(
        () => {
            leaderboard.initializeOrUpdate();
            
        },
        []
    );

    const { isReady, playerCount, sortedScores } = useCoreState("leaderboard", "main");

    if (!isReady) {
        return <CircularProgress />;
    }

    return (
        <div className={className}>
            <h1>Leaderboard</h1>
            <p>There are {playerCount} players in the leaderboard</p>
            <ol>
                {sortedScores.map(
                    (score, index) => (
                        <li key={index}>
                            {score.playerName} - {score.score}
                        </li>
                    )
                )}
            </ol>
        </div>
    );

}