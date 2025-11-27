import React from 'react';
import '../styles/contact-modal.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  contactName: string | null;
  contactNumber: string;
  onSave: (name: string) => void;
}

const ContactModal: React.FC<Props> = ({ isOpen, onClose, contactName, contactNumber, onSave }) => {
  const [name, setName] = React.useState(contactName || '');

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    onSave(name);
  };

  return (
    <div className="contact-modal-overlay">
      <div className="contact-modal-card">
        <h2 className="contact-modal-title">Edit Contact</h2>
        <p className="contact-modal-phone">{contactNumber}</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter contact name"
          className="contact-modal-input"
        />
        <div className="contact-modal-button-group">
          <button onClick={onClose} className="contact-modal-cancel-button">
            Cancel
          </button>
          <button onClick={handleSave} className="contact-modal-save-button">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;

