import { DrpgColors } from "drpg-utils";
import { ILogType } from "../types/ILogType";
import { ConsoleColor, ConsoleColorMode } from "../functions/coloretteResolver";

export const LogLevel = {
	Trace: {
		priority: 10,
		title: "Trace",
		embedColor: DrpgColors.white,
		consoleColorMode: ConsoleColorMode.TagOnly,
		consoleColor: ConsoleColor.gray,
		logTag: "TRACE",
	} as ILogType,

	Debug: {
		priority: 20,
		title: "Debug",
		embedColor: DrpgColors.yellow,
		consoleColorMode: ConsoleColorMode.TagOnly,
		consoleColor: ConsoleColor.magenta,
		logTag: "DEBUG",
		emoji:"🛠️"
	} as ILogType,

	Info: {
		priority: 30,
		title: "Info",
		embedColor: DrpgColors.blue,
		emoji: "🔔",
		consoleColorMode: ConsoleColorMode.TagOnly,
		consoleColor: ConsoleColor.cyan,
		logTag: "INFO",
	} as ILogType,

	Warn: {
		priority: 40,
		title: "Warning",
		embedColor: DrpgColors.orange,
		emoji: "⚠️",
		consoleColorMode: ConsoleColorMode.TagOnly,
		consoleColor: ConsoleColor.yellow,
		logTag: "WARNING",
	} as ILogType,

	Error: {
		priority: 50,
		title: "Error",
		embedColor: DrpgColors.red,
		emoji: "❌",
		consoleColorMode: ConsoleColorMode.TagOnly,
		consoleColor: ConsoleColor.red,
		logTag: "ERROR",
	} as ILogType,

	Fatal: {
		priority: 60,
		title: "Fatal",
		embedColor: DrpgColors.black,
		emoji: "💀",
		consoleColorMode: ConsoleColorMode.Full,
		consoleColor: ConsoleColor.bgRed,
		logTag: "FATAL",
	} as ILogType,
};
