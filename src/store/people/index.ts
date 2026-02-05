import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from './type';

type State = {
  peoples: Person[];
};

const initialState: State = { peoples: [] };

const peopleSlice = createSlice({
  name: 'created',
  initialState,
  reducers: {
    addPeople(state, action: PayloadAction<Person>) {
      state.peoples.unshift(action.payload);
    },
    setPeoples(state, action: PayloadAction<Person[]>) {
      state.peoples = action.payload;
    },
    appendPeoples(state, action: PayloadAction<Person[]>) {
      state.peoples.push(...action.payload);
    },
  },
});

export const { addPeople, setPeoples, appendPeoples } = peopleSlice.actions;

export const peopleReducer = peopleSlice.reducer;
export default peopleReducer;
