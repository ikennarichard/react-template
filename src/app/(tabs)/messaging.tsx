import { getComments } from '@/services/api';
import * as React from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Message {
  id: number;
  body: string;
  user: { username: string };
  sender: 'user' | 'creator';
}

const MessagingScreen = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const messageScale = useSharedValue(1);

  React.useEffect(() => {
    // Simulate fetching comments for a post (e.g., postId 1)
    getComments(1)
      .then((data) =>
        setMessages(
          data.map((comment: any, index: number) => ({
            id: comment.id,
            body: comment.body,
            user: { username: comment.user.username },
            sender: index % 2 === 0 ? 'user' : 'creator', // Alternate for simulation
          }))
        )
      )
      .catch(console.error);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(messageScale.value) }],
  }));

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          body: input,
          user: { username: 'You' },
          sender: 'user',
        },
      ]);
      setInput('');
      messageScale.value = 1.1;
      setTimeout(() => (messageScale.value = 1), 200);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <Animated.View
      style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.creatorMessage,
        animatedStyle,
      ]}
    >
      <Text style={styles.messageText}>
        <Text style={styles.username}>{item.user.username}: </Text>
        {item.body}
      </Text>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  messageList: { flex: 1 },
  messageContainer: { padding: 10, marginVertical: 5, borderRadius: 8 },
  userMessage: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
  creatorMessage: { backgroundColor: '#ECECEC', alignSelf: 'flex-start' },
  inputContainer: { flexDirection: 'row', padding: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  messageText: { fontSize: 14 },
  username: { fontWeight: 'bold' },
});

export default MessagingScreen;
