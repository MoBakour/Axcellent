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
exports.getUrlType = exports.fixUrl = exports.getImageBuffer = void 0;
// imports
const axios_1 = __importDefault(require("axios"));
const url_1 = require("url");
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const getImageBuffer = (imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(imageUrl, {
        responseType: "arraybuffer",
    });
    return Buffer.from(response.data, "binary");
});
exports.getImageBuffer = getImageBuffer;
const fixUrl = (urlString) => {
    const urlRegex = /^(?:https?:\/\/)?(?:www\.)?[a-z0-9\-]+\.[a-z]{2,}(?:\.[a-z]{2,})?(?:\/[^\s]*)?$/i;
    const protocolRegex = /^(?:f|ht)tps?:\/\//;
    if (!urlString || !urlRegex.test(urlString))
        return false;
    if (!protocolRegex.test(urlString)) {
        return "https://" + urlString;
    }
    return urlString;
};
exports.fixUrl = fixUrl;
const getUrlType = (urlString) => {
    const hostname = new url_1.URL(urlString).hostname.replace(/^www\./, "");
    const tiktokAllowedOrigins = ["tiktok.com", "vt.tiktok.com"];
    // check for youtube
    if (ytdl_core_1.default.validateURL(urlString))
        return "youtube";
    // check for tiktok
    if (tiktokAllowedOrigins.includes(hostname))
        return "tiktok";
    // if no matches
    return false;
};
exports.getUrlType = getUrlType;
