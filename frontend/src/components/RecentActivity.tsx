import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface Message {
    id: string;
    body: string;
    created_at: string;
    direction: 'inbound' | 'outbound';
}

const RecentActivity: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const { session } = useAuth();

    useEffect(() => {
        const fetchRecentMessages = async () => {
            setLoading(true);
            try {
                if (!session) {
                    throw new Error("User not authenticated.");
                }

                const data = await api.get('/users/me/recent_messages');
                setMessages(data.messages);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (session) {
            fetchRecentMessages();
        }
    }, [session]);

    if (loading) {
        return <p>Loading recent activity...</p>;
    }

    return (
        <div className="dashboard_ghostNumberCard">
            <h3 className="dashboard_ghostNumberTitle">Recent Activity</h3>
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        <p>{message.direction === 'inbound' ? 'From' : 'To'}: {message.body}</p>
                        <small>{new Date(message.created_at).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentActivity;
