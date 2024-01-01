export type ScoreSaver = {
    saveScore: (
        params: {
            playerName: string;
            score: number;
        }
    ) => Promise<void>;
    getScores: () => Promise<{
        playerName: string;
        score: number;
    }[]>;
};