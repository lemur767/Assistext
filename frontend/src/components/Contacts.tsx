import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import './Contacts.css';

interface Contact {
  id: number;
  name: string;
  phone_number: string;
}

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await api.get('/contacts');
        setContacts(response);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="contacts-container">
      <h1 className="contacts-header">Contacts</h1>
      <div className="contact-list">
        {contacts.map(contact => (
          <div key={contact.id} className="contact-item">
            <Link to={`/contacts/${contact.id}`} className="contact-link">{contact.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;