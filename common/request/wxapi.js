import { hideLoading } from '@tarojs/taro';
import Link from './interceptor';

const RequestQueue = {
  MAX_REQUEST: 10,
  queue: [],
  pendingQueue: [],

  request(options) {
    this.queue.push(options);
    return this.run();
  },

  run() {
    if (!this.queue.length) return;
    while (this.pendingQueue.length < this.MAX_REQUEST) {
      const options = this.queue.shift();
      const successFn = options.success;
      const failFn = options.fail;
      options.success = (...args) => {
        hideLoading();
        this.pendingQueue = this.pendingQueue.filter((item) => item !== options);
        this.run();
        successFn && successFn.apply(options, args);
      };
      options.fail = (...args) => {
        hideLoading();
        this.pendingQueue = this.pendingQueue.filter((item) => item !== options);
        this.run();
        failFn && failFn.apply(options, args);
      };
      this.pendingQueue.push(options);
      // eslint-disable-next-line no-undef
      return wx.request(options);
    }
  },
};

function request(options = {}) {
  if (typeof options === 'string') {
    options = {
      url: options,
    };
  }
  const originSuccess = options.success;
  const originFail = options.fail;
  const originComplete = options.complete;
  let requestTask;
  const p = new Promise((resolve, reject) => {
    options.success = (res) => {
      originSuccess && originSuccess(res);
      resolve(res);
    };
    options.fail = (res) => {
      originFail && originFail(res);
      reject(res);
    };
    options.complete = (res) => {
      originComplete && originComplete(res);
    };
    requestTask = RequestQueue.request(options);
  });
  p.abort = (cb) => {
    cb && cb();
    if (requestTask) {
      requestTask.abort();
    }
    return p;
  };
  return p;
}

function privateInterceptor(chain) {
  return request(chain.requestParams);
}

const link = new Link(privateInterceptor);

export default {
  request: link.request.bind(link),
  addInterceptor: link.addInterceptor.bind(link),
  cleanInterceptor: link.cleanInterceptors.bind(link),
};
