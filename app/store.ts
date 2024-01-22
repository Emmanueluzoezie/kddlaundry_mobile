import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {appSlice} from '../slice/AppSlice';
import { serviceSlice } from '../slice/ServiceSlice';
import { userSlice  } from '../slice/UserSlice';



export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        service: serviceSlice.reducer,
        user: userSlice.reducer,
    },
    // middleware: getDefaultMiddleware({
    //     serializableCheck: false,
    // }),
})

export default store;

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch