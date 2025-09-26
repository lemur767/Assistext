import React from 'react';
import '../styles/ContactModal.css';

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
    <div className="overlay">
      <div className="modal">
        <h2 className="title">Edit Contact</h2>
        <p className="number">{contactNumber}</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter contact name"
          className="input"
        />
        <div className="buttonGroup">
          <button onClick={onClose} className="cancelButton">Cancel</button>
          <button onClick={handleSave} className="saveButton">Save</button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
