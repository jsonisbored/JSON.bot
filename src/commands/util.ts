import { Discord, SimpleCommand, SimpleCommandMessage, SimpleCommandOption } from "discordx";
import { Category, CategoryMetaData } from "@discordx/utilities";
import { MessageEmbed } from "discord.js";

@Discord()
@Category("Util")
class Util {
    @SimpleCommand("ping", { description: "Check the response time" })
    async ping({ message }: SimpleCommandMessage) {
        const then = Date.now();
        const msg = await message.reply("Pinging...");
        msg.edit(`🏓 Latency is \`${Date.now()-then}ms\`. API Latency is \`${Math.round(message.client.ws.ping)}ms\``);
    }

    @SimpleCommand("help", { description: "Learn how to use the bot" })
    help(
        @SimpleCommandOption("command")
        command: string,

        { message }: SimpleCommandMessage
    ) {
        const categories = ["Util"];
        let cat = categories[0];

        const embed = new MessageEmbed();
        embed.title = "Help";
        for (const command of CategoryMetaData.get(cat)) {
            embed.addField(command.name, command.description)
        }
        message.reply({
            embeds: [embed]
        })
    }
}
