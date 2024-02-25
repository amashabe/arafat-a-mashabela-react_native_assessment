import { AnyAction } from "redux";
import { UPDATE_DATA } from "../actions/ticketActions";

const initialState = {
  isModalVisible: false,
  data: [],
  editedTicket: null,
};

const ticketReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case "SET_MODAL_STATE":
      return { ...state, isModalVisible: action.payload };
    case "SET_EDIT_TICKET":
      return { ...state, editedTicket: action.payload };
    case UPDATE_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default ticketReducer;
