import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store"


interface AppState {
    isUserLogin: boolean;
    currentScreen: string;
    currentOrderScreen: string;
    typeOfLocationScreen: string;
    isNewLocationScreen: boolean;
    showCheckoutSession: boolean;
    isTrackButtonClicked: boolean;
}

const initialState: AppState = {
    isUserLogin: false,
    currentScreen: "home",
    currentOrderScreen: "ongoing",
    typeOfLocationScreen: "all_locations",
    isNewLocationScreen: false,
    showCheckoutSession: false,
    isTrackButtonClicked: false,
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setIsUserLogin: (state, action: PayloadAction<boolean>) => {
            state.isUserLogin = action.payload;
        },
        setCurrentScreen: (state, action: PayloadAction<string>) => {
            state.currentScreen = action.payload;
        },
        setCurrentOrderScreen: (state, action: PayloadAction<string>) => {
            state.currentOrderScreen = action.payload;
        },
        setTypeOfLocationScreen: (state, action: PayloadAction<string>) => {
            state.typeOfLocationScreen = action.payload;
        },
        setIsNewLocationScreen: (state, action: PayloadAction<boolean>) => {
            state.isNewLocationScreen = action.payload;
        },
        setShowCheckoutSession: (state, action: PayloadAction<boolean>) => {
            state.showCheckoutSession = action.payload;
        },
        setIsTrackButtonClicked: (state, action: PayloadAction<boolean>) => {
            state.isTrackButtonClicked = action.payload;
        },
    }
});

export const { setIsUserLogin, setCurrentScreen, setCurrentOrderScreen, setTypeOfLocationScreen, setIsNewLocationScreen, setShowCheckoutSession, setIsTrackButtonClicked } = appSlice.actions;

export const selectIsUserLogin = (state: RootState) => state.app.isUserLogin;
export const selectCurrentScreen = (state: RootState) => state.app.currentScreen;
export const selectCurrentOrderScreen = (state: RootState) => state.app.currentOrderScreen;
export const selectTypeOfLocationScreen = (state: RootState) => state.app.typeOfLocationScreen;
export const selectIsNewLocationScreen = (state: RootState) => state.app.isNewLocationScreen;
export const selectShowCheckoutSession = (state: RootState) => state.app.showCheckoutSession;
export const selectIsTrackButtonClicked = (state: RootState) => state.app.isTrackButtonClicked;

export default appSlice.reducer;