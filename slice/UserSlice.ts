import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store"


interface UserState {
    userId: string;
}

const initialState: UserState = {
    userId: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
    }
});

export const { setUserId } = userSlice.actions;

export const selectUserId = (state: RootState) => state.user.userId;


export default userSlice.reducer;