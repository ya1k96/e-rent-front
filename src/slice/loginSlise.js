import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    logged: false,
  },
  reducers: {
    setLogin: (state) => {
      state.logged = true;
    }
  },
})

export const { login } = loginSlice.actions

export default loginSlice.reducer