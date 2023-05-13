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
exports.handler = void 0;
// dotenv configuration
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// imports
const telegraf_1 = require("telegraf");
const startCommand_1 = __importDefault(require("./commands/startCommand"));
const helpCommand_1 = __importDefault(require("./commands/helpCommand"));
const settingsCommand_1 = __importDefault(require("./commands/settingsCommand"));
const infoCommand_1 = __importDefault(require("./commands/infoCommand"));
const phoneHandler_1 = __importDefault(require("./handlers/phoneHandler"));
const mediaHandler_1 = __importDefault(require("./handlers/mediaHandler"));
const linkHandler_1 = __importDefault(require("./handlers/linkHandler"));
// env variables
const TOKEN = process.env.TOKEN;
// bot instance
const bot = new telegraf_1.Telegraf(TOKEN);
// set session storage
bot.use((0, telegraf_1.session)({
    defaultSession: () => ({
        language: "english",
    }),
}));
// handlers
(0, startCommand_1.default)(bot);
(0, helpCommand_1.default)(bot);
(0, settingsCommand_1.default)(bot);
(0, infoCommand_1.default)(bot);
(0, phoneHandler_1.default)(bot);
(0, mediaHandler_1.default)(bot);
(0, linkHandler_1.default)(bot);
// launch bot
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield bot.handleUpdate(JSON.parse(event.body));
        return {
            statusCode: 200,
            body: "",
        };
    }
    catch (err) {
        console.error(err);
        return {
            statusCode: 400,
            body: "This endpoint is meant for bot and telegram communication",
        };
    }
});
exports.handler = handler;
