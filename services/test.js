import http from '../common/request';

class TestService {
    /**
     * 获取收货地址列表
     * @param {Number} page 页码
     * @param {Number} pageSize 页数
     */
    static async getTestDataApi(mobile = '12313123') {
        const res = await http.post('/shop/v1/login/send', { mobile });
        return res;
    }

    // 商铺列表
    static async get_ShopListApi(search, location, sort, page = 1, tag_id, pageSize = 10) {
        const res = await http.post(
            '/shop/v1/common/shop/list',
            { search, location, page, sort, tag_id, pageSize }
        )
        return res;
    }

    // static async up(blog, key) {
    //     const res = await http.post('/upload', {
    //         blog,
    //         key
    //     });
    //     return res;
    // }
}

export default TestService;