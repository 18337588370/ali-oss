"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._objectRequestParams = void 0;
const copy_to_1 = __importDefault(require("copy-to"));
const objectName_1 = require("../utils/objectName");
function _objectRequestParams(method, name, options = {}) {
    const { bucket } = this.options;
    if (!bucket && !this.options.cname) {
        throw new Error('Please create a bucket first');
    }
    name = objectName_1.objectName(name);
    const params = {
        object: name,
        bucket,
        method,
        subres: options && options.subres,
        timeout: options && options.timeout,
        ctx: options && options.ctx
    };
    if (options.headers) {
        params.headers = {};
        copy_to_1.default(options.headers).to(params.headers);
    }
    return params;
}
exports._objectRequestParams = _objectRequestParams;
