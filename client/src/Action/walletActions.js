import axios from "axios";

import {
  GET_WALLETS,
  WALLET_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_WALLET
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
