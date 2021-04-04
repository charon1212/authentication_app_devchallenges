import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type User = {
  uid: string,
  photoUrl: string,
  displayName: string,
  email: string,
};

const initialState: User = { uid: '', photoUrl: '', displayName: '', email: '', };

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
    update: (state, action: PayloadAction<{displayName?: string, photoUrl?: string, email?: string}>) => {
      if(action.payload.displayName !== undefined) state.user.displayName = action.payload.displayName;
      if(action.payload.photoUrl !== undefined) state.user.photoUrl = action.payload.photoUrl;
      if(action.payload.email !== undefined) state.user.email = action.payload.email;
    }
  },
});

export const { login, logout, update } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
