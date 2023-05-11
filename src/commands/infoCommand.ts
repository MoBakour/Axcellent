// imports
import { Telegraf } from "telegraf";
import { LanguageObjectKey, AxContext } from "../types";
import messages from "../utils/messages";

/**
 * /info
 */
export default (bot: Telegraf<AxContext>) => {
    bot.command("info", async (ctx) => {
        const language = ctx.session.language as LanguageObjectKey;
        await ctx.replyWithMarkdownV2(messages.infoMessage[language]);
    });
};
