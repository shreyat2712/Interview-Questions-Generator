// import { createSlice } from "@reduxjs/toolkit";
// const authSlice = createSlice({
//   name: "auth",
//   initialState: { isLoggedIn:false },
//   reducers: {
//     login(state,action) {
//       // state.isLoggedIn = true;
//       state.isLoggedIn=action.payload;
//     },
//     logout(state,action) {
//       // state.isLoggedIn = false;
//       state.isLoggedIn=action.payload;
//     },
//   },
// });
// export const authActions=authSlice.actions;
// export default authSlice;
import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn:false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});
export const authActions=authSlice.actions;
export default authSlice;