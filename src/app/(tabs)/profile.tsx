import Button from '@/components/Button';
import { useAppStore } from '@/store';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const { user, setUser } = useAppStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>{user ? `Name: ${user.name}` : 'Not logged in'}</Text>
      <Button
        title="Logout"
        onPress={() => setUser(null)}
        variant="secondary"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontFamily: 'Inter-Bold', marginBottom: 16 },
});
