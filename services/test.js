import { systemInfo } from '@/common/publicFunc';
import { login, request } from '@tarojs/taro';
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

    // 商铺列表
    static async get_ShopListApi(search, location, sort, page = 1, tag_id, pageSize = 10) {
        const res = await http.post(
            '/shop/v1/common/shop/list',
            { search, location, page, sort, tag_id, pageSize }
        )
        return res;
    }

    static async uploadErrorApi(errorStack, error) {
        let uuid = await login();
        // let open_id=await 
        let error_obj = {
            errorStack,
            error: error,
            systemInfo,
            uuid,
        }
        console.log(error_obj);
        return
        request({
            url: 'test.php', //仅为示例，并非真实的接口地址
            data: error_obj,
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log(res.data, '上报成功')
            }
        });
        // return res;
    }
}

export default TestService;