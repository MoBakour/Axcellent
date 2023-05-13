"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.downloadTikTokVideo = exports.downloadYouTubeVideo = void 0;
// imports
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const ttscraper = __importStar(require("tiktok-scraper-ts"));
const messages_1 = __importDefault(require("../utils/messages"));
const keyboard_1 = require("../utils/keyboard");
/**
 * gets video info (quality)
 * prompts user to select the quality they want
 */
const downloadYouTubeVideo = (ctx, url) => __awaiter(void 0, void 0, void 0, function* () {
    const language = ctx.session.language;
    const waitMessage = yield ctx.reply(messages_1.default.waitMessage[language]);
    try {
        const videoInfo = yield ytdl_core_1.default.getInfo(url);
        const videoFormats = ytdl_core_1.default
            .filterFormats(videoInfo.formats, "video")
            .filter((format) => format.container === "mp4" && format.hasAudio);
        const buttons = videoFormats.map((format) => {
            return {
                text: format.qualityLabel,
                callback_data: "video_quality_choice|" + format.itag,
            };
        });
        if (buttons.length === 0) {
            return yield ctx.reply(messages_1.default.errorMessage[language]);
        }
        ctx.session.videoUrl = url;
        ctx.session.videoFormats = videoFormats;
        yield ctx.reply(messages_1.default.selectFormatMessage[language], {
            reply_markup: {
                inline_keyboard: (0, keyboard_1.buildKeyboard)(buttons),
            },
        });
    }
    catch (err) {
        console.error(err);
        yield ctx.reply(messages_1.default.errorMessage[language]);
    }
    finally {
        yield ctx.deleteMessage(waitMessage.message_id);
    }
});
exports.downloadYouTubeVideo = downloadYouTubeVideo;
/**
 * get tiktok video download url and send the video back to the user
 */
const downloadTikTokVideo = (ctx, url) => __awaiter(void 0, void 0, void 0, function* () {
    const language = ctx.session.language;
    const waitMessage = yield ctx.reply(messages_1.default.waitMessage[language]);
    try {
        const video = (yield ttscraper.fetchVideo(url, true));
        yield ctx.replyWithVideo(video.downloadURL);
    }
    catch (err) {
        console.error(err);
        yield ctx.reply(messages_1.default.errorMessage[language]);
    }
    finally {
        yield ctx.deleteMessage(waitMessage.message_id);
    }
});
exports.downloadTikTokVideo = downloadTikTokVideo;
