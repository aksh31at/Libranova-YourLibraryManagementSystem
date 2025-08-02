import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    otpVerificationRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    otpVerificationSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.message = action.payload.message;
    },
    otpVerificationFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loginRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.message = action.payload;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    getUserRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    getUserFailed(state) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    forgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.message = action.payload.message;
    },
    resetPasswordFailed(state) {
      state.loading = false;
      state.error = action.payload;
    },
    updatePasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    updatePasswordFailed(state) {
      state.loading = false;
      state.error = action.payload;
    },
    resetAuthSlice(state) {
      state.user = state.user;
      state.isAuthenticated = state.isAuthenticated;
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const resetAuthSlice=()=> (dispatch) => {
  dispatch(authSlice.actions.resetAuthSlice());
};

export const register = (data) => async (dispatch) => {
  dispatch(authSlice.actions.registerRequest());
  try {
    const res = await axios.post("http://localhost:4000/api/v1/auth/register", data, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(authSlice.actions.registerSuccess(res.data));
  } catch (error) {
    dispatch(authSlice.actions.registerFailed(error.response.data.message));
  }
};

export const otpVerification = (email, otp) => async (dispatch) => {
  dispatch(authSlice.actions.otpVerificationRequest());
  try {
    const res = await axios.post("http://localhost:4000/api/v1/auth/verify-otp", { email, otp }, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json', },
    });
    dispatch(authSlice.actions.otpVerificationSuccess(res.data));
  } catch (error) {
    dispatch(authSlice.actions.otpVerificationFailed(error.response?.data?.message || 'OTP verification failed'));
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(authSlice.actions.loginRequest());
  try {
    const res = await axios.post("http://localhost:4000/api/v1/auth/login", data, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(authSlice.actions.loginSuccess(res.data));
  } catch (error) {
    dispatch(authSlice.actions.loginFailed(error.response?.data?.message || 'Login failed'));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(authSlice.actions.logoutRequest());
  try {
    const res = await axios.get("http://localhost:4000/api/v1/auth/logout", {
      withCredentials: true,
    });
    dispatch(authSlice.actions.logoutSuccess(res.data.message));
    dispatch(authSlice.actions.resetAuthSlice());
  } catch (error) {
    dispatch(authSlice.actions.logoutFailed(error.response.data.message));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(authSlice.actions.getUserRequest());
  try {
    const res = await axios.get("http://localhost:4000/api/v1/auth/me", {
      withCredentials: true,
    });
    dispatch(authSlice.actions.getUserSuccess(res.data));
  } catch (error) {
    dispatch(authSlice.actions.getUserFailed(error.response.data.message));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(authSlice.actions.forgotPasswordRequest());
  try {
    const res = await axios.post("http://localhost:4000/api/v1/auth/password/forgot", { email }, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(authSlice.actions.forgotPasswordSuccess(res.data.message));
  } catch (error) {
    dispatch(authSlice.actions.forgotPasswordFailed(error.response.data.message));
  }
};

export const resetPassword = (data, token) => async (dispatch) => {
  dispatch(authSlice.actions.resetPasswordRequest());
  try {
    const res = await axios.put(`http://localhost:4000/api/v1/auth/password/reset/${token}`, data, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(authSlice.actions.resetPasswordSuccess(res.data));
  } catch (error) {
    dispatch(authSlice.actions.resetPasswordFailed(error.response.data.message));
  }
};

export const updatePassword = (data) => async (dispatch) => {
  dispatch(authSlice.actions.updatePasswordRequest());
  try {
    const res = await axios.put(`http://localhost:4000/api/v1/auth/password/update`, data, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(authSlice.actions.updatePasswordSuccess(res.data.message));
  } catch (error) {
    dispatch(authSlice.actions.updatePasswordFailed(error.response?.data?.message || 'Update password failed'));
  }
};

export default authSlice.reducer;