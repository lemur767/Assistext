import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Plus, Edit2, ChevronLeft, ChevronRight } from "lucide-react";
import ContactModal from "./ContactModal";
import NewConversationModal from "./NewConversationModal";
import { api } from "../services/api";
import SentimentIndicator from "./SentimentIndicator";
import { useConversations } from "../hooks/useConversations";
import { GlassCard } from "./common/GlassCard";
import "../styles/ConversationList_dashboard.css";

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
    return (
      <div className="conversation-list-loading">
        <div style={{ textAlign: 'center' }}>
          <div className="conversation-list-spinner" />
          <p style={{ color: 'var(--muted-foreground)' }}>Loading conversations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <GlassCard variant="solid">
        <p className="conversation-error-container">Error: {error}</p>
      </GlassCard>
    );
  }

  return (
    <>
      <GlassCard variant="solid">
        {/* Header */}
        <div className="conversation-list-header">
          <div className="conversation-header-left">
            <div className="conversation-header-icon-wrapper">
              <MessageCircle className="conversation-header-icon" />
            </div>
            <h2 className="conversation-list-title">Conversations</h2>
          </div>
          <button
            onClick={() => setIsNewConversationModalOpen(true)}
            className="btn-primary conversation-new-btn"
          >
            <Plus style={{ width: '1.125rem', height: '1.125rem' }} />
            New
          </button>
        </div>

        {/* Conversations List */}
        {conversations.length === 0 ? (
          <div className="conversation-list-empty">
            <div className="conversation-empty-icon-wrapper">
              <MessageCircle style={{ width: '2rem', height: '2rem', color: 'var(--muted-foreground)' }} />
            </div>
            <p className="conversation-empty-text">No conversations yet.</p>
          </div>
        ) : (
          <>
            <div className="conversation-items-wrapper">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => handleConversationClick(conv.id)}
                  className={`conversation-item ${conv.unread ? 'unread' : ''}`}
                >
                  <div className="conversation-item-top">
                    <div className="conversation-item-info">
                      <div className="conversation-item-name-row">
                        <strong className="conversation-item-name">
                          {conv.contact_name || conv.contact_number}
                        </strong>
                        {conv.unread && (
                          <div className="conversation-unread-dot" />
                        )}
                      </div>
                      {conv.contact_name && (
                        <p className="conversation-item-number">
                          {conv.contact_number}
                        </p>
                      )}
                    </div>
                    <div className="conversation-item-meta">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleOpenModal(conv); }}
                        className="conversation-edit-btn"
                      >
                        <Edit2 style={{ width: '0.875rem', height: '0.875rem', color: 'var(--muted-foreground)' }} />
                      </button>
                      <small className="conversation-date">
                        {new Date(conv.last_message_at).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                  <div className="conversation-item-bottom">
                    <SentimentIndicator sentiment={conv.last_message_sentiment} />
                    <p className="conversation-preview">
                      {conv.last_message}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="conversation-pagination">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="btn-ghost conversation-pagination-btn"
                >
                  <ChevronLeft style={{ width: '1rem', height: '1rem' }} />
                  Previous
                </button>
                <span className="conversation-pagination-info">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="btn-ghost conversation-pagination-btn"
                >
                  Next
                  <ChevronRight style={{ width: '1rem', height: '1rem' }} />
                </button>
              </div>
            )}
          </>
        )}
      </GlassCard>

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