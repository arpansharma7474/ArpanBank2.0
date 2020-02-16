// Redux 
import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import LoadingReducer from './LoadingReducer'
import UserDetailsReducer from './UserDetailsReducer'

// import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    storage: storage,
    key: "persistedReducer",
    version: 1,
};

export default combineReducers({
    LoadingReducer: LoadingReducer,
    persistedReducer: persistReducer(persistConfig, UserDetailsReducer)
})
