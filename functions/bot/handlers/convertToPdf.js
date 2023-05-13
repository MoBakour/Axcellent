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
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_lib_1 = require("pdf-lib");
const utils_1 = require("../utils/utils");
/**
 * Converts image to PDF
 *      gets the image file_id from the session
 *      returns the pdf as a buffer
 */
exports.default = (bot, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    // get image buffer
    const fileId = ctx.session.fileInfo.file_id;
    const { href } = yield bot.telegram.getFileLink(fileId);
    const buffer = yield (0, utils_1.getImageBuffer)(href);
    // create pdf doc & embed image
    const doc = yield pdf_lib_1.PDFDocument.create();
    const img = yield doc.embedJpg(buffer);
    const page = doc.addPage([img.width, img.height]);
    page.drawImage(img);
    const pdfBytes = yield doc.save();
    // convert to buffer and send
    return Buffer.from(pdfBytes);
});
