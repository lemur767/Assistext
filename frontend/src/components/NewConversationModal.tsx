import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import '../styles/new-conversation-modal.css';

interface Contact {
  id: number;
  name: string;
  phone_number: string;
}

interface NewConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConversationCreated?: () => void;
}

const NewConversationModal: React.FC<NewConversationModalProps> = ({ isOpen, onClose, onConversationCreated }) => {
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
      onConversationCreated?.(); // Trigger conversation list refresh
      onClose();
      navigate(`/conversations/${conversation.id}`);
    } catch (err: any) {
      setError(err.message || "Failed to start conversation.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="new-conversation-modal-overlay" onClick={onClose}>
      <div className="new-conversation-modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="new-conversation-modal-title">New Conversation</h2>
        {error && <p className="new-conversation-modal-error">{error}</p>}
        <form onSubmit={handleSubmit} className="new-conversation-modal-form">
          <select
            value={selectedContact}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedContact(value);
              setPhoneNumber(value);
            }}
            className="new-conversation-modal-select"
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
            className="new-conversation-modal-input"
          />
          <textarea
            placeholder="Initial message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="new-conversation-modal-textarea"
          />
          <div className="new-conversation-modal-button-group">
            <button type="button" onClick={onClose} className="new-conversation-modal-cancel-button">Cancel</button>
            <button type="submit" className="new-conversation-modal-submit-button">Start Conversation</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewConversationModal;

