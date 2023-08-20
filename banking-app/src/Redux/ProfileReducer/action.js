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

const updateProfile = (token, toast, payload, { task }, onClose) => (dispatch) => {

  dispatch({ type: types.GET_PROFILE_REQUEST })
  return axios.patch("https://odd-ruby-angelfish-wear.cyclic.app/user/updateprofile", payload, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `bearer ${token}`
    }
  }).then((r) => {
    dispatch({ type: types.GET_PROFILE_SUCCESS, payload: r.data })
    toast({
      position: 'top-center',
      render: () => (
        <div style={{ backgroundColor: " #272150", borderRadius: "9px", display: "flex", justifyContent: "space-around", alignItems: "center", width: "400px", padding: "10px 10px", height: "50px", color: "white" }}>
          {task}
        </div>
      ),
    })
    onClose();
    dispatch(getProfile(token));
  }).catch((e) => {
    dispatch({ type: types.GET_PROFILE_FAILURE })
  })
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

const Logout = (navigate) => (dispatch) => {
  dispatch({ type: types.LOG_OUT })
  navigate("/")
}

export { getProfile, updateProfile, getSingleProfile, Logout }
