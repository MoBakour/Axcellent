// imports
import axois from "axios";
import { URL } from "url";
import ytdl from "ytdl-core";

export const getImageBuffer = async (imageUrl: string): Promise<Buffer> => {
    const response = await axois.get(imageUrl, {
        responseType: "arraybuffer",
    });

    return Buffer.from(response.data, "binary");
};

export const fixUrl = (urlString: string): string | false => {
    const urlRegex =
        /^(?:https?:\/\/)?(?:www\.)?[a-z0-9\-]+\.[a-z]{2,}(?:\.[a-z]{2,})?(?:\/[^\s]*)?$/i;
    const protocolRegex = /^(?:f|ht)tps?:\/\//;

    if (!urlString || !urlRegex.test(urlString)) return false;
    if (!protocolRegex.test(urlString)) {
        return "https://" + urlString;
    }

    return urlString;
};

export const getUrlType = (urlString: string): string | boolean => {
    const hostname = new URL(urlString).hostname.replace(/^www\./, "");
    const tiktokAllowedOrigins = ["tiktok.com", "vt.tiktok.com"];

    // check for youtube
    if (ytdl.validateURL(urlString)) return "youtube";

    // check for tiktok
    if (tiktokAllowedOrigins.includes(hostname)) return "tiktok";

    // if no matches
    return false;
};
