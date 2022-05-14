import { Message, MessageEmbed, ColorResolvable } from "discord.js";
import AnsiParser from "ansi-parser";
import { ILogType } from "../types/ILogType";

export default function (type: ILogType, title: string, content: string, message: Message): MessageEmbed {
	const embed = new MessageEmbed();

	if(!title) title = "";
	if(type.title) title = `${type.title} - ${title}`;
	if(type.emoji) title = `${type.emoji} ${title}`

	embed.setTitle(title);
	embed.setDescription(AnsiParser.removeAnsi(content));

	if(type.thumbnail) embed.setThumbnail(type.thumbnail)

	const color = type.embedColor;
	embed.setColor(color as ColorResolvable);

	if (message) {
		const logUrl = message.url;
		embed.addField("\u200b", `[Go to](${logUrl})`);
	}

	embed.setFooter({text:"Powered by DRPG Logger", iconURL:"https://cdn.discordapp.com/attachments/964178424258236466/967817981117739088/drpg_shield.png" })
	return embed;
}
