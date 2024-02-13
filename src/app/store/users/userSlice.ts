import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  authorized: boolean;
  id: number;
  token: string;
  email: string;
}

const initialState: UserState = {
  authorized: false,
  id: 0,
  token: '',
  email: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserInfo: (state, action) => {
      return { ...state, ...action.payload, authorized: true };
    },
    logout: () => initialState
  }
})

export const { saveUserInfo, logout } = userSlice.actions
export type { UserState }
export default userSlice.reducer
