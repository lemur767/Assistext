/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../App";

interface Conversation {
  id: string;
  contact_number: string;
  last_message: string;
  last_message_at: string;
  unread: boolean;
}

const ConversationList: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const auth = useAuth();

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!auth?.session) {
          throw new Error("User not authenticated.");
        }

        const response = await fetch(`/api/v1/conversations?page=${page}` , {
          headers: {
            Authorization: `Bearer ${auth.session.token}`,
          },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        setConversations(data.conversations);
        setTotalPages(data.pages);
      } catch (err: unknown) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, [auth?.session, page]);

  if (loading) {
    return <div>Loading conversations...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6 rounded-lg card">
      <h3 className="mb-4 text-xl font-bold text-text">Conversations</h3>
      {conversations.length === 0 ? (
        <p className="text-muted">No conversations yet.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {conversations.map((conv) => (
              <li key={conv.id}>
                <Link 
                  to={`/conversations/${conv.id}`}
                  className={`block p-4 rounded-lg transition-colors hover:bg-surface-100 dark:hover:bg-surface-700 ${conv.unread ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}>
                  <div className="flex items-center justify-between">
                    <strong className={`font-semibold ${conv.unread ? 'text-primary' : 'text-text'}`}>{conv.contact_number}</strong>
                    <small className="text-xs text-muted">{new Date(conv.last_message_at).toLocaleString()}</small>
                  </div>
                  <p className={`mt-1 text-sm truncate ${conv.unread ? 'text-text' : 'text-muted'}`}>{conv.last_message}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between mt-6">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn btn-ghost">
              Previous
            </button>
            <span className="text-sm text-muted"> Page {page} of {totalPages} </span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="btn btn-ghost">
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ConversationList;
