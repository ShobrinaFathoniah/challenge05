import {SET_TOKEN} from './types';

const initialState = {
  dataToken: '',
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        dataToken: action.token,
      };

    default:
      return {
        ...state,
      };
  }
};
