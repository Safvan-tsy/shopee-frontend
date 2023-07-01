import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
      token:localStorage.getItem('token')
      ? JSON.parse(localStorage.getItem('token'))
      : null,
  };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload.data.user;
            state.token = action.payload.token
            localStorage.setItem('userInfo', JSON.stringify(action.payload.data.user));
            localStorage.setItem('token', JSON.stringify(action.payload.token));
        },
        logout:(state, action) => {
            state.userInfo = null;
            state.token = null;
            localStorage.removeItem('userInfo')
            localStorage.removeItem('token')
        }
    }
})

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;