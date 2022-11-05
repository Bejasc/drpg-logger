import { bold, greenBright, cyan, yellow } from "colorette";
import { Client, TextChannel } from "discord.js";
import moment from "moment";
import { ILoggerOptions } from "../types";
import { ILogType } from "../types/ILogType";
/**@internal */

export default function ({ type, content, title, options }: { type: ILogType; content: string; title?: string; options: ILoggerOptions }): void {
	if (options.client) {
		content = parseMentions(content, options.client);
		content = parseChannels(content, options.client);
	}

	if (title) content = bold(title + ": ") + content;

	content = (type.logTag ?? `${greenBright("%T")} - ${greenBright("CUSTOM")}`) + " - " + content;

	content = content.replace("%T", getTimestamp(options));

	const method = type.method ?? "log";
	console[method](content);
}

function getTimestamp(options: ILoggerOptions): string {
	const localTime = moment().utcOffset(options.dateDisplayTimezone).format(options.dateFormat);
	return localTime;
}

function parseMentions(input: string, client: Client): string {
	if (input) {
		const regExp = new RegExp(/<(@)[0-9]{17,}>/g);
		return input.replace(regExp, (val: string) => {
			try {
				const id = val.substring(2, val.length - 1);
				const user = client.users.cache.find((x) => x.id == id);
				return bold(`@${user.username}[${cyan(user.id)}]`);
			} catch (err) {
				console.log(err);
				return val;
			}
		});
	} else {
		return input;
	}
}

function parseChannels(input: string, client: Client): string {
	if (input) {
		const regExp = new RegExp(/<(#)[0-9]{17,}>/g);
		return input.replace(regExp, (val) => {
			try {
				const id = val.substring(2, val.length - 1);
				const channel = client.channels.cache.find((x) => x.id == id) as TextChannel;
				return bold(`#${channel.name}[${yellow(channel.id)}]`);
			} catch (err) {
				console.log(err);
				return val;
			}
		});
	}
}
