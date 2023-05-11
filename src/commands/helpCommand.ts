// imports
import { Telegraf } from "telegraf";
import messages from "../utils/messages";
import { LanguageObjectKey, AxContext } from "../types";

/**
 * /help
 */
export const helpHandler = async (ctx: AxContext) => {
    const language = ctx.session.language as LanguageObjectKey;
    await ctx.replyWithMarkdownV2(messages.helpMessage[language]);
};

export default (bot: Telegraf<AxContext>) => {
    bot.help(helpHandler);
};
