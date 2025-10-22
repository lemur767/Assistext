import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Switch } from 'react-native'; // Removed StyleSheet
import { useAuth } from '../../contexts/AuthContext'; // Adjusted path
import { api } from '../../services/api'; // Adjusted path
import tw from 'twrnc';
import { useRouter, Link } from 'expo-router'; // Replaced useNavigation

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country_code, setCountryCode] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setSession } = useAuth();

  const handleSignup = async () => {
    if (!agreedToTerms) {
      Alert.alert('Error', 'You must agree to the Terms of Service and Privacy Policy.');
      return;
    }
    setLoading(true);
    try {
      const data = await api.post('/auth/register', { 
        email,
        password,
        country_code,
        first_name,
        last_name,
      });
      setSession({ token: data.access_token });
      router.replace('/'); // Changed from navigation.navigate('Dashboard')
    } catch (err: any) {
      Alert.alert('Signup Failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`flex-1 items-center justify-center bg-gray-900 p-4`}>
      <View style={tw`w-full max-w-md p-8 rounded-2xl bg-gray-800 bg-opacity-40 border border-purple-400`}>
        <Text style={tw`text-2xl font-bold text-white text-center mb-6`}>Create Account</Text>

        <View style={tw`flex-row mb-4`}>
          <View style={tw`flex-1 mr-2`}>
            <Text style={tw`text-sm text-gray-400 mb-2`}>First Name</Text>
            <TextInput
              value={first_name}
              onChangeText={setFirstName}
              style={tw`w-full px-3 py-2 text-white border border-gray-600 rounded-lg bg-gray-700`}
              placeholder="John"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <View style={tw`flex-1 ml-2`}>
            <Text style={tw`text-sm text-gray-400 mb-2`}>Last Name</Text>
            <TextInput
              value={last_name}
              onChangeText={setLastName}
              style={tw`w-full px-3 py-2 text-white border border-gray-600 rounded-lg bg-gray-700`}
              placeholder="Doe"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-sm text-gray-400 mb-2`}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={tw`w-full px-3 py-2 text-white border border-gray-600 rounded-lg bg-gray-700`}
            placeholder="you@example.com"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-sm text-gray-400 mb-2`}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={tw`w-full px-3 py-2 text-white border border-gray-600 rounded-lg bg-gray-700`}
            placeholder="••••••••"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
          />
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-sm text-gray-400 mb-2`}>Country Code</Text>
          <TextInput
            value={country_code}
            onChangeText={setCountryCode}
            style={tw`w-full px-3 py-2 text-white border border-gray-600 rounded-lg bg-gray-700`}
            placeholder="e.g. CA"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={tw`flex-row items-center mb-6`}>
          <Switch value={agreedToTerms} onValueChange={setAgreedToTerms} />
          <Text style={tw`ml-2 text-sm text-gray-400`}>
            I agree to the <Link href="/terms" style={tw`text-blue-400`}>Terms of Service</Link> and <Link href="/privacy" style={tw`text-blue-400`}>Privacy Policy</Link>.
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleSignup}
          style={tw`w-full py-3 bg-blue-600 rounded-lg items-center`}
          disabled={loading || !agreedToTerms}
        >
          <Text style={tw`text-white font-semibold`}>{loading ? 'Signing up...' : 'Sign up'}</Text>
        </TouchableOpacity>

        <View style={tw`flex-row justify-center mt-4`}>
          <Text style={tw`text-gray-400`}>Already have an account? </Text>
          <Link href="/login" style={tw`text-blue-400 hover:underline`}>
            Log in
          </Link>
        </View>
      </View>
    </View>
  );
};

export default SignupPage;