import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext'; // Adjusted path
import RecentActivity from '../../components/RecentActivity'; // Adjusted path
import tw from 'twrnc';
import { useRouter } from 'expo-router'; // Replaced useNavigation

const Index: React.FC = () => {
  const { user, subscription, refreshUser } = useAuth();
  const router = useRouter();
  const [purchasingNumber, setPurchasingNumber] = useState(false);

  const getTrialDaysRemaining = () => {
    if (!user?.trial_expires_at) return 0;
    const diff = new Date(user.trial_expires_at).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const trialDaysRemaining = getTrialDaysRemaining();

  const getMessageLimit = (plan: string | null) => {
    if (plan === 'trial') return 10;
    if (plan === 'basic') return 100;
    if (plan === 'pro') return 1000;
    return 0;
  };

  const handlePurchaseNumber = async () => {
    setPurchasingNumber(true);
    try {
      await api.post('/users/purchase-number', {});
      Alert.alert('Success', 'Ghost Number purchased successfully!');
      if (refreshUser) {
        refreshUser();
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to purchase number');
    } finally {
      setPurchasingNumber(false);
    }
  };

  if (!user) {
    return <View style={tw`flex-1 items-center justify-center`}><Text style={tw`text-white`}>Loading...</Text></View>;
  }

  const currentPlan: any = subscription?.find(
    (plan: any) => plan.nickname === user.subscription_plan
  );

  return (
    <FlatList
      data={[]}
      renderItem={null}
      style={tw`flex-1 bg-gray-900 p-4`}
      ListHeaderComponent={
        <>
          {trialDaysRemaining > 0 ? (
            <View style={tw`bg-blue-500 p-4 rounded-lg mb-4`}>
              <Text style={tw`text-white text-center`}>You have {trialDaysRemaining} days left in your trial.</Text>
            </View>
          ) : null}
          {trialDaysRemaining === 0 && user.subscription_plan === 'trial' ? (
            <View style={tw`bg-yellow-500 p-4 rounded-lg mb-4`}>
              <Text style={tw`text-white text-center`}>
                Your trial has expired. Please <Text style={tw`font-bold`} onPress={() => router.push('/subscription' as any)}>subscribe</Text> to continue using the service.
              </Text>
            </View>
          ) : null}

          {!user.phone_number ? (
            <View style={tw`bg-gray-800 bg-opacity-40 border border-purple-400 rounded-lg p-4`}>
              <Text style={tw`text-lg font-bold text-white mb-2`}>No Ghost Number Assigned</Text>
              <Text style={tw`text-white`}>
                It looks like you don&apos;t have a Ghost Number yet. Please visit the{" "}
                <Text style={tw`font-bold text-blue-400`} onPress={() => router.push({ pathname: '/settings' })}>Settings</Text> page to set one up.
              </Text>
              <TouchableOpacity
                onPress={handlePurchaseNumber}
                style={tw`mt-4 bg-blue-600 p-3 rounded-lg items-center`}
                disabled={purchasingNumber}
              >
                <Text style={tw`text-white font-bold`}>
                  {purchasingNumber ? 'Purchasing...' : 'Get Ghost Number'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={tw`grid gap-4`}>
              <View style={tw`bg-gray-800 bg-opacity-40 border border-purple-400 rounded-lg p-4`}>
                <Text style={tw`text-lg font-bold text-white`}>Your Ghost Number</Text>
                <Text style={tw`text-2xl text-cyan-400 font-mono mt-2`}><Text>{user.phone_number}</Text></Text>
              </View>
              <View style={tw`bg-gray-800 bg-opacity-40 border border-purple-400 rounded-lg p-4`}>
                <Text style={tw`text-lg font-bold text-white`}>Message Usage</Text>
                <Text style={tw`text-2xl text-cyan-400 font-mono mt-2`}>
                  <Text>{user.message_count}</Text> / {getMessageLimit(user.subscription_plan)}
                </Text>
              </View>
              {currentPlan && (
                <View style={tw`bg-gray-800 bg-opacity-40 border border-purple-400 rounded-lg p-4`}>
                  <Text style={tw`text-lg font-bold text-white`}>Subscription</Text>
                  <Text style={tw`text-2xl text-cyan-400 font-mono mt-2`}>
                    {currentPlan.product.name} - $<Text>{currentPlan.amount / 100}</Text> / {currentPlan.interval}
                  </Text>
                </View>
              )}
            </View>
          )}
        </>
      }
      ListFooterComponent={<RecentActivity />}
    />
  );
};

export default Index;