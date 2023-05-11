// imports
import { Telegraf } from "telegraf";
import ytdl from "ytdl-core";
import { AxContext, LanguageObjectKey } from "../types";
import { message } from "telegraf/filters";
import { getUrlType, fixUrl } from "../utils/utils";
import { CallbackQuery } from "telegraf/types";
import { downloadYouTubeVideo, downloadTikTokVideo } from "./downloadVideo";
import messages from "../utils/messages";

/**
 * when a user sends a text
 * text is validated for youtube/tiktok link
 * if link, appropriate download function will be called
 */
export default (bot: Telegraf<AxContext>) => {
    bot.on(message("text"), async (ctx, next) => {
        const urlInput = ctx.message.text.trim();

        // validate and fix url
        const url = fixUrl(urlInput);
        if (!url) return next();

        // get URL type (youtube/tiktok)
        const urlType = getUrlType(url);
        if (!urlType) return next();

        switch (urlType) {
            case "youtube":
                await downloadYouTubeVideo(ctx, url);
                break;
            case "tiktok":
                await downloadTikTokVideo(ctx, url);
                break;
        }
    });

    /**
     * handle video_quality_choice action - fired by downloadYouTubeVideo inline_keyboard
     * this function is fired after the user selects the YouTube video quality they want to downlo  ad
     * replies to user with the video stream
     */
    bot.action(/^video_quality_choice\|(.+)/, async (ctx) => {
        const language = ctx.session.language as LanguageObjectKey;
        const waitMessage = await ctx.reply(messages.waitMessage[language]);

        try {
            const { videoUrl, videoFormats } = ctx.session;
            const itag = (
                ctx.callbackQuery as CallbackQuery.DataQuery
            ).data.split("|")[1];

            if (!videoFormats) {
            }

            const videoFormat = videoFormats.find(
                (format) => format.itag === parseInt(itag)
            );
            const videoStream = ytdl(videoUrl, { format: videoFormat });

            await ctx.replyWithVideo({ source: videoStream });
        } catch (err) {
            console.error(err);
            await ctx.reply(messages.errorMessage[language]);
        } finally {
            await ctx.answerCbQuery();
            await ctx.deleteMessage(waitMessage.message_id);
        }
    });
};
