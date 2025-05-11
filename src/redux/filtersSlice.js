import { createSlice, createSelector } from '@reduxjs/toolkit';
import { selectContacts } from './contactsSlice';

const initialState = {
      name: '',
  };

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeFilter(state, action) {
      state.name = action.payload;
    },
  },
});

export const { changeFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;

export const selectNameFilter  = state => state.filters.name;

export const selectFilteredContacts = createSelector([selectContacts, selectNameFilter],
    (contactsList, filterValue) => {         
        return contactsList.filter(contact =>
            contact.name.toLowerCase().includes(filterValue.toLowerCase())
        );
  });
    