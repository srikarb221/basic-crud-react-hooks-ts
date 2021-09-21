import { FC, FormEvent, useEffect } from 'react';
import InputField from '../inputField/inputField';
import useFormHook from '../../hooks/useFormHook';
import { ActionType, IApiState } from '../../models/models';
import { formAction } from '../../store/createUserReducer';
import useApiFormUtilsHook from '../../hooks/useApiFormUtilsHook';
import { useAppState } from '../../store/appStateProvider';
import { apiAction } from '../../store/apiReducer';


const AddEditUser: FC = () => {


    const { state, dispatch } = useAppState();
    const { saveFormData, updateUser } = useApiFormUtilsHook();
    const { getFormProps, editData, isFormValid } = useFormHook();

    const formProps = getFormProps();

    useEffect(() => {
        return () => {
            dispatch(formAction(ActionType.RESET_FORM_DATA));
            dispatch(apiAction(ActionType.UPDATE_API_STATE,
                { errors: { code: '', status: '', message: '' } } as IApiState))
        }
    }, []);



    const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (editData && editData.flowType === 'Edit') {
            dispatch(updateUser(dispatch, { id: editData.id, ...state.formState }));
        } else {
            dispatch(saveFormData(dispatch, state.formState));
        }
    }

    return (
        <div className="container mt-5" style={{ width: '45%' }}>
            <form className="mt-5" onSubmit={handleOnSubmit} >
                <InputField {...formProps.firstNameProps} />

                <InputField {...formProps.lastNameProps} />

                <InputField {...formProps.emailProps} />

                <InputField {...formProps.designationProps} />

                <button
                    className="btn btn-primary d-grid gap-2 col-6 mx-auto rounded-pill p-2 mb-5"
                    type="submit" disabled={!isFormValid}>
                    {editData && editData.flowType === 'Edit' ? 'Edit User' : 'Add User'}
                </button>
            </form>
        </div>
    )
}

export default AddEditUser;