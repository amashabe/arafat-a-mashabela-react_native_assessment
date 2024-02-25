import { Dispatch } from "redux";

export const setModal = (visible: boolean) => (dispatch: Dispatch) => {
  dispatch({ type: "SET_MODAL_STATE", payload: visible });
};

export const setEditTicket =
  (
    ticket: {
      title: string;
      id: string;
      user: string | null;
      description: string;
      state: string;
    } | null
  ) =>
  (dispatch: Dispatch) => {
    dispatch({ type: "SET_EDIT_TICKET", payload: ticket });
    dispatch({ type: "SET_MODAL_STATE", payload: ticket ? true : false });
  };

export const UPDATE_DATA = "UPDATE_DATA";

export const updateData = (data: any[]) => (dispatch: Dispatch) => {
  dispatch({ type: UPDATE_DATA, payload: data });
};
