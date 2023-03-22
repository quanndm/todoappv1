import { useState } from "react"
import Category from "./components/Category"
import Modal from "./components/Modal";
import TodoList from "./components/TodoList"
import { modalType, Theme } from "./types/type";
import type { RootState } from './store/store'
import { useSelector, useDispatch } from 'react-redux'
import { create_task } from "./store/modal/ModalSlice";
import { count_task } from "./store/todo/helper";
import { clear_finish } from "./store/todo/Todoslice";
function App() {
  const [theme, setTheme] = useState(Theme.DAY);

  const { open, type, id : id_detail } = useSelector((state: RootState) => state.Modal);
  const Todo_arr = useSelector((state: RootState) => state.Todo);
  const number_of_task = count_task(Todo_arr)

  const dispatch = useDispatch();

  const handleChangeTheme = () => setTheme(theme => (theme === Theme.DAY ? Theme.NIGHT : Theme.DAY));

  return (
    <div className={`App ${theme !== Theme.DAY ? "night-active" : ""}`}>
      <Modal open={open} type={type} id={id_detail}/>
      <div className="icon-day-night" onClick={handleChangeTheme}>
        <span className="day" >☀️</span>
        <span className="night" >🌙</span>
      </div>
      <section className="title">
        <h1>personal <br /> task manager</h1>
      </section>
      <section className="main-layout">
        <div className="side">
          <Category />
        </div>
        <div className="content-wrapper">
          <div className="header">
            <p className="total">{number_of_task} tasks</p>
            <div className="main-function-1">
              <button className="add-task" onClick={() => dispatch(create_task())}>
                Add New Task
              </button>
              <button className="clear-task" onClick={()=>dispatch(clear_finish())}>
                Clear completed
              </button>
            </div>
          </div>
          <div className="content">
            <TodoList />
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
