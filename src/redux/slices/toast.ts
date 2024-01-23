import { ALERT_ERROR, ALERT_INFO, ALERT_SUCCESS, ALERT_WARNING } from "@/constants/alert";
import { DEFAULT_ALERT_TIME } from "@/constants/common";
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

export interface Toast {
    toast: { type: string, title: string, message: string, time: number };
}

const initialState: Toast = {
    toast: { type: '', title: '', message: '', time: DEFAULT_ALERT_TIME }
};

export const toast = createSlice({
    name: "toast",
    initialState,
    reducers: {
        showSuccessToast(state, action) {
            state.toast = { ...initialState.toast, type: ALERT_SUCCESS, time: DEFAULT_ALERT_TIME, message: action.payload };
        },
        showErrorToast(state, action) {
            state.toast = { ...initialState.toast, type: ALERT_ERROR, time: DEFAULT_ALERT_TIME, message: action.payload };
        },
        showWarningToast(state, action) {
            state.toast = { ...initialState.toast, type: ALERT_WARNING, time: DEFAULT_ALERT_TIME, message: action.payload };
        },
        showToast(state, action) {
            state.toast = { ...initialState.toast, type: ALERT_INFO, time: DEFAULT_ALERT_TIME, message: action.payload };
        },
        clearToast(state) {
            state.toast = { ...initialState.toast, type: '', title: '', message: '', time: 0 };
        },
    }
});

export const { showSuccessToast, showErrorToast, showWarningToast, showToast, clearToast } = toast.actions;

export const getToastState = (state: AppState) => state.toast?.toast;
