import { hideLoading, showLoading } from "@tarojs/taro";

const paging = async (
    request = { params: null, http: Function.prototype },
    page,
    callback = Function.prototype,
) => {
    showLoading()
    const result = await request.http({ ...request.params, page: page + 1 })
    callback(result)
    hideLoading();
}

const initing = async (
    request = { params: null, http: Function.prototype },
    callback = Function.prototype,
) => {
    const result = await request.http({ ...request.params, page: 1, pageSize: 10 })
    callback(result)
}

export { initing }
export default paging