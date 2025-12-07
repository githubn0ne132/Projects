import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks/';

const getConfig = (thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const createTask = createAsyncThunk('tasks/create', async (taskData, thunkAPI) => {
  try {
    const response = await axios.post(API_URL, taskData, getConfig(thunkAPI));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateTask = createAsyncThunk('tasks/update', async ({ id, taskData }, thunkAPI) => {
  try {
    const response = await axios.put(API_URL + id, taskData, getConfig(thunkAPI));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [], // Store tasks if needed globally, though usually attached to Project
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Ideally we should update the currentProject in projectSlice, but these slices are separate.
        // We will trigger a refresh of the project data in the component.
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
      });
  },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
