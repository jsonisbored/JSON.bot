import {
    events,
} from "../util/create_event.ts";

events.ready = (_bot, _payload) => {
    console.log("connected to gateway!");
};
