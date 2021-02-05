const assert = require('assert');
const OSS = require('../..');
const config = require('../config').oss;
const mm = require('mm');
const pkg = require('../../package.json');
const { _getReqUrl } = require('../../lib/common/client/_getReqUrl');
const { _checkUserAgent } = require('../../lib/common/client/_checkUserAgent');
const { checkBrowserAndVersion } = require('../../lib/common/utils/checkBrowserAndVersion');

describe('test/client.test.js', () => {
  it('should init with region', () => {
    let store = new OSS({
      accessKeyId: 'foo',
      accessKeySecret: 'bar',
      region: 'oss-cn-hangzhou'
    });

    assert.equal(store.options.endpoint.format(), 'http://oss-cn-hangzhou.aliyuncs.com/');

    store = new OSS({
      accessKeyId: 'foo',
      accessKeySecret: 'bar',
      region: 'oss-cn-hangzhou',
      internal: true
    });

    assert.equal(store.options.endpoint.format(), 'http://oss-cn-hangzhou-internal.aliyuncs.com/');

    store = new OSS({
      accessKeyId: 'foo',
      accessKeySecret: 'bar',
      region: 'oss-cn-hangzhou',
      internal: true,
      secure: true
    });

    assert.equal(store.options.endpoint.format(), 'https://oss-cn-hangzhou-internal.aliyuncs.com/');

    store = new OSS({
      accessKeyId: 'foo',
      accessKeySecret: 'bar',
      region: 'vpc100-oss-cn-beijing'
    });

    assert.equal(store.options.endpoint.format(), 'http://vpc100-oss-cn-beijing.aliyuncs.com/');

    store = new OSS({
      accessKeyId: 'foo',
      accessKeySecret: 'bar',
      region: 'vpc100-oss-cn-shenzhen',
      internal: true
    });

    assert.equal(store.options.endpoint.format(), 'http://vpc100-oss-cn-shenzhen.aliyuncs.com/');

    store = new OSS({
      accessKeyId: 'foo',
      accessKeySecret: 'bar',
      region: 'vpc100-oss-cn-hangzhou',
      internal: true,
      secure: true
    });

    assert.equal(store.options.endpoint.format(), 'https://vpc100-oss-cn-hangzhou.aliyuncs.com/');
  });

  it('should init with cname: foo.bar.com', () => {
    let store = new OSS({
      accessKeyId: 'foo',
      accessKeySecret: 'bar',
      endpoint: 'foo.bar.com',
      cname: true
    });

    assert.equal(store.options.endpoint.format(), 'http://foo.bar.com/');

    store = new OSS({
      accessKeyId: 'foo',
      accessKeySecret: 'bar',
      endpoint: 'http://foo.bar.com',
      cname: true
    });

    assert.equal(store.options.endpoint.format(), 'http://foo.bar.com/');
  });

  it('should init with endpoint: http://test.oss.com', () => {
    let store = new OSS({
      accessKeyId: 'foo',
      accessKeySecret: 'bar',
      endpoint: 'test.oss.com'
    });

    assert.equal(store.options.endpoint.format(), 'http://test.oss.com/');

    store = new OSS({
      accessKeyId: 'foo',
      accessKeySecret: 'bar',
      endpoint: 'http://test.oss.com'
    });

    assert.equal(store.options.endpoint.format(), 'http://test.oss.com/');

    store = new OSS({
      accessKeyId: 'foo',
      accessKeySecret: 'bar',
      secure: true,
      endpoint: 'test.oss.com'
    });

    assert.equal(store.options.endpoint.format(), 'https://test.oss.com/');

    store = new OSS({
      accessKeyId: 'foo',
      accessKeySecret: 'bar',
      endpoint: 'https://test.oss.com'
    });

    assert.equal(store.options.endpoint.format(), 'https://test.oss.com/');
  });

  it('should init with ip address: http://127.0.0.1', () => {
    const store = new OSS({
      accessKeyId: 'foo',
      accessKeySecret: 'bar',
      endpoint: '127.0.0.1'
    });

    assert.equal(store.options.endpoint.format(), 'http://127.0.0.1/');
  });

  it('should create request url with bucket', () => {
    let store = new OSS({
      accessKeyId: 'foo',
      accessKeySecret: 'bar',
      region: 'oss-cn-hangzhou'
    });

    let params = {
      bucket: 'gems'
    };

    let url = _getReqUrl.call(store, params);
    assert.equal(url, 'http://gems.oss-cn-hangzhou.aliyuncs.com/');

    store = new OSS({
      accessKeyId: 'foo',
      accessKeySecret: 'bar',
      endpoint: 'test.oss.com'
    });

    params = {
      bucket: 'gems'
    };

    url = _getReqUrl.call(store, params);
    assert.equal(url, 'http://gems.test.oss.com/');

    store = new OSS({
      accessKeyId: 'foo',
      accessKeySecret: 'bar',
      endpoint: 'foo.bar.com',
      cname: true
    });

    params = {
      bucket: 'gems'
    };

    url = _getReqUrl.call(store, params);
    assert.equal(url, 'http://foo.bar.com/');

    store = new OSS({
      accessKeyId: 'foo',
      accessKeySecret: 'bar',
      endpoint: 'http://127.0.0.1:6000'
    });

    params = {
      bucket: 'gems'
    };

    url = _getReqUrl.call(store, params);
    assert.equal(url, 'http://127.0.0.1:6000/');
  });

  it('should create request url with bucket/object/subres', () => {
    let store = new OSS({
      accessKeyId: 'foo',
      accessKeySecret: 'bar',
      region: 'oss-cn-hangzhou'
    });

    let params = {
      bucket: 'gems',
      object: 'hello'
    };

    let url = _getReqUrl.call(store, params);
    assert.equal(url, 'http://gems.oss-cn-hangzhou.aliyuncs.com/hello');

    params = {
      bucket: 'gems',
      object: 'hello',
      subres: { acl: '', mime: '' }
    };

    url = _getReqUrl.call(store, params);
    assert.equal(url, 'http://gems.oss-cn-hangzhou.aliyuncs.com/hello?acl=&mime=');

    store = new OSS({
      accessKeyId: 'foo',
      accessKeySecret: 'bar',
      endpoint: 'test.oss.com'
    });

    params = {
      bucket: 'gems',
      object: 'hello'
    };

    url = _getReqUrl.call(store, params);
    assert.equal(url, 'http://gems.test.oss.com/hello');

    store = new OSS({
      accessKeyId: 'foo',
      accessKeySecret: 'bar',
      endpoint: 'foo.bar.com',
      cname: true
    });

    params = {
      bucket: 'gems',
      object: 'hello'
    };

    url = _getReqUrl.call(store, params);
    assert.equal(url, 'http://foo.bar.com/hello');

    store = new OSS({
      accessKeyId: 'foo',
      accessKeySecret: 'bar',
      endpoint: 'http://127.0.0.1:3000'
    });

    params = {
      bucket: 'gems',
      object: 'hello'
    };

    url = _getReqUrl.call(store, params);
    assert.equal(url, 'http://127.0.0.1:3000/hello');
  });

  it('should set User-Agent', async () => {
    after(mm.restore);

    const store = new OSS(config);
    let header;
    const req = store.urllib.request;
    mm(store.urllib, 'request', (url, args) => {
      header = args.headers;
      return req(url, args);
    });

    const result = await store.listBuckets();
    assert.equal(result.res.status, 200);
    assert(header['User-Agent']);
    assert(new RegExp(`aliyun-sdk-nodejs/(.+?) Node.js ${process.version.slice(1)}`).test(header['User-Agent']));
    assert(header['x-oss-user-agent']);
    assert(new RegExp(`aliyun-sdk-nodejs/(.+?) Node.js ${process.version.slice(1)}`).test(header['x-oss-user-agent']));
  });

  it('should check beta or alpha User-Agent', () => {
    const store = new OSS(config);
    const uaBeta = _checkUserAgent.call(store, 'aliyun-sdk-nodejs/4.12.2 Node.js β-8.4.0 on darwin x64');
    assert.equal(uaBeta, 'aliyun-sdk-nodejs/4.12.2 Node.js beta-8.4.0 on darwin x64');
    const uaAlpha = _checkUserAgent.call(store, 'aliyun-sdk-nodejs/4.12.2 Node.js α-8.4.0 on darwin x64');
    assert.equal(uaAlpha, 'aliyun-sdk-nodejs/4.12.2 Node.js alpha-8.4.0 on darwin x64');
  });

  it('should check browser and version', () => {
    const store = new OSS(config);
    assert(checkBrowserAndVersion('', ''));
    assert(!checkBrowserAndVersion('non-nodejs', ''));
    assert(!checkBrowserAndVersion('', 'error-version'));
  });

  it('should trim access id/key', () => {
    const store = new OSS({
      accessKeyId: '  \tfoo\t\n  ',
      accessKeySecret: '  \tbar\n\r   ',
      region: 'oss-cn-hangzhou'
    });

    assert.equal(store.options.accessKeyId, 'foo');
    assert.equal(store.options.accessKeySecret, 'bar');
  });

  describe('checkConfigValid', () => {
    let store;
    it('should success when endpoint is invalid', () => {
      const checkConfig = {
        accessKeyId: 'foo',
        accessKeySecret: 'bar',
        endpoint: 'vpc100-oss-cn-hangzhou',
        internal: true,
        secure: true
      };
      try {
        store = new OSS(checkConfig);
      } catch (error) {
        assert(false);
      }
    });
    it('should throw when endpoint includes invalid character', () => {
      const checkConfig = {
        accessKeyId: 'foo',
        accessKeySecret: 'bar',
        endpoint: 'vpc100-oss-cn-hang<tag />zhou',
        internal: true,
        secure: true
      };
      try {
        store = new OSS(checkConfig);
        assert(false);
      } catch (error) {
        assert(error.message.includes('endpoint'));
      }
    });
    it('should throw when endpoint change to invalid character', async () => {
      const checkConfig = {
        accessKeyId: 'foo',
        accessKeySecret: 'bar',
        endpoint: 'vpc100-oss-cn-hangzhou',
        internal: true,
        secure: true
      };
      try {
        store = new OSS(checkConfig);
        const invalidHost = 'vpc100-oss-cn-hangzhou.《》.com';
        store.options.endpoint.host = invalidHost;
        store.options.endpoint.hostname = invalidHost;
        await store.listBuckets();
        assert(false);
      } catch (error) {
        assert(error.message.includes('endpoint'));
      }
    });
    it('should success when region is valid', () => {
      const checkConfig = {
        accessKeyId: 'foo',
        accessKeySecret: 'bar',
        region: 'oss-cn-hangzhou',
        internal: true,
        secure: true
      };
      try {
        store = new OSS(checkConfig);
      } catch (error) {
        assert(false);
      }
    });
    it('should throw when region includes invalid character', () => {
      const checkConfig = {
        accessKeyId: 'foo',
        accessKeySecret: 'bar',
        region: 'oss-cn-?hangzhou',
        internal: true,
        secure: true
      };
      try {
        store = new OSS(checkConfig);
        assert(false);
      } catch (error) {
        assert(error.message.includes('region'));
      }
    });
  });
});
