import {SET_LOADING} from './globalTypes';

export const setIsLoading = status => {
  return {
    type: SET_LOADING,
    status,
  };
};
