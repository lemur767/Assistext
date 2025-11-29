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

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await api.get('/contacts', { token: session?.token } as any);
        setContacts(response);
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

  const handleCreateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const response = await api.post('/contacts', {
        name: newContactName,
        phone_number: newContactPhone
      }, { token: session?.token } as any);

      setContacts([...contacts, response]);
      setIsAddModalOpen(false);
      setNewContactName('');
      setNewContactPhone('');
    } catch (error) {
      console.error('Error creating contact:', error);
      // You might want to set an error state here to show in the modal
    } finally {
      setCreating(false);
    }
  };

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
    <>
      <GlassCard variant="solid">
        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary"
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                borderRadius: '0.5rem'
              }}
            >
              Add Contact
            </button>
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
                  <div style={{ flex: 1, minWidth: 0 }}>
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

      {/* Add Contact Modal */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          backdropFilter: 'blur(4px)'
        }}
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--card)',
              borderRadius: '1rem',
              padding: '2rem',
              width: '100%',
              maxWidth: '28rem',
              border: '1px solid var(--border)',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
          >
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>Add New Contact</h3>
            <form onSubmit={handleCreateContact} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Name</label>
                <input
                  type="text"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  required
                  className="form-input"
                  style={{ width: '100%' }}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Phone Number</label>
                <input
                  type="tel"
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  required
                  className="form-input"
                  style={{ width: '100%' }}
                  placeholder="+1234567890"
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="btn-primary"
                  style={{ flex: 1, opacity: creating ? 0.7 : 1 }}
                >
                  {creating ? 'Adding...' : 'Add Contact'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;