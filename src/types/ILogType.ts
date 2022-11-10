import { Color } from "colorette";
import { ConsoleColor, ConsoleColorMode } from "../functions/coloretteResolver";

export interface ILogType {
	priority?: number;
	title?: string;
	embedColor?: string;
	consoleColor?: ConsoleColor;
	consoleColorMode?: ConsoleColorMode;
	logChannel?: string;
	logTag?: string;
	method?: "trace" | "debug" | "info" | "warn" | "error" | "log";
	emoji?: string;
	thumbnail?: string;
}
