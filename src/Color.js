const colorRegExp = /^(#)?([0-9a-f]+)$/i;

function hex(n)
{
    const s = n.toString(16);

    return s.length === 1 ? "0" + s : s;
}

export default class Color
{
    r;
    g;
    b;

    constructor(r,g,b)
    {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    mix(other, ratio, out)
    {
        if (!out)
        {
            out = new Color();
        }
        out.r = (this.r + (other.r - this.r) * ratio)|0;
        out.g = (this.g + (other.g - this.g) * ratio)|0;
        out.b = (this.b + (other.b - this.b) * ratio)|0;

        return out;
    }

    multiply(n, out)
    {
        if (!out)
        {
            out = new Color();
        }

        out.r = this.r * n;
        out.g = this.g * n;
        out.b = this.b * n;
        return out;
    }

    pick(data, offset)
    {
        this.r = data[offset];
        this.g = data[offset + 1];
        this.b = data[offset + 2];
    }

    draw(data, offset)
    {
        data[offset] = this.r;
        data[offset + 1] = this.g;
        data[offset + 2] = this.b;
        data[offset + 3] = 255;
    }

    toRGB()
    {
        return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
    }

    toRGBHex()
    {
        return "#" + hex(this.r) + hex(this.g) + hex(this.b );
    }

    static validate(color)
    {

        let m;
        if (typeof color !== "string" || !(m = colorRegExp.exec(color)))
        {
            return null;
        }
        const col = m[2];

        if (col.length === 3)
        {
            return new Color(
                parseInt(col[0], 16) * 17,
                parseInt(col[1], 16) * 17,
                parseInt(col[2], 16) * 17
            )
        }
        else if (col.length === 6)
        {
            return new Color(
                parseInt(col.substring(0, 2), 16),
                parseInt(col.substring(2, 4), 16),
                parseInt(col.substring(4, 6), 16)
            )
        }
        else
        {
            return null;
        }
    }

    static from(color)
    {
        const col = Color.validate(color);
        if (!col)
        {
            throw new Error("Invalid color " + color);
        }
        return col;
    }
}
