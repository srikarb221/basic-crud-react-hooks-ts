import { Reducer } from "react";
import { ActionType, IAction, IApiState } from "../models/models";

export const apiState = {
    loading: false,
    errors: {
        code: '',
        status: '',
        message: ''
    },
    data: null
}

export const apiAction = (type: ActionType, payload: IApiState): IAction<IApiState> => {
    return { type, payload }
}

export const apiReducer: Reducer<IApiState, IAction<IApiState>> = (state = apiState, action) => {
    switch (action.type) {
        case ActionType.UPDATE_API_STATE:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
}