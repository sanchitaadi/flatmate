import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Search,
  Users,
  Home as HomeIcon,
  ShieldCheck,
  Sparkles,
  MapPin,
  Heart,
  ChevronRight,
} from 'lucide-react-native';

const CITIES = ['Bangalore', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad'];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState('Bangalore');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero Banner */}
      <View style={styles.heroCard}>
        <View style={styles.badge}>
          <Sparkles color="#f59e0b" size={14} />
          <Text style={styles.badgeText}>Find Your People. Share Your Space.</Text>
        </View>

        <Text style={styles.heroTitle}>
          India&apos;s Verified Co-Living &amp; Rental Platform
        </Text>
        <Text style={styles.heroSubtitle}>
          Match with compatible flatmates through transparent lifestyle matching or rent verified apartments across India.
        </Text>

        {/* Quick Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.primaryButton, { flex: 1 }]}
            onPress={() => router.push('/(tabs)/flatmates')}
          >
            <Users color="#ffffff" size={16} />
            <Text style={styles.buttonText}>Find Flatmates</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, { flex: 1 }]}
            onPress={() => router.push('/(tabs)/explore')}
          >
            <HomeIcon color="#0f172a" size={16} />
            <Text style={styles.secondaryButtonText}>Rent a Flat</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Top Tech Cities Carousel */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Explore by City</Text>
        <Text style={styles.sectionSubtitle}>Top hubs for tech &amp; creative talent</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cityScroll}>
        {CITIES.map((city) => (
          <TouchableOpacity
            key={city}
            onPress={() => setSelectedCity(city)}
            style={[
              styles.cityChip,
              selectedCity === city && styles.cityChipActive,
            ]}
          >
            <MapPin
              color={selectedCity === city ? '#ffffff' : '#64748b'}
              size={14}
            />
            <Text
              style={[
                styles.cityChipText,
                selectedCity === city && styles.cityChipTextActive,
              ]}
            >
              {city}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Featured Spaces Header */}
      <View style={styles.sectionHeader}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.sectionTitle}>Featured Spaces in {selectedCity}</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sample Mobile Card */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/property/b0000000-0000-0000-0000-000000000001')}
      >
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600',
          }}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <View style={styles.priceRow}>
            <Text style={styles.cardPrice}>₹52,000 / mo</Text>
            <View style={styles.verifiedPill}>
              <ShieldCheck color="#059669" size={12} />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>
          <Text style={styles.cardTitle} numberOfLines={1}>
            Luxurious 3BHK with Panoramic Balcony
          </Text>
          <Text style={styles.cardLocality}>HSR Layout Sector 2, Bangalore</Text>
        </View>
      </TouchableOpacity>

      {/* Trust & Safety Banner */}
      <View style={styles.trustBanner}>
        <ShieldCheck color="#4f46e5" size={24} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.trustTitle}>100% ID Verified &amp; Privacy Shield</Text>
          <Text style={styles.trustDesc}>
            Private phone numbers and residential addresses are safeguarded until explicit mutual approval.
          </Text>
        </View>
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
    padding: 16,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400e',
    marginLeft: 6,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    borderRadius: 14,
    gap: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 12,
    borderRadius: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  secondaryButtonText: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '700',
  },
  sectionHeader: {
    marginTop: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4f46e5',
  },
  cityScroll: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  cityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: 8,
    gap: 6,
  },
  cityChipActive: {
    backgroundColor: '#0f172a',
    borderColor: '#0f172a',
  },
  cityChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  cityChipTextActive: {
    color: '#ffffff',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 14,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    gap: 4,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#047857',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  cardLocality: {
    fontSize: 12,
    color: '#64748b',
  },
  trustBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#c7d2fe',
    marginTop: 10,
  },
  trustTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#312e81',
  },
  trustDesc: {
    fontSize: 11,
    color: '#4338ca',
    marginTop: 2,
    lineHeight: 16,
  },
});
