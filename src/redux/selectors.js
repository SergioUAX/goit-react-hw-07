export const selectContacts = state => state.contacts.items;
export const selectNameFilter  = state => state.filters.name;
export const selectError = state => state.contacts.error;
export const selectLoading = state => state.contacts.isLoading;
