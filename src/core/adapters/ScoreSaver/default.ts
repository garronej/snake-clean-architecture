
import type { ScoreSaver } from "core/ports/ScoreSaver";


export function createScoreSaver(
    params: {
        apiBaseURL: string;
    }
): ScoreSaver {

    return {
        "getScores": async () => {

            const response = await fetch(
                `${params.apiBaseURL}/scores`
            );

            const scores = await response.json();

            return scores;

        },
        "saveScore": async ({ playerName, score }) => {

            await fetch(
                `${params.apiBaseURL}/scores`,
                {
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "body": JSON.stringify({ playerName, score })
                }
            );

        }
    };

}

