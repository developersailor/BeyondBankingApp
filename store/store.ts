import { configureStore } from '@reduxjs/toolkit';
import { couponSlice,  } from './couponSlice';

export const store = configureStore({
  reducer: {
    // Define a top-level state field named `coupons`, handled by `couponSlice`
    coupons: couponSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

