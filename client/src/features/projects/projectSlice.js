import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/projects/';

const getConfig = (thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const createProject = createAsyncThunk('projects/create', async (projectData, thunkAPI) => {
  try {
    const response = await axios.post(API_URL, projectData, getConfig(thunkAPI));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getProjects = createAsyncThunk('projects/getAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get(API_URL, getConfig(thunkAPI));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getProjectById = createAsyncThunk('projects/getOne', async (id, thunkAPI) => {
  try {
    const response = await axios.get(API_URL + id, getConfig(thunkAPI));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    currentProject: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.currentProject = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(getProjectById.pending, (state) => {
          state.isLoading = true;
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.currentProject = action.payload;
      })
      .addCase(getProjectById.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload.message;
      });
  },
});

export const { reset } = projectSlice.actions;
export default projectSlice.reducer;
