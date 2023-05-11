// imports
import { Telegraf } from "telegraf";
import { AxContext, LanguageObjectKey } from "../types";
import messages from "../utils/messages";
import { message } from "telegraf/filters";

/**
 * checks if text message is a phone number
 * if so, replies to user with a WhatsApp chat link to that mobile number
 */
export default (bot: Telegraf<AxContext>) => {
    bot.on(message("text"), async (ctx, next) => {
        const language = ctx.session.language as LanguageObjectKey;
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

        await ctx.reply(messages.whatsappCommandMessage[language], {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: messages.whatsappCommandButtonText[language],
                            url,
                        },
                    ],
                ],
            },
        });
    });
};
