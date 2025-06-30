import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Button from '@/components/Button';

const fetchItem = async (id: string) => {
  const { data } = await axios.get(`https://api.example.com/items/${id}`);
  return data;
};

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const {
    data: item,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['item', id],
    queryFn: () => fetchItem(id as string),
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details for Item {id}</Text>
      <Text>{item ? `Title: ${item.title}` : 'No item found'}</Text>
      <Link href={`/details/${id}/edit`} asChild>
        <Button title="Edit Item" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontFamily: 'Inter-Bold', marginBottom: 16 },
});
