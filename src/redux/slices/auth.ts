import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

export interface AuthUser {
  authUser: any;
}

const initialState: AuthUser = {
  authUser: null,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser(state, action) {
      state.authUser = action.payload;
    },
  }
});

export const { setAuthUser } = auth.actions;

export const getAuthUserState = (state: AppState) => state.auth?.authUser;
