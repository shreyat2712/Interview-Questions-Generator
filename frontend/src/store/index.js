import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import storage from "redux-persist/lib/storage";
// import {persistReducer} from "redux-persist"
// import { combineReducers } from "@reduxjs/toolkit";
// import { AuthReducer } from "./Reducers";
import persistReducer from "redux-persist/es/persistReducer";
// import {
//   // persistStore,
//   // persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
//   } from 'redux-persist'
const persistConfig={
  key:"root",
  version:1,
  storage
};
// const reducer=combineReducers({
//   auth:authSlice.actions,
// })
const persistedReducer=persistReducer(persistConfig,authSlice)
const store = configureStore({
  // reducer:authSlice.actions
  reducer:{
    auth:authSlice.reducer
  }
});
// const persistedReducer = persistReducer(persistConfig, authSlice)

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// })
export default store;
