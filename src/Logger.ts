import { Client, Message, MessageEmbed, TextChannel } from "discord.js";
import { LogLevel } from "./config/DefaultLogTypes";
import DrpgColors from "./config/DrpgColors";
import getLogEmbed from "./functions/getLogEmbed";
import logToConsole from "./functions/logToConsole";
import ILoggerOptions from "./types/ILoggerOptions";
import { ILogType } from "./types/ILogType";

export class Logger {
	/**The client used for sending messages */
	private static client: Client;

	/**Options for the Logger */
	private static options: ILoggerOptions;

	constructor(c: Client, o: ILoggerOptions) {
		Logger.client = c;
		Logger.options = o;

		if (!Logger.options.allowEmbedLevel) Logger.options.allowEmbedLevel = 30;
		if (!Logger.options.allowLogLevel) Logger.options.allowLogLevel = 10;
		if (!Logger.options.dateDisplayTimezone) Logger.options.dateDisplayTimezone = "0";
		if (!Logger.options.dateFormat) Logger.options.dateFormat = "YYYY-MM-DD HH:mm:ss";
	}

	/**
	 * Send a Log message predefined with the Trace log level. Allows for quick and easy use of this log type with it's default configurations. See .
	 * @param content The content for the log. Will also form the Message Embed.
	 * @param title The title for the log. Will be prefixed to the console and the title of the Message Embed
	 * @param message The message, if any. The Embed will offer a link to this message for navigation
	 * @returns The message embed that was sent.
	 */
	public static trace(content: string, title?: string, message?: Message): MessageEmbed {
		return Logger.log(LogLevel.Trace, content, title, message);
	}

	/**
	 * Send a Log message predefined with the Debug log level. Allows for quick and easy use of this log type with it's default configurations. See .
	 * @param content The content for the log. Will also form the Message Embed.
	 * @param title The title for the log. Will be prefixed to the console and the title of the Message Embed
	 * @param message The message, if any. The Embed will offer a link to this message for navigation
	 * @returns The message embed that was sent.
	 */
	public static debug(content: string, title?: string, message?: Message): MessageEmbed {
		return Logger.log(LogLevel.Debug, content, title, message);
	}

	/**
	 * Send a Log message predefined with the Info log level. Allows for quick and easy use of this log type with it's default configurations. See .
	 * @param content The content for the log. Will also form the Message Embed.
	 * @param title The title for the log. Will be prefixed to the console and the title of the Message Embed
	 * @param message The message, if any. The Embed will offer a link to this message for navigation
	 * @returns The message embed that was sent.
	 */
	public static info(content: string, title?: string, message?: Message): MessageEmbed {
		return Logger.log(LogLevel.Info, content, title, message);
	}

	/**
	 * Send a Log message predefined with the Warn log level. Allows for quick and easy use of this log type with it's default configurations. See .
	 * @param content The content for the log. Will also form the Message Embed.
	 * @param title The title for the log. Will be prefixed to the console and the title of the Message Embed
	 * @param message The message, if any. The Embed will offer a link to this message for navigation
	 * @returns The message embed that was sent.
	 */
	public static warn(content: string, title?: string, message?: Message): MessageEmbed {
		return Logger.log(LogLevel.Warn, content, title, message);
	}

	/**
	 * Send a Log message predefined with the Error log level. Allows for quick and easy use of this log type with it's default configurations. See .
	 * @param content The content for the log. Will also form the Message Embed.
	 * @param title The title for the log. Will be prefixed to the console and the title of the Message Embed
	 * @param message The message, if any. The Embed will offer a link to this message for navigation
	 * @returns The message embed that was sent.
	 */
	public static error(content: string, title?: string, message?: Message): MessageEmbed {
		return Logger.log(LogLevel.Error, content, title, message);
	}

	/**
	 * Send a Log message predefined with the Fatal log level. Allows for quick and easy use of this log type with it's default configurations. See .
	 * @param content The content for the log. Will also form the Message Embed.
	 * @param title The title for the log. Will be prefixed to the console and the title of the Message Embed
	 * @param message The message, if any. The Embed will offer a link to this message for navigation
	 * @returns The message embed that was sent.
	 */
	public static fatal(content: string, title?: string, message?: Message): MessageEmbed {
		return Logger.log(LogLevel.Fatal, content, title, message);
	}

	/**
	 * Send a Log message with the Custom log level. Allows for quick and easy use of this log type with it's default configurations. See .
	 * @param logLevel The LogLevel to be used. It is suggested to use a spread operator to define "defaults" for this custom type, and only override what you need to.
	 * @param content The content for the log. Will also form the Message Embed.
	 * @param title The title for the log. Will be prefixed to the console and the title of the Message Embed
	 * @param message The message, if any. The Embed will offer a link to this message for navigation
	 * @returns The message embed that was sent.
	 */
	public static custom(logLevel: ILogType, content: string, title: string, message: Message): MessageEmbed {
		const embed = Logger.log(logLevel, content, title, message);
		return embed;
	}
	//TODO Find a way to tidy all of these up.. some kind of run command for any log type?

	/**
	 * Send a Log, but also reply to the original message with the embed that would be logged. Handy for cases where users must also see the output.
	 * @param logLevel The log level to use. May be a predefined DefaultLogType, or custom. If using a custom type, usage of the spread operator is encouraged to set a reasonable default.
	 * @param content The content for the log. Will also form the Message Embed.
	 * @param title The title for the log. Will be prefixed to the console and the title of the Message Embed
	 * @param message The message, if any. The Embed will offer a link to this message for navigation. Required for reply.
	 * @returns Message that was sent in response.
	 */
	public static async respond(logLevel: ILogType, content: string, title: string, message: Message): Promise<Message> {
		const embed = Logger.log(logLevel, content, title, message);
		return message.reply({ embeds: [embed] });
	}

	
	static log(type: ILogType, content: string, title?: string, message?: Message): MessageEmbed {
		const consoleLogLevel = Logger.options.allowLogLevel;
		if (type.priority >= consoleLogLevel) logToConsole({ type, content, title, options: Logger.options, client: Logger.client });

		const logEmbed = getLogEmbed(type, title, content, message);

		const embedLogLevel = Logger.options.allowEmbedLevel;
		if (type.priority >= embedLogLevel) {
			const logChannelId = type.logChannel ?? Logger.options.defaultLogChannel;

			const logChannel = Logger.client.channels.cache.find((c) => c.id == logChannelId) as TextChannel;
			logChannel?.send({ embeds: [logEmbed] });
		}

		return logEmbed;
	}
}
