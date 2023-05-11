// imports
import { Telegraf } from "telegraf";
import { AxContext, LanguageObjectKey } from "../types";
import messages from "../utils/messages";
import { languageKeyboard } from "../utils/keyboard";
import { helpHandler } from "./helpCommand";

/**
 * /settings
 */
export default (bot: Telegraf<AxContext>) => {
    bot.settings(async (ctx) => {
        const language = ctx.session.language as LanguageObjectKey;

        // JSON stringify and parse to create an object deep copy
        const keyboard = JSON.parse(JSON.stringify(languageKeyboard));
        for (const outer of keyboard.inline_keyboard) {
            for (const inner of outer) {
                inner.callback_data = inner.callback_data + "_";
            }
        }

        await ctx.replyWithMarkdownV2(messages.resetLanguageMessage[language], {
            reply_markup: keyboard,
        });
    });

    bot.action(/^set_lang\|(.+)/, async (ctx) => {
        const match = ctx.match[1];
        const language = match.replace("_", "") as LanguageObjectKey;
        ctx.session.language = language;
        if (match.endsWith("_")) {
            await ctx.reply(messages.languageSetMessage[language]);
        } else {
            await helpHandler(ctx);
        }
        await ctx.answerCbQuery();
    });
};
