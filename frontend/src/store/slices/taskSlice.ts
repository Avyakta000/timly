import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { Task, AddTaskPayload, EditTaskPayload } from "../../types/task";

// interface Task {
//   id: string;
//   title: string;
//   description: string | null;
//   startTime: string;
//   endTime: string;
//   priority: number;
//   status: string;
//   userId: string;
//   createdAt: string;
//   updatedAt: string;
// }

interface TasksState {
  tasks: Task[];
  selectedTasks: string[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  selectedTasks: [],
  loading: false,
  error: null,
};

// Async thunk for fetching tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await api.get('tasks'); // Replace with your API URL
  return response.data;
});

// Async thunk for deleting tasks
export const deleteTasks = createAsyncThunk(
  'tasks/deleteTasks',
  async (taskIds: string[], { rejectWithValue }) => {
    try {
      const response = await api.delete('tasks', { data: { taskIds: taskIds } }); // Adjust API endpoint as needed
      toast.success(response.data.message)
      return taskIds; // Return the deleted task IDs
    } catch (error: any) {
      toast.error(error.response.data.error)
      return rejectWithValue(error.response?.data.error || 'Failed to delete tasks');
    }
  }
);

export const addTask = createAsyncThunk<Task, AddTaskPayload>(
  "tasks/addTask",
  async (taskData) => {
    try{
      const response = await api.post("/tasks", taskData);
      toast.success(response.data.message)
      return response.data.task;
    }catch (error: any) {
      const errorMessage = error.response?.data?.error;
      toast.error(errorMessage); // Toast on error
    }
  }
);

export const editTask = createAsyncThunk<Task, EditTaskPayload>(
  "tasks/editTask",
  async ({ id, ...taskData }) => {
    try{
      const response = await api.put(`/tasks/${id}`, taskData);
      toast.success(response.data.message)
      return response.data.task;
    }catch (error: any) {
      const errorMessage = error.response?.data?.error 
      toast.error(errorMessage); // Toast on error
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleTaskSelection: (state, action) => {
      const taskId = action.payload;
      state.selectedTasks = state.selectedTasks.includes(taskId)
        ? state.selectedTasks.filter((id) => id !== taskId)
        : [...state.selectedTasks, taskId];
    },
    selectAllTasks: (state) => {
      state.selectedTasks = state.tasks.map((task) => task.id);
    },
    deselectAllTasks: (state) => {
      state.selectedTasks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      // Delete tasks
      .addCase(deleteTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTasks.fulfilled, (state, action) => {
        state.loading = false;
        console.log('delete fuilfilled')
        state.tasks = state.tasks.filter(
          (task) => !action.payload.includes(task.id)
        );
        state.error = null;
      })
      .addCase(deleteTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add task
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.unshift(action.payload);
      })
      // Edit task
      .addCase(editTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index >= 0) {
          state.tasks[index] = action.payload;
        }
      });

      
  },
});
export const { toggleTaskSelection, selectAllTasks, deselectAllTasks } =
  tasksSlice.actions;

export default tasksSlice.reducer;
