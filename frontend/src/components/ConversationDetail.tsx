/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { socketService } from "../services/socketService";
import "../styles/ConversationDetail.css";
import api from "../services/api";

interface Message {
  id: string;
  sender: "contact" | "ai" | "user_override";
  content: string;
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

        const response = await api.get(
          `/api/v1/conversations/${conversationId}`
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
    if (conversationId && isAuthenticated) {
      fetchConversation();
    }
  }, [conversationId, isAuthenticated, session]);

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
    return <div className="conversationDetail_loadingContainer">Loading messages...</div>;
  }

  if (error) {
    return <div className="conversationDetail_errorContainer">Error: {error}</div>;
  }

  return (
    <div className="conversationDetail_mainContainer">
      <header className={`flex items-center justify-between p-4 glass-morphism border-b border-neutral-border`}>
        <h3 className="conversationDetail_headerTitle">
          Conversation with {conversation?.contact_name || conversation?.contact_number}
        </h3>
        <div className="conversationDetail_headerControls">
          <p className="conversationDetail_headerStatus">Status: {status}</p>
          <p className="conversationDetail_headerStatus">Controlled by: {conversation?.controlled_by}</p>
          {conversation?.controlled_by === "ai" && (
            <button onClick={handleTakeover} className="btn btn-secondary btn-sm">
              Takeover
            </button>
          )}
        </div>
      </header>

      <div className="conversationDetail_messageArea custom-scrollbar">
        <div className="conversationDetail_messagesList">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`conversationDetail_messageContainer ${msg.sender === "contact" ? "conversationDetail_justifyStart" : "conversationDetail_justifyEnd"}`}>
              <div
                className={`p-3 rounded-lg max-w-lg ${msg.sender === "contact"
                    ? "glass-morphism"
                    : msg.sender === "user_override"
                      ? "bg-secondary/20"
                      : "bg-primary/20"
                  }`}>
                <p>{msg.content}</p>
                <small className="conversationDetail_messageContent">
                  {new Date(msg.created_at).toLocaleString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className={`p-4 glass-morphism border-t border-neutral-border`}>
        <form onSubmit={handleSendMessage} className="conversationDetail_messageForm">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="conversationDetail_messageInput form-input"/>
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ConversationDetail;
