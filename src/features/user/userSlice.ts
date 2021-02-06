import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type User = {
  uid: string,
  photoUrl: string,
  displayName: string,
  phoneNumber: string,
  email: string,
};

const initialState: User = { uid: '', photoUrl: '', displayName: '', phoneNumber: '', email: '', };

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: initialState
  },
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
