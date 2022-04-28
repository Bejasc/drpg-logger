import DrpgColors from "@drpgdev/drpg-utils/dist/DrpgColors";
import { bgRed, cyan, gray, magenta, red, yellow } from "colorette";
import { ILogType } from "../types/ILogType";

export const LogLevel = {
	Trace: {
		priority: 10,
		title: "Trace",
		embedColor: DrpgColors.white,
		logTag: `${gray("%T")} - ${gray("TRACE")}`,
	} as ILogType,

	Debug: {
		priority: 20,
		title: "Debug",
		embedColor: DrpgColors.yellow,
		logTag: `${magenta("%T")} - ${magenta("DEBUG")}`,
	} as ILogType,

	Info: {
		priority: 30,
		title: "Info",
		embedColor: DrpgColors.blue,
		logTag: `${cyan("%T")} - ${cyan("INFO")}`,
		emoji: "ℹ",
	} as ILogType,

	Warn: {
		priority: 40,
		title: "Warning",
		embedColor: DrpgColors.orange,
		logTag: `${yellow("%T")} - ${yellow("WARNING")}`,
		emoji: "⚠",
	} as ILogType,

	Error: {
		priority: 50,
		title: "Error",
		embedColor: DrpgColors.red,
		logTag: `${red("%T")} - ${red("ERROR")}`,
		emoji: "‼",
	} as ILogType,

	Fatal: {
		priority: 60,
		title: "Fatal",
		embedColor: DrpgColors.black,
		logTag: `${bgRed("%T")} - ${bgRed("FATAL")}`,
		emoji: "☠",
	} as ILogType,
};
