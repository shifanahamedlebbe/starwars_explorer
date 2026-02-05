import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { peopleReducer } from 'store/people';
import { peopleApi } from 'services/peoples';

const store = configureStore({
  reducer: {
    [peopleApi.reducerPath]: peopleApi.reducer,
    people: peopleReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(peopleApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
