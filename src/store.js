import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slice/loginSlise';

export default configureStore({
  reducer: loginReducer,
})