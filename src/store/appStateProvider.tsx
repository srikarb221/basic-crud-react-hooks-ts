import { createContext, useReducer, useMemo, useCallback, Dispatch, FC, useContext } from "react";
import { createUserReducer, formState } from '../store/createUserReducer';
import { apiReducer, apiState } from '../store/apiReducer';
import { modalReducer, modalState } from '../store/modalReducer';
import { IAction, IApiState, IAppState, IFormState, IModalState, INoPayloadAction } from '../models/models';


export type Thunk = (dispatch: Dispatch<IAction<IApiState> |
    IAction<IFormState> |
    INoPayloadAction>, state: IAppState) => void;

export type IAppDispatch = Dispatch<Thunk | IAction<IApiState> |
    IAction<IFormState> | INoPayloadAction>;

export interface IAppContext {
    state: IAppState;
    dispatch: IAppDispatch;
}

export const wrapperDispatch = (dispatch: Dispatch<IAction<IApiState> |
    IAction<IFormState> | INoPayloadAction>, state: IAppState) =>
    (action: Thunk | IAction<IApiState> | IAction<IFormState> | INoPayloadAction) =>
        (action instanceof Function) ? action(dispatch, state) : dispatch(action);

const appState: IAppState = {
    formState,
    apiState,
    modalState
}

export const AppStateContext = createContext<IAppContext>({
    state: appState,
    dispatch: () => { }
});

export const AppStateProvider: FC = ({ children }) => {

    const appReducer = useCallback(
        ({ apiState, formState, modalState }: IAppState,
            action: IAction<IFormState> | IAction<IApiState> | IAction<IModalState> | INoPayloadAction) => ({
                apiState: apiReducer(apiState, action as IAction<IApiState>),
                formState: createUserReducer(formState, action as IAction<IFormState>),
                modalState: modalReducer(modalState, action as IAction<IModalState>)
            }), []
    );


    const [tempstate, tempdispatch] = useReducer(appReducer, appState);

    const state = useMemo(() => tempstate, [tempstate]);

    const dispatch = useMemo(() => wrapperDispatch(tempdispatch, state), [state, tempdispatch])

    return (
        <AppStateContext.Provider value={{ state, dispatch }}>
            {children}
        </AppStateContext.Provider>
    )

}

export const useAppState = () => useContext(AppStateContext);