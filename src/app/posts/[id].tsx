import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useLocalSearchParams } from 'expo-router';
import { getPosts } from '../../services/api';

interface Post {
  id: number;
  title: string;
  body: string;
  image: string;
}

const PostsScreen = () => {
  const { creatorId } = useLocalSearchParams();
  const [posts, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    getPosts(Number(creatorId))
      .then((data) =>
        setPosts(
          data.map((post: any) => ({
            id: post.id,
            title: post.title,
            body: post.body,
            image: `https://cdn.dummyjson.com/recipe-images/${post.id}.webp`,
          }))
        )
      )
      .catch(console.error);
  }, [creatorId]);

  const renderItem = React.useCallback(
    ({ item }: { item: Post }) => (
      <View style={styles.postContainer}>
        <FastImage style={styles.postImage} source={{ uri: item.image }} />
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postBody}>{item.body}</Text>
      </View>
    ),
    []
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      getItemLayout={(data, index) => ({
        // get item layout
        length: 320,
        offset: 320 * index,
        index,
      })}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
    />
  );
};

const styles = StyleSheet.create({
  postContainer: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  postImage: { width: '100%', height: 200, borderRadius: 8 },
  postTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  postBody: { fontSize: 14, marginTop: 5 },
});

export default PostsScreen;
