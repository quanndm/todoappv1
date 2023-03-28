import { createSlice, PayloadAction, createAsyncThunk, ThunkAction, Action } from '@reduxjs/toolkit'
import { Todo, TodoState } from '../../types/type';
import { Optional } from 'utility-types';
import axios from 'axios';
import { toastify_custom } from '../../helper/Helper';



const initialState: TodoState = {
  data: [] as Todo[],
  status: "nothing",
  error: undefined
} as TodoState;

export const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    init_todo: (state, action: PayloadAction<Todo[]>) => {
      if (state.data.length === 0) {
        action.payload.forEach(todo => state.data.push(todo))
      }
    },
    add_todo: (state, action: PayloadAction<Todo>) => {
      state.data.push(action.payload)
    },
    remove_todo: (state, action: PayloadAction<string>) => {
      const index = state.data.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    },
    update_status: (state, action: PayloadAction<string>) => {
      state.data.map(e => {
        if (e.id === action.payload) {
          e.isDone = !e.isDone
        }
      })
    },
    change_status: (state, action: PayloadAction<"nothing" | "success" | "error" | "loading">) => {
      state.status = action.payload
    },
    set_error: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  }
  , extraReducers: (builder) => {
    builder
      .addCase(addTodoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.data.push(action.payload);

        toastify_custom('🦄 Add todo success', 4000, "success")
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
        toastify_custom(action.error.message??"Something went wrong!", 3000, "error")
      });

    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {

        if (action.payload.status === "error") {
          state.error = action.payload.error
          toastify_custom(action.payload.error??"Something went wrong!", 3000, "error")
          return;
        }

        state.status = "success"
        action.payload.data?.forEach(todo => state.data.push(todo));
        toastify_custom('🦄 Load todo success', 2000);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
        toastify_custom(action.error.message??"Something went wrong!", 3000, "error")

      });

    builder
      .addCase(updateStatusTodoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateStatusTodoAsync.fulfilled, (state, action) => {
        if (action.payload.status === "error") {
          state.error = action.payload.error
          return;
        }
        state.status = action.payload.status!;
        toastify_custom("Update status todo success", 2000, "success");
        state.data.map(e => {
          if (e.id === action.payload.todo?.id) {
            e.isDone = !e.isDone
          }
        })

      })
      .addCase(updateStatusTodoAsync.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
        toastify_custom(action.error.message??"Something went wrong!", 3000, "error")
      });

      builder
      .addCase(updateTodoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        if (action.payload.status === "error") {
          state.error = action.payload.error
          return;
        }
        state.status = action.payload.status!;
        toastify_custom("Update todo success", 2000, "success");
        state.data.map(e => {
          if (e.id === action.payload.todo?.id) {
            e.content = action.payload.todo?.content!,
            e.category = action.payload.todo?.category!,
            e.title = action.payload.todo?.title!
          }
        })

      })
      .addCase(updateTodoAsync.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
        toastify_custom(action.error.message??"Something went wrong!", 3000, "error")
      });

      builder
      .addCase(deleteTodoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        if (action.payload.status === "error") {
          state.error = action.payload.error
          return;
        }
        state.status = action.payload.status!;
        toastify_custom("Delete todo success", 2000, "success");
        state.data.splice(state.data.findIndex(x=>x.id === action.payload.todo?.id), 1)

      })
      .addCase(deleteTodoAsync.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
        toastify_custom(action.error.message??"Something went wrong!", 3000, "error")
      });
  },
})
export const { add_todo, remove_todo, update_status, init_todo, change_status, set_error } = TodoSlice.actions
//#region function async


export const addTodoAsync = createAsyncThunk(
  'todo/add_todo',
  async (todo: Optional<Todo>) => {
    const response = await axios.post("/todos", todo);
    const { todo: newTodo } = response.data as { todo: Todo }
    
    return newTodo;
  }
);

export const fetchTodos = createAsyncThunk(
  "todo/init_todo",
  async () => {
    try {
      const res = await axios.get("/todos");
      const data = res.data as Todo[]
      return {
        status: "success",
        data: data
      } as Optional<TodoState>
    } catch (error) {
      return {
        status: "error",
        error: (error as any).message
      } as Optional<TodoState>
    }
  }
);

export const updateStatusTodoAsync = createAsyncThunk(
  "todo/update_status",
  async (id: string) => {
    try {
      const res = await axios.get(`/todos/${id}/change_status`);
      const data = res.data as { message: string }
      if (data.message === "Updated") {
        return {
          status: "success",
          todo: { id: id } as Todo
        } as Optional<TodoState>
      }
      return {
        status: "error",
        error: "Cannot update!"
      } as Optional<TodoState>
    } catch (error) {
      return {
        status: "error",
        error: (error as any).message
      } as Optional<TodoState>
    }
  }
);

export const updateTodoAsync = createAsyncThunk(
  "todo/update_todo",
  async (todo: Optional<Todo>) => {
    try {
      const response = await axios.put(`/todos/${todo.id}`, todo);
      if (response.status === 204) {
        return {
          status: "success",
          todo 
        } as Optional<TodoState>
      }
      return {
        status: "error",
        error: "Cannot update!"
      } as Optional<TodoState>
    } catch (error) {
      return {
        status: "error",
        error: (error as any).message
      } as Optional<TodoState>
    }
  }
)

export const deleteTodoAsync = createAsyncThunk(
  "todo/delete_todo",
  async (id : string)=>{
    try {
      const response = await axios.delete(`/todos/${id}`);
      if (response.status === 204) {
        return {
          status: "success",
          todo:{id: id}  as Todo
        } as Optional<TodoState>
      }
      return {
        status: "error",
        error: "Cannot delete!"
      } as Optional<TodoState>
    } catch (error) {
      return {
        status: "error",
        error: (error as any).message
      } as Optional<TodoState>
    }
  }
);
//#endregion


export default TodoSlice.reducer
