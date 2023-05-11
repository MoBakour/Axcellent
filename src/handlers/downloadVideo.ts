// imports
import ytdl from "ytdl-core";
import * as ttscraper from "tiktok-scraper-ts";
import { InlineKeyboardButton } from "telegraf/types";
import messages from "../utils/messages";
import { AxContext, LanguageObjectKey } from "../types";
import { buildKeyboard } from "../utils/keyboard";

/**
 * gets video info (quality)
 * prompts user to select the quality they want
 */
export const downloadYouTubeVideo = async (ctx: AxContext, url: string) => {
    const language = ctx.session.language as LanguageObjectKey;
    const waitMessage = await ctx.reply(messages.waitMessage[language]);

    try {
        const videoInfo = await ytdl.getInfo(url);
        const videoFormats = ytdl
            .filterFormats(videoInfo.formats, "video")
            .filter((format) => format.container === "mp4" && format.hasAudio);

        const buttons: InlineKeyboardButton.CallbackButton[] = videoFormats.map(
            (format) => {
                return {
                    text: format.qualityLabel,
                    callback_data: "video_quality_choice|" + format.itag,
                };
            }
        );

        if (buttons.length === 0) {
            return await ctx.reply(messages.errorMessage[language]);
        }

        ctx.session.videoUrl = url;
        ctx.session.videoFormats = videoFormats;

        await ctx.reply(messages.selectFormatMessage[language], {
            reply_markup: {
                inline_keyboard: buildKeyboard(buttons),
            },
        });
    } catch (err) {
        console.error(err);
        await ctx.reply(messages.errorMessage[language]);
    } finally {
        await ctx.deleteMessage(waitMessage.message_id);
    }
};

/**
 * get tiktok video download url and send the video back to the user
 */
export const downloadTikTokVideo = async (ctx: AxContext, url: string) => {
    const language = ctx.session.language as LanguageObjectKey;
    const waitMessage = await ctx.reply(messages.waitMessage[language]);

    try {
        const video = (await ttscraper.fetchVideo(
            url,
            true
        )) as ttscraper.Video;

        await ctx.replyWithVideo(video.downloadURL);
    } catch (err) {
        console.error(err);
        await ctx.reply(messages.errorMessage[language]);
    } finally {
        await ctx.deleteMessage(waitMessage.message_id);
    }
};
