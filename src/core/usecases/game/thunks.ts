import { actions, name } from "./state";
import type { Thunks } from "core/bootstrap";
import { createUsecaseContextApi } from "clean-architecture";
import { id } from "tsafe/id";
import { assert } from "tsafe/assert";


export const thunks = {
    "onDirectionInput": (
        params: {
            direction: "up" | "down" | "left" | "right"
        }
    ) => (...args) => {

        const { direction } = params;

        const [dispatch] = args;

        dispatch(actions.snakeDirectionChanged({
            direction
        }));

    },
    "startOrResumeGame": () => (...args) => {

        const [dispatch, getState, rootContext] = args;

        if (getState()[name].stateDescription === "not started") {
            dispatch(actions.initialized());
        }

        const context = getContext(rootContext);

        context.interval = setInterval(
            () => {

                dispatch(actions.update());

            },
            250
        );

    },
    "pauseGame": () => (...args) => {

        const [, , rootContext] = args;

        const { interval } = getContext(rootContext);

        assert(interval !== undefined);

        clearInterval(interval);

    },

} satisfies Thunks;

const { getContext } = createUsecaseContextApi(() => ({
    "interval": id<number | undefined>(undefined)
}));

