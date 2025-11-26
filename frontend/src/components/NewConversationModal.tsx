import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-slate-800 p-8 rounded-2xl border border-white/10 shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6 text-center">New Conversation</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <select
            value={selectedContact}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedContact(value);
              setPhoneNumber(value);
            }}
            className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
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
            className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
          />
          <textarea
            placeholder="Initial message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white min-h-[100px] resize-y focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
          />
          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-full bg-transparent border border-slate-600 text-white font-medium transition-colors hover:bg-slate-700">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium transition-all hover:shadow-lg hover:shadow-purple-500/30">Start Conversation</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewConversationModal;

