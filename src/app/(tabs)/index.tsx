import Button from '@/components/Button';
import { useUser } from '@/services/api';
import { Link, router } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const { data: user, isLoading } = useUser('1');

  const data = [
    { id: '1', title: 'Task 1' },
    { id: '2', title: 'Task 2' },
  ];

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Text style={styles.title}>Welcome, {user?.name || 'Guest'}!</Text>
      )}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/details/${item.id}`} asChild>
            <Text style={styles.item}>{item.title}</Text>
          </Link>
        )}
      />
      <Button title="Go to Drawer" onPress={() => router.push('/(drawer)')} />
      <Link href="/modal" style={styles.link}>
        Open modal
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  item: {
    padding: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  link: {
    paddingTop: 20,
    fontSize: 20,
  },
});
