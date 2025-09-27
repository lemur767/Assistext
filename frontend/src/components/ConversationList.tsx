/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/ConversationList.css";
import ContactModal from "./ContactModal";
import { Edit2Icon } from "lucide-react";

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
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const auth = useAuth();

  const fetchConversations = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!auth?.session) {
        throw new Error("User not authenticated.");
      }

      const response = await fetch(`/api/v1/conversations?page=${page}`, {
        headers: {
          Authorization: `Bearer ${auth.session.token}`,
        },
      });
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
    fetchConversations();
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
          Authorization: `Bearer ${auth.session.token}`,
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

  if (loading) {
    return <div className="conversationList_loading">Loading conversations...</div>;
  }

  if (error) {
    return <div className="conversationList_error">Error: {error}</div>;
  }

  return (
    <>
      <div className="conversationList_container card">
        <h3 className="conversationList_header text-text">Conversations</h3>
        {conversations.length === 0 ? (
          <p className="text-muted">No conversations yet.</p>
        ) : (
          <>
            <ul className="conversationList_conversationList">
              {conversations.map((conv) => (
                <li key={conv.id}>
                  <div className={`conversationList_conversationLink ${conv.unread ? "conversationList_conversationLinkUnread" : ''}`}>
                    <div className="conversationList_conversationHeader">
                      <div className="conversationList_contactInfo">
                        <strong className={`conversationList_contactName ${conv.unread ? "conversationList_contactNameUnread" : "conversationList_contactNameRead"}`}>
                          {conv.contact_name || conv.contact_number}
                        </strong>
                        {conv.contact_name && <span className="conversationList_contactNumber">{conv.contact_number}</span>}
                      </div>
                      <div className="conversationList_headerActions">
                        <button onClick={() => handleOpenModal(conv)} className="conversationList_editButton">
                          <Edit2Icon size={14} />
                        </button>
                        <small className="conversationList_lastMessageTime">{new Date(conv.last_message_at).toLocaleString()}</small>
                      </div>
                    </div>
                    <Link to={`/conversations/${conv.id}`} className="conversationList_messageLink">
                      <p className={`conversationList_lastMessage ${conv.unread ? "conversationList_lastMessageUnread" : "conversationList_lastMessageRead"}`}>{conv.last_message}</p>
                    </Link>
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
    </>
  );
};

export default ConversationList;