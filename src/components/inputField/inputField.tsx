

import { FC, ChangeEvent } from 'react';
import { IInputProps } from '../../models/models';



const InputField: FC<IInputProps<ChangeEvent<HTMLInputElement>>> =
    ({ type, id, handleChangeEvent, value, labelText, error, errorText, classes }) => {

        const finalClass = "form-control " + classes + (error ? " is-invalid" : "");

        return (
            <div className="form-floating mb-3">
                <input type={type} className={finalClass} id={id} value={value} onChange={handleChangeEvent} />
                <label htmlFor={id}>{labelText}</label>
                <div className="invalid-feedback">
                    {errorText}
                </div>
            </div>
        )
    }

export default InputField;