import { Reducer } from "react";
import { ActionType, IFormState, IAction, INoPayloadAction } from "../models/models";

export const formState = {
    firstName: { value: '', error: false, required: true },
    lastName: { value: '', error: false, required: true },
    email: { value: '', error: false, required: true },
    designation: { value: '', error: false, required: false }
}

export const formAction = (type: ActionType, payload?: IFormState): IAction<IFormState> | INoPayloadAction => {
    return { type, payload };
}

export const createUserReducer: Reducer<IFormState, IAction<IFormState>> = (state = formState, action) => {
    switch (action.type) {
        case ActionType.UPDATE_FORM_STATE:

            return {
                ...state,
                ...action.payload
            };

        case ActionType.RESET_FORM_DATA:
            state = formState;
            return state;

        default:
            return state;
    }
}

