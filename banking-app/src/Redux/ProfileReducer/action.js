import * as types from "./actionTypes"
import axios from "axios"
import { url } from './../../constants/constatant';

const getProfile = (token) => async (dispatch) => {
  const options = {
    url: `${url}/user/getprofile`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `bearer ${token}`
    },

  };
  dispatch({ type: types.GET_PROFILE_REQUEST })
  try {
    const r = await axios(options);
    dispatch({ type: types.GET_PROFILE_SUCCESS, payload: r.data });
  } catch (e) {
    dispatch({ type: types.GET_PROFILE_FAILURE });
  }
}


const getSingleProfile = (token, id) => async (dispatch) => {
  const options = {
    url: `${url}/user/getsingleuser/${id}`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `bearer ${token}`
    },

  };
  dispatch({ type: types.GET_PROFILE_REQUEST })
  return axios(options).then((r) => {
    console.log(r.data)
    dispatch({ type: types.GET_PROFILE_SUCCESS, payload: r.data })
  }).catch((e) => {
    dispatch({ type: types.GET_PROFILE_FAILURE })
  })
}


export { getProfile, getSingleProfile }
