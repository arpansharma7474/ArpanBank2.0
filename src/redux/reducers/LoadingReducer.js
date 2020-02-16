

import {
    LOADING_STATUS,
    CLEAR_ALL
} from '../actions/types';

const INITIAL_STATE = {
    loadingStatus: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CLEAR_ALL:
            return INITIAL_STATE
        case LOADING_STATUS:
            return { ...state, loadingStatus: action.payload };
        default:
            return state;
    }
};


