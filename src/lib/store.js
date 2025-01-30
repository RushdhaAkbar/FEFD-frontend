import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import counterReducer from "./features/counterSlice";
import cartReducer from './features/cartSlice';
import saveReducer from './features/saveSlice';
import {Api} from "./api";
export const store= configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    [Api.reducerPath]: Api.reducer,
    save: saveReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
});
setupListeners(store.dispatch);