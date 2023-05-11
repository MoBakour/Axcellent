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
const DOMAIN = process.env.DOMAIN!;
const PORT = parseInt(process.env.PORT || "3000");
const ENV = process.env.NODE_ENV || "prod";

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

// handlers
startCommand(bot);
helpCommand(bot);
settingsCommand(bot);
infoCommand(bot);
phoneHandler(bot);
mediaHandler(bot);
linkHandler(bot);

// launch bot
if (ENV === "prod") {
    bot.launch({
        webhook: {
            domain: DOMAIN,
            port: PORT,
        },
    });
} else if (ENV === "dev") {
    bot.launch();
}
