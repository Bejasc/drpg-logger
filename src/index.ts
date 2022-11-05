import { DrpgColors } from "drpg-utils";
import { Logger } from "./Logger";

export * from "./Logger";
export * from "./config/DefaultLogTypes";
export * from "./types/IEmbedOptions";
export * from "./types/ILogType";
export * from "./types/ILoggerOptions";

Logger.debug("Hello World");
