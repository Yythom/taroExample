/* eslint-disable no-unused-vars */
// import * as actionType from './contants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import TestService from '../../../../services/test'

/**
 * 初始化数据
 */
const initialState = {
    data: null
}

/**
 * reducers
 */
const reducers = {
    // changeTokenAction: (state, action) => {
    //     state.token = action.payload
    // }
}

/**
 * 异步action
 * 第二个参数 payloadCreator 应返回包含一些异步逻辑结果的promise
 * thunkAPI:
 * dispatch
 * getState
 * extra
 * signal
 * rejectWithValue
 */
// const changeuserInfoActionAsync = createAsyncThunk(
//     'home/changeuserInfoActionAsync',
//     async (data, thunkAPI) => {
//         const res = await TestService.getTestDataApi(data);
//         return res.data;
//     }
// )

/**
 * 其它reducers，异步及其公共recuders
 * @param {*} builder 
 */
// const extraReducers = builder => {
//     builder.addCase(changeuserInfoActionAsync.fulfilled, (state, action) => {
//         state.userInfo = action.payload;
//     })
// }

const homeSlice = createSlice({
    name: 'index',
    initialState,
    reducers,
    // extraReducers
})


export const actions = {
    ...homeSlice.actions,
    // changeuserInfoActionAsync,
};
export default homeSlice.reducer;