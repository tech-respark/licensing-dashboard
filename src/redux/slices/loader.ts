import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

export interface Loader {
    loader: any;
}

const initialState: Loader = {
    loader: null,
};

export const loader = createSlice({
    name: "loader",
    initialState,
    reducers: {
        toggleLoader(state, action) {
            state.loader = action.payload;
        },
    }
});

export const { toggleLoader } = loader.actions;

export const getLoaderState = (state: AppState) => state.loader?.loader;