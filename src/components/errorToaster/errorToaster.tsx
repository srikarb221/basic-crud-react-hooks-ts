import { FC, useState, useEffect } from "react";
import { IApiError } from "../../models/models";



const ErrorToaster: FC<IApiError> = ({ code, message }) => {

    const [showToaster, setShowToaster] = useState(false);

    useEffect(() => {
        const toasterFlag = code && code.toString().length > 0 ? true : false;
        setShowToaster(toasterFlag);
    }, [code]);

    const baseClass = "toast position-absolute bottom-0 end-0 " +
        " me-5 mb-5 show text-white bg-danger border-0";

    const toggleClass = showToaster ? ' show' : '';

    return (
        <>
            {showToaster && <div className={baseClass + toggleClass} >
                <div className="d-flex">
                    <div className="toast-body">
                        {code + " : " + message}
                    </div>
                    <button type="button" onClick={() => { setShowToaster(false) }} className="btn-close btn-close-white me-2 m-auto"></button>
                </div>
            </div>}
        </>
    );
}

export default ErrorToaster;