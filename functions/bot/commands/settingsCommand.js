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
const messages_1 = __importDefault(require("../utils/messages"));
const keyboard_1 = require("../utils/keyboard");
const helpCommand_1 = require("./helpCommand");
/**
 * /settings
 */
exports.default = (bot) => {
    bot.settings((ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const language = ctx.session.language;
        // JSON stringify and parse to create an object deep copy
        const keyboard = JSON.parse(JSON.stringify(keyboard_1.languageKeyboard));
        for (const outer of keyboard.inline_keyboard) {
            for (const inner of outer) {
                inner.callback_data = inner.callback_data + "_";
            }
        }
        yield ctx.replyWithMarkdownV2(messages_1.default.resetLanguageMessage[language], {
            reply_markup: keyboard,
        });
    }));
    bot.action(/^set_lang\|(.+)/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const match = ctx.match[1];
        const language = match.replace("_", "");
        ctx.session.language = language;
        if (match.endsWith("_")) {
            yield ctx.reply(messages_1.default.languageSetMessage[language]);
        }
        else {
            yield (0, helpCommand_1.helpHandler)(ctx);
        }
        yield ctx.answerCbQuery();
    }));
};
