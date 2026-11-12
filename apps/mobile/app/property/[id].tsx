import React, { useState } from 'react';
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
  MapPin,
  Bed,
  Bath,
  ShieldCheck,
  Calendar,
  Sparkles,
  Phone,
  MessageSquare,
  Lock,
} from 'lucide-react-native';

export default function PropertyDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [isSaved, setIsSaved] = useState(false);

  const handleSendEnquiry = () => {
    Alert.alert(
      'Schedule Visit Enquiry',
      'Your request has been submitted to the property owner. You will receive an in-app confirmation once accepted.',
      [
        { text: 'OK' },
        { text: 'Chat Now', onPress: () => router.push('/messages/a0000000-0000-0000-0000-000000000007') },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Property Cover Image */}
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        }}
        style={styles.coverImage}
      />

      {/* Main Info Card */}
      <View style={styles.infoCard}>
        <View style={styles.topRow}>
          <View style={styles.categoryPill}>
            <Text style={styles.categoryText}>Entire Flat</Text>
          </View>
          <View style={styles.verifiedPill}>
            <ShieldCheck color="#059669" size={14} />
            <Text style={styles.verifiedText}>Verified Owner</Text>
          </View>
        </View>

        <Text style={styles.titleText}>
          Luxurious 3BHK with Panoramic Balcony
        </Text>

        <View style={styles.localityRow}>
          <MapPin color="#4f46e5" size={14} />
          <Text style={styles.localityText}>HSR Layout Sector 2, Bangalore</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>₹52,000</Text>
          <Text style={styles.monthText}>/ month</Text>
          <Text style={styles.depositText}>• Deposit: ₹1,50,000</Text>
        </View>

        {/* Specs Grid */}
        <View style={styles.specsGrid}>
          <View style={styles.specBox}>
            <Bed color="#4f46e5" size={18} />
            <Text style={styles.specVal}>3 BHK</Text>
            <Text style={styles.specLbl}>Bedrooms</Text>
          </View>
          <View style={styles.specBox}>
            <Bath color="#4f46e5" size={18} />
            <Text style={styles.specVal}>3 Bath</Text>
            <Text style={styles.specLbl}>Bathrooms</Text>
          </View>
          <View style={styles.specBox}>
            <Sparkles color="#4f46e5" size={18} />
            <Text style={styles.specVal}>Furnished</Text>
            <Text style={styles.specLbl}>Fully Furnished</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>About this Space</Text>
          <Text style={styles.descText}>
            High-floor apartment located in a premier gated community with Italian marble flooring, modular kitchen with chimney, 100% DG power backup, clubhouse access and swimming pool.
          </Text>
        </View>

        {/* Privacy Note */}
        <View style={styles.privacyBox}>
          <Lock color="#d97706" size={16} />
          <Text style={styles.privacyText}>
            Exact building door number is protected until visit confirmation with owner.
          </Text>
        </View>
      </View>

      {/* Booking CTA Bar */}
      <View style={styles.ctaRow}>
        <TouchableOpacity
          style={styles.chatIconBtn}
          onPress={() => router.push('/messages/a0000000-0000-0000-0000-000000000007')}
        >
          <MessageSquare color="#0f172a" size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bookBtn} onPress={handleSendEnquiry}>
          <Text style={styles.bookBtnText}>Send Visit Enquiry</Text>
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
  coverImage: {
    width: '100%',
    height: 260,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryPill: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  verifiedText: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '700',
  },
  titleText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  localityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 14,
  },
  localityText: {
    fontSize: 13,
    color: '#64748b',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    gap: 4,
  },
  priceText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
  },
  monthText: {
    fontSize: 13,
    color: '#64748b',
  },
  depositText: {
    fontSize: 12,
    color: '#94a3b8',
    marginLeft: 6,
  },
  specsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 18,
    gap: 10,
  },
  specBox: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  specVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 4,
  },
  specLbl: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
  },
  sectionBlock: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 6,
  },
  descText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },
  privacyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbeb',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#fde68a',
    marginTop: 10,
    gap: 8,
  },
  privacyText: {
    fontSize: 11,
    color: '#92400e',
    flex: 1,
    lineHeight: 15,
  },
  ctaRow: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  chatIconBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  bookBtn: {
    flex: 1,
    backgroundColor: '#4f46e5',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },
  bookBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
});
