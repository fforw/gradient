import Color from "./Color";
import Gradient from "./Gradient";
import chalk from "chalk";

const argv = require('yargs').argv;



function name(idx)
{
    if (idx === 0)
    {
        return "$white"
    }
    if (idx === 10)
    {
        return "$black"
    }

    return "$gray-" + (idx * 100);
}

let gradientLength = argv.length || 10;
const bootstrap = argv.bootstrap;

if (bootstrap)
{
    gradientLength = 11;
}

if (argv._.length < 2)
{
    console.log("Usage: ffgradient [color1] [color2] ... --length=<number-of-colors-in-gradient>");
    process.exit(1);
}


const gradient = new Gradient(
    argv._.map( col => Color.from(col) ),
    gradientLength
);

//
// const gradient = new Gradient([
//     Color.from("#ffffff"),
//     Color.from("#1a0a05")
// ], 11);
//
if (bootstrap)
{
    console.log(gradient.colors.map((c, idx) => name(idx) + ": " + c.toRGBHex() + " !default;").join("\n"))
}
else
{
    console.log(gradient.colors.map((c, idx) => c.toRGBHex()).join("\n"))
}

