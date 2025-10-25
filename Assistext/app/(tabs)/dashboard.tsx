import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext'; // Adjusted path
import RecentActivity from '../../components/RecentActivity'; // Adjusted path
import tw from 'twrnc';
import { useRouter } from 'expo-router'; // Replaced useNavigation

const Dashboard: React.FC = () => {
  const { user, subscription } = useAuth();
  const router = useRouter();

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

  if (!user) {
    return <View style={tw`flex-1 items-center justify-center`}><Text style={tw`text-white`}>Loading...</Text></View>;
  }

  const currentPlan: any = subscription?.find(
    (plan: any) => plan.nickname === user.subscription_plan
  );

  return (
    <ScrollView style={tw`flex-1 bg-gray-900 p-4`}>
      {trialDaysRemaining > 0 && (
        <View style={tw`bg-blue-500 p-4 rounded-lg mb-4`}>
          <Text style={tw`text-white text-center`}>You have {trialDaysRemaining} days left in your trial.</Text>
        </View>
      )}
      {trialDaysRemaining === 0 && user.subscription_plan === 'trial' && (
        <View style={tw`bg-yellow-500 p-4 rounded-lg mb-4`}>
          <Text style={tw`text-white text-center`}>
            Your trial has expired. Please <Text style={tw`font-bold`} onPress={() => router.push('/subscription' as any)}>subscribe</Text> to continue using the service.
          </Text>
        </View>
        
      )}

      {!user.phone_number ? (
        <View style={tw`bg-gray-800 bg-opacity-40 border border-purple-400 rounded-lg p-4`}>
          <Text style={tw`text-lg font-bold text-white mb-2`}>No Ghost Number Assigned</Text>
          <Text style={tw`text-white`}>
            It looks like you don&apos;t have a Ghost Number yet. Please visit the{" "}
            <Text style={tw`font-bold text-blue-400`} onPress={() => router.push({ pathname: '/settings' })}>Settings</Text> page to set one up.
          </Text>
        </View>
      ) : (
        <View style={tw`grid gap-4`}>
          <View style={tw`bg-gray-800 bg-opacity-40 border border-purple-400 rounded-lg p-4`}>
            <Text style={tw`text-lg font-bold text-white`}>Your Ghost Number</Text>
            <Text style={tw`text-2xl text-cyan-400 font-mono mt-2`}>{user.phone_number}</Text>
          </View>
          <View style={tw`bg-gray-800 bg-opacity-40 border border-purple-400 rounded-lg p-4`}>
            <Text style={tw`text-lg font-bold text-white`}>Message Usage</Text>
            <Text style={tw`text-2xl text-cyan-400 font-mono mt-2`}>
              {user.message_count} / {getMessageLimit(user.subscription_plan)}
            </Text>
          </View>
          {currentPlan && (
            <View style={tw`bg-gray-800 bg-opacity-40 border border-purple-400 rounded-lg p-4`}>
              <Text style={tw`text-lg font-bold text-white`}>Subscription</Text>
              <Text style={tw`text-2xl text-cyan-400 font-mono mt-2`}>
                {currentPlan.product.name} - ${currentPlan.amount / 100} / {currentPlan.interval}
              </Text>
            </View>
          )}
        </View>
      )}
      <RecentActivity />
    </ScrollView>
  );
};

export default Dashboard;