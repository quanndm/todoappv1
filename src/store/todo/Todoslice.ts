import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Todo, TodoState, TodoStatus } from '../../types/type';
// import type { RootState } from '../store';
import { v4 as uuidv4 } from 'uuid';

const initialState : TodoState =  [] as Todo[];

export const TodoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        add_todo: (state, action: PayloadAction<Todo>)=>{
            while(state.some(e=>e.id === action.payload.id)){
                action.payload.id = uuidv4()
            }
            state.push(action.payload);
        },
        remove_todo: (state, action: PayloadAction<string>)=>{
            if(state.some(e=>e.id === action.payload))
                state = [...state.filter(e=>e.id !== action.payload)]
        },
        update_status: (state, action: PayloadAction<string>)=>{
            state.map(e=>{
                if(e.id === action.payload){
                    e.status = e.status === TodoStatus.ACTIVE ? TodoStatus.FINISH : TodoStatus.ACTIVE;
                }
            })
        },
        clear_finish: (state)=>{
            return state.filter(e=>e.status !== TodoStatus.FINISH)
        }
    }
})

export const {add_todo, remove_todo, update_status, clear_finish} = TodoSlice.actions
export default TodoSlice.reducer
