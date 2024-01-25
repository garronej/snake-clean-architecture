
import { type State as RootState } from "core/bootstrap";
import { name } from "./state";
import { createSelector } from "clean-architecture";
import { assert } from "tsafe/assert";

const state = (rootState: RootState) => rootState[name];

const isReady = createSelector(state, state => state.stateDescription === "ready");

const isLoading = createSelector(state, state => state.isFetching);

const sortedScores = createSelector(state, state => {

    if (state.stateDescription !== "ready") {
        return undefined;
    }

    const { scores } = state;

    return [...scores].sort((a, b) => b.score - a.score);

});

const playerCount = createSelector(state, state => {

    if (state.stateDescription !== "ready") {
        return undefined;
    }

    const names = new Set<string>();

    for (const { playerName } of state.scores) {
        names.add(playerName);
    }

    return names.size;

});

const main = createSelector(
    isReady,
    isLoading,
    sortedScores,
    playerCount,
    (isReady, isLoading, sortedScores, playerCount) => {

        if (!isReady) {

            return {
                "isReady": false as const,
                isLoading
            };

        }

        assert(sortedScores !== undefined);
        assert(playerCount !== undefined);

        return {
            "isReady": true as const,
            isLoading,
            sortedScores,
            playerCount
        };

    }
);

export const selectors = { main };


