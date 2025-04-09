import { getToken } from "./storage";
import {
  API_FORGOT_PASSWORD,
  API_LOGIN,
  // API_LOGOUT,
  API_RESET_PASSWORD,
} from "../params";
import { handleTokenExpired, handleConnectionError } from "../utils";
import axios from "axios";
import api from '../api'

// export const apiLogout = async () => {
//   const token = getToken();
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//   return axios
//     .post(`${BASE_URL}/${API_LOGOUT}`)
//     .then((response) => {
//       handleTokenExpired(response.data);
//       return response.data;
//     })
//     .catch((error) => {
//       handleConnectionError(error);
//       return error.response.data;
//     });
// };

export const apiLogin = async (payload) => {
  return api
    .post(`${API_LOGIN}`, payload)
    .then((response) => {
      handleTokenExpired(response.data);
      return { status: true, data: response.data };
    })
    .catch((error) => {
      handleConnectionError(error);
      return { status: false, data: error.response.data };
    });
};

export const apiResetPassword = async (payload) => {
  return axios
    .post(`${BASE_URL}/${API_RESET_PASSWORD}`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      handleConnectionError(error);
      return error.response.data;
    });
};

export const apiForgotPassword = async (payload) => {
  return axios
    .post(`${BASE_URL}/${API_FORGOT_PASSWORD}`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      handleConnectionError(error);
      return error.response.data;
    });
};
