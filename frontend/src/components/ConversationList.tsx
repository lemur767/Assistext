import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactModal from "./ContactModal";
import NewConversationModal from "./NewConversationModal";
import { Edit2Icon } from "lucide-react";
import { api } from "../services/api";
import SentimentIndicator from "./SentimentIndicator";
import { useConversations } from "../hooks/useConversations";

interface Conversation {
  id: string;
  contact_number: string;
  contact_name: string | null;
  contact_id: number | null;
  last_message: string;
  last_message_at: string;
  last_message_sentiment: number | null;
  unread: boolean;
}

const ConversationList: React.FC = () => {
  const { conversations, loading, error, page, totalPages, setPage, fetchConversations } = useConversations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewConversationModalOpen, setIsNewConversationModalOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const navigate = useNavigate();

  const handleOpenModal = (conv: Conversation) => {
    setSelectedConversation(conv);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedConversation(null);
    setIsModalOpen(false);
  };

  const handleSaveContact = async (name: string) => {
    if (!selectedConversation) return;

    const { contact_id, contact_number } = selectedConversation;
    const method = contact_id ? 'put' : 'post';
    const url = contact_id ? `/contacts/${contact_id}` : '/contacts';
    const body = { name, phone_number: contact_number };

    try {
      await api[method](url, body);
      fetchConversations(); // Refetch conversations after saving
      handleCloseModal();
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  const handleConversationClick = (conversationId: string) => {
    navigate(`/conversations/${conversationId}`);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading conversations...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Conversations</h3>
          <button onClick={() => setIsNewConversationModalOpen(true)} className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600">
            New Conversation
          </button>
        </div>
        {conversations.length === 0 ? (
          <p className="text-gray-500">No conversations yet.</p>
        ) : (
          <>
            <ul className="space-y-2">
              {conversations.map((conv) => (
                <li key={conv.id} onClick={() => handleConversationClick(conv.id)} className={`p-4 rounded-md cursor-pointer transition-colors ${conv.unread ? 'bg-cyan-400/10' : 'bg-white'} hover:bg-gray-50`}>
                  <div className={`flex justify-between items-center`}>
                    <div className="flex flex-col">
                      <strong className={`font-semibold ${conv.unread ? 'text-cyan-400' : 'text-gray-800'}`}>
                        {conv.contact_name || conv.contact_number}
                      </strong>
                      {conv.contact_name && <span className="text-xs text-gray-500 font-mono">{conv.contact_number}</span>}
                    </div>
                    <div className="flex items-center space-x-3">
                      <button onClick={(e) => { e.stopPropagation(); handleOpenModal(conv); }} className="text-gray-500 hover:text-cyan-400">
                        <Edit2Icon size={14} />
                      </button>
                      <small className="text-xs text-gray-500">{new Date(conv.last_message_at).toLocaleString()}</small>
                    </div>
                  </div>
                  <p className={`mt-1 text-sm truncate ${conv.unread ? 'text-gray-800' : 'text-gray-500'}`}>
                    <SentimentIndicator sentiment={conv.last_message_sentiment} />
                    {conv.last_message}
                  </p>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-4">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50">
                Previous
              </button>
              <span className="text-sm text-gray-500"> Page {page} of {totalPages} </span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50">
                Next
              </button>
            </div>
          </>
        )}
      </div>
      {selectedConversation && (
        <ContactModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          contactName={selectedConversation.contact_name}
          contactNumber={selectedConversation.contact_number}
          onSave={handleSaveContact}
        />
      )}
      <NewConversationModal
        isOpen={isNewConversationModalOpen}
        onClose={() => setIsNewConversationModalOpen(false)}
        onConversationCreated={fetchConversations}
      />
    </>
  );
};

export default ConversationList;