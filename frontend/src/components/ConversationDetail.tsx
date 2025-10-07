/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { socketService } from "../services/socketService";
import "../styles/ConversationDetail.css";
import { api } from "../services/api";
import { SparklesIcon } from "lucide-react";

interface Message {
  id: string;
  direction: "inbound" | "outbound";
  ai_generated: boolean;
  body: string;
  created_at: string;
}

interface Conversation {
    id: string;
    contact_number: string;
    contact_name: string | null;
    controlled_by: "ai" | "user";
}

const ConversationDetail: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const { session, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchConversation = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!isAuthenticated || !session) {
          throw new Error("User not authenticated.");
        }

        const data = await api.get(
          `/conversations/${conversationId}`
        );
        setConversation(data.conversation);
        setMessages(data.messages);
      } catch (err: unknown) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    if (conversationId && isAuthenticated) {
      fetchConversation();
    }
  }, [conversationId, isAuthenticated, session]);

  useEffect(() => {
    if (conversationId) {
      const socket = socketService.connect("/chat");

      socket.emit("join", { conversation_id: conversationId });

      socket.on("new_message", (message: Message) => {
        setMessages((prevMessages) => {
          if (prevMessages.find(m => m.id === message.id)) {
            return prevMessages;
          }
          return [...prevMessages, message];
        });
      });

      socket.on("status", (data: { msg: string }) => {
        setStatus(data.msg);
      });

      return () => {
        socket.emit("leave", { conversation_id: conversationId });
        socketService.disconnect();
      };
    }
  }, [conversationId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && conversationId) {
      const tempId = `temp-${Date.now()}`;
      const optimisticMessage: Message = {
        id: tempId,
        body: newMessage,
        direction: "outbound",
        ai_generated: false,
        created_at: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, optimisticMessage]);
      setNewMessage("");

      socketService.getSocket()?.emit("send_message", {
        conversation_id: conversationId,
        body: newMessage,
      }, (ack: { status: string, message: Message }) => {
        if (ack.status === 'ok') {
          setMessages(prev => prev.map(m => m.id === tempId ? ack.message : m));
        } else {
          setMessages(prev => prev.filter(m => m.id !== tempId));
          // Optionally, show an error to the user
        }
      });
    }
  };

  const handleTakeover = () => {
    if (conversationId) {
      socketService.getSocket()?.emit("takeover_conversation", {
        conversation_id: conversationId,
      });
    }
  };

  if (loading) {
    return <div className="loading-container">Loading messages...</div>;
  }

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

  return (
    <div className="conv-detail-container">
      <div className="conv-detail-background-grid"></div>
      <div className="conv-detail-card-wrapper">
        <div className="conv-detail-card">
          <header className="conv-detail-header">
            <div className="conv-detail-avatar-container">
              <div className="conv-detail-avatar">
                {conversation?.contact_name?.charAt(0).toUpperCase() ||
                  conversation?.contact_number?.charAt(0) ||
                  "C"}
              </div>
              <div className="conv-detail-user-name">
                <p>{conversation?.contact_name || conversation?.contact_number}</p>
                <p className="conv-detail-user-status">{status}</p>
              </div>
            </div>
            <div className="conv-detail-ai-status">
                {conversation?.controlled_by === "ai" ? "AI Responding" : "User Controlled"}
                {conversation?.controlled_by === "ai" && (
                    <button onClick={handleTakeover} className="btn btn-secondary btn-sm ml-2">
                    Takeover
                    </button>
                )}
            </div>
          </header>

          <div className="conv-detail-messages-area custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={
                  msg.direction === "inbound"
                    ? "message-flex-start"
                    : "message-flex-end"
                }
              >
                <div
                  className={
                    msg.direction === "inbound"
                      ? "incoming-message"
                      : msg.ai_generated
                      ? "outgoing-message ai-reply-message"
                      : "outgoing-message"
                  }
                >
                  <p className="message-text">{msg.body}</p>
                  <small className="message-timestamp">
                    {new Date(msg.created_at).toLocaleString()}
                  </small>
                  {msg.ai_generated && (
                    <div className="ai-reply-info">
                      <SparklesIcon size={12} className="ai-reply-icon" />
                      <p className="ai-reply-text">AI Reply</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <footer className="conv-detail-footer">
            <form onSubmit={handleSendMessage} className="conv-detail-message-form">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="conv-detail-message-input"
              />
              <button type="submit" className="conv-detail-send-button">
                Send
              </button>
            </form>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ConversationDetail;
