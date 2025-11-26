
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { socketService } from '../services/socketService';

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

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { session, user } = useAuth();

  const fetchConversations = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!session) {
        throw new Error("User not authenticated.");
      }

      const data = await api.get(`/conversations/?page=${page}`);
      setConversations(data.conversations);
      setTotalPages(data.pages);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchConversations();
      
      // Connect to socketio and listen for conversation updates
      const socket = socketService.connect('/chat');
      const userId = user?.id;
      
      if (userId) {
        // Join user-specific room for conversation updates
        socket.emit('join_user_room', { user_id: userId });
        
        // Listen for conversation creation
        socket.on('conversation_created', () => {
          fetchConversations();
        });
        
        // Listen for conversation updates
        socket.on('conversation_updated', () => {
          fetchConversations();
        });
      }
      
      // Cleanup on unmount
      return () => {
        if (userId) {
          socket.emit('leave_user_room', { user_id: userId });
        }
      };
    }
  }, [session, page]);

  return { conversations, loading, error, page, totalPages, setPage, fetchConversations };
};
