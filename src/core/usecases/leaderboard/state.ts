
import { createUsecaseActions } from "clean-architecture";
import { id } from "tsafe/id";

type State = State.NotFetched | State.Ready;

namespace State {

    type Common = {
        isFetching: boolean;
    };

    export type NotFetched = Common & {
        stateDescription: "not fetched";
    };

    export type Ready = Common & {
        stateDescription: "ready";
        scores: {
            playerName: string;
            score: number;
        }[];
    };

}

export const name = "leaderboard";

export const { actions, reducer } = createUsecaseActions({
    name,
    "initialState": id<State>({
        "stateDescription": "not fetched",
        "isFetching": false,
    }),
    "reducers": {
        "startFetching": (state) => {
            state.isFetching = true;
        },
        "fetched": (_state, { payload }: { payload: { scores: State.Ready["scores"]; } }) => {
            const { scores } = payload;

            return {
                "stateDescription": "ready",
                "isFetching": false,
                scores
            };
        }
    }
});




