import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText';
import { getCreator } from '@/services/api';
import { useAppStore } from '@/store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type Creator = {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  gender: string;
  company: {
    name: string;
  };
};

export default function HomeScreen() {
  const router = useRouter();
  const { creatorId = '1' } = useLocalSearchParams();
  const [creator, setCreator] = useState<Creator | null>(null);
  const { followedCreators, toggleFollow } = useAppStore();
  const isFollowing = useSharedValue(
    followedCreators.includes(Number(creatorId)) ? 1 : 0
  );

  // Effects
  useEffect(() => {
    getCreator(Number(creatorId)).then(setCreator).catch(console.error);
  }, [creatorId]);

  useEffect(() => {
    isFollowing.value = followedCreators.includes(Number(creatorId)) ? 1 : 0;
  }, [followedCreators, creatorId]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(isFollowing.value ? 1.2 : 1) }],
    backgroundColor: isFollowing.value ? '#4caf50' : '#2196f3',
  }));

  if (!creator) return <AppText text="Loading..." />;

  const getImage = () =>
    `https://randomuser.me/api/portraits/${creator.gender === 'male' ? 'men' : 'women'}/10.jpg`;

  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={{
          uri: getImage(),
        }}
        resizeMode="contain"
      />
      <Text
        style={styles.bio}
      >{`${creator.firstName} ${creator.lastName}`}</Text>
      <AppText style={styles.bio} text={`Company: ${creator.company.name}`} />
      <Text style={styles.bio}>{creator.email}</Text>
      <Animated.View style={[styles.followButton, animatedStyle]}>
        <AppButton
          title={isFollowing.value ? 'Unfollow' : 'Follow'}
          onPress={() => toggleFollow(Number(creatorId))}
        />
      </Animated.View>
      <View className="flex-row gap-3">
        <AppButton
          title="View Posts"
          onPress={() => router.push(`/posts/${creatorId}`)}
        />
        <AppButton
          title="Messages"
          onPress={() => router.push('/(tabs)/messaging')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  bio: {
    fontSize: 12,
    marginBottom: 10,
  },
  followButton: {
    borderRadius: 8,
    marginBottom: 20,
  },
});
