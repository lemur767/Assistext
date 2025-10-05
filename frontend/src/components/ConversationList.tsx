import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/ConversationList.css";
import ContactModal from "./ContactModal";
import NewConversationModal from "./NewConversationModal";
import { Edit2Icon } from "lucide-react";
import api from "../services/api";

interface Conversation {
  id: string;
  contact_number: string;
  contact_name: string | null;
  contact_id: number | null;
  last_message: string;
  last_message_at: string;
  unread: boolean;
}

const ConversationList: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewConversationModalOpen, setIsNewConversationModalOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const fetchConversations = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!auth?.session) {
        throw new Error("User not authenticated.");
      }

      const response = await api.get(`/api/v1/conversations/?page=${page}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setConversations(data.conversations);
      setTotalPages(data.pages);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.session) {
      console.log(auth?.session.token);
      fetchConversations();
    }
  }, [auth?.session, page]);

  const handleOpenModal = (conv: Conversation) => {
    setSelectedConversation(conv);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedConversation(null);
    setIsModalOpen(false);
  };

  const handleSaveContact = async (name: string) => {
    if (!selectedConversation || !auth?.session) return;

    const { contact_id, contact_number } = selectedConversation;
    const method = contact_id ? 'PUT' : 'POST';
    const url = contact_id ? `/api/v1/contacts/${contact_id}` : '/api/v1/contacts';
    const body = JSON.stringify({ name, phone_number: contact_number });

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.session.token}`,
        },
        body,
      });

      if (!response.ok) {
        throw new Error('Failed to save contact');
      }

      // Refresh conversations to show the new name
      fetchConversations();
      handleCloseModal();

    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  const handleConversationClick = (conversationId: string) => {
    navigate(`/conversations/${conversationId}`);
  };

  if (loading) {
    return <div className="conversationList_loading">Loading conversations...</div>;
  }

  if (error) {
    return <div className="conversationList_error">Error: {error}</div>;
  }

  return (
    <>
      <div className="conversationList_container card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="conversationList_header text-text">Conversations</h3>
          <button onClick={() => setIsNewConversationModalOpen(true)} className="btn btn-primary">
            New Conversation
          </button>
        </div>
        {conversations.length === 0 ? (
          <p className="text-muted">No conversations yet.</p>
        ) : (
          <>
            <ul className="conversationList_conversationList">
              {conversations.map((conv) => (
                <li key={conv.id} onClick={() => handleConversationClick(conv.id)} style={{ cursor: 'pointer' }}>
                  <div className={`conversationList_conversationLink ${conv.unread ? "conversationList_conversationLinkUnread" : ''}`}>
                    <div className="conversationList_conversationHeader">
                      <div className="conversationList_contactInfo">
                        <strong className={`conversationList_contactName ${conv.unread ? "conversationList_contactNameUnread" : "conversationList_contactNameRead"}`}>
                          {conv.contact_name || conv.contact_number}
                        </strong>
                        {conv.contact_name && <span className="conversationList_contactNumber">{conv.contact_number}</span>}
                      </div>
                      <div className="conversationList_headerActions">
                        <button onClick={(e) => { e.stopPropagation(); handleOpenModal(conv); }} className="conversationList_editButton">
                          <Edit2Icon size={14} />
                        </button>
                        <small className="conversationList_lastMessageTime">{new Date(conv.last_message_at).toLocaleString()}</small>
                      </div>
                    </div>
                    <p className={`conversationList_lastMessage ${conv.unread ? "conversationList_lastMessageUnread" : "conversationList_lastMessageRead"}`}>{conv.last_message}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="conversationList_pagination">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn btn-ghost">
                Previous
              </button>
              <span className="conversationList_paginationText"> Page {page} of {totalPages} </span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="btn btn-ghost">
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
      />
    </>
  );
};

export default ConversationList;