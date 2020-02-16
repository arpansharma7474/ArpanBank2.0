// Redux 
import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import LoadingReducer from './LoadingReducer'
import UserDetailsReducer from './UserDetailsReducer'

const persistConfig = { key: "persistedReducer", version: 1, };

export default combineReducers({
    LoadingReducer: LoadingReducer,
    persistedReducer: persistReducer({ ...persistConfig, storage }, UserDetailsReducer)
})
