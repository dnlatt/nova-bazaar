import { configureStore } from '@reduxjs/toolkit';
import { nftApi } from '@/store/nftApi';

export const store = configureStore({
  reducer: {
    [nftApi.reducerPath]: nftApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(nftApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
