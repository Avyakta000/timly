import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import toast from 'react-hot-toast';

interface AuthState {
  user: { id: string; fullName: string; email: string; role: string; } | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || '{}'),
  status: 'idle',
  error: null,
};

// Async Thunks

// Login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const user = response.data
      toast.success('Login successful!'); // Toast on successful login
      // console.log(response.data, 'user', response.data)
      localStorage.setItem('user', JSON.stringify(user));
      return user; // Assuming the backend responds with user details
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Login failed';
      toast.error(errorMessage); // Toast on error
      return rejectWithValue(errorMessage);
    }
  }
);

// Signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData: { email: string; password: string; fullName: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/signup', userData);
      toast.success('Signup successful!'); // Toast on successful signup
      const user = response.data.user;
      // Save user info to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Signup successful!');
      return user;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Signup failed';
      toast.error(errorMessage); // Toast on error
      return rejectWithValue(errorMessage);
    }
  }
);

// Check if the user is authenticated
export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get('/auth/me'); // `/auth/me` to verify the authenticated user
        const user = response.data
        console.log(response.data, 'authenticated')
        return user;
      } catch (error: any) {
        localStorage.removeItem('user');
        return rejectWithValue(error.response?.data?.error || 'Not authenticated');
      }
    }
  );
  

// Logout
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    // Assuming the API has a logout endpoint to invalidate the session or token
    const response = await api.post('/auth/logout');
    console.log(response.data,'logut')
    toast.success("logout successful!"); // Toast on successful logout
    return true;
  } catch (error: any) {
    localStorage.removeItem('user')
    const errorMessage = error.response?.data?.error || 'Logout failed';
    toast.error(errorMessage); // Toast on error
    return rejectWithValue(errorMessage);
  }
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });

    // Signup
    builder.addCase(signup.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });

    // Check Auth
    builder.addCase(checkAuth.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded';
    //   console.log(state.user, 'checkAuth succeded')
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.status = 'failed';
      state.user = null;
      state.error = action.payload as string;
    });

    // Logout
    builder.addCase(logout.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.status = 'succeeded';
      state.user = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });
  },
});

export default authSlice.reducer;
