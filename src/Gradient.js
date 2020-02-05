import { clamp } from "./util";


export default class Gradient
{
    constructor(colors, length)
    {
        this.colors = new Array(length);

        const numberOfBaseColors = colors.length;

        let pos = 0;
        const step = (numberOfBaseColors - 1) / (length - 1);

        const last = length - 1;
        for (let i = 0; i < length; i++)
        {
            if (i < last)
            {
                const index = pos | 0;
                const ratio = pos - index;

                this.colors[i] = colors[index].mix(
                    colors[index + 1],
                    ratio
                );
            }
            else
            {
                this.colors[i] = colors[numberOfBaseColors - 1];
            }
            pos += step;
        }
    }

    colorAt(pos)
    {
        return this.colors[(clamp(pos) * (this.colors.length - 1))|0]
    }
}
