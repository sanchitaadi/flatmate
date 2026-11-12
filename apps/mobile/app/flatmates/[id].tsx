import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ShieldCheck,
  MapPin,
  Briefcase,
  Sparkles,
  Heart,
  MessageSquare,
} from 'lucide-react-native';

export default function FlatmateDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600',
        }}
        style={styles.avatar}
      />

      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.nameText}>Priya Patel, 25</Text>
          <View style={styles.matchPill}>
            <Text style={styles.matchText}>91% Match</Text>
          </View>
        </View>

        <Text style={styles.metaText}>Product Designer • Koramangala, Bangalore</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Priya</Text>
          <Text style={styles.bodyText}>
            Passionate about minimalism, indoor plants, and clean aesthetics. Work from home in UX design. Non-smoker, vegetarian, and early riser.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compatibility Breakdown</Text>
          <View style={styles.chipGrid}>
            <Text style={styles.chip}>💰 Budget: ₹17,000 - ₹28,000</Text>
            <Text style={styles.chip}>🧹 Cleanliness: 5/5</Text>
            <Text style={styles.chip}>🌙 Sleep: Night Owl</Text>
            <Text style={styles.chip}>🥗 Diet: Vegetarian</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.connectBtn}
          onPress={() => {
            Alert.alert('Mutual Like!', 'You connected with Priya! Opening chat...');
            router.push('/messages/a0000000-0000-0000-0000-000000000002');
          }}
        >
          <Heart color="#ffffff" size={18} fill="#ffffff" />
          <Text style={styles.connectBtnText}>Like &amp; Message Priya</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    paddingBottom: 40,
  },
  avatar: {
    width: '100%',
    height: 280,
  },
  card: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  matchPill: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },
  matchText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#047857',
  },
  metaText: {
    fontSize: 13,
    color: '#64748b',
  },
  section: {
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 6,
  },
  bodyText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    fontSize: 12,
    color: '#334155',
  },
  connectBtn: {
    flexDirection: 'row',
    backgroundColor: '#4f46e5',
    borderRadius: 16,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 10,
  },
  connectBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
