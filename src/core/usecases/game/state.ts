import { createUsecaseActions } from "clean-architecture";
import { id } from "tsafe/id";
import { assert } from "tsafe/assert";
import { same } from "evt/tools/inDepth/same";
import { movePointOnGrid } from "./utils/movePointOnGrid";
import { isOnSnake } from "./utils/isOnSnake";

type State = State.NotStarted | State.Running;

namespace State {

    export type NotStarted = {
        stateDescription: "not started";
    };

    export type Running = {
        stateDescription: "running";
        snakeDirection: "up" | "down" | "left" | "right";
        fruitPosition: {
            x: number;
            y: number;
        };
        snakeHeadPosition: {
            x: number;
            y: number;
        };
        snakeTail: ("up" | "down" | "left" | "right")[];
        gridDimensions: {
            width: number;
            height: number;
        };
    };
}

export const name = "game";

export const { actions, reducer } = createUsecaseActions({
    name,
    "initialState": id<State>({
        "stateDescription": "not started",
    }),
    "reducers": {
        "initialized": () => {
            return id<State.Running>({
                "stateDescription": "running",
                "snakeDirection": "right",
                "fruitPosition": {
                    "x": 5,
                    "y": 5
                },
                "snakeHeadPosition": {
                    "x": 3,
                    "y": 3
                },
                "snakeTail": ["left", "left", "left"],
                "gridDimensions": {
                    "width": 10,
                    "height": 10
                }
            });
        },
        "update": state => {

            assert(state.stateDescription === "running");

            state.snakeHeadPosition = movePointOnGrid({
                "gridDimensions": state.gridDimensions,
                "point": state.snakeHeadPosition,
                "direction": state.snakeDirection
            });

            state.snakeTail.unshift((() => {
                switch (state.snakeDirection) {
                    case "up": return "down";
                    case "down": return "up";
                    case "left": return "right";
                    case "right": return "left";
                }
            })());

            if (same(state.snakeHeadPosition, state.fruitPosition)) {

                while (true) {

                    state.fruitPosition = {
                        "x": Math.floor(Math.random() * state.gridDimensions.width),
                        "y": Math.floor(Math.random() * state.gridDimensions.height)
                    };

                    if (!isOnSnake({
                        "snakeHeadPosition": state.snakeHeadPosition,
                        "snakeTail": state.snakeTail,
                        "gridDimensions": state.gridDimensions,
                        "point": state.fruitPosition
                    })) {
                        break;
                    }

                }


            } else {
                state.snakeTail.pop();
            }

        },
        "snakeDirectionChanged": (state, { payload }: {
            payload: {
                direction: "up" | "down" | "left" | "right";
            }
        }) => {

            assert(state.stateDescription === "running");

            const { direction } = payload;

            if (
                (state.snakeDirection === "up" && direction === "down") ||
                (state.snakeDirection === "down" && direction === "up") ||
                (state.snakeDirection === "left" && direction === "right") ||
                (state.snakeDirection === "right" && direction === "left")
            ) {
                return;
            }

            state.snakeDirection = direction;
        },
        //"notifyFruitEaten": () => {}
    }
});

