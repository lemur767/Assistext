import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Contacts.css';
import api from '../services/api';

interface Contact {
  id: number;
  name: string;
  phone_number: string;
}

const Contacts: React.FC = () => {
  const { session } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await api.get('/api/v1/contacts/');
    const data = await response.json();
    setContacts(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingContact) {
      await updateContact();
    } else {
      await createContact();
    }
  };

  const createContact = async () => {
    const response = await api.post('/api/v1/contacts/', { name, phone_number: phoneNumber });
    if (response.ok) {
      fetchContacts();
      setName('');
      setPhoneNumber('');
    } else {
      const error = await response.json();
      alert(error.error);
    }
  };

  const updateContact = async () => {
    if (!editingContact) return;
    const response = await api.put(`/api/v1/contacts/${editingContact.id}`, { name, phone_number: phoneNumber });
    if (response.ok) {
      fetchContacts();
      setName('');
      setPhoneNumber('');
      setEditingContact(null);
    } else {
      const error = await response.json();
      alert(error.error);
    }
  };

  const deleteContact = async (id: number) => {
    const response = await api.delete(`/api/v1/contacts/${id}`);
    if (response.ok) {
      fetchContacts();
    }
  };

  const startEditing = (contact: Contact) => {
    setEditingContact(contact);
    setName(contact.name);
    setPhoneNumber(contact.phone_number);
  };

  const cancelEditing = () => {
    setEditingContact(null);
    setName('');
    setPhoneNumber('');
  };

  return (
    <div className="contacts-container">
      <h2 className="contacts-header">Contacts</h2>
      <form onSubmit={handleSubmit} className="contacts-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <div>
          <button type="submit">{editingContact ? 'Update Contact' : 'Add Contact'}</button>
          {editingContact && <button type="button" onClick={cancelEditing}>Cancel</button>}
        </div>
      </form>
      <ul className="contacts-list">
        {contacts.map(contact => (
          <li key={contact.id} className="contacts-list-item">
            <div className="contact-details">
              {contact.name}: {contact.phone_number}
            </div>
            <div className="contact-actions">
              <button onClick={() => startEditing(contact)} className="edit-button">Edit</button>
              <button onClick={() => deleteContact(contact.id)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
