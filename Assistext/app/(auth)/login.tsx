import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, /* Image, */ Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import tw from 'twrnc';
import { useRouter, Link } from 'expo-router';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setSession } = useAuth();
 

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = await api.post('/auth/login', { email, password });
      setSession({ token: data.token });
      router.replace('/');
    } catch (err: any) {
      Alert.alert('Login Failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`flex-1 items-center justify-center bg-gray-900`}>
      <View style={tw`absolute top-14 left-60 w-72 h-72 bg-purple-500 rounded-full opacity-20 pulse`} />
      <View style={tw`absolute top-48 right-74 w-72 h-72 bg-cyan-500 rounded-full opacity-20 pulse`} />
      <View style={tw`absolute bottom-6 right-96 w-72 h-72 bg-pink-500 rounded-full opacity-20 pulse`} />

      <View style={tw`w-full max-w-md p-8 rounded-2xl bg-gray-800 bg-opacity-40 border border-purple-400`}>
        <View style={tw`items-center mb-4`}>
          {/* <Image source={require('../../../assets/images/logo3333.png')} style={tw`w-[180px] h-[180px]`} /> */}
          <Text style={tw`text-white text-xl`}>Assistext</Text>
        </View>

        <View style={tw`mb-6`}>
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

        <View style={tw`mb-6`}>
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

        <TouchableOpacity
          onPress={handleLogin}
          style={tw`w-full py-3 bg-blue-600 rounded-lg items-center`}
          disabled={loading}
        >
          <Text style={tw`text-white font-semibold`}>{loading ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>

        <View style={tw`flex-row justify-center mt-4`}>
          <Text style={tw`text-gray-400`}>
            Don&apos;t have an account?{' '}
            <Text style={tw`text-blue-400 hover:underline`}>
              <Link href="/signup">
                Sign up
              </Link>
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;