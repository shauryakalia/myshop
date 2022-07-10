import { USER_ACTION_TYPES } from "./user.types";

const initialState = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: payload
            }
        case USER_ACTION_TYPES.SIGN_IN_FAILURE:
        case USER_ACTION_TYPES.SIGN_UP_FAIL:
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
            return {
                ...state,
                error: payload
            }
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null
            }
        default:
           return state
    }
}
