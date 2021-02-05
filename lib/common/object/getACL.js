"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getACL = void 0;
const objectName_1 = require("../utils/objectName");
const _objectRequestParams_1 = require("../client/_objectRequestParams");
/*
 * Get object's ACL
 * @param {String} name the object key
 * @param {Object} options
 * @return {Object}
 */
async function getACL(name, options = {}) {
    options.subres = Object.assign({ acl: '' }, options.subres);
    if (options.versionId) {
        options.subres.versionId = options.versionId;
    }
    name = objectName_1.objectName(name);
    const params = _objectRequestParams_1._objectRequestParams.call(this, 'GET', name, options);
    params.successStatuses = [200];
    params.xmlResponse = true;
    const result = await this.request(params);
    return {
        acl: result.data.AccessControlList.Grant,
        owner: {
            id: result.data.Owner.ID,
            displayName: result.data.Owner.DisplayName,
        },
        res: result.res,
    };
}
exports.getACL = getACL;
