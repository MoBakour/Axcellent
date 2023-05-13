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
const filters_1 = require("telegraf/filters");
/**
 * checks if text message is a phone number
 * if so, replies to user with a WhatsApp chat link to that mobile number
 */
exports.default = (bot) => {
    bot.on((0, filters_1.message)("text"), (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
        const language = ctx.session.language;
        const mobileNumberRegex = /^[0-9\s\+\(\)]+$/;
        let phoneNumber = ctx.update.message.text;
        // check if not mobile number
        if (!mobileNumberRegex.test(phoneNumber)) {
            return next();
        }
        // clean phone number string
        phoneNumber = phoneNumber.replace(/[ ()+]/g, "");
        // build URL and reply
        const url = `https://wa.me/${phoneNumber}`;
        yield ctx.reply(messages_1.default.whatsappCommandMessage[language], {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: messages_1.default.whatsappCommandButtonText[language],
                            url,
                        },
                    ],
                ],
            },
        });
    }));
};
