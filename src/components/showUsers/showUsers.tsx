import { FC, useEffect } from "react";
import User from "../user/user";
import useApiFormUtilsHook from '../../hooks/useApiFormUtilsHook';
import { useAppState } from '../../store/appStateProvider';
import { ActionType, IApiState, IModalState } from "../../models/models";
import { apiAction } from "../../store/apiReducer";
import { modalAction } from "../../store/modalReducer";

const ShowUsers: FC = () => {
    const { state, dispatch } = useAppState();
    const { fetchFormData } = useApiFormUtilsHook();

    useEffect(() => {
        const errorCode = (state.apiState.errors && state.apiState.errors.code) || '';
        if (!state.apiState.data &&
            errorCode.length <= 0
        ) {
            dispatch(fetchFormData(dispatch));
        }

        return () => {
            dispatch(apiAction(ActionType.UPDATE_API_STATE,
                { data: null, errors: { code: '', message: '' } } as IApiState))
        }
    }, [state.apiState.errors?.code]);

    const handleOnDeleteClick = (modalData: IModalState) => {
        dispatch(modalAction(ActionType.UPDATE_MODAL_STATE,
            { ...modalData } as IModalState));
    }

    return (
        <div className="container mt-5">
            {(!state.apiState.data ||
                (state.apiState.data && state.apiState.data.length <= 0)) ?
                <h6 className="text-center">No Data to fetch.</h6> :
                state.apiState.data.map((user) =>
                    <User key={user.id} {...user} handleOnDeleteClick={handleOnDeleteClick} />
                )}
        </div>
    )
}

export default ShowUsers;