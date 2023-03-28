import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CategoryEnum, ModalProps, modalType, Todo } from '../types/type'
import { RootState } from '../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { close_modal, detail_task } from "../store/modal/ModalSlice";
import { v4 as uuidv4 } from 'uuid';
import { addTodoAsync, add_todo, updateTodoAsync } from '../store/todo/Todoslice';
import { get_detail } from '../store/todo/helper';
import { Optional } from 'utility-types';
import { AnyAction } from 'redux';
import { useAppDispatch } from '../store/hook';
const Modal = () => {
    const { open, type, id: Todo_Id } = useSelector((state: RootState) => state.Modal);
    // const { open, type, id: Todo_Id } = props;
    const { data: todo_arr } = useSelector((state: RootState) => state.Todo)
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")
    const [category, setCategory] = useState(CategoryEnum.LATELY)

    useEffect(() => {
        if (type === modalType.DETAIL_TASK) {
            const tmp = get_detail(todo_arr, Todo_Id!)
            if (tmp) {
                setContent(tmp.content);
                setTitle(tmp.title);
                setCategory(tmp.category)
            } else {
                dispatch(close_modal())
            }
        } else {
            setContent("");
            setTitle("");
            setCategory(CategoryEnum.LATELY)
        }
    }, [open, type, Todo_Id])


    if (!open) return null

    const handleSubmit = async () => {
        switch (type) {
            case modalType.CREATE_TASK:
                await handleAddTask();
                break;
            case modalType.DETAIL_TASK:
                await handleUpdatetask();
                break;
        }
    }
    const handleAddTask = async () => {
        //validate
        if (title.length === 0) {
            alert("Please add title!!!");
            return;
        }

        if (content.length === 0) {
            setContent(title);
        }

        const Todo_detail = {
            title: title,
            content: content,
            category: category
        } as Optional<Todo>;
        // #TODO: check and config to call async thunk function
        dispatch(addTodoAsync(Todo_detail) as unknown as AnyAction)

        //clear
        setTitle("");
        setContent("");
        setCategory(CategoryEnum.LATELY)
        //after add task => close modal
        dispatch(close_modal())
    }
    const handleUpdatetask = async () => {
        //validate
        if (title.length === 0) {
            alert("Please add title!!!");
            return;
        }

        if (content.length === 0) {
            setContent(title);
        }

        const Todo_detail = {
            id: Todo_Id,
            title: title,
            content: content,
            category: category
        } as Optional<Todo>;
        // #TODO: check and config to call async thunk function
        dispatch(updateTodoAsync(Todo_detail) as unknown as AnyAction)

        //clear
        setTitle("");
        setContent("");
        setCategory(CategoryEnum.LATELY)
        //after add task => close modal
        dispatch(close_modal())
    }
    return (
        <div className='overlay'>
            <div className="modal-container">
                <button className='close-model' onClick={() => dispatch(close_modal())}>❌</button>
                <div className='section-create-update-task'>
                    <h3 >Create Task</h3>
                    <div className='form-control'>
                        <label htmlFor="title">Title</label>
                        <input type="text" value={title} onChange={e => setTitle(e.currentTarget.value)} placeholder='Task title ......' id='title' />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="content">description</label>
                        <input type="text" value={content} onChange={e => setContent(e.currentTarget.value)} placeholder='Task description ......' id='content' />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="content">Category</label>
                        <input type="text" disabled value={category} className='input-disable' />
                    </div>
                    <div className='section-category'>
                        <h3>
                            <span></span> Categories <span></span>
                        </h3>
                        <div className="category-list">
                            <button className='btn-urgen' onClick={() => setCategory(CategoryEnum.URGEN)}>Urgen</button><br />
                            <button className='btn-delegate' onClick={() => setCategory(CategoryEnum.DELEGATE)}>Delegate</button><br />
                            <button className='btn-schedule' onClick={() => setCategory(CategoryEnum.SCHEDULE)}>Schedule</button><br />
                            <button className='btn-lately' onClick={() => setCategory(CategoryEnum.LATELY)}>Lately</button>
                        </div>
                    </div>
                    <button className='btn-create-task' onClick={() => handleSubmit()}>{type === modalType.CREATE_TASK ? "Add" : "Update"} Task</button>
                </div>
            </div>
        </div>
    )
}

export default Modal