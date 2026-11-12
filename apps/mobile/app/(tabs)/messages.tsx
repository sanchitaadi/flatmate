import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MessageSquare, ShieldCheck } from 'lucide-react-native';

const CONVERSATIONS = [
  {
    id: 'c1',
    participantId: 'a0000000-0000-0000-0000-000000000002',
    name: 'Priya Patel',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300',
    lastMessage: 'Hey Aarav! Have you shortlisted any 2BHKs in Koramangala?',
    time: '4:30 PM',
    unread: true,
    type: 'Mutual Match',
  },
  {
    id: 'c2',
    participantId: 'a0000000-0000-0000-0000-000000000007',
    name: 'Rajesh Malhotra',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
    lastMessage: 'Sure, you can visit the flat on Saturday around 11 AM.',
    time: 'Yesterday',
    unread: false,
    type: 'Property Owner',
  },
];

export default function MessagesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={CONVERSATIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatRow}
            onPress={() => router.push(`/messages/${item.participantId}`)}
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />

            <View style={styles.textBlock}>
              <View style={styles.rowBetween}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>

              <Text style={styles.lastMessageText} numberOfLines={1}>
                {item.lastMessage}
              </Text>

              <View style={styles.pillRow}>
                <View style={styles.pill}>
                  <Text style={styles.pillText}>{item.type}</Text>
                </View>
              </View>
            </View>

            {item.unread && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  list: {
    paddingVertical: 8,
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  textBlock: {
    flex: 1,
    marginLeft: 14,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  timeText: {
    fontSize: 11,
    color: '#94a3b8',
  },
  lastMessageText: {
    fontSize: 13,
    color: '#64748b',
  },
  pillRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  pill: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  pillText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#475569',
  },
  unreadDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#4f46e5',
    marginLeft: 8,
  },
});
