import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import rootReducer from "../slices";
import storage from "./customStorage";

const persistConfig = {
  key: "relfor",
  whitelist: ["auth", "clientThemeConfig"], // make sure it does not clash with server keys
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const reduxStore: any = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});
reduxStore.__persistor = persistStore(reduxStore); // Nasty hack

export type AppStore = ReturnType<typeof reduxStore>;
export type AppDispatch = ReturnType<AppStore["dispatch"]>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
