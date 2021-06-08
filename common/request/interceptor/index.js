import Chain from './chain';

export default class Link {
  constructor(interceptor) {
    this.privateInterceptor = interceptor;
    this.chain = new Chain();
  }

  request(requestParams) {
    this.chain.interceptors = this.chain.interceptors.filter(
      (interceptor) => interceptor !== this.privateInterceptor,
    );
    this.chain.interceptors.push(this.privateInterceptor);
    return this.chain.proceed({ ...requestParams });
  }

  addInterceptor(interceptor) {
    this.chain.interceptors.push(interceptor);
  }

  cleanInterceptors() {
    this.chain = new Chain();
  }
}
