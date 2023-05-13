"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildKeyboard = exports.getOnImageKeyboard = exports.languageKeyboard = void 0;
const messages_1 = __importDefault(require("./messages"));
/**
 * /start language options
 */
exports.languageKeyboard = {
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
const getOnImageKeyboard = (language) => ({
    inline_keyboard: [
        [
            {
                text: messages_1.default.imageOperationsMessage[language].convert,
                callback_data: "convert_to_pdf",
            },
            {
                text: messages_1.default.imageOperationsMessage[language].upload,
                callback_data: "upload_file",
            },
        ],
    ],
});
exports.getOnImageKeyboard = getOnImageKeyboard;
/**
 * builds keyboard grid based on how many buttons there are
 */
const buildKeyboard = (buttons) => {
    const rows = [[]];
    buttons.forEach((btn) => {
        const currentRow = rows[rows.length - 1];
        if (currentRow.length >= 3) {
            rows.push([btn]);
        }
        else {
            currentRow.push(btn);
        }
    });
    return rows;
};
exports.buildKeyboard = buildKeyboard;
