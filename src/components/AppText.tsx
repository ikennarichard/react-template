import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

interface TextProps {
  text: string;
  style?: StyleProp<TextStyle>;
}

export default function AppText({ text, style }: TextProps) {
  return <Text style={style}>{text}</Text>;
}
