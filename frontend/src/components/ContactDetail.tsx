import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';


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
    <div className="p-8">
      {isEditing ? (
        <div className="p-8 border border-white/10 rounded-2xl bg-slate-800/50 backdrop-blur-sm shadow-xl max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-white">Edit Contact</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white transition-all focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white transition-all focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleUpdate}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 rounded-full bg-transparent border border-slate-600 text-slate-300 font-medium hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 border border-white/10 rounded-2xl bg-slate-800/50 backdrop-blur-sm shadow-xl max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-white">{contact.name}</h1>
          <p className="mb-8 font-mono text-slate-400 text-lg">{contact.phone_number}</p>
          <div className="flex gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2.5 rounded-full bg-slate-700 text-white font-medium hover:bg-slate-600 transition-all border border-slate-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-2.5 rounded-full bg-red-500/10 text-red-400 font-medium hover:bg-red-500/20 transition-all border border-red-500/20"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactDetail;
