import { TEST_DISPATCH } from "./types";

export const logUser = userData => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  };
};
