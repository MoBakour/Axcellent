// imports
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { AxContext, LanguageObjectKey } from "../types";
import messages from "../utils/messages";
import { getOnImageKeyboard } from "../utils/keyboard";
import uploadFile from "./uploadFile";
import convertToPdf from "./convertToPdf";

/**
 * file message handlers (photo/video)
 */
export default (bot: Telegraf<AxContext>) => {
    /**
     * on photo message
     * send user inline_keyboard to select action to do on photo
     */
    bot.on(message("photo"), async (ctx) => {
        const language = ctx.session.language as LanguageObjectKey;

        ctx.session.fileInfo =
            ctx.update.message.photo[ctx.update.message.photo.length - 1];

        await ctx.reply(messages.onImageMessage[language], {
            reply_markup: getOnImageKeyboard(language),
        });
    });

    /**
     * if user selects upload_file action, fire uploadFile() function
     */
    bot.action("upload_file", async (ctx) => {
        const language = ctx.session.language as LanguageObjectKey;
        const waitMessage = await ctx.reply(messages.waitMessage[language]);

        try {
            const result = await uploadFile(bot, ctx);
            await ctx.reply(result);
        } catch (err: any) {
            await ctx.reply(messages.errorMessage[language]);
        } finally {
            await ctx.answerCbQuery();
            await ctx.deleteMessage(waitMessage.message_id);
        }
    });

    /**
     * if user selects convert_to_pdf action, fire convertToPdf() function
     */
    bot.action("convert_to_pdf", async (ctx) => {
        const language = ctx.session.language as LanguageObjectKey;
        const waitMessage = await ctx.reply(messages.waitMessage[language]);

        try {
            const pdfBuffer = await convertToPdf(bot, ctx);
            await ctx.replyWithDocument({
                source: pdfBuffer,
                filename: "photo.pdf",
            });
        } catch (err: any) {
            await ctx.reply(messages.errorMessage[language]);
        } finally {
            await ctx.answerCbQuery();
            await ctx.deleteMessage(waitMessage.message_id);
        }
    });

    /**
     * on video message, fire uploadFile() function
     */
    bot.on(message("video"), async (ctx) => {
        const language = ctx.session.language as LanguageObjectKey;
        const waitMessage = await ctx.reply(messages.waitMessage[language]);

        ctx.session.fileInfo = ctx.update.message.video;

        try {
            const result = await uploadFile(bot, ctx);
            await ctx.reply(result);
        } catch (err: any) {
            await ctx.reply(messages.errorMessage[language]);
        } finally {
            await ctx.deleteMessage(waitMessage.message_id);
        }
    });
};
