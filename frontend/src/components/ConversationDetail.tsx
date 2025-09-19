/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../App";
import { socketService } from "../services/socketService";

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
    return <div>Loading messages...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-bg text-text">
      <header className="flex items-center justify-between p-4 bg-surface border-b border-border">
        <h3 className="text-lg font-bold text-text">
          Conversation with {conversation?.contact_number}
        </h3>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-muted">Status: {status}</p>
          <p className="text-sm text-muted">Controlled by: {conversation?.controlled_by}</p>
          {conversation?.controlled_by === "ai" && (
            <button onClick={handleTakeover} className="btn btn-secondary btn-sm">
              Takeover
            </button>
          )}
        </div>
      </header>

      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "contact" ? "justify-start" : "justify-end"}`}>
              <div
                className={`p-3 rounded-lg max-w-lg ${msg.sender === "contact"
                    ? "bg-surface text-text"
                    : msg.sender === "user_override"
                      ? "bg-secondary text-white"
                      : "bg-primary text-white"
                  }`}>
                <p>{msg.content}</p>
                <small className="block mt-1 text-xs opacity-70">
                  {new Date(msg.created_at).toLocaleString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="p-4 bg-surface border-t border-border">
        <form onSubmit={handleSendMessage} className="flex space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 form-input"
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
