import { combineReducers } from '@reduxjs/toolkit'

import tarbarReducer from '../src/custom-tab-bar/store/slice'
import userReducer from './userStore'
import testReducer from '../src/pages/test/store/slice'

/**
 * 合并reducers
 */
const reducers = {
    tabbar: tarbarReducer,
    testStore: testReducer,
    userStore: userReducer,
}

const reducer = combineReducers(reducers)
export default reducer;