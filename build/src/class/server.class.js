"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const mongodb_1 = __importDefault(require("../../lib/mongodb"));
class Server {
    constructor() {
        this.port = config_1.default.get('api.port');
        this.app = (0, express_1.default)();
        this.httpServer = new http_1.default.Server(this.app);
        this.mongodb = mongodb_1.default.instance;
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    start() {
        try {
            this.httpServer.listen(this.port);
            console.log(`listen on port ${this.port}`);
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.default = Server;
