import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.items;
export const selectNameFilter  = state => state.filters.name;
export const selectError = state => state.contacts.error;
export const selectLoading = state => state.contacts.isLoading;

// export const selectVisibleContacts = state => { 
//     const contactsList = selectContacts(state);
//     const filterValue = selectNameFilter(state);
//     console.log('Filter log');

//     return contactsList.filter(contact =>
//         contact.name.toLowerCase().includes(filterValue.toLowerCase())
//     );
// };

export const selectFilteredContacts = createSelector([selectContacts, selectNameFilter],
    (contactsList, filterValue) => {         
        return contactsList.filter(contact =>
            contact.name.toLowerCase().includes(filterValue.toLowerCase())
        );
    });
