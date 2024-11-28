import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

interface StatsState {
  status: string;
  stats: {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    completedPercentage: string;
    pendingPercentage: string;
    timeLapsed: string;
    estimatedTimeLeft: string;
    priorityTimeLapsed: Record<string, number>;
    priorityTimeLeft: Record<string, number>;
    averageCompletionTime: number;
  };
  error: string | null; // Error can be a string or null
}

const initialState: StatsState = {
  status: "idle",
  stats: {
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    completedPercentage: '0.00',
    pendingPercentage: '100.00',
    timeLapsed: '0.00',
    estimatedTimeLeft: '0.00',
    priorityTimeLapsed: {},
    priorityTimeLeft: {},
    averageCompletionTime: 0,
  },
  error: null, // Initialize error as null
};

// Async thunk for fetching stats
export const fetchStats = createAsyncThunk('stats/fetchStats', async () => {
  const response = await api.get('tasks/dashboard/stats'); // Replace with your API URL
  return response.data;
});

// Create slice with reducers and extraReducers
const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.status = "succeded";
        state.stats = action.payload;
        state.error = null; // Clear error on success
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null; // Set error message or null if undefined
      });
  },
});

export default statsSlice.reducer;
