import {
  GET_WALLETS,
  GET_WALLET,
  WALLET_LOADING,
  CLEAR_CURRENT_WALLET
} from "../Action/types";

const initialState = {
  wallet: null,
  wallets: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case WALLET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_WALLETS:
      return {
        ...state,
        wallets: action.payload,
        loading: false
      };
    case GET_WALLET:
      return {
        ...state,
        wallet: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_WALLET:
      return {
        ...state,
        wallets: null
      };
    default:
      return state;
  }
}
