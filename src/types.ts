// imports
import { Context } from "telegraf";
import { Update } from "telegraf/types";
import ytdl from "ytdl-core";
import { PhotoSize, Video } from "telegraf/typings/core/types/typegram";

export type LanguageObjectKey = "arabic" | "english" | "turkish" | "russian";

export interface AxContext<U extends Update = Update> extends Context<U> {
    session: {
        language: string;
        fileInfo: PhotoSize | Video;
        videoUrl: string;
        videoFormats: ytdl.videoFormat[];
    };
}
