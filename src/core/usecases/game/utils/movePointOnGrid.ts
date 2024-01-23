

export function movePointOnGrid(
    params: {
        gridDimensions: {
            width: number;
            height: number;
        };
        point: {
            x: number;
            y: number;
        };
        direction: "up" | "down" | "left" | "right";
    }
): {
    x: number;
    y: number;
} {

    const { point, direction, gridDimensions } = params;

    switch (direction) {
        case "up": {

            const x = point.x;
            let y = point.y - 1;

            if (y === -1) {
                y = gridDimensions.height - 1;
            }

            return { x, y };

        }
        case "down": {

            const x = point.x;
            let y = point.y + 1;

            if (y === gridDimensions.height) {
                y = 0;
            }

            return { x, y };

        }
        case "left": {

            let x = point.x - 1;
            const y = point.y;

            if (x === -1) {
                x = gridDimensions.width - 1;
            }

            return { x, y };

        }
        case "right": {

            let x = point.x + 1;
            const y = point.y;

            if (x === gridDimensions.width) {
                x = 0;
            }

            return { x, y };

        }
    }


}