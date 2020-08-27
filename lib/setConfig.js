"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.initClient = void 0;
const urllib_1 = __importDefault(require("urllib"));
const agentkeepalive_1 = __importDefault(require("agentkeepalive"));
const getUserAgent_1 = require("./common/utils/getUserAgent");
const initOptions_1 = require("./common/client/initOptions");
const client_1 = __importDefault(require("./common/client"));
const _createStream_1 = require("./browser/client/_createStream");
const _unSupportBrowserTip_1 = require("./common/utils/_unSupportBrowserTip");
const HttpsAgentKeepalive = agentkeepalive_1.default.HttpsAgent;
const globalHttpAgent = new agentkeepalive_1.default();
const globalHttpsAgent = new HttpsAgentKeepalive();
class Client {
    constructor(options, ctx) {
        if (!(this instanceof Client)) {
            return new Client(options, ctx);
        }
        _unSupportBrowserTip_1._unSupportBrowserTip();
        Object.keys(client_1.default).forEach(prop => {
            Client.prototype[prop] = client_1.default[prop];
        });
        Client.prototype._createStream = _createStream_1._createStream;
        this.setConfig(options, ctx);
    }
    static use(...fn) {
        if (Array.isArray(fn)) {
            fn.filter(_ => typeof _ === 'function').forEach(f => {
                this[f.name] = f.bind(this);
                Client.prototype[f.name] = f;
            });
        }
        return this;
    }
    setConfig(options, ctx) {
        if (options && options.inited) {
            this.options = options;
        }
        else {
            this.options = initOptions_1.initOptions(options);
        }
        // support custom agent and urllib client
        if (this.options.urllib) {
            this.urllib = this.options.urllib;
        }
        else {
            this.urllib = urllib_1.default;
            this.agent = this.options.agent || globalHttpAgent;
            this.httpsAgent = this.options.httpsAgent || globalHttpsAgent;
        }
        this.ctx = ctx;
        this.userAgent = getUserAgent_1.getUserAgent();
    }
}
exports.Client = Client;
exports.initClient = (options, ctx) => {
    return new Client(options, ctx);
};
