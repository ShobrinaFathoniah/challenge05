import {CONFIRM_CODE, SET_DATA_USER, SET_DATA_USER_GOOGLE} from './types';

const initialState = {
  dataUser: {},
  dataUserGoogle: {},
  confirmCode: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_USER:
      return {
        ...state,
        dataUser: action.dataUser,
      };
    case SET_DATA_USER_GOOGLE:
      return {
        ...state,
        dataUserGoogle: action.dataUserGoogle,
      };
    case CONFIRM_CODE:
      return {
        ...state,
        confirmCode: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};
