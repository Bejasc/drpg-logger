import { Client, Message, MessageEmbed, TextChannel } from "discord.js";
import { LogLevel } from "./config/DefaultLogTypes";
import DrpgColors from "./config/DrpgColors";
import getLogEmbed from "./functions/getLogEmbed";
import logToConsole from "./functions/logToConsole";
import ILoggerOptions from "./types/ILoggerOptions";
import { ILogType } from "./types/ILogType";

export class DrpgLogger {
	/**The client used for sending messages */
	private client: Client;

	/**Options for the Logger */
	private options: ILoggerOptions;

	constructor(c: Client, o: ILoggerOptions) {
		this.client = c;
		this.options = o;

		if (!this.options.allowEmbedLevel) this.options.allowEmbedLevel = 30;
		if (!this.options.allowLogLevel) this.options.allowLogLevel = 10;
		if (!this.options.dateDisplayTimezone) this.options.dateDisplayTimezone = "0";
		if (!this.options.dateFormat) this.options.dateFormat = "YYYY-MM-DD HH:mm:ss";
	}

	/**
	 * Send a Log message predefined with the Trace log level. Allows for quick and easy use of this log type with it's default configurations. See .
	 * @param content The content for the log. Will also form the Message Embed.
	 * @param title The title for the log. Will be prefixed to the console and the title of the Message Embed
	 * @param message The message, if any. The Embed will offer a link to this message for navigation
	 * @returns The message embed that was sent.
	 */
	public trace(content: string, title?: string, message?: Message): MessageEmbed {
		return this.log(LogLevel.Trace, content, title, message);
	}

	/**
	 * Send a Log message predefined with the Debug log level. Allows for quick and easy use of this log type with it's default configurations. See .
	 * @param content The content for the log. Will also form the Message Embed.
	 * @param title The title for the log. Will be prefixed to the console and the title of the Message Embed
	 * @param message The message, if any. The Embed will offer a link to this message for navigation
	 * @returns The message embed that was sent.
	 */
	public debug(content: string, title?: string, message?: Message): MessageEmbed {
		return this.log(LogLevel.Debug, content, title, message);
	}

	/**
	 * Send a Log message predefined with the Info log level. Allows for quick and easy use of this log type with it's default configurations. See .
	 * @param content The content for the log. Will also form the Message Embed.
	 * @param title The title for the log. Will be prefixed to the console and the title of the Message Embed
	 * @param message The message, if any. The Embed will offer a link to this message for navigation
	 * @returns The message embed that was sent.
	 */
	public info(content: string, title?: string, message?: Message): MessageEmbed {
		return this.log(LogLevel.Info, content, title, message);
	}

	/**
	 * Send a Log message predefined with the Warn log level. Allows for quick and easy use of this log type with it's default configurations. See .
	 * @param content The content for the log. Will also form the Message Embed.
	 * @param title The title for the log. Will be prefixed to the console and the title of the Message Embed
	 * @param message The message, if any. The Embed will offer a link to this message for navigation
	 * @returns The message embed that was sent.
	 */
	public warn(content: string, title?: string, message?: Message): MessageEmbed {
		return this.log(LogLevel.Warn, content, title, message);
	}

	/**
	 * Send a Log message predefined with the Error log level. Allows for quick and easy use of this log type with it's default configurations. See .
	 * @param content The content for the log. Will also form the Message Embed.
	 * @param title The title for the log. Will be prefixed to the console and the title of the Message Embed
	 * @param message The message, if any. The Embed will offer a link to this message for navigation
	 * @returns The message embed that was sent.
	 */
	public error(content: string, title?: string, message?: Message): MessageEmbed {
		return this.log(LogLevel.Error, content, title, message);
	}

	/**
	 * Send a Log message predefined with the Fatal log level. Allows for quick and easy use of this log type with it's default configurations. See .
	 * @param content The content for the log. Will also form the Message Embed.
	 * @param title The title for the log. Will be prefixed to the console and the title of the Message Embed
	 * @param message The message, if any. The Embed will offer a link to this message for navigation
	 * @returns The message embed that was sent.
	 */
	public fatal(content: string, title?: string, message?: Message): MessageEmbed {
		return this.log(LogLevel.Fatal, content, title, message);
	}

	/**
	 * Send a Log message with the Custom log level. Allows for quick and easy use of this log type with it's default configurations. See .
	 * @param logLevel The LogLevel to be used. It is suggested to use a spread operator to define "defaults" for this custom type, and only override what you need to.
	 * @param content The content for the log. Will also form the Message Embed.
	 * @param title The title for the log. Will be prefixed to the console and the title of the Message Embed
	 * @param message The message, if any. The Embed will offer a link to this message for navigation
	 * @returns The message embed that was sent.
	 */
	public custom(logLevel: ILogType, content: string, title: string, message: Message): MessageEmbed {
		const embed = this.log(logLevel, content, title, message);
		return embed;
	}
	//TODO Find a way to tidy all of these up.. some kind of run command for any log type?

	log(type: ILogType, content: string, title?: string, message?: Message): MessageEmbed {
		const consoleLogLevel = this.options.allowLogLevel;
		if (type.priority >= consoleLogLevel) logToConsole({ type, content, title, options: this.options, client: this.client });

		const logEmbed = getLogEmbed(type, title, content, message);

		const embedLogLevel = this.options.allowEmbedLevel;
		if (type.priority >= embedLogLevel) {
			const logChannelId = type.logChannel ?? this.options.defaultLogChannel;

			const logChannel = this.client.channels.cache.find((c) => c.id == logChannelId) as TextChannel;
			logChannel?.send({ embeds: [logEmbed] });
		}

		return logEmbed;
	}

	/**
	 * Send a Log, but also reply to the original message with the embed that would be logged. Handy for cases where users must also see the output.
	 * @param logLevel The log level to use. May be a predefined DefaultLogType, or custom. If using a custom type, usage of the spread operator is encouraged to set a reasonable default.
	 * @param content The content for the log. Will also form the Message Embed.
	 * @param title The title for the log. Will be prefixed to the console and the title of the Message Embed
	 * @param message The message, if any. The Embed will offer a link to this message for navigation. Required for reply.
	 * @returns Message that was sent in response.
	 */
	public async respond(logLevel: ILogType, content: string, title: string, message: Message): Promise<Message> {
		const embed = this.log(logLevel, content, title, message);
		return message.reply({ embeds: [embed] });
	}
}
