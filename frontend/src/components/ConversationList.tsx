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
    <div>
      <h3>Conversations</h3>
      {conversations.length === 0 ? (
        <p>No conversations yet.</p>
      ) : (
        <>
          <ul>
            {conversations.map((conv) => (
              <li key={conv.id} style={{ fontWeight: conv.unread ? 'bold' : 'normal' }}>
                <Link to={`/conversations/${conv.id}`}>
                  <div>
                    <strong>{conv.contact_number}</strong>
                    <p>{conv.last_message}</p>
                    <small>{new Date(conv.last_message_at).toLocaleString()}</small>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
              Previous
            </button>
            <span> Page {page} of {totalPages} </span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ConversationList;
