// Redux 
import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import LoadingReducer from './LoadingReducer'
import UserDetailsReducer from './UserDetailsReducer'
import TransactionReducer from './TransactionReducers'
import UsersReducer from './UsersReducer'

const persistConfig = {
    storage: storage,
    key: "persistedReducer",
    version: 1,
};

export default combineReducers({
    LoadingReducer: LoadingReducer,
    UsersReducer: UsersReducer,
    TransactionReducer: TransactionReducer,
    persistedReducer: persistReducer(persistConfig, UserDetailsReducer)
})
