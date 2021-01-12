// import * as actionType from './contants'
import { createSlice } from '@reduxjs/toolkit'

/**
 * 初始化数据
 */
const initialState = {
    active: 0,
}

/**
 * reducers
 */
const reducers = {
    changetab: (state, action) => {
        state.active = action.payload
    }
}


const tabbarSlice = createSlice({
    name: 'tabbar',
    initialState,
    reducers,
})

export const actions = tabbarSlice.actions;
export default tabbarSlice.reducer;