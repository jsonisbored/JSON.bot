import { Discord, SimpleCommand, SimpleCommandMessage } from "discordx";

@Discord()
export class Owner {
    @SimpleCommand("eval")
    eval({ message, argString }: SimpleCommandMessage) {
        // message.channel.send(eval(argString));
    }
}