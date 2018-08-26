import axios from "axios";

import {
  GET_WALLETS,
  GET_WALLET,
  WALLET_LOADING,
  CLEAR_CURRENT_WALLET,
  GET_ERRORS
} from "./types";

export const getCurrentWallet = () => dispatch => {
  dispatch(setWalletLoading());
  axios
    .get("/api/wallets")
    .then(res =>
      dispatch({
        type: GET_WALLETS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_WALLETS,
        payload: {}
      })
    );
};

export const getWallet = () => dispatch => {
  dispatch(setWalletLoading());
  axios
    .get(`/api/wallets/5b8306184c9e537c02164dc9`)
    .then(res =>
      dispatch({
        type: GET_WALLET,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_WALLET,
        payload: null
      })
    );
};

export const createWallet = (walletData, history) => dispatch => {
  axios
    .post("/api/wallets", walletData)
    .then(res => history.push("/wallet"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setWalletLoading = () => {
  return {
    type: WALLET_LOADING
  };
};

export const clearCurrentWallet = () => {
  return {
    type: CLEAR_CURRENT_WALLET
  };
};
