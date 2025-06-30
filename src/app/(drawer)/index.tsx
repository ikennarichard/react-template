import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import Button from '@/components/Button';

export default function DrawerHomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drawer Home</Text>
      <Link href="/(tabs)" asChild>
        <Button title="Go to Tabs" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontFamily: 'Inter-Bold', marginBottom: 16 },
});
