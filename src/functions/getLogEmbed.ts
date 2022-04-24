import { Message, MessageEmbed, ColorResolvable } from "discord.js";
import AnsiParser from "ansi-parser";
import { ILogType } from "../types/ILogType";

export default function (type: ILogType, title: string, content: string, message: Message): MessageEmbed {
	const embed = new MessageEmbed();

	embed.setTitle(`${type.emoji + " " ?? ""}${type.title} ${title ? `- ${title}` : ""}`);
	embed.setDescription(AnsiParser.removeAnsi(content));

	const color = type.embedColor;
	embed.setColor(color as ColorResolvable);

	if (message) {
		const logUrl = message.url;
		embed.addField("\u200b", `[Go to](${logUrl})`);
	}

	return embed;
}
