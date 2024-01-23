
import { useEffect } from "react";
import { useCore, useCoreState } from "core";
import { useEvt } from "evt/hooks";
import oofMp3Url from "./assets/oof.mp3";


export function Game() {

    const { game } = useCore().functions;

    useEffect(
        () => {
            game.startOrResumeGame();

            return () => game.pauseGame();
        },
        []
    );

    useEffect(
        () => {

            //Listen to keydown event
            const keydownListener = (evt: KeyboardEvent) => {

                const direction = (() => {

                    switch (evt.key) {
                        case "ArrowUp":
                            return "up";
                        case "ArrowDown":
                            return "down";
                        case "ArrowLeft":
                            return "left";
                        case "ArrowRight":
                            return "right";
                        default:
                            return undefined;
                    }

                })();

                if (direction === undefined) {
                    return;
                }

                game.onDirectionInput({ direction });
            };

            document.addEventListener("keydown", keydownListener);

            return () => document.removeEventListener("keydown", keydownListener);

        },
        []
    );



    const { evtGame } = useCore().evts;

    useEvt(
        ctx => {


            evtGame.attach(
                event => event.action === "play eat fruit sound",
                ctx,
                () => {
                    const audio = new Audio(oofMp3Url);
                    audio.play()
                }
            );

        },
        []
    );

    const gameMatrix = useCoreState("game", "gameMatrix");

    if (gameMatrix === undefined) {
        return <h1>Loading...</h1>;
    }


    return (
        gameMatrix.map((row,i) => (
            <div key={i} style={{
                "display": "flex",
                "height": `calc(100vh / ${gameMatrix.length})`,
                "width": "100%"
            }}>
                {row.map((surface,j) => (
                    <div key={j} className={surface} style={{
                        "flex": 1,
                        "height": "100%",
                        "backgroundColor": (() => {
                            switch (surface) {
                                case "empty":
                                    return "brown";
                                case "snake":
                                    return "green";
                                case "food":
                                    return "red";
                            }
                        })(),
                        "outline": "1px solid black"
                    }} />
                ))}
            </div>
        ))
    );

}