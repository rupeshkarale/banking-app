import { findAllByTestId } from "@testing-library/react";
import * as types from "./actionTypes"



const initialState = {

  data: {},
  isLoading: false,
  isError: false,

};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {

    case types.GET_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case types.GET_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload,
        isError: false
      }
    case types.GET_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        data: {},
        isError: true
      }

    case types.LOG_OUT:
      return {
        ...state,
        isLoading: false,
        data: {},
        isError: false
      }

    default: return state;
  }


};

export { reducer };
