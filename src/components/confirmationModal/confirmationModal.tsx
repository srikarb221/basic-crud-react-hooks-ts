import { FC } from "react";
import ReactDOM from "react-dom";
import useApiFormUtilsHook from "../../hooks/useApiFormUtilsHook";
import { ActionType, IModalState } from "../../models/models";
import { useAppState } from "../../store/appStateProvider";
import { modalAction } from "../../store/modalReducer";

const ConfirmationModal: FC = () => {

    const { state, dispatch } = useAppState();
    const { deleteUser } = useApiFormUtilsHook();

    const handleHideModal = () => {
        dispatch(modalAction(ActionType.UPDATE_MODAL_STATE, { showModal: false } as IModalState));
    }
    const handleConfirmDeleteUser = () => {
        dispatch(modalAction(ActionType.UPDATE_MODAL_STATE, { showModal: false } as IModalState));
        dispatch(deleteUser(dispatch, { ...state.modalState }));
    }

    return (
        <>
            <div className="modal-backdrop fade show" id="exampleModal">
            </div>
            <div className="modal d-block" id="exampleModalToggle" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalToggleLabel">Confirm Delete</h5>
                            <button type="button" onClick={handleHideModal} className="btn-close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure, do you want to delete.?
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary"
                                onClick={handleHideModal} >Cancel</button>
                            <button className="btn btn-primary"
                                onClick={handleConfirmDeleteUser} >Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const Modal: FC = () => {

    return (
        <>
            {ReactDOM.createPortal(
                <ConfirmationModal />,
                document.getElementById('modal-root') as HTMLElement
            )}
        </>)
}

export default Modal;
