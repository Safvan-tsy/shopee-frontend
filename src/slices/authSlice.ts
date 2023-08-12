import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Seller, User } from '../types/user.types';

interface AuthState {
  userInfo: User | null;
  token: string | null;
  sellerInfo?: Seller | null
}

const initialState: AuthState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  token: localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : null,
  sellerInfo: localStorage.getItem('sellerInfo')
    ? JSON.parse(localStorage.getItem('sellerInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ data: { user: User, seller?: Seller }, token: string }>) => {
      state.userInfo = action.payload.data.user;
      state.token = action.payload.token;
      state.sellerInfo = action.payload.data.seller;
      localStorage.setItem('userInfo', JSON.stringify(action.payload.data.user));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      localStorage.setItem('sellerInfo', JSON.stringify(action.payload.data.seller));
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      state.sellerInfo = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
      localStorage.removeItem('sellerInfo');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;