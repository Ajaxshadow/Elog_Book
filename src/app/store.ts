import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/app/appSlice";
import particularsReducer from "../features/particulars/particularsSlice";
// ...

export const store = configureStore({
  reducer: {
    app: appReducer,
    particulars:particularsReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
