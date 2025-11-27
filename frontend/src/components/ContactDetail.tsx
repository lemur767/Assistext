import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import '../styles/ContactDetail.css';

interface Contact {
  id: number;
  name: string;
  phone_number: string;
}

const ContactDetail: React.FC = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await api.get(`/contacts/${contactId}`);
        setContact(response);
        setName(response.name);
        setPhoneNumber(response.phone_number);
      } catch (error) {
        console.error('Error fetching contact:', error);
      }
    };

    fetchContact();
  }, [contactId]);

  const handleUpdate = async () => {
    try {
      await api.put(`/contacts/${contactId}`, { name, phone_number: phoneNumber });
      setIsEditing(false);
      // Refresh contact data
      const response = await api.get(`/contacts/${contactId}`);
      setContact(response);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/contacts/${contactId}`);
      navigate('/contacts');
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contact-detail-container">
      {isEditing ? (
        <div className="contact-detail-card">
          <h1 className="contact-detail-header">Edit Contact</h1>
          <div className="contact-detail-form">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Phone Number</label>
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <div className="contact-detail-buttons">
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="contact-detail-card">
          <h1 className="contact-detail-header">{contact.name}</h1>
          <p className="contact-detail-phone">{contact.phone_number}</p>
          <div className="contact-detail-buttons">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactDetail;
