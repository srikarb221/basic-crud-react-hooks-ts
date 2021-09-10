import { FC, MouseEvent } from "react";
import { useHistory } from 'react-router-dom';
import { IUserData } from "../../models/models";

const User: FC<IUserData> = (user) => {
    const history = useHistory();

    const { id, firstName, lastName, email, designation, handleOnDeleteClick } = user;

    const handleOnClick = (event: MouseEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        if (value === 'Edit') {
            history.push('/create', { flowType: 'Edit', id, firstName, lastName, email, designation });
        } else {
            if (handleOnDeleteClick) {
                const showModal = true;
                handleOnDeleteClick({ id, firstName, lastName, email, designation, showModal });
            }
        }
    }

    return (
        <div className="card m-auto mb-4 shadow rounded" style={{ width: "50rem" }}>
            <h6 className="card-header card-title text-center text-muted">
                User Details
            </h6>
            <div className="card-body d-flex ps-5 pe-5">
                <div className="d-flex flex-column justify-content-around">
                    <span className="card-text">{firstName.value + " " + lastName.value}</span>
                    <span className="card-text">{designation.value}</span>
                    <span className="card-text">{email.value}</span>
                </div>
                <div className="d-flex flex-column ms-auto">
                    <input type="button" className="btn btn-primary rounded-pill ps-3 pe-3 mb-3"
                        onClick={handleOnClick} defaultValue={'Edit'} />
                    <input type="button" className="btn btn-primary rounded-pill ps-3 pe-3"
                        onClick={handleOnClick} defaultValue="Delete" />
                </div>
            </div>
        </div>
    )
}

export default User;