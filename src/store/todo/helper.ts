import { Todo, TodoStatus } from "../../types/type";

export const show_all = (todos:Todo[])=>[...todos]

export const show_active = (todos: Todo[])=>[...todos.filter(e=>e.status === TodoStatus.ACTIVE)]

export const show_finished = (todos: Todo[]) =>[...todos.filter(e=>e.status === TodoStatus.FINISH)]

export const get_detail = (todos: Todo[], id: string) => todos.find(e=>e.id === id)

export const count_task = (todos: Todo[]) => todos.length