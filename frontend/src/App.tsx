import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login';
import Settings from './components/Settings';
import Subscription from './components/Subscription';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/common/ProtectedRoute';
import UnprotectedRoute from './components/common/UnprotectedRoute';
import ConversationDetail from './components/ConversationDetail';
import ConversationList from './components/ConversationList';
import AuthenticatedLayout from './components/AuthenticatedLayout';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AISettingsPage from './pages/AISettingsPage';

import Contacts from './components/Contacts';
import ContactDetail from './components/ContactDetail';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          
          <Route element={<UnprotectedRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<AuthenticatedLayout />}>
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/ai" element={<AISettingsPage />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/conversations" element={<ConversationList />} />
              <Route path="/conversations/:conversationId" element={<ConversationDetail />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/contacts/:contactId" element={<ContactDetail />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
