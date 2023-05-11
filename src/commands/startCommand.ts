// imports
import { Telegraf } from "telegraf";
import messages from "../utils/messages";
import { languageKeyboard } from "../utils/keyboard";
import { AxContext } from "../types";

/**
 * /start
 */
export default (bot: Telegraf<AxContext>) => {
    bot.start(async (ctx) => {
        await ctx.replyWithMarkdownV2(messages.startMessage, {
            reply_markup: languageKeyboard,
        });
    });
};
