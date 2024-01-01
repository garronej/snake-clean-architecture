import type { ScoreSaver } from "core/ports/ScoreSaver";

const localStorageKey = "scores";

export function createScoreSaver(): ScoreSaver {
    return {
        "saveScore": async ({ playerName, score }) => {

            const scores = JSON.parse(
                localStorage.getItem(localStorageKey) ?? "[]"
            ) as {
                playerName: string;
                score: number;
            }[];

            scores.push({ playerName, score });

            localStorage.setItem(localStorageKey, JSON.stringify(scores));

        },
        "getScores": async () => {

            const scores = JSON.parse(
                localStorage.getItem(localStorageKey) ?? "[]"
            ) as {
                playerName: string;
                score: number;
            }[];

            return scores;

        }
    };
}