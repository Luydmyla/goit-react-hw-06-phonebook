// import { useState } from 'react';
// import { Component } from 'react';
// import { nanoid } from 'nanoid';
import Form from './Form';
import ContactList from './ContactList';
import Filter from './Filter';
import './container.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItems, deleteItems, updateFilter } from '../redux/store';

// const initialContacts = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];

export default function App() {
  // const [contacts, setContacts] = useState(initialContacts);
  const items = useSelector(state => state.items);
  const dispatch = useDispatch();
  const value = useSelector(state => state.filter);

  // const addContact = ({ name, number }) => {
  //   const contact = {
  //     id: nanoid(),
  //     name,
  //     number,
  //   };
  //   if (contacts.some(contact => contact.name === name)) {
  //     return alert(`${contact.name} is already in contacts`);
  //   }
  //   setContacts([contact, ...contacts]);
  // };

  const changeFilter = e => {
    dispatch(updateFilter(e.currentTarget.value));
    // setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    // const { contacts, filter } = this.state;
    const normalizedFilter = value.toLowerCase();
    //  return contacts.filter(contact =>
    return items.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    dispatch(deleteItems(contactId));
    // setContacts(contacts.filter(contact => contact.id !== contactId));
    dispatch(updateFilter(''));
  };

  return (
    <div className="Container">
      <h1>Phonebook</h1>
      {/* <Form onSubmit={addContact} /> */}
      <Form onSubmit={contact => dispatch(addItems(contact))} />
      <h2> Contacts : </h2>
      {/* <Filter value={filter} onChange={changeFilter} /> */}
      <Filter value={value} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContactList={deleteContact}
      />
    </div>
  );
}