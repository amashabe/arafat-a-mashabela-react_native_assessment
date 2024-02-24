import { AnyAction } from 'redux';

const initialState = {
    isModalVisible: false
};

const ticketReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case 'SET_MODAL_STATE':
            return { ...state, isModalVisible: action.payload }
        default:
            return state;
    }
};

export default ticketReducer;
