import React, { useState, useEffect } from 'react';
import { ArrowDownLeft, ArrowUpRight, MessageSquare } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { GlassCard } from './common/GlassCard';
import '../styles/RecentActivity_dashboard.css';

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
        return (
            <GlassCard variant="solid">
                <div className="recent-activity-loading">
                    <div className="recent-activity-spinner" />
                    <p className="recent-activity-loading-text">
                        Loading recent activity...
                    </p>
                </div>
            </GlassCard>
        );
    }

    return (
        <GlassCard variant="solid">
            <div className="recent-activity-header">
                <div className="recent-activity-icon-wrapper">
                    <MessageSquare style={{ width: '1.25rem', height: '1.25rem', color: 'var(--secondary)' }} />
                </div>
                <h3 className="recent-activity-title">
                    Recent Activity
                </h3>
            </div>

            {messages.length === 0 ? (
                <p className="recent-activity-empty">
                    No recent activity yet.
                </p>
            ) : (
                <div className="recent-activity-list">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className="recent-activity-item"
                        >
                            <div className="activity-content-wrapper">
                                <div className={`activity-icon-container ${message.direction}`}>
                                    {message.direction === 'inbound' ? (
                                        <ArrowDownLeft style={{ width: '1rem', height: '1rem', color: 'var(--secondary)' }} />
                                    ) : (
                                        <ArrowUpRight style={{ width: '1rem', height: '1rem', color: 'var(--primary)' }} />
                                    )}
                                </div>
                                <div className="activity-info">
                                    <p className="activity-direction">
                                        {message.direction === 'inbound' ? 'Received' : 'Sent'}
                                    </p>
                                    <p className="activity-body">
                                        {message.body}
                                    </p>
                                    <p className="activity-time">
                                        {new Date(message.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </GlassCard>
    );
};

export default RecentActivity;
