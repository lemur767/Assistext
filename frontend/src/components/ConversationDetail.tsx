/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { socketService } from "../services/socketService";

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
    <div className="flex flex-col h-screen relative bg-[var(--background)]">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')] bg-cover opacity-20 z-0"></div>
      <div className="relative w-full h-full flex flex-col z-10">
        <div className="relative backdrop-blur-md bg-black/60 border border-white/10 rounded-3xl shadow-lg flex flex-col h-full m-4 overflow-hidden">
          <header className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-bold shadow-[0_0_10px_rgba(236,155,59,0.5)]">
                {conversation?.contact_name?.charAt(0).toUpperCase() ||
                  conversation?.contact_number?.charAt(0) ||
                  "C"}
              </div>
              <div className="ml-3 font-medium text-white">
                <p>{conversation?.contact_name || conversation?.contact_number}</p>
                <p className="text-xs text-[var(--accent)]">{status}</p>
              </div>
            </div>
            <div className="text-[var(--primary)] text-sm flex items-center">
              {conversation?.controlled_by === "ai" ? "AI Responding" : "User Controlled"}
              {conversation?.controlled_by === "ai" && (
                <button onClick={handleTakeover} className="ml-2 px-3 py-1 rounded bg-secondary text-secondary-foreground text-xs hover:bg-secondary/80 transition-colors">
                  Takeover
                </button>
              )}
            </div>
          </header>

          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={
                  msg.direction === "inbound"
                    ? "flex justify-start"
                    : "flex justify-end"
                }
              >
                <div
                  className={
                    msg.direction === "inbound"
                      ? "bg-[var(--card)] backdrop-blur-md rounded-2xl rounded-tl-none px-4 py-2 max-w-[75%] border border-[var(--border)] text-[var(--foreground)]"
                      : msg.ai_generated
                        ? "bg-gradient-to-r from-[rgba(71,228,187,0.2)] to-[rgba(236,155,59,0.2)] border border-[rgba(71,228,187,0.5)] backdrop-blur-md rounded-2xl rounded-tr-none px-4 py-2 max-w-[75%] shadow-[0_0_15px_rgba(232,100,124,0.2)] text-[var(--foreground)]"
                        : "bg-gradient-to-r from-[rgba(236,155,59,0.1)] to-[rgba(232,100,124,0.1)] backdrop-blur-md border border-[rgba(232,100,124,0.3)] rounded-2xl rounded-tr-none px-4 py-2 max-w-[75%] shadow-[0_0_15px_rgba(232,100,124,0.2)] text-[var(--foreground)]"
                  }
                >
                  <p className="text-sm">{msg.body}</p>
                  <small className="block mt-1 text-xs opacity-70">
                    {new Date(msg.created_at).toLocaleString()}
                  </small>
                  {msg.ai_generated && (
                    <div className="mt-1 flex items-center justify-end">
                      <SparklesIcon size={12} className="w-3 h-3 text-[var(--accent)] mr-1" />
                      <p className="text-xs text-[var(--accent)]">AI Reply</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <footer className="p-6 border-t border-white/10">
            <form onSubmit={handleSendMessage} className="flex gap-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-[var(--input-background)] border border-[var(--border)] rounded-full text-[var(--foreground)] px-6 py-3 placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
              />
              <button type="submit" className="px-6 py-3 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-[var(--primary-foreground)] font-medium shadow-[0_0_15px_rgba(232,100,124,0.5)] hover:opacity-90 transition-all">
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
