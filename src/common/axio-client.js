import axios from "axios";
import { BASE_URL, localStorageKeys } from "../constants";
import LocalStorageService from "../services/localstorage-service";
import { authActions } from "../containers/auth/state/authActions";
import { store } from "../store";
const client = axios.create({
  baseURL: BASE_URL,
  timeout: 30 * 1000
});

const requestHandler = request => {
  const token = LocalStorageService.getItem(localStorageKeys.ID_TOKEN);
  request.headers.Authorization = `Bearer ${token}`;

  return request;
};

const responseHandler = response => {
  if (response.status === 401) {
    store.dispatch(authActions.logoutUser.request());
  }

  return response;
};

const errorHandler = error => {
  if (error && error.response && error.response.status === 401) {
    store.dispatch(authActions.logoutUser.request());
    return;
  }
  try {
    const apierror = error.response.data.apierror;
    return Promise.reject(apierror);
  } catch (err) {
    return Promise.reject(error);
  }
};

client.interceptors.request.use(
  request => requestHandler(request),
  error => errorHandler(error)
);

client.interceptors.response.use(
  response => responseHandler(response),
  error => errorHandler(error)
);

export default client;
