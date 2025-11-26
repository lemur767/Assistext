import { View, TextInput, Button, StyleSheet, FlatList, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

export default function NewConversationPage() {
    const router = useRouter();
    const { session } = useAuth();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [contactName, setContactName] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const validatePhoneNumber = (phone: string): boolean => {
        // Basic E.164 format validation: starts with +, followed by 1-15 digits
        const e164Regex = /^\+[1-9]\d{1,14}$/;
        return e164Regex.test(phone);
    };

    const handleSendMessage = async () => {
        // Validation
        if (!phoneNumber.trim()) {
            Alert.alert('Error', 'Please enter a phone number');
            return;
        }

        if (!validatePhoneNumber(phoneNumber)) {
            Alert.alert(
                'Invalid Phone Number',
                'Please enter a valid phone number in E.164 format (e.g., +15551234567)'
            );
            return;
        }

        if (!newMessage.trim()) {
            Alert.alert('Error', 'Please enter a message');
            return;
        }

        setLoading(true);

        try {
            const payload: any = {
                phone_number: phoneNumber,
                message: newMessage,
            };

            // Add contact name if provided
            if (contactName.trim()) {
                payload.name = contactName;
            }

            const response = await api.post('/conversations/', payload);

            // Navigate to the newly created conversation
            router.replace({
                pathname: '/conversation/[id]',
                params: {
                    id: response.id,
                    contactName: contactName || phoneNumber,
                },
            });
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to create conversation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerLabel}>Phone Number</Text>
                <TextInput
                    style={styles.phoneInput}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="+15551234567"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                    editable={!loading}
                />
                <Text style={styles.headerLabel}>Contact Name (Optional)</Text>
                <TextInput
                    style={styles.nameInput}
                    value={contactName}
                    onChangeText={setContactName}
                    placeholder="Enter contact name"
                    placeholderTextColor="#999"
                    editable={!loading}
                />
            </View>

            <FlatList
                data={[]}
                renderItem={null}
                style={styles.messageList}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>
                            Enter a phone number and message to start a new conversation
                        </Text>
                    </View>
                }
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type a message..."
                    placeholderTextColor="#999"
                    multiline
                    editable={!loading}
                />
                <Button
                    title={loading ? 'Sending...' : 'Send'}
                    onPress={handleSendMessage}
                    disabled={loading}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f1f0f0',
    },
    headerLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 5,
        marginTop: 5,
    },
    phoneInput: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        backgroundColor: '#fff',
    },
    nameInput: {
        fontSize: 14,
        color: '#000',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        backgroundColor: '#fff',
    },
    messageList: {
        flex: 1,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 50,
    },
    emptyText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
        maxHeight: 100,
    },
});
