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
    <div className="contactModal_overlay">
      <div className="contactModal_modal">
        <h2 className="contactModal_title">Edit Contact</h2>
        <p className="contactModal_number">{contactNumber}</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter contact name"
          className="contactModal_input"
        />
        <div className="contactModal_buttonGroup">
          <button onClick={onClose} className="contactModal_cancelButton">Cancel</button>
          <button onClick={handleSave} className="contactModal_saveButton">Save</button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
