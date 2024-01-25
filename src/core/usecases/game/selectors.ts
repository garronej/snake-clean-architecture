import type { State as RootState } from "core/bootstrap";
import { name } from "./state";
import { createSelector } from "clean-architecture";
import { isOnSnake } from "./utils/isOnSnake";
import { same } from "evt/tools/inDepth/same";

const state = (rootState: RootState) => rootState[name];

const fruitPosition = createSelector(
    state,
    state => {
        if (state.stateDescription === "not started") {
            return undefined;
        }

        return state.fruitPosition;
    }
);

type GameMatrix = ("empty" | "snake" | "food")[][];

const gameMatrix = createSelector(
    state,
    state => {
        if (state.stateDescription === "not started") {
            return undefined;
        }

        const out: GameMatrix = [];

        for (let y = 0; y < state.gridDimensions.height; y++) {
            out.push([]);
            for (let x = 0; x < state.gridDimensions.width; x++) {

                const point = { x, y };

                const surface = (() => {
                    if (same(point, state.fruitPosition)) {
                        return "food";
                    }

                    if (isOnSnake({
                        "snakeHeadPosition": state.snakeHeadPosition,
                        "snakeTail": state.snakeTail,
                        "gridDimensions": state.gridDimensions,
                        point
                    })) {
                        return "snake";
                    }

                    return "empty";

                })();

                out[y].push(surface);
            }
        }

        return out;

    }
);




export const privateSelectors = { fruitPosition };

export const selectors = { gameMatrix };