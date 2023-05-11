// imports
import { InlineKeyboardMarkup } from "telegraf/types";
import { LanguageObjectKey } from "../types";
import { InlineKeyboardButton } from "telegraf/types";
import messages from "./messages";

/**
 * /start language options
 */
export const languageKeyboard = {
    inline_keyboard: [
        [
            {
                text: "العربية",
                callback_data: "set_lang|arabic",
            },
            {
                text: "English",
                callback_data: "set_lang|english",
            },
        ],
        [
            {
                text: "Türkçe",
                callback_data: "set_lang|turkish",
            },
            {
                text: "Русский",
                callback_data: "set_lang|russian",
            },
        ],
    ],
};

/**
 * returns "convert" or "upload" on image message reply keyboard in the selected language
 */
export const getOnImageKeyboard = (
    language: LanguageObjectKey
): InlineKeyboardMarkup => ({
    inline_keyboard: [
        [
            {
                text: messages.imageOperationsMessage[language].convert,
                callback_data: "convert_to_pdf",
            },
            {
                text: messages.imageOperationsMessage[language].upload,
                callback_data: "upload_file",
            },
        ],
    ],
});

/**
 * builds keyboard grid based on how many buttons there are
 */
export const buildKeyboard = (
    buttons: InlineKeyboardButton.CallbackButton[]
): InlineKeyboardButton[][] => {
    const rows: InlineKeyboardButton[][] = [[]];

    buttons.forEach((btn: InlineKeyboardButton.CallbackButton) => {
        const currentRow = rows[rows.length - 1];
        if (currentRow.length >= 3) {
            rows.push([btn]);
        } else {
            currentRow.push(btn);
        }
    });

    return rows;
};
