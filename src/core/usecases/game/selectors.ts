import type { State as RootState } from "core/bootstrap";
import { name } from "./state";
import { createSelector } from "redux-clean-architecture";

const state = (rootState: RootState) => rootState[name];

type GameMatrix= ("empty" | "snake" | "food")[][];

const gameMatrix = createSelector(
    state,
    state => {
        if( state.stateDescription === "not started"){
            return undefined;
        }


        return null as any as GameMatrix;


    }
);




export const selectors = {};