import config from './config';

const getBaseURL = () => {
  let BASE_URL = '';
  if (config.OPEN_MOCK) {
    BASE_URL = 'http://localhost:3008';
    return BASE_URL;
  }

  // 开发环境
  if (process.env.NODE_ENV === 'development') {
    // BASE_URL = 'https://api.integral.haimeiyx.com'; // api
    BASE_URL = 'https://xmt-test.jsrxjt.com'; // api
  } else { // 生产环境
    BASE_URL = 'https://xmt-test.jsrxjt.com';
  }
  return BASE_URL;
};

export default getBaseURL;
