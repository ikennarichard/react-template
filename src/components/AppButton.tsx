import type { PressableProps } from 'react-native';
import { Pressable, StyleSheet, Text } from 'react-native';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

export default function AppButton({
  title,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <Pressable
      style={[
        styles.base,
        variant === 'primary' ? styles.primary : styles.secondary,
      ]}
      {...props}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { padding: 12, borderRadius: 8, alignItems: 'center' },
  primary: { backgroundColor: '#007AFF' },
  secondary: { backgroundColor: '#6B7280' },
  text: { color: '#fff', fontSize: 16, fontFamily: 'Inter-Bold' },
});
