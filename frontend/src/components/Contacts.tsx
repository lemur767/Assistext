import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import './Contacts.css';
import { useAuth } from '../contexts/AuthContext';

interface Contact {
  id: number;
  name: string;
  phone_number: string;
}

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, session } = useAuth();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await api.get('/contacts', { token: session?.token });
        setContacts(response.contacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setError('Failed to load contacts.');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && session?.token) {
      fetchContacts();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, session?.token]);

  if (loading) {
    return <div className="contacts-container"><p className="no-contacts-message">Loading contacts...</p></div>;
  }

  if (error) {
    return <div className="contacts-container"><p className="no-contacts-message">{error}</p></div>;
  }

  return (
    <div className="contacts-container">
      <h1 className="contacts-header">Contacts</h1>
      {contacts.length === 0 ? (
        <p className="no-contacts-message">You haven't added any contacts yet.</p>
      ) : (
        <div className="contact-list">
          {contacts.map(contact => (
            <div key={contact.id} className="contact-item">
              <Link to={`/contacts/${contact.id}`} className="contact-link">
                <div className="contact-info">
                    <strong className="contact-name">{contact.name}</strong>
                    <span className="contact-number">{contact.phone_number}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contacts;