import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Seller, User } from '../types/user.types';

interface AuthState {
  userInfo: User | null;
  token: string | null;
  sellerInfo?: Seller | null
}

const initialState: AuthState = {
  userInfo: null,
  token: null,
  sellerInfo:null
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ data: { user: User, seller?:Seller }, token: string }>) => {
      state.userInfo = action.payload.data.user;
      state.token = action.payload.token;
      state.sellerInfo = action.payload.data.seller;
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      state.sellerInfo = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;