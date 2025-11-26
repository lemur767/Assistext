import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { socketService } from '../../services/socketService';
import { api } from '../../services/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles } from 'lucide-react-native';

interface Message {
  id: string;
  direction: "inbound" | "outbound";
  ai_generated: boolean;
  body: string;
  created_at: string;
}

interface Conversation {
  id: string;
  contact_number: string;
  contact_name: string | null;
  controlled_by: "ai" | "user";
}

export default function ConversationDetailPage() {
  const { id: conversationId } = useLocalSearchParams();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const { session, isAuthenticated } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const fetchConversation = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!isAuthenticated || !session) {
          throw new Error("User not authenticated.");
        }

        const data = await api.get(
          `/conversations/${conversationId}`
        );
        setConversation(data.conversation);
        setMessages(data.messages);
      } catch (err: unknown) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    if (conversationId && isAuthenticated) {
      fetchConversation();
    }
  }, [conversationId, isAuthenticated, session]);

  useEffect(() => {
    if (conversationId) {
      const socket = socketService.connect("/chat");

      socket.emit("join", { conversation_id: conversationId });

      socket.on("new_message", (message: Message) => {
        setMessages((prevMessages) => {
          if (prevMessages.find(m => m.id === message.id)) {
            return prevMessages;
          }
          return [...prevMessages, message];
        });
      });

      socket.on("status", (data: { msg: string }) => {
        setStatus(data.msg);
      });

      return () => {
        socket.emit("leave", { conversation_id: conversationId });
        socketService.disconnect();
      };
    }
  }, [conversationId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && conversationId) {
      const tempId = `temp-${Date.now()}`;
      const optimisticMessage: Message = {
        id: tempId,
        body: newMessage,
        direction: "outbound",
        ai_generated: false,
        created_at: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, optimisticMessage]);
      setNewMessage("");

      socketService.getSocket()?.emit("send_message", {
        conversation_id: conversationId,
        body: newMessage,
      }, (ack: { status: string, message: Message }) => {
        if (ack.status === 'ok') {
          setMessages(prev => prev.map(m => m.id === tempId ? ack.message : m));
        } else {
          setMessages(prev => prev.filter(m => m.id !== tempId));
        }
      });
    }
  };

  const handleTakeover = () => {
    if (conversationId) {
      socketService.getSocket()?.emit("takeover_conversation", {
        conversation_id: conversationId,
      });
    }
  };

  const getInitials = () => {
    if (conversation?.contact_name) {
      return conversation.contact_name.charAt(0).toUpperCase();
    }
    if (conversation?.contact_number) {
      return conversation.contact_number.charAt(0);
    }
    return "C";
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading messages...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <LinearGradient
            colors={['#06b6d4', '#a78bfa']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>{getInitials()}</Text>
          </LinearGradient>
          <View style={styles.headerInfo}>
            <Text style={styles.headerText}>
              {conversation?.contact_name || conversation?.contact_number}
            </Text>

          </View>
        </View>
        <View style={styles.controlContainer}>
          <Text style={styles.aiStatusText}>
            {conversation?.controlled_by === "ai" ? "AI Responding" : "User Controlled"}
          </Text>
          {conversation?.controlled_by === "ai" && (
            <TouchableOpacity onPress={handleTakeover} style={styles.takeoverButton}>
              <Text style={styles.takeoverButtonText}>Takeover</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Messages Area */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesArea}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((item) => (
          <View
            key={item.id}
            style={[
              styles.messageWrapper,
              item.direction === 'inbound' ? styles.messageWrapperStart : styles.messageWrapperEnd
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                item.direction === 'inbound'
                  ? styles.incomingMessage
                  : item.ai_generated
                    ? styles.aiMessage
                    : styles.outgoingMessage
              ]}
            >
              <Text style={styles.messageText}>{item.body}</Text>
              <Text style={styles.timestamp}>
                {new Date(item.created_at).toLocaleString()}
              </Text>
              {item.ai_generated && (
                <View style={styles.aiIndicator}>
                  <Sparkles size={12} color="#22d3ee" />
                  <Text style={styles.aiIndicatorText}>AI Reply</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
          placeholderTextColor="#94a3b8"
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <LinearGradient
            colors={['#06b6d4', '#a78bfa']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.sendButton}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#020617',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  statusText: {
    fontSize: 12,
    color: '#67e8f9',
    marginTop: 2,
  },
  controlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  aiStatusText: {
    fontSize: 14,
    color: '#22d3ee',
  },
  takeoverButton: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.5)',
  },
  takeoverButtonText: {
    color: '#a78bfa',
    fontSize: 12,
    fontWeight: '600',
  },
  messagesArea: {
    flex: 1,
    padding: 16,
  },
  messagesContent: {
    gap: 12,
  },
  messageWrapper: {
    flexDirection: 'row',
  },
  messageWrapperStart: {
    justifyContent: 'flex-start',
  },
  messageWrapperEnd: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },
  incomingMessage: {
    backgroundColor: 'rgba(71, 85, 105, 0.8)',
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#475569',
  },
  outgoingMessage: {
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    borderTopRightRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.3)',
  },
  aiMessage: {
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    borderTopRightRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.5)',
  },
  messageText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  timestamp: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 10,
    marginTop: 4,
  },
  aiIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
    gap: 4,
  },
  aiIndicatorText: {
    color: '#22d3ee',
    fontSize: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 14,
  },
  sendButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});