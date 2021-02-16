/* eslint-disable no-unused-vars */
// import * as actionType from './contants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getStorageSync, setStorageSync, login } from '@tarojs/taro'
import TestService from '../services/test'
/**
 * 初始化数据
 */
const initialState = {
    token: getStorageSync('token') || null,
    userInfo: getStorageSync('info') || null,
}
/**
 * reducers
 */
const reducers = {
    changeTokenAction: (state, action) => {
        state.token = action.payload
    },
    setUserInfo: (state, action) => {
        state.userInfo = action.payload
        setStorageSync('info', state.userInfo)
    },
    setPhone: (state, action) => {
        state.userInfo.phone = action.payload
        setStorageSync('info', state.userInfo)
    }
}

/**
 * 异步action
 * 应返回包含一些异步逻辑结果的promise 通过extraReducers空间处理
 */
const changeTokenActionAsync = createAsyncThunk(
    'user/changeTokenActionAsync',
    async (data, thunkAPI) => {
        const Tlogin = await login();
        // const res = await TestService.getTestDataApi(Tlogin.code); // 通过微信登入获取code取接口token
        // setStorageSync('token',res.token)
        return Tlogin.code;
    }
)
/**
 * 其它reducers，异步及其公共recuders
 * @param {*} builder 
 */
const extraReducers = builder => {
    builder.addCase(changeTokenActionAsync.fulfilled, (state, action) => {
        console.log(action);
        state.token = action.payload
    })
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers,
    extraReducers
})


export const actions = {
    ...userSlice.actions,
    changeTokenActionAsync,
};
export default userSlice.reducer;