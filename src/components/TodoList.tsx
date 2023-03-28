import React, { useEffect, useState } from 'react'
import { hide_text_overflow } from "../helper/Helper";
import { RootState } from '../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { add_todo, deleteTodoAsync, remove_todo, updateStatusTodoAsync, update_status } from "../store/todo/Todoslice";
import { count_task } from "../store/todo/helper"
import { Todo, TodoState } from '../types/type';
import { detail_task } from '../store/modal/ModalSlice';
import { AnyAction } from 'redux';
import { useAppDispatch } from '../store/hook';
enum typeFilter{
    ALL,
    ACTIVE,
    COMPLETED
}
const TodoList = () => {
    const dispatch = useAppDispatch();
    const { data: Todo_state, status, error } = useSelector((state: RootState) => state.Todo);
    const number_of_task = Todo_state ? count_task(Todo_state) : 0
    const [filter, setFilter] = useState(typeFilter.ALL)
    const [todoFilter, setTodoFilter] = useState(Todo_state)
    useEffect(() => {
        switch (filter) {
            case typeFilter.ALL:
                setTodoFilter([...Todo_state])
                break;
            case typeFilter.ACTIVE:
                setTodoFilter([...Todo_state.filter(x=>!x.isDone)])
                break;
            case typeFilter.COMPLETED:
                setTodoFilter([...Todo_state.filter(x=>x.isDone)])
                break;
        }
    }, [filter, Todo_state])
    
    const openUpdateModal = (id: string)=>{
        dispatch(detail_task(id))
    }
    const deleteTodo = (id: string)=>{
        dispatch(deleteTodoAsync(id) as unknown as AnyAction)
    }

    return (
        <div className='todolist'>
            <div className="list ">
                {status === "loading" ?
                    <>Loading...</>
                    : Todo_state && (
                        todoFilter.map(e => (
                            <div className='content-wrapper' key={e.id} >
                                <span className='check-status'>
                                    <label className='custom-checkbox'>
                                        <input type="checkbox" onChange={() => dispatch(updateStatusTodoAsync(e.id!) as unknown as AnyAction)}  checked={e.isDone}/>
                                        <span className="check-mark" ></span>
                                    </label>

                                    <label className='delete-todo' onClick={()=>deleteTodo(e.id!)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </label>
                                </span>
                                <p style={{cursor: "pointer"}} className='content-todo' onClick={()=>openUpdateModal(e.id!)}>{hide_text_overflow(e.title)}</p>
                                <span style={{cursor: "pointer"}} className={`tag-${e.category.toLowerCase()}`} onClick={()=>openUpdateModal(e.id!)}>{e.category}</span>
                            </div>
                        ))
                    )}
            </div>
            <div className="footer">
                <button className={`show-active  ${filter === typeFilter.ACTIVE ? "active" :""}`} onClick={()=>setFilter(typeFilter.ACTIVE)}>Active</button>
                <button className={`show-all ${filter === typeFilter.ALL ? "active" :""}`} onClick={()=>setFilter(typeFilter.ALL)}>All</button>
                <button className={`show-complete  ${filter === typeFilter.COMPLETED ? "active" :""}`} onClick={()=>setFilter(typeFilter.COMPLETED)}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList