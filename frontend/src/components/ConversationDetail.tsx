import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../App";

interface Message {
  id: string;
  sender: "contact" | "ai";
  content: string;
  created_at: string;
}

interface Conversation {
    id: string;
    contact_number: string;
}

const ConversationDetail: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  if (loading) {
    return <div>Loading messages...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>Conversation with {conversation?.contact_number}</h3>
      <div>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{ textAlign: msg.sender === "ai" ? "right" : "left" }}
          >
            <p>{msg.content}</p>
            <small>{new Date(msg.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationDetail;
