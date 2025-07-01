import Icon from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import '../../../global.css';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarStyle: { backgroundColor: '#fff' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="messaging"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color }) => (
            <Icon name="messenger" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
