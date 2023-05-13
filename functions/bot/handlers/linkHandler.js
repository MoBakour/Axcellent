"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const filters_1 = require("telegraf/filters");
const utils_1 = require("../utils/utils");
const downloadVideo_1 = require("./downloadVideo");
const messages_1 = __importDefault(require("../utils/messages"));
/**
 * when a user sends a text
 * text is validated for youtube/tiktok link
 * if link, appropriate download function will be called
 */
exports.default = (bot) => {
    bot.on((0, filters_1.message)("text"), (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
        const urlInput = ctx.message.text.trim();
        // validate and fix url
        const url = (0, utils_1.fixUrl)(urlInput);
        if (!url)
            return next();
        // get URL type (youtube/tiktok)
        const urlType = (0, utils_1.getUrlType)(url);
        if (!urlType)
            return next();
        switch (urlType) {
            case "youtube":
                yield (0, downloadVideo_1.downloadYouTubeVideo)(ctx, url);
                break;
            case "tiktok":
                yield (0, downloadVideo_1.downloadTikTokVideo)(ctx, url);
                break;
        }
    }));
    /**
     * handle video_quality_choice action - fired by downloadYouTubeVideo inline_keyboard
     * this function is fired after the user selects the YouTube video quality they want to downlo  ad
     * replies to user with the video stream
     */
    bot.action(/^video_quality_choice\|(.+)/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const language = ctx.session.language;
        const waitMessage = yield ctx.reply(messages_1.default.waitMessage[language]);
        try {
            const { videoUrl, videoFormats } = ctx.session;
            const itag = ctx.callbackQuery.data.split("|")[1];
            if (!videoFormats) {
            }
            const videoFormat = videoFormats.find((format) => format.itag === parseInt(itag));
            const videoStream = (0, ytdl_core_1.default)(videoUrl, { format: videoFormat });
            yield ctx.replyWithVideo({ source: videoStream });
        }
        catch (err) {
            console.error(err);
            yield ctx.reply(messages_1.default.errorMessage[language]);
        }
        finally {
            yield ctx.answerCbQuery();
            yield ctx.deleteMessage(waitMessage.message_id);
        }
    }));
};
