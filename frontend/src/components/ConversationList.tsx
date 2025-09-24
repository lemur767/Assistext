/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../App";
import styles from "./ConversationList.module.css";

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
    return <div className={styles.loading}>Loading conversations...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={`${styles.container} card`}>
      <h3 className={`${styles.header} text-text`}>Conversations</h3>
      {conversations.length === 0 ? (
        <p className="text-muted">No conversations yet.</p>
      ) : (
        <>
          <ul className={styles.conversationList}>
            {conversations.map((conv) => (
              <li key={conv.id}>
                <Link 
                  to={`/conversations/${conv.id}`}
                  className={`${styles.conversationLink} ${conv.unread ? styles.conversationLinkUnread : ''}`}>
                  <div className={styles.conversationHeader}>
                    <strong className={`${styles.contactNumber} ${conv.unread ? styles.contactNumberUnread : styles.contactNumberRead}`}>{conv.contact_number}</strong>
                    <small className={styles.lastMessageTime}>{new Date(conv.last_message_at).toLocaleString()}</small>
                  </div>
                  <p className={`${styles.lastMessage} ${conv.unread ? styles.lastMessageUnread : styles.lastMessageRead}`}>{conv.last_message}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.pagination}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn btn-ghost">
              Previous
            </button>
            <span className={styles.paginationText}> Page {page} of {totalPages} </span>
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
