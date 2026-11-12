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
import { Heart, MessageSquare, ShieldCheck } from 'lucide-react-native';

const MATCHES = [
  {
    id: 'm1',
    userId: 'a0000000-0000-0000-0000-000000000002',
    name: 'Priya Patel',
    occupation: 'Product Designer',
    city: 'Bangalore',
    locality: 'Koramangala',
    compatibility: 91,
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300',
    bio: 'Product Designer passionate about minimalism. Looking for a neat and peaceful home.',
  },
];

export default function MatchesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={MATCHES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Mutual Matches</Text>
            <Text style={styles.headerSubtitle}>
              Flatmate seekers who also liked your profile
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
              <View style={styles.nameBlock}>
                <View style={styles.nameRow}>
                  <Text style={styles.nameText}>{item.name}</Text>
                  <ShieldCheck color="#10b981" size={14} />
                </View>
                <Text style={styles.metaText}>
                  {item.occupation} • {item.locality}
                </Text>
              </View>

              <View style={styles.scoreBadge}>
                <Text style={styles.scoreText}>{item.compatibility}% Match</Text>
              </View>
            </View>

            <Text style={styles.bioText} numberOfLines={2}>
              {item.bio}
            </Text>

            <View style={styles.cardFooter}>
              <TouchableOpacity
                style={styles.chatButton}
                onPress={() => router.push(`/messages/${item.userId}`)}
              >
                <MessageSquare color="#ffffff" size={16} />
                <Text style={styles.chatButtonText}>Start Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  listContent: {
    padding: 16,
    gap: 16,
  },
  header: {
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 16,
  },
  nameBlock: {
    flex: 1,
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  nameText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  metaText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  scoreBadge: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },
  scoreText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#047857',
  },
  bioText: {
    fontSize: 12,
    color: '#475569',
    marginTop: 12,
    lineHeight: 18,
  },
  cardFooter: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4f46e5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  chatButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
});
