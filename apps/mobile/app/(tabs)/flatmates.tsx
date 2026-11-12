import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Heart,
  X,
  Star,
  ShieldCheck,
  MapPin,
  Briefcase,
  Sparkles,
} from 'lucide-react-native';

const CANDIDATES = [
  {
    id: 'a0000000-0000-0000-0000-000000000002',
    name: 'Priya Patel',
    age: 25,
    occupation: 'Product Designer',
    city: 'Bangalore',
    locality: 'Koramangala',
    budget: '₹17k - ₹28k',
    cleanliness: '5/5',
    diet: 'Vegetarian',
    sleep: 'Night Owl',
    compatibility: 91,
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600',
    bio: 'Product Designer passionate about minimalism and indoor plants. Looking for a peaceful, clean home.',
  },
  {
    id: 'a0000000-0000-0000-0000-000000000006',
    name: 'Neha Reddy',
    age: 24,
    occupation: 'AI Research Scientist',
    city: 'Hyderabad',
    locality: 'Gachibowli',
    budget: '₹16k - ₹26k',
    cleanliness: '4/5',
    diet: 'Eggetarian',
    sleep: 'Night Owl',
    compatibility: 86,
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600',
    bio: 'AI researcher at HITEC City. Friendly indie cat owner, quiet weekdays, fun weekends.',
  },
  {
    id: 'a0000000-0000-0000-0000-000000000004',
    name: 'Ananya Iyer',
    age: 27,
    occupation: 'Content Strategist',
    city: 'Bangalore',
    locality: 'Indiranagar',
    budget: '₹15k - ₹25k',
    cleanliness: '5/5',
    diet: 'Vegetarian',
    sleep: 'Early Bird',
    compatibility: 84,
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600',
    bio: 'Podcaster & yogi. Early riser who loves a clean and peaceful living space.',
  },
];

export default function FlatmatesScreen() {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const candidate = CANDIDATES[index];

  const handleSwipe = (direction: 'pass' | 'like') => {
    if (direction === 'like') {
      Alert.alert(
        "It's a Match! 🎉",
        `You and ${candidate.name} both liked each other with a ${candidate.compatibility}% compatibility score!`,
        [
          { text: 'Keep Swiping', style: 'cancel' },
          {
            text: 'Send Message',
            onPress: () => router.push(`/messages/${candidate.id}`),
          },
        ]
      );
    }
    setIndex((prev) => (prev + 1) % CANDIDATES.length);
  };

  return (
    <View style={styles.container}>
      {/* Top Header Badge */}
      <View style={styles.headerBar}>
        <View style={styles.compatibilityPill}>
          <Sparkles color="#4f46e5" size={14} />
          <Text style={styles.compatibilityText}>
            {candidate.compatibility}% Compatibility Match
          </Text>
        </View>

        <TouchableOpacity onPress={() => router.push(`/flatmates/${candidate.id}`)}>
          <Text style={styles.inspectText}>Full Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Main Swipe Card */}
      <View style={styles.card}>
        <Image source={{ uri: candidate.imageUrl }} style={styles.cardImage} />

        {/* Gradient Info Bottom */}
        <View style={styles.cardOverlay}>
          <View style={styles.nameRow}>
            <Text style={styles.nameText}>
              {candidate.name}, {candidate.age}
            </Text>
            <ShieldCheck color="#10b981" size={18} />
          </View>

          <View style={styles.infoRow}>
            <Briefcase color="#cbd5e1" size={13} />
            <Text style={styles.infoText}>{candidate.occupation}</Text>
            <Text style={styles.dotText}>•</Text>
            <MapPin color="#cbd5e1" size={13} />
            <Text style={styles.infoText}>{candidate.locality}, {candidate.city}</Text>
          </View>

          <Text style={styles.bioText} numberOfLines={2}>
            &ldquo;{candidate.bio}&rdquo;
          </Text>

          {/* Lifestyle Pills */}
          <View style={styles.tagRow}>
            <Text style={styles.tag}>💰 {candidate.budget}</Text>
            <Text style={styles.tag}>🧹 Clean {candidate.cleanliness}</Text>
            <Text style={styles.tag}>🌙 {candidate.sleep}</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.actionButton, styles.passButton]}
          onPress={() => handleSwipe('pass')}
        >
          <X color="#f43f5e" size={28} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.superlikeButton]}
          onPress={() => handleSwipe('like')}
        >
          <Star color="#0284c7" size={22} fill="#0284c7" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.likeButton]}
          onPress={() => handleSwipe('like')}
        >
          <Heart color="#ffffff" size={30} fill="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
    justifyContent: 'space-between',
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  compatibilityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
    borderWidth: 1,
    borderColor: '#c7d2fe',
  },
  compatibilityText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3730a3',
  },
  inspectText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4f46e5',
  },
  card: {
    flex: 1,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#0f172a',
    position: 'relative',
    maxHeight: 520,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nameText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  dotText: {
    color: '#cbd5e1',
  },
  bioText: {
    fontSize: 12,
    color: '#e2e8f0',
    fontStyle: 'italic',
    marginTop: 8,
    lineHeight: 16,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    color: '#ffffff',
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 12,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  passButton: {
    borderWidth: 1,
    borderColor: '#fecdd3',
  },
  superlikeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  likeButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#10b981',
  },
});
