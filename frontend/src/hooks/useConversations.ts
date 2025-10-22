
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

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
  const { session } = useAuth();

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
    }
  }, [session, page]);

  return { conversations, loading, error, page, totalPages, setPage, fetchConversations };
};
