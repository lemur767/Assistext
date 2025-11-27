import React, { useState, useEffect } from 'react';
import { ArrowDownLeft, ArrowUpRight, MessageSquare } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { GlassCard } from './common/GlassCard';

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
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <div style={{
                        width: '2rem',
                        height: '2rem',
                        margin: '0 auto',
                        border: '2px solid var(--primary)',
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <p style={{ marginTop: '1rem', color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                        Loading recent activity...
                    </p>
                </div>
            </GlassCard>
        );
    }

    return (
        <GlassCard variant="solid">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '0.625rem',
                    backgroundColor: 'rgba(71, 228, 187, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <MessageSquare style={{ width: '1.25rem', height: '1.25rem', color: 'var(--secondary)' }} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>
                    Recent Activity
                </h3>
            </div>

            {messages.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--muted-foreground)', padding: '2rem', fontSize: '0.938rem' }}>
                    No recent activity yet.
                </p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            style={{
                                padding: '1rem',
                                borderRadius: '0.75rem',
                                backgroundColor: 'var(--muted)',
                                border: '1px solid var(--border)',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--border)';
                                e.currentTarget.style.transform = 'translateX(4px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--muted)';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                                <div style={{
                                    width: '2rem',
                                    height: '2rem',
                                    borderRadius: '0.5rem',
                                    backgroundColor: message.direction === 'inbound'
                                        ? 'rgba(71, 228, 187, 0.15)'
                                        : 'rgba(232, 100, 124, 0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    {message.direction === 'inbound' ? (
                                        <ArrowDownLeft style={{ width: '1rem', height: '1rem', color: 'var(--secondary)' }} />
                                    ) : (
                                        <ArrowUpRight style={{ width: '1rem', height: '1rem', color: 'var(--primary)' }} />
                                    )}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        color: message.direction === 'inbound' ? 'var(--secondary)' : 'var(--primary)',
                                        marginBottom: '0.25rem'
                                    }}>
                                        {message.direction === 'inbound' ? 'Received' : 'Sent'}
                                    </p>
                                    <p style={{
                                        fontSize: '0.938rem',
                                        color: 'var(--foreground)',
                                        marginBottom: '0.5rem',
                                        wordWrap: 'break-word'
                                    }}>
                                        {message.body}
                                    </p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
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
