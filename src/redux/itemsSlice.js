import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

// це початковий стан стейту -  існуючий масив коньактів.
const initialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItems: (state, action) => {
      const { name, number } = action.payload;
      const contact = {
        id: nanoid(),
        name,
        number,
      };
      if (state.some(contact => contact.name === name)) {
        return alert(`${contact.name} is already in contacts`);
      }
      // тут редакс використовує бібліотеку Іммер, яка дозволяє(під капотом) пушити новий контакт не мутіруючи старий масив
      state.push(contact);
    },
    // функція для видалення контакту за його айді
    deleteItems: (state, action) => {
      const contactId = action.payload;
      return state.filter(contact => contact.id !== contactId);
    },
  },
});
// Action creators are generated for each case reducer function
export const { addItems, deleteItems } = itemsSlice.actions;
// console.log(addItems);
// console.log(deleteItems);

// export default itemsSlice.reducer;
