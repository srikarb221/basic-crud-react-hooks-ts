import { useHistory } from 'react-router-dom';
import { IFormState, ActionType, IApiState, IUserData } from '../models/models';
import { apiAction } from '../store/apiReducer';
import { IAppDispatch } from '../store/appStateProvider';
import { makeApiCall } from '../utils/utils';
import { useCallback } from 'react';

const useApiFormUtilsHook = () => {

    const history = useHistory();

    const saveFormData = (dispatch: IAppDispatch, requestData: IFormState) => () => {
        const options = { route: 'save', method: 'POST' };

        dispatch(apiAction(ActionType.UPDATE_API_STATE,
            { loading: true, errors: { code: '', status: '', message: '' } } as IApiState));

        makeApiCall(options, requestData)
            .then((response) => {
                return { status: response.status, data: response.json() }
            })
            .then((data) => {
                if (data.status === 200) {
                    history.push('/');
                }
            })
            .catch((error) => {
                if (error.code) {
                    dispatch(apiAction(ActionType.UPDATE_API_STATE,
                        { errors: error } as IApiState));
                } else {
                    dispatch(apiAction(ActionType.UPDATE_API_STATE,
                        { errors: { code: '500', status: 'Error', message: error } } as IApiState));
                }
            })
            .finally(() => dispatch(apiAction(ActionType.UPDATE_API_STATE,
                { loading: false } as IApiState)));

    };

    const updateUser = (dispatch: IAppDispatch, requestData: IUserData) => () => {
        const options = { route: 'update', method: 'PUT' };

        dispatch(apiAction(ActionType.UPDATE_API_STATE,
            { loading: true, errors: { code: '', status: '', message: '' } } as IApiState));

        makeApiCall(options, requestData)
            .then((response) => {
                return { status: response.status, data: response.json() }
            })
            .then((data) => {
                if (data.status === 200) {
                    history.push('/');
                }
            })
            .catch((error) => {
                if (error.code) {
                    dispatch(apiAction(ActionType.UPDATE_API_STATE,
                        { errors: error } as IApiState));
                } else {
                    dispatch(apiAction(ActionType.UPDATE_API_STATE,
                        { errors: { code: '500', status: 'Error', message: error } } as IApiState));
                }
            })
            .finally(() => dispatch(apiAction(ActionType.UPDATE_API_STATE,
                { loading: false } as IApiState)));

    };

    const deleteUser = (dispatch: IAppDispatch, requestData: IUserData) => () => {
        const options = { route: 'delete', method: 'DELETE' };

        dispatch(apiAction(ActionType.UPDATE_API_STATE,
            { loading: true, errors: { code: '', status: '', message: '' } } as IApiState));

        makeApiCall(options, requestData)
            .then((response) => {
                return { status: response.status, data: response.json() }
            })
            .then((data) => {
                if (data.status === 200) {
                    history.push('/');
                }
            })
            .catch((error) => {
                if (error.code) {
                    dispatch(apiAction(ActionType.UPDATE_API_STATE,
                        { errors: error } as IApiState));
                } else {
                    dispatch(apiAction(ActionType.UPDATE_API_STATE,
                        { errors: { code: '500', status: 'Error', message: error } } as IApiState));
                }
            })
            .finally(() => dispatch(apiAction(ActionType.UPDATE_API_STATE,
                { loading: false } as IApiState)));
    };

    const fetchFormData = useCallback((dispatch: IAppDispatch) => () => {
        const options = { route: 'fetch', method: 'GET' };
        dispatch(apiAction(ActionType.UPDATE_API_STATE,
            { loading: true, errors: { code: '', status: '', message: '' } } as IApiState));

        makeApiCall(options)
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    dispatch(apiAction(ActionType.UPDATE_API_STATE,
                        { data: data.data } as IApiState));
                } else {
                    dispatch(apiAction(ActionType.UPDATE_API_STATE,
                        {
                            errors: {
                                code: data.code,
                                status: data.status,
                                message: data.message
                            }
                        } as IApiState));
                }
            })
            .catch((error) => {
                if (error.code) {
                    dispatch(apiAction(ActionType.UPDATE_API_STATE,
                        { errors: error } as IApiState));
                } else {
                    dispatch(apiAction(ActionType.UPDATE_API_STATE,
                        { errors: { code: '500', status: 'Error', message: error } } as IApiState));
                }
            })
            .finally(() => {
                dispatch(apiAction(ActionType.UPDATE_API_STATE,
                    { loading: false } as IApiState));
            });
    }, []);

    return { saveFormData, fetchFormData, updateUser, deleteUser };

}


export default useApiFormUtilsHook;