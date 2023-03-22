import React, { useCallback, useEffect, useState } from 'react'
import { CategoryEnum, ModalProps, modalType, Todo, TodoStatus } from '../types/type'
import type { RootState } from '../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { close_modal } from "../store/modal/ModalSlice";
import { v4 as uuidv4 } from 'uuid';
import { add_todo } from '../store/todo/Todoslice';
import { get_detail } from '../store/todo/helper';
const Modal = (props: ModalProps) => {
    const { open, type } = useSelector((state: RootState) => state.Modal);
    const Todo_array = useSelector((state: RootState) => state.Todo)
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")
    const [category, setCategory] = useState(CategoryEnum.LATELY)
    const [todo_detail, setTodo_detail] = useState({} as Todo | undefined)

    if (!props.open) return null

    // if (props.type === modalType.DETAIL_TASK) {
    //     if (props.id === undefined){
    //         dispatch(close_modal())
    //         return null;
    //     }
    //     setTodo_detail(get_detail(Todo_array, props.id ? props.id : "")) 
    //     // if (todo_detail != undefined) {
    //     //     setTitle(todo_detail.title);
    //     //     setContent(todo_detail.content);
    //     //     setCategory(todo_detail.category);
    //     // } else {
    //     //     alert("Not found Task!!!");
    //     //     dispatch(close_modal());
    //     // }
    //     console.log(todo_detail)
    // }
   

    const handleAddTask = () => {
        //validate
        if (title.length === 0) {
            alert("Please add title!!!");
            return;
        }

        if (content.length === 0) {
            setContent(title);
        }

        setTodo_detail ({
            id: uuidv4(),
            title: title,
            content: content,
            status: TodoStatus.ACTIVE,
            category: category,
            date_created: (new Date()).toLocaleDateString()
        })
        if(todo_detail !== undefined)
            dispatch(add_todo(todo_detail))
        //clear
        setTitle("");
        setContent("");
        setCategory(CategoryEnum.LATELY)
        setTodo_detail(undefined)
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
                    <button className='btn-create-task' onClick={() => handleAddTask()}>Submit Task</button>
                </div>
            </div>
        </div>
    )
}

export default Modal