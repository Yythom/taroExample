export function timeoutInterceptor(chain) {
  const { requestParams } = chain;
  let p;
  const res = new Promise((resolve, reject) => {
    let timeout = setTimeout(() => {
      timeout = null;
      reject(new Error('网络请求超时，请稍后再试！'));
    }, (requestParams && requestParams.timeout) || 30000);
    p = chain.proceed(requestParams);
    p.then((res2) => {
      if (!timeout) return;
      clearTimeout(timeout);
      resolve(res2);
    }).catch((err) => {
      timeout && clearTimeout(timeout);
      reject(err);
    });
  });
  if (typeof p.abort === 'function') res.abort = p.abort;
  return res;
}

export function logInterceptor(chain) {
  const { requestParams } = chain;
  const { method, data, url } = requestParams;
  console.log(`%c http ${method || 'GET'} --> ${url} data: %O`, 'font-weight:bold;color:#6190E8;', data);
  const p = chain.proceed(requestParams);
  const res = p.then((res2) => {
    console.log(`%c http <-- ${url} result: %O`, 'font-weight:bold;color:#13CE66;', res2);
    return res2;
  });
  if (typeof p.abort === 'function') res.abort = p.abort;
  return res;
}
