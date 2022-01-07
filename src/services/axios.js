"use strict";
// import store from "@/store";
import axios from "axios";

const HTTP_ERROR = {
  UnprocessableEntity: 422,
  Unauthorized: 401,
  Offline: "Network Error",
};

/*
const API_CODES = {
	NOT_FOUND: 'ENTITY_NOT_FOUND',
	DUP_ENTITY: 'ER_DUP_ENTRY',
	VALIDATION_FAILED: 'VALIDATION_FAILED',
	MISSING_PARAMETER: 'MISSING_REQUIRED_PARAMETER',
}
*/

let config = {
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 20000,
};

const _axios = axios.create(config);

// _axios.interceptors.request.use(
// 	config => {
// 		let token = store.state.user.token
// 		if (token) {
// 			config.headers.Authorization = 'Bearer ' + token
// 		}
// 		return config
// 	},
// 	function(error) {
// 		return Promise.reject(error.response)
// 	},
// )

// import { USER as USER_ACTIONS } from '../store/actions'

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    if (response.data) {
      return response.data;
    } else {
      return response;
    }
  },
  function (error) {
    const response = error.response;

    if (response && response.status === HTTP_ERROR.Unauthorized) {
      // store.dispatch(USER_ACTIONS.LOGOUT)
      console.log("Unauthorized");
    } else if (error.message === HTTP_ERROR.Offline) {
      // store.dispatch(USER_ACTIONS.LOGOUT)
      console.log("Offline");
    }

    return Promise.reject(response.data.error);
  }
);

export default _axios;
