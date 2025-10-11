import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/NewConversationModal.css';
import { api } from '../services/api';

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
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (isOpen) {
      fetchContacts();
    }
  }, [isOpen, session]);

  const fetchContacts = async () => {
    if (!session) return;
    try {
        const data = await api.get('/contacts');
        setContacts(data.contacts);
    } catch (err) {
        console.error("Failed to fetch contacts", err);
        setError("Failed to load contacts.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const targetPhoneNumber = selectedContact || phoneNumber;
    if (!targetPhoneNumber) {
      setError('Please select a contact or enter a phone number.');
      return;
    }

    try {
        const conversation = await api.post('/conversations', {
            phone_number: targetPhoneNumber,
            message: message
        });
        onClose();
        navigate(`/conversations/${conversation.id}`);
    } catch (err: any) {
        setError(err.message || "Failed to start conversation.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>New Conversation</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <select
            value={selectedContact}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedContact(value);
              setPhoneNumber(value); // Also update phone number when contact is selected
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
              setSelectedContact(''); // Deselect contact if typing a number
            }}
          />
          <textarea
            placeholder="Initial message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
            <button type="submit" className="btn btn-primary">Start Conversation</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewConversationModal;
