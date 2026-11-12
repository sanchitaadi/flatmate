import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Send, Phone, ShieldCheck, Sparkles } from 'lucide-react-native';

const INITIAL_MESSAGES = [
  {
    id: 'm1',
    sender: 'system',
    text: 'Congratulations! You matched with Priya on NestMate. Say hello to kick off your flat hunt!',
    time: '2:15 PM',
  },
  {
    id: 'm2',
    sender: 'other',
    text: 'Hey Aarav! Saw that you are looking in Koramangala. Have you visited any 2BHKs?',
    time: '2:18 PM',
  },
  {
    id: 'm3',
    sender: 'me',
    text: 'Hey Priya! Yes, I checked a place in 4th block near 80 Feet Road. Looked great and within budget!',
    time: '2:20 PM',
  },
];

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [contactRequested, setContactRequested] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      text: input.trim(),
      time: 'Just now',
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
  };

  const handleRequestPhone = () => {
    setContactRequested(true);
    Alert.alert('Phone Number Request Sent', 'Once Priya approves, contact digits will be unlocked securely.');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Contact Sharing Notice */}
      <View style={styles.phoneBanner}>
        <View style={{ flex: 1 }}>
          <Text style={styles.phoneBannerTitle}>Private Phone Shield Active</Text>
          <Text style={styles.phoneBannerDesc}>Mutual consent required to share contacts</Text>
        </View>

        <TouchableOpacity
          style={[styles.phoneBtn, contactRequested && styles.phoneBtnDisabled]}
          onPress={handleRequestPhone}
          disabled={contactRequested}
        >
          <Phone color={contactRequested ? '#94a3b8' : '#4f46e5'} size={14} />
          <Text style={[styles.phoneBtnText, contactRequested && { color: '#94a3b8' }]}>
            {contactRequested ? 'Requested' : 'Request Phone'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Messages Stream */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        renderItem={({ item }) => {
          if (item.sender === 'system') {
            return (
              <View style={styles.systemBubble}>
                <Sparkles color="#4f46e5" size={14} />
                <Text style={styles.systemText}>{item.text}</Text>
              </View>
            );
          }

          const isMe = item.sender === 'me';
          return (
            <View style={[styles.bubbleWrapper, isMe ? styles.myWrapper : styles.otherWrapper]}>
              <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
                <Text style={[styles.messageText, isMe ? styles.myText : styles.otherText]}>
                  {item.text}
                </Text>
              </View>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          );
        }}
      />

      {/* Input Bar */}
      <View style={styles.inputBar}>
        <TextInput
          placeholder="Type a message..."
          placeholderTextColor="#94a3b8"
          value={input}
          onChangeText={setInput}
          style={styles.inputField}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Send color="#ffffff" size={16} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  phoneBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#c7d2fe',
  },
  phoneBannerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#312e81',
  },
  phoneBannerDesc: {
    fontSize: 10,
    color: '#4338ca',
  },
  phoneBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c7d2fe',
    gap: 4,
  },
  phoneBtnDisabled: {
    backgroundColor: '#f1f5f9',
    borderColor: '#e2e8f0',
  },
  phoneBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4f46e5',
  },
  messageList: {
    padding: 16,
    gap: 12,
  },
  systemBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    padding: 12,
    borderRadius: 14,
    gap: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#c7d2fe',
  },
  systemText: {
    fontSize: 11,
    color: '#3730a3',
    flex: 1,
    lineHeight: 16,
  },
  bubbleWrapper: {
    marginBottom: 8,
  },
  myWrapper: {
    alignItems: 'flex-end',
  },
  otherWrapper: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  myBubble: {
    backgroundColor: '#4f46e5',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 13,
    lineHeight: 18,
  },
  myText: {
    color: '#ffffff',
  },
  otherText: {
    color: '#0f172a',
  },
  timeText: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 3,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    gap: 8,
  },
  inputField: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 44,
    fontSize: 13,
    color: '#0f172a',
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
