import { configureStore } from '@reduxjs/toolkit';
import { createReducer, createAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
// створюю дїї (action) для додавання, видалення та пошуку контактів
export const addItems = createAction('items/addItems');
export const deleteItems = createAction('items/deleteItems');
export const updateFilter = createAction('filter/updateFilter');

// це початковий стан стейту -  існуючий масив коньактів.
const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

// створюю редюсер , який приймає стейт айтемс(контакти) і дії над ним та повертає новий стейт
const itemsReducer = createReducer(initialContacts, {
  // функція для додавання нового контакту за іменем та номером
  [addItems]: (state, action) => {
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
  [deleteItems]: (state, action) => {
    const contactId = action.payload;
    return state.filter(contact => contact.id !== contactId);
  },
});

// створюю редюсер , який приймає стейт фільтер і дії над ним та повертає новий стейт
const filterReducer = createReducer('', {
  // функція для пошуку контакту за фільтром
  [updateFilter]: (state, action) => action.payload,
});

// створюю сховище стор , яке зберігає стан нашого додатку та методи роботи з ним (редюсери) -функціі, які реагують на дії
export const store = configureStore({
  reducer: {
    items: itemsReducer,
    filter: filterReducer,
  },
});
