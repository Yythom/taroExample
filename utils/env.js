const TYPE = {
    ALIPAY: "ALIPAY",
    JD: "JD",
    QQ: "QQ",
    // RN: "RN",
    // SWAN: "SWAN",
    // TT: "TT",
    WEAPP: "WEAPP",
    WEB: "WEB",
};

const isWeapp = TYPE[process.env.TARO_ENV.toLocaleUpperCase()] == 'WEAPP';

export default isWeapp;
