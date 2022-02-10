import { Discord, SimpleCommand, SimpleCommandMessage, SimpleCommandOption } from "discordx";
import { Category } from "@discordx/utilities";
import axios from "axios";
import { Message } from "discord.js";

interface Response {
    data?: {
        generated_text: string;
    }[];
}

@Discord()
@Category("NLP")
class NLP {
    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    queue: {
        queryMmessage: Message;
        responseMessage: Message;
        prompt: string;
    }[] = [];
    lastGpt = 0;


    @SimpleCommand("gpt")
    async text({ message, argString }: SimpleCommandMessage) {
        this.queue.push({
            queryMmessage: message,
            responseMessage: await message.reply("Added to queue"),
            prompt: argString,
        });
        if (this.queue.length > 1) return;
        while (this.queue.length) {
            const now = Date.now();
            if (now - this.lastGpt < 3000) await this.sleep(3000 - (now - this.lastGpt));

            const { prompt, queryMmessage, responseMessage } = this.queue[0];
            try {
                responseMessage.edit(`Fetching`);
                const { data }: Response = await axios.post("https://api.eleuther.ai/completion", {
                    context: prompt,
                    removeInput: true,
                    response_length: 256,
                    temp: 0.8,
                    top_p: 0.9,
                });
                if (!data) throw new Error("No generated data");
                const result = await queryMmessage.reply(`**${prompt}**${data[0].generated_text}`);
                await responseMessage.edit(`Done!\n${result.url}`);
            } catch (e) {
                const result = await queryMmessage.reply(e instanceof Error ? e.message : "An unknown error occured");
                await responseMessage.edit(`Oops there was an error!\n${result.url}`);
            }
            
            this.queue.shift();
            this.lastGpt = Date.now();
        }
    }
}
