import {
    createBot,
    startBot,
    ActivityTypes,
} from "./deps.ts";
import {
    DISCORD_TOKEN,
    BOT_ID,
} from "./config.ts";


export const bot = createBot({
    token: DISCORD_TOKEN,
    intents: ["Guilds", "GuildMessages"],
    botId: BOT_ID,
    events: {},
});

bot.gateway.presence = {
    status: "online",
    activities: [
        {
            name: "Testing",
            type: ActivityTypes.Game,
            createdAt: Date.now(),
        },
    ],
};

await startBot(bot);
