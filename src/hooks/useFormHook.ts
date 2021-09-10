import { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useAppState } from '../store/appStateProvider';
import { formAction } from '../store/createUserReducer';
import { ActionType, IFormState, IRouteData } from '../models/models';


export const validateFormData = (value: string, id: string, formState: IFormState) => {
    let updatedData = { ...formState[id as keyof IFormState] };
    updatedData.value = value;

    switch (id) {
        case 'firstName':
            if (value.trim().length < 2 || !value.match(/^[a-zA-Z0-9]*$/)) {
                updatedData.error = true;
            } else {
                updatedData.error = false;
            }
            break;
        case 'lastName':
            if (value.trim().length < 2 || !value.match(/^[a-zA-Z0-9]*$/)) {
                updatedData.error = true;
            } else {
                updatedData.error = false;
            }
            break;
        case 'email':
            if (value.trim().length < 2 ||
                !value.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/)) {
                updatedData.error = true;
            } else {
                updatedData.error = false;
            }
            break;

        default:
            break;
    }

    return { [id as string]: updatedData };

}

const useFormHook = () => {
    const { state, dispatch } = useAppState();
    const location = useLocation();
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (location.state) {
            const { flowType, firstName, lastName, email, designation } = location.state as IRouteData;
            if (flowType === 'Edit') {
                dispatch(formAction(ActionType.UPDATE_FORM_STATE,
                    { firstName, lastName, email, designation }));
            }
        }
    }, [location.state]);

    useEffect(() => {
        const checkFormValid = Object.keys(state.formState).find((key) => {
            const data = state.formState[key as keyof IFormState];
            if (data.required && (data.error || data.value.trim().length === 0)) {
                return true;
            }
            return false;
        });
        setIsFormValid(checkFormValid && checkFormValid.trim().length > 0 ? false : true);
    }, [state.formState]);

    const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        let data = {};

        data = validateFormData(value, id, state.formState);
        dispatch(formAction(ActionType.UPDATE_FORM_STATE, data as IFormState));
    }


    const getFormProps = () => {
        const firstNameProps = {
            type: "text", id: "firstName",
            handleChangeEvent,
            value: state.formState.firstName.value,
            labelText: "First Name", error: state.formState.firstName.error,
            errorText: "Please enter a valid First Name.", classes: "mb3"
        };
        const lastNameProps = {
            type: "text", id: "lastName",
            handleChangeEvent,
            value: state.formState.lastName.value,
            labelText: "LastName", error: state.formState.lastName.error,
            errorText: "Please enter a valid Last Name.", classes: "mb3"
        };
        const emailProps = {
            type: "email", id: "email",
            handleChangeEvent,
            value: state.formState.email.value,
            labelText: "Email", error: state.formState.email.error,
            errorText: "Please enter a valid Email.", classes: "mb-3"
        };
        const designationProps = {
            type: "text", id: "designation",
            handleChangeEvent,
            value: state.formState.designation.value,
            labelText: "Designation", error: state.formState.designation.error,
            errorText: "", classes: "mb-5"
        };

        return { firstNameProps, lastNameProps, emailProps, designationProps };
    }



    return {
        handleChangeEvent, state: state.formState,
        isFormValid,
        getFormProps,
        editData: location.state as IRouteData
    };

}

export default useFormHook;