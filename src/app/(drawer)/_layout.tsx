import Icon from '@expo/vector-icons/MaterialIcons';
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: '#007AFF',
        drawerStyle: { backgroundColor: '#fff' },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: 'Drawer Home',
          drawerIcon: ({ color }) => (
            <Icon name="dashboard" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          title: 'About',
          drawerIcon: ({ color }) => (
            <Icon name="info" size={24} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
