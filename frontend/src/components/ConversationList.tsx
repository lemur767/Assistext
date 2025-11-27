import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Plus, Edit2, ChevronLeft, ChevronRight } from "lucide-react";
import ContactModal from "./ContactModal";
import NewConversationModal from "./NewConversationModal";
import { api } from "../services/api";
import SentimentIndicator from "./SentimentIndicator";
import { useConversations } from "../hooks/useConversations";
import { GlassCard } from "./common/GlassCard";
import { AnimatedSection } from "./common/AnimatedSection";

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
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            margin: '0 auto 1rem',
            border: '3px solid var(--primary)',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: 'var(--muted-foreground)' }}>Loading conversations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <GlassCard variant="solid">
        <p style={{ color: '#EF4444', textAlign: 'center', padding: '2rem' }}>Error: {error}</p>
      </GlassCard>
    );
  }

  return (
    <>
      <GlassCard variant="solid">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '0.625rem',
              backgroundColor: 'rgba(232, 100, 124, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MessageCircle style={{ width: '1.25rem', height: '1.25rem', color: 'var(--primary)' }} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>Conversations</h2>
          </div>
          <button
            onClick={() => setIsNewConversationModalOpen(true)}
            className="btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.625rem 1.25rem',
              borderRadius: '0.625rem',
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          >
            <Plus style={{ width: '1.125rem', height: '1.125rem' }} />
            New
          </button>
        </div>

        {/* Conversations List */}
        {conversations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              margin: '0 auto 1.5rem',
              borderRadius: '1rem',
              backgroundColor: 'var(--muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MessageCircle style={{ width: '2rem', height: '2rem', color: 'var(--muted-foreground)' }} />
            </div>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.938rem' }}>No conversations yet.</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => handleConversationClick(conv.id)}
                  style={{
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    backgroundColor: conv.unread ? 'rgba(232, 100, 124, 0.05)' : 'var(--muted)',
                    border: `1px solid ${conv.unread ? 'rgba(232, 100, 124, 0.2)' : 'var(--border)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.borderColor = 'var(--primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.borderColor = conv.unread ? 'rgba(232, 100, 124, 0.2)' : 'var(--border)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <strong style={{ fontSize: '1rem', fontWeight: 600, color: conv.unread ? 'var(--primary)' : 'var(--foreground)' }}>
                          {conv.contact_name || conv.contact_number}
                        </strong>
                        {conv.unread && (
                          <div style={{
                            width: '0.5rem',
                            height: '0.5rem',
                            borderRadius: '50%',
                            backgroundColor: 'var(--primary)'
                          }} />
                        )}
                      </div>
                      {conv.contact_name && (
                        <p style={{ fontSize: '0.813rem', color: 'var(--muted-foreground)', margin: 0 }}>
                          {conv.contact_number}
                        </p>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleOpenModal(conv); }}
                        style={{
                          padding: '0.375rem',
                          borderRadius: '0.375rem',
                          border: 'none',
                          backgroundColor: 'transparent',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--border)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <Edit2 style={{ width: '0.875rem', height: '0.875rem', color: 'var(--muted-foreground)' }} />
                      </button>
                      <small style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                        {new Date(conv.last_message_at).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                    <SentimentIndicator sentiment={conv.last_message_sentiment} />
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--muted-foreground)',
                      margin: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {conv.last_message}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border)'
              }}>
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="btn-ghost"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    opacity: page === 1 ? 0.5 : 1,
                    cursor: page === 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <ChevronLeft style={{ width: '1rem', height: '1rem' }} />
                  Previous
                </button>
                <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="btn-ghost"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    opacity: page === totalPages ? 0.5 : 1,
                    cursor: page === totalPages ? 'not-allowed' : 'pointer'
                  }}
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