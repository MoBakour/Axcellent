import { PDFDocument } from "pdf-lib";
import { Telegraf } from "telegraf";
import { AxContext } from "../types";
import { getImageBuffer } from "../utils/utils";

/**
 * Converts image to PDF
 *      gets the image file_id from the session
 *      returns the pdf as a buffer
 */
export default async (bot: Telegraf<AxContext>, ctx: AxContext) => {
    // get image buffer
    const fileId = ctx.session.fileInfo.file_id;
    const { href } = await bot.telegram.getFileLink(fileId);
    const buffer = await getImageBuffer(href);

    // create pdf doc & embed image
    const doc = await PDFDocument.create();
    const img = await doc.embedJpg(buffer);
    const page = doc.addPage([img.width, img.height]);
    page.drawImage(img);
    const pdfBytes = await doc.save();

    // convert to buffer and send
    return Buffer.from(pdfBytes);
};
