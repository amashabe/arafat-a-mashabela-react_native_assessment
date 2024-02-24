import { Dispatch } from 'redux';

export const setModal = (visible: boolean) => (dispatch: Dispatch) => {
    dispatch({ type: 'SET_MODAL_STATE', payload: visible, })
}