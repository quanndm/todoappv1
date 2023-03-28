import { useEffect, useRef, useState } from "react"
import Category from "./components/Category"
import Modal from "./components/Modal";
import TodoList from "./components/TodoList"
import { modalType, Theme, Todo } from "./types/type";
import { RootState } from './store/store'
import { useSelector, useDispatch } from 'react-redux'
import { create_task } from "./store/modal/ModalSlice";
import { count_task } from "./store/todo/helper";
import axios from "axios";
import { fetchTodos, init_todo } from "./store/todo/Todoslice";
import { AnyAction } from "redux";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch } from "./store/hook";
function App() {
  const [theme, setTheme] = useState(Theme.DAY);

  const { open, type, id: id_detail } = useSelector((state: RootState) => state.Modal);
  const { data: Todo_arr, status, error } = useSelector((state: RootState) => state.Todo);
  const number_of_task = Todo_arr ? count_task(Todo_arr) : 0
  const ref_loadFirst = useRef(true);
  const dispatch = useAppDispatch();

  const handleChangeTheme = () => setTheme(theme => (theme === Theme.DAY ? Theme.NIGHT : Theme.DAY));
  useEffect(() => {
    if (ref_loadFirst.current) {
      ref_loadFirst.current = false;
      if (Todo_arr.length === 0) {
        dispatch(fetchTodos() as unknown as AnyAction);
       }
    }
    
  }, [])

  return (
    <div className={`App ${theme !== Theme.DAY ? "night-active" : ""}`}>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss = {false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <Modal  />
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
              <button className="clear-task" >
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
