// dotenv configuration
import dotenv from "dotenv";
dotenv.config();

// imports
import { Telegraf, session } from "telegraf";
import { AxContext } from "./types";
import startCommand from "./commands/startCommand";
import helpCommand from "./commands/helpCommand";
import settingsCommand from "./commands/settingsCommand";
import infoCommand from "./commands/infoCommand";
import phoneHandler from "./handlers/phoneHandler";
import mediaHandler from "./handlers/mediaHandler";
import linkHandler from "./handlers/linkHandler";

// env variables
const TOKEN = process.env.TOKEN!;

// bot instance
const bot = new Telegraf<AxContext>(TOKEN);

// set session storage
bot.use(
    session({
        defaultSession: () => ({
            language: "english",
        }),
    })
);

// log users
bot.use((ctx, next) => {
    console.log(ctx.from?.username);
    next();
});

// handlers
startCommand(bot);
helpCommand(bot);
settingsCommand(bot);
infoCommand(bot);
phoneHandler(bot);
mediaHandler(bot);
linkHandler(bot);

// launch bot
bot.launch();
