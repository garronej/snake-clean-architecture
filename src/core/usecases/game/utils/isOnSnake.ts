
import { same } from "evt/tools/inDepth/same";
import { movePointOnGrid } from "./movePointOnGrid";

export function isOnSnake(
    params: {
        snakeHeadPosition: {
            x: number;
            y: number;
        };
        snakeTail: ("up" | "down" | "left" | "right")[];
        gridDimensions: {
            width: number;
            height: number;
        };
        point: {
            x: number;
            y: number;
        };
    }
): boolean {

    const { snakeHeadPosition, snakeTail, gridDimensions, point } = params;

    if( same(snakeHeadPosition, point) ){
        return true;
    }

    if( snakeTail.length === 0 ){
        return false;
    }

    const [direction, ...newSnakeTail] = snakeTail;

    return isOnSnake({
        "snakeHeadPosition": movePointOnGrid({
            gridDimensions,
            "point": snakeHeadPosition,
            direction
        }),
        gridDimensions,
        "snakeTail": newSnakeTail,
        point
    });

}
