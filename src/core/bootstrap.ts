
import { usecases } from "core/usecases";
import type { ScoreSaver } from "core/ports/ScoreSaver";

import { createCore, type GenericCore } from "redux-clean-architecture";

type ParamsOfBootstrap = {
    apiBaseURL: string | undefined;
};

export type Context = {
    scoreSaver: ScoreSaver;
};

export type Core = GenericCore<typeof usecases, Context>;

export type State = Core["types"]["State"];
export type CreateEvt = Core["types"]["CreateEvt"];
export type Thunks = Core["types"]["Thunks"];

export async function bootstrapCore(
    params: ParamsOfBootstrap
) {
    const { apiBaseURL } = params;

    const scoreSaver = await (async () => {

        if (apiBaseURL === undefined) {

            const { createScoreSaver } = await import("core/adapters/ScoreSaver/localStorage");

            return createScoreSaver();

        }

        const { createScoreSaver } = await import("core/adapters/ScoreSaver/default");

        return createScoreSaver({ apiBaseURL });

    })();

    const context: Context = {
        scoreSaver
    };

    const { core } = createCore({
        context,
        usecases
    });

    // TODO: Initialize the usecases 

    return { core };

}