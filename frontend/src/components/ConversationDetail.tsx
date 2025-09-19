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
    <div>
      <h3>Conversation with {conversation?.contact_number}</h3>
      <p>Status: {status}</p>
      <p>Controlled by: {conversation?.controlled_by}</p>
      {conversation?.controlled_by === "ai" && (
        <button onClick={handleTakeover}>Takeover Conversation</button>
      )}
      <div>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              textAlign: msg.sender === "contact" ? "left" : "right",
              color: msg.sender === "user_override" ? "blue" : "black",
            }}
          >
            <p>{msg.content}</p>
            <small>{new Date(msg.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ConversationDetail;
