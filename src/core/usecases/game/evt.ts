
import type { CreateEvt } from "core/bootstrap";
import { Evt } from "evt";
import { privateSelectors } from "./selectors";
import { onlyIfChanged } from "evt/operators/onlyIfChanged";
import { Reflect } from "tsafe/Reflect";

export const createEvt = (({ evtAction, getState }) => {

    //console.log({ evtAction, getState });

    const evt = new Evt<{
        action: "play eat fruit sound"
    }>();

    evtAction
        .pipe(
            action => (
                action.usecaseName === "game" &&
                action.actionName === "update"
            )
        )
        .pipe(() => [privateSelectors.fruitPosition(getState())])
        .pipe(onlyIfChanged())
        .pipe((fruitPosition) => fruitPosition !== undefined)
        .pipe([(_, prev) => [prev === null], Reflect<boolean>()])
        .pipe(isFirst => !isFirst)
        .attach(() =>
            evt.post({
                "action": "play eat fruit sound"
            })
        );

    return evt;


}) satisfies CreateEvt;