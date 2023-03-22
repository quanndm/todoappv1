import React, { useEffect, useState } from 'react'
import { hide_text_overflow } from "../helper/Helper"; 
import type { RootState } from '../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { add_todo,clear_finish,remove_todo,update_status } from "../store/todo/Todoslice";
import {count_task} from "../store/todo/helper"
import { TodoState } from '../types/type';
import { detail_task } from '../store/modal/ModalSlice';
const TodoList = () => {
    const dispatch = useDispatch();
    const Todo_state = useSelector((state: RootState) => state.Todo);
    const number_of_task = count_task(Todo_state)
    
    const [todoArr, setTodoArr] = useState([] as TodoState)
    useEffect(() => {
      setTodoArr(Todo_state)
    }, [Todo_state])
    
    return (
        <div className='todolist'>
            <div className="list ">
                { (count_task(todoArr)) !== 0 && (
                    todoArr.map(e=>(
                        <div className='content-wrapper' key={e.id}>
                            <span className='check-status'>
                                <label className='custom-checkbox'>
                                    <input type="checkbox" onClick={()=>dispatch(update_status(e.id))}/>
                                    <span className="check-mark" ></span>
                                </label>
                            </span>
                            <p className='content-todo' onClick={() => dispatch(detail_task(e.id))}>{hide_text_overflow(e.title)}</p>
                            <span className={`tag-${e.category.toLowerCase()}`}>{e.category}</span>
                        </div>
                    ))
                )  }
            </div>
            <div className="footer">
                <button className='show-active'>Active</button>
                <button className="show-all active">All</button>
                <button className="show-complete">Completed</button>
            </div>
        </div>
    )
}

export default TodoList