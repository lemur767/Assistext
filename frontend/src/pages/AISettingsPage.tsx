import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

const AISettingsPage: React.FC = () => {
  const auth=useAuth();
  const [systemPrompt, setSystemPrompt] = useState('');
  const [tone, setTone] = useState('');
  const [includeSignature, setIncludeSignature] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (auth?.user) {
      setSystemPrompt(auth.user.ai_system_prompt || '');
      setTone(auth.user.ai_tone || '');
      setIncludeSignature(auth.user.include_ai_signature);
    }
  }, [auth?.user]);

  const isPro = auth?.user?.subscription_plan === 'pro';

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPro) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await api.put('/users/profile/ai-settings', {
        ai_system_prompt: systemPrompt,
        ai_tone: tone,
        include_ai_signature: includeSignature,
      });
      setSuccess('AI settings saved successfully!');
      // Optionally, refresh user data in AuthContext
      auth?.refreshUser();
    } catch (err: any) {
      setError(err.message || 'Failed to save settings.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">AI Personality Settings</h1>
      
      {!isPro && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
          <p className="font-bold">Pro Feature</p>
          <p>Customizing the AI personality is a Pro feature. Please upgrade your plan to unlock this functionality.</p>
        </div>
      )}

      <form onSubmit={handleSave} className={`p-6 bg-white rounded-lg shadow-md ${!isPro ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="mb-6">
          <label htmlFor="systemPrompt" className="block text-gray-700 font-semibold mb-2">System Prompt</label>
          <p className="text-sm text-gray-500 mb-2">Define the core identity and instructions for your AI assistant. This is the main driver of its personality.</p>
          <textarea
            id="systemPrompt"
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200 transition duration-200"
            rows={6}
            placeholder="e.g., You are a friendly and slightly sarcastic assistant for a small business..."
            disabled={!isPro}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="tone" className="block text-gray-700 font-semibold mb-2">Tone</label>
          <p className="text-sm text-gray-500 mb-2">Specify the tone of voice the AI should use in its responses.</p>
          <input
            type="text"
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200 transition duration-200"
            placeholder="e.g., witty, formal, cheerful, empathetic"
            disabled={!isPro}
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeSignature}
              onChange={(e) => setIncludeSignature(e.target.checked)}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              disabled={!isPro}
            />
            <span className="ml-3 text-gray-700">Include AI Signature</span>
          </label>
          <p className="text-sm text-gray-500 ml-8">Append "Sent with AI using Assistext" to the end of AI-generated messages.</p>
        </div>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}

        <div className="flex justify-end">
          <button 
            type="submit" 
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 transition duration-200"
            disabled={!isPro || isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AISettingsPage;
