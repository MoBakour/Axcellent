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
const filters_1 = require("telegraf/filters");
const messages_1 = __importDefault(require("../utils/messages"));
const keyboard_1 = require("../utils/keyboard");
const uploadFile_1 = __importDefault(require("./uploadFile"));
const convertToPdf_1 = __importDefault(require("./convertToPdf"));
/**
 * file message handlers (photo/video)
 */
exports.default = (bot) => {
    /**
     * on photo message
     * send user inline_keyboard to select action to do on photo
     */
    bot.on((0, filters_1.message)("photo"), (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const language = ctx.session.language;
        ctx.session.fileInfo =
            ctx.update.message.photo[ctx.update.message.photo.length - 1];
        yield ctx.reply(messages_1.default.onImageMessage[language], {
            reply_markup: (0, keyboard_1.getOnImageKeyboard)(language),
        });
    }));
    /**
     * if user selects upload_file action, fire uploadFile() function
     */
    bot.action("upload_file", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const language = ctx.session.language;
        const waitMessage = yield ctx.reply(messages_1.default.waitMessage[language]);
        try {
            const result = yield (0, uploadFile_1.default)(bot, ctx);
            yield ctx.reply(result);
        }
        catch (err) {
            yield ctx.reply(messages_1.default.errorMessage[language]);
        }
        finally {
            yield ctx.answerCbQuery();
            yield ctx.deleteMessage(waitMessage.message_id);
        }
    }));
    /**
     * if user selects convert_to_pdf action, fire convertToPdf() function
     */
    bot.action("convert_to_pdf", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const language = ctx.session.language;
        const waitMessage = yield ctx.reply(messages_1.default.waitMessage[language]);
        try {
            const pdfBuffer = yield (0, convertToPdf_1.default)(bot, ctx);
            yield ctx.replyWithDocument({
                source: pdfBuffer,
                filename: "photo.pdf",
            });
        }
        catch (err) {
            yield ctx.reply(messages_1.default.errorMessage[language]);
        }
        finally {
            yield ctx.answerCbQuery();
            yield ctx.deleteMessage(waitMessage.message_id);
        }
    }));
    /**
     * on video message, fire uploadFile() function
     */
    bot.on((0, filters_1.message)("video"), (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const language = ctx.session.language;
        const waitMessage = yield ctx.reply(messages_1.default.waitMessage[language]);
        ctx.session.fileInfo = ctx.update.message.video;
        try {
            const result = yield (0, uploadFile_1.default)(bot, ctx);
            yield ctx.reply(result);
        }
        catch (err) {
            yield ctx.reply(messages_1.default.errorMessage[language]);
        }
        finally {
            yield ctx.deleteMessage(waitMessage.message_id);
        }
    }));
};
