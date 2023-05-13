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
// imports
const form_data_1 = __importDefault(require("form-data"));
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../utils/utils");
// upload API key
const API_URL = `https://thumbsnap.com/api/upload`;
/**
 * upload file function
 * uploads file to API
 * returns access link
 */
exports.default = (bot, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    // get image buffer
    const fileId = ctx.session.fileInfo.file_id;
    const { href } = yield bot.telegram.getFileLink(fileId);
    const buffer = yield (0, utils_1.getImageBuffer)(href);
    // upload image to API
    const formData = new form_data_1.default();
    formData.append("media", buffer, "file");
    formData.append("key", process.env.THS_API_KEY);
    const response = yield axios_1.default.post(API_URL, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    // reply to user
    if (response.data.success) {
        return response.data.data.media + "?0509";
    }
    else {
        throw Error();
    }
});
