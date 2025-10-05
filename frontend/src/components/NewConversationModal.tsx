import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Contact {
  id: number;
  name: string;
  phone_number: string;
}

interface NewConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewConversationModal: React.FC<NewConversationModalProps> = ({ isOpen, onClose }) => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchContacts();
    }
  }, [isOpen]);

  const fetchContacts = async () => {
    const response = await fetch('/api/v1/contacts/', {
      headers: {
        'Authorization': `Bearer ${session?.token}`
      }
    });
    const data = await response.json();
    setContacts(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetPhoneNumber = selectedContact || phoneNumber;
    if (!targetPhoneNumber) {
      alert('Please select a contact or enter a phone number.');
      return;
    }

    const response = await fetch('/api/v1/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.token}`
      },
      body: JSON.stringify({ phone_number: targetPhoneNumber, message })
    });

    if (response.ok) {
      const conversation = await response.json();
      onClose();
      navigate(`/conversations/${conversation.id}`);
    } else {
      const error = await response.json();
      alert(error.error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>New Conversation</h2>
        <form onSubmit={handleSubmit}>
          <select
            value={selectedContact}
            onChange={(e) => {
              setSelectedContact(e.target.value);
              setPhoneNumber(e.target.value);
            }}
          >
            <option value="">Select a contact</option>
            {contacts.map(contact => (
              <option key={contact.id} value={contact.phone_number}>
                {contact.name} ({contact.phone_number})
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Or enter a phone number"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setSelectedContact('');
            }}
          />
          <textarea
            placeholder="Initial message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Start Conversation</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default NewConversationModal;
