import { createUsecaseActions } from "redux-clean-architecture";
import { id } from "tsafe/id";
import { assert } from "tsafe/assert";
import { same } from "evt/tools/inDepth/same";

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

            switch (state.snakeDirection) {
                case "up": state.snakeHeadPosition.y--; break;
                case "down": state.snakeHeadPosition.y++; break;
                case "left": state.snakeHeadPosition.x--; break;
                case "right": state.snakeHeadPosition.x++; break;
            }

            if (state.snakeHeadPosition.x === state.gridDimensions.width) {
                state.snakeHeadPosition.x = 0;
            }

            if (state.snakeHeadPosition.x === -1) {
                state.snakeHeadPosition.x = state.gridDimensions.width - 1;
            }

            if (state.snakeHeadPosition.y === state.gridDimensions.height) {
                state.snakeHeadPosition.y = 0;
            }

            if (state.snakeHeadPosition.y === -1) {
                state.snakeHeadPosition.y = state.gridDimensions.height - 1;
            }

            state.snakeTail.unshift(state.snakeDirection);

            if (same(state.snakeHeadPosition, state.fruitPosition)) {

                state.fruitPosition = {
                    "x": Math.floor(Math.random() * state.gridDimensions.width),
                    "y": Math.floor(Math.random() * state.gridDimensions.height)
                };

                //TODO: Check if the fruit is not on the snake

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
        }
    }
});

