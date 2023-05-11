// imports
import FormData from "form-data";
import { Telegraf } from "telegraf";
import axios from "axios";
import { AxContext } from "../types";
import { getImageBuffer } from "../utils/utils";

// upload API key
const API_URL = `https://thumbsnap.com/api/upload`;

/**
 * upload file function
 * uploads file to API
 * returns access link
 */
export default async (bot: Telegraf<AxContext>, ctx: AxContext) => {
    // get image buffer
    const fileId = ctx.session.fileInfo.file_id;
    const { href } = await bot.telegram.getFileLink(fileId);
    const buffer = await getImageBuffer(href);

    // upload image to API
    const formData = new FormData();
    formData.append("media", buffer, "file");
    formData.append("key", process.env.THS_API_KEY!);
    const response = await axios.post(API_URL, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    // reply to user
    if (response.data.success) {
        return response.data.data.media + "?0509";
    } else {
        throw Error();
    }
};
