import http from '../common/request';

class TestService {
    /**
     * 获取收货地址列表
     * @param {Number} page 页码
     * @param {Number} pageSize 页数
     */
    static async getTestDataApi(mobile = '1314521602') {
        const res = await http.post('/shop/v1/login/send', { mobile });
        return res;
    }

}

export default TestService;