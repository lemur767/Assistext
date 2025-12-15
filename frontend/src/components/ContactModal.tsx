import React from 'react';
import '../styles/Modals_dashboard.css';

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
    <div className="modal-overlay">
      <div className="modal-content sm">
        <h2 className="modal-title left">Edit Contact</h2>
        <p className="modal-subtitle">{contactNumber}</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter contact name"
          className="modal-input"
          style={{ marginBottom: '1.5rem' }}
        />
        <div className="modal-actions">
          <button onClick={onClose} className="btn-cancel">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-save">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;

