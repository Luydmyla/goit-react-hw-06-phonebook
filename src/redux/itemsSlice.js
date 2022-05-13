import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

// це початковий існуючий масив контактів.
const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
// функція що визначає початковий стейт контактів - або ті, що записані в локалсторидж або початкові існуючі контакти
const itemsContact = () => {
  return JSON.parse(localStorage.getItem('contacts')) || initialContacts;
};

// створюємо слайс для ітемсів
export const itemsSlice = createSlice({
  name: 'items',
  initialState: itemsContact(),
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
      // тут же  записуємо в локалсторидж наші контакти (стейт)
      window.localStorage.setItem('contacts', JSON.stringify(state));
    },
    // функція для видалення контакту за його айді
    deleteItems: (state, action) => {
      const contactId = action.payload;
      const filterContact = state.filter(contact => contact.id !== contactId);
      // тут теж записуємо в локалсторидж контакти, які залишились після видалення
      window.localStorage.setItem('contacts', JSON.stringify(filterContact));
      return filterContact;
    },
  },
});
// Action creators are generated for each case reducer function
export const { addItems, deleteItems } = itemsSlice.actions;
// console.log(addItems);
// console.log(deleteItems);

// export default itemsSlice.reducer;
