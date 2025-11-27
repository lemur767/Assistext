import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Phone, Search } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { GlassCard } from './common/GlassCard';

interface Contact {
  id: number;
  name: string;
  phone_number: string;
}

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, session } = useAuth();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await api.get('/contacts', { token: session?.token });
        setContacts(response.contacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setError('Failed to load contacts.');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && session?.token) {
      fetchContacts();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, session?.token]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone_number.includes(searchQuery)
  );

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            margin: '0 auto 1rem',
            border: '3px solid var(--secondary)',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: 'var(--muted-foreground)' }}>Loading contacts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <GlassCard variant="solid">
        <p style={{ color: '#EF4444', textAlign: 'center', padding: '2rem' }}>{error}</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard variant="solid">
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
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
            <Users style={{ width: '1.25rem', height: '1.25rem', color: 'var(--secondary)' }} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>Contacts</h2>
        </div>

        {/* Search */}
        {contacts.length > 0 && (
          <div style={{ position: 'relative' }}>
            <Search style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '1.125rem',
              height: '1.125rem',
              color: 'var(--muted-foreground)',
              pointerEvents: 'none'
            }} />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{
                width: '100%',
                paddingLeft: '2.75rem'
              }}
            />
          </div>
        )}
      </div>

      {/* Contacts List */}
      {contacts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <div style={{
            width: '4rem',
            height: '4rem',
            margin: '0 auto 1.5rem',
            borderRadius: '1rem',
            backgroundColor: 'var(--muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Users style={{ width: '2rem', height: '2rem', color: 'var(--muted-foreground)' }} />
          </div>
          <p style={{ color: 'var(--muted-foreground)', fontSize: '0.938rem' }}>
            You haven't added any contacts yet.
          </p>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <p style={{ color: 'var(--muted-foreground)', fontSize: '0.938rem' }}>
            No contacts match your search.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {filteredContacts.map(contact => (
            <Link
              key={contact.id}
              to={`/contacts/${contact.id}`}
              style={{
                textDecoration: 'none',
                padding: '1.25rem',
                borderRadius: '0.75rem',
                backgroundColor: 'var(--muted)',
                border: '1px solid var(--border)',
                transition: 'all 0.2s',
                display: 'block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = 'var(--secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '0.75rem',
                  background: 'linear-gradient(135deg, var(--secondary), var(--accent))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'white',
                  flexShrink: 0
                }}>
                  {contact.name.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, min Width: 0 }}>
                  <p style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--foreground)',
                    marginBottom: '0.25rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {contact.name}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <Phone style={{ width: '0.875rem', height: '0.875rem', color: 'var(--muted-foreground)' }} />
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--muted-foreground)',
                      margin: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {contact.phone_number}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </GlassCard>
  );
};

export default Contacts;