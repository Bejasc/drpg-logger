import { bgRed, red, green, yellow, blue, magenta, cyan, white, redBright, greenBright, yellowBright, blueBright, magentaBright, cyanBright, whiteBright, gray } from "colorette";

export enum ConsoleColor {
	red,
	green,
	yellow,
	blue,
	magenta,
	cyan,
	redBright,
	greenBright,
	yellowBright,
	blueBright,
	magentaBright,
	cyanBright,
	gray,
	bgRed,
}

export enum ConsoleColorMode {
	TagOnly,
	Full,
}

export function colorizeText(content: string, color: ConsoleColor) {
	switch (color) {
		case ConsoleColor.blue:
			return blue(content);
		case ConsoleColor.blueBright:
			return blueBright(content);
		case ConsoleColor.cyan:
			return cyan(content);
		case ConsoleColor.cyanBright:
			return cyanBright(content);
		case ConsoleColor.green:
			return green(content);
		case ConsoleColor.greenBright:
			return greenBright(content);
		case ConsoleColor.magenta:
			return magenta(content);
		case ConsoleColor.magentaBright:
			return magentaBright(content);
		case ConsoleColor.red:
			return red(content);
		case ConsoleColor.redBright:
			return redBright(content);
		case ConsoleColor.yellow:
			return yellow(content);
		case ConsoleColor.yellowBright:
			return yellowBright(content);
		case ConsoleColor.gray:
			return gray(content);
		case ConsoleColor.bgRed:
			return bgRed(content);
		default:
			return whiteBright(content);
	}
}
