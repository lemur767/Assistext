import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, Alert } from 'react-native'; // Removed StyleSheet
import { useAuth } from '../../contexts/AuthContext'; // Adjusted path
import { api } from '../../services/api'; // Adjusted path
import tw from 'twrnc';

const AISettingsPage: React.FC = () => {
  const auth = useAuth();
  const [systemPrompt, setSystemPrompt] = useState('');
  const [tone, setTone] = useState('');
  const [includeSignature, setIncludeSignature] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (auth?.user) {
      setSystemPrompt(auth.user.ai_system_prompt || '');
      setTone(auth.user.ai_tone || '');
      setIncludeSignature(auth.user.include_ai_signature);
    }
  }, [auth?.user]);

  const isPro = auth?.user?.subscription_plan === 'pro';

  const handleSave = async () => {
    if (!isPro) return;

    setIsLoading(true);

    try {
      await api.put('/users/profile/ai-settings', {
        ai_system_prompt: systemPrompt,
        ai_tone: tone,
        include_ai_signature: includeSignature,
      });
      Alert.alert('Success', 'AI settings saved successfully!');
      auth?.refreshUser();
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to save settings.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={tw`p-4`}>
      <Text style={tw`text-2xl font-bold mb-4`}>AI Personality Settings</Text>

      {!isPro && (
        <View style={tw`bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6`}>
          <Text style={tw`font-bold text-yellow-700`}>Pro Feature</Text>
          <Text style={tw`text-yellow-700`}>Customizing the AI personality is a Pro feature. Please upgrade your plan to unlock this functionality.</Text>
        </View>
      )}

      <View style={!isPro ? tw`opacity-50` : {}} pointerEvents={!isPro ? 'none' : 'auto'}>
        <View style={tw`mb-6`}>
          <Text style={tw`text-gray-700 font-semibold mb-2`}>System Prompt</Text>
          <Text style={tw`text-sm text-gray-500 mb-2`}>Define the core identity and instructions for your AI assistant. This is the main driver of its personality.</Text>
          <TextInput
            value={systemPrompt}
            onChangeText={setSystemPrompt}
            style={tw`w-full px-3 py-2 text-gray-700 border rounded-lg`}
            multiline
            numberOfLines={6}
            placeholder="e.g., You are a friendly and slightly sarcastic assistant for a small business..."
            editable={isPro}
          />
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-gray-700 font-semibold mb-2`}>Tone</Text>
          <Text style={tw`text-sm text-gray-500 mb-2`}>Specify the tone of voice the AI should use in its responses.</Text>
          <TextInput
            value={tone}
            onChangeText={setTone}
            style={tw`w-full px-3 py-2 text-gray-700 border rounded-lg`}
            placeholder="e.g., witty, formal, cheerful, empathetic"
            editable={isPro}
          />
        </View>

        <View style={tw`mb-6 flex-row items-center`}>
          <Switch
            value={includeSignature}
            onValueChange={setIncludeSignature}
            disabled={!isPro}
          />
          <Text style={tw`ml-3 text-gray-700`}>Include AI Signature</Text>
        </View>
        <Text style={tw`text-sm text-gray-500 ml-8 -mt-4 mb-4`}>Append &quot;Sent with AI using Assistext&quot; to the end of AI-generated messages.</Text> {/* Escaped double quotes */}

        <TouchableOpacity
          onPress={handleSave}
          style={tw`px-6 py-3 bg-blue-600 rounded-lg items-center`}
          disabled={!isPro || isLoading}
        >
          <Text style={tw`text-white font-semibold`}>{isLoading ? 'Saving...' : 'Save Settings'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AISettingsPage;