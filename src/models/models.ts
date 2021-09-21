

export interface IInputProps<E> {
    type: string;
    id: string;
    handleChangeEvent: (event: E) => void;
    value: string;
    labelText: string;
    error: boolean;
    errorText: string;
    classes: string;
}

export interface IFieldState {
    value: string;
    error: boolean;
    required: boolean;
}

export interface IFormState {
    firstName: IFieldState,
    lastName: IFieldState,
    email: IFieldState,
    designation: IFieldState
}

export enum ActionType {
    UPDATE_FORM_STATE = 'UPDATE_FORM_STATE',
    RESET_FORM_DATA = 'RESET_FORM_DATA',
    UPDATE_API_STATE = 'UPDATE_API_STATE',
    UPDATE_MODAL_STATE = 'UPDATE_MODAL_STATE'
}

export interface IAction<P> {
    type: ActionType;
    payload: P
}
export interface INoPayloadAction {
    type: ActionType;
}


export interface IApiError {
    code?: string;
    status?: string;
    message?: string;
}

export interface IUserData extends IFormState {
    id?: string;
    handleOnDeleteClick?: Function
}

export interface IRouteData extends IUserData {
    flowType?: string;
}

export interface IModalState extends IUserData {
    showModal: boolean;
}

export interface IApiState {
    loading?: boolean;
    errors?: IApiError;
    data?: IUserData[] | null;
}

export interface IAppState {
    formState: IFormState;
    apiState: IApiState;
    modalState: IModalState
}

export interface IOptions {
    route: string;
    method: string;
}
