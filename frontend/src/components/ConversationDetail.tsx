/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../App";
import { socketService } from "../services/socketService";
import styles from "./ConversationDetail.module.css";

interface Message {
  id: string;
  sender: "contact" | "ai" | "user_override";
  content: string;
  created_at: string;
}

interface Conversation {
    id: string;
    contact_number: string;
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
  const auth = useAuth();

  useEffect(() => {
    const fetchConversation = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!auth?.session) {
          throw new Error("User not authenticated.");
        }

        const response = await fetch(
          `/api/v1/conversations/${conversationId}`,
          {
            headers: {
              Authorization: `Bearer ${auth.session.token}`,
            },
          },
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        setConversation(data.conversation);
        setMessages(data.messages);
      } catch (err: unknown) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    if (conversationId) {
      fetchConversation();
    }
  }, [conversationId, auth?.session]);

  useEffect(() => {
    if (conversationId) {
      const socket = socketService.connect("/chat");

      socket.emit("join", { conversation_id: conversationId });

      socket.on("new_message", (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
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
      socketService.getSocket()?.emit("send_message", {
        conversation_id: conversationId,
        body: newMessage,
      });
      setNewMessage("");
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
    return <div className={`${styles.loadingContainer}`}>Loading messages...</div>;
  }

  if (error) {
    return <div className={`${styles.errorContainer}`}>Error: {error}</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <header className={`flex items-center justify-between p-4 glass-morphism border-b border-neutral-border`}>
        <h3 className={styles.headerTitle}>
          Conversation with {conversation?.contact_number}
        </h3>
        <div className={styles.headerControls}>
          <p className={styles.headerStatus}>Status: {status}</p>
          <p className={styles.headerStatus}>Controlled by: {conversation?.controlled_by}</p>
          {conversation?.controlled_by === "ai" && (
            <button onClick={handleTakeover} className="btn btn-secondary btn-sm">
              Takeover
            </button>
          )}
        </div>
      </header>

      <div className={`${styles.messageArea} custom-scrollbar`}>
        <div className={styles.messagesList}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.messageContainer} ${msg.sender === "contact" ? styles.justifyStart : styles.justifyEnd}`}>
              <div
                className={`p-3 rounded-lg max-w-lg ${msg.sender === "contact"
                    ? "glass-morphism"
                    : msg.sender === "user_override"
                      ? "bg-secondary/20"
                      : "bg-primary/20"
                  }`}>
                <p>{msg.content}</p>
                <small className={styles.messageContent}>
                  {new Date(msg.created_at).toLocaleString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className={`p-4 glass-morphism border-t border-neutral-border`}>
        <form onSubmit={handleSendMessage} className={styles.messageForm}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className={`${styles.messageInput} form-input`}
          />
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ConversationDetail;
