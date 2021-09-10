import { Reducer } from "react";
import { ActionType, IAction, IModalState } from "../models/models";

export const modalState = {
    showModal: false,
    firstName: { value: '', error: false, required: true },
    lastName: { value: '', error: false, required: true },
    email: { value: '', error: false, required: true },
    designation: { value: '', error: false, required: false }
}

export const modalAction = (type: ActionType, payload: IModalState): IAction<IModalState> => {
    return { type, payload }
}

export const modalReducer: Reducer<IModalState, IAction<IModalState>> =
    (state = modalState, action) => {

        switch (action.type) {
            case ActionType.UPDATE_MODAL_STATE:
                return {
                    ...state,
                    ...action.payload
                };

            default:
                return state;
        }
    }