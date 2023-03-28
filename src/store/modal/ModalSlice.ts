import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { modalType, ModalProps as modalStateType } from '../../types/type'


export const ModalSlice = createSlice({
    name: "modal",
    initialState : {
        open: false,
        type: modalType.NOTHING
    } as modalStateType,
    reducers:{
        create_task: (state)=>{
            state.open = true;
            state.type = modalType.CREATE_TASK
        },
        detail_task: (state, action: PayloadAction<string>)=>{
            state.open = true;
            state.type = modalType.DETAIL_TASK;
            state.id = action.payload
        },
        close_modal: (state)=>{
            state.open = false;
            state.type = modalType.NOTHING;
            state.id = undefined
        }
    }
})

export const {close_modal, create_task, detail_task} = ModalSlice.actions
export default ModalSlice.reducer
