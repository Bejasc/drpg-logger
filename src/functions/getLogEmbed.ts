import { Message, MessageEmbed, ColorResolvable } from "discord.js";
import AnsiParser from "ansi-parser";
import { ILogType } from "../types/ILogType";
import { Logger } from "../Logger";
import { IEmbedOptions } from "..";

export default function (type: ILogType, title: string, content: string, message: Message, embedOptions: IEmbedOptions): MessageEmbed {
	const embed = new MessageEmbed();

	if (!title) title = "";
	if (type.title) title = `${type.title} - ${title}`;
	if (type.emoji) title = `${type.emoji} ${title}`;

	embed.setTitle(title);
	embed.setDescription(AnsiParser.removeAnsi(content));
	if (type.thumbnail) embed.setThumbnail(type.thumbnail);

	const color = type.embedColor;
	embed.setColor(color as ColorResolvable);

	try {
		if (embedOptions?.image) embed.setImage(embedOptions.image);
		if (embedOptions?.thumbnail) embed.setThumbnail(embedOptions.thumbnail);
		if (embedOptions?.fields) embed.addFields(embedOptions.fields);

		if (embedOptions?.author) {
			embed.setAuthor({ name: embedOptions.author.name, iconURL: embedOptions.author.iconUrl, url: embedOptions.author.url });
		}
	} catch (ex) {
		Logger.error(`Error generating embed using provided embedOptions object.\n${ex}`, title ?? "Error generating Log");
	}

	return embed;
}
