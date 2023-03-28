import { configureStore } from '@reduxjs/toolkit'
import todosReducer from "./todo/Todoslice";
import modalReducer from "./modal/ModalSlice"
import thunk from 'redux-thunk';
import { useDispatch } from 'react-redux';
export const store = configureStore({
    reducer:{
        Todo: todosReducer,
        Modal: modalReducer
    },
    middleware: [thunk],
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

//
