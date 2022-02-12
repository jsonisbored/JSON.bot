import {
    Bot,
    Message,
    Collection,
} from "../deps.ts";


export interface Command {
    names: string[];
    description: string;
    usage: string;
    execute: (bot: Bot, message: Message) => void;
}


export const commands = new Collection<string[], Command>();


export function createCommand(command: Command) {
    commands.set(command.names, command);
}
export function fetchCommands() {
    return commands;
}
