import React from 'react';


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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 p-8 rounded-2xl border border-white/10 shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-white">Edit Contact</h2>
        <p className="font-mono text-slate-400 mb-6">{contactNumber}</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter contact name"
          className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white mb-6 transition-all duration-200 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50"
        />
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 rounded-full bg-transparent border border-slate-600 text-white font-medium hover:bg-slate-700 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium border-none hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;

