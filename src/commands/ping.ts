import {
    createCommand,
} from "../util/create_command.ts";

createCommand({
    names: ["ping"],
    description: "Ping the bot",
    usage: ".ping",
    async execute(bot, message) {
        const then = Date.now();
        await bot.helpers.sendMessage(BigInt(message.channelId), {
            content: `Pong! (${Date.now() - then}ms)`,
        });
    }
});
