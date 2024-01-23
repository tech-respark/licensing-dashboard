import { DEFAULT_DARK_COLOR, DEFAULT_LIGHT_COLOR } from "@/constants/common";
import { createSlice } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { AppState } from "../store";

export type BreadcrumbType = { key: number, icon: any, route: string, label: string | ReactNode, onClick: any, subNav: BreadcrumbSubpathsType[] }
export type BreadcrumbSubpathsType = { key: number, icon: any, route: string, label: string | ReactNode, onClick: any, active: boolean }

export type ClientThemeConfigType = {
    darkMode: boolean;
    lightColor: string;
    darkColor: string;
}

const initialState: ClientThemeConfigType = {
    darkMode: false,
    lightColor: DEFAULT_LIGHT_COLOR,
    darkColor: DEFAULT_DARK_COLOR,
}

export const clientThemeConfig = createSlice({
    name: "clientThemeConfig",
    initialState,
    reducers: {
        toggleDarkMode(state, action) {
            state.darkMode = action.payload;
        },
        updateLightThemeColor(state, action) {
            state.lightColor = action.payload;
        },
        updateDarkThemeColor(state, action) {
            state.darkColor = action.payload;
        },
    }
});

const { toggleDarkMode, updateLightThemeColor, updateDarkThemeColor } = clientThemeConfig.actions;
const getDarkModeState = (state: AppState) => state.clientThemeConfig?.darkMode;
const getLightColorState = (state: AppState) => state.clientThemeConfig?.lightColor;
const getDarkColorState = (state: AppState) => state.clientThemeConfig?.darkColor;

export { getDarkColorState, getDarkModeState, getLightColorState, toggleDarkMode, updateDarkThemeColor, updateLightThemeColor };
