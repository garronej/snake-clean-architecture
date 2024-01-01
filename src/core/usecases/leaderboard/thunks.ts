
import type { Thunks } from "core/bootstrap";
import { actions, name } from "./state";

export const thunks = {
    "initializeOrUpdate": () => async (...args) => {

        const [dispatch, getState, rootContext] = args;

        if (getState()[name].isFetching) {
            return;
        }

        const { scoreSaver } = rootContext;

        dispatch(actions.startFetching());

        const scores = await scoreSaver.getScores();

        dispatch(actions.fetched({
            scores
        }));

    }
} satisfies Thunks;

