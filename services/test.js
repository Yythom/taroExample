import http from '../common/request';

class TestService {

    static async getTestList(params, area = '510107', shop_name = '', brand = '', page = '1', pageSize = '10') {
        const res = await http.post('/hb/v1/home/online', { area, shop_name, brand, page, pageSize, ...params });
        return res;
    }

    static async getTestDataApi(mobile = '1314521602') {
        const res = await http.post('/shop/v1/login/send', { mobile });
        return res;
    }

}

export default TestService;