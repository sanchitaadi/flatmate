import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Search,
  MapPin,
  ShieldCheck,
  Bed,
  Bath,
  SlidersHorizontal,
} from 'lucide-react-native';

const PROPERTIES = [
  {
    id: 'b0000000-0000-0000-0000-000000000001',
    title: 'Luxurious 3BHK with Panoramic Balcony',
    locality: 'HSR Layout',
    city: 'Bangalore',
    rent: 52000,
    deposit: 150000,
    bedrooms: 3,
    bathrooms: 3,
    category: 'Entire Flat',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600',
    verified: true,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000002',
    title: 'Sunlit Private Master Bedroom',
    locality: 'Koramangala 4th Block',
    city: 'Bangalore',
    rent: 21000,
    deposit: 50000,
    bedrooms: 1,
    bathrooms: 1,
    category: 'Private Room',
    imageUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600',
    verified: true,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000003',
    title: 'Chic Sea-Facing 2BHK on Carter Road',
    locality: 'Bandra West',
    city: 'Mumbai',
    rent: 95000,
    deposit: 250000,
    bedrooms: 2,
    bathrooms: 2,
    category: 'Entire Apartment',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
    verified: true,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000004',
    title: 'Modern Techie Flatmate Vacancy',
    locality: 'Gachibowli',
    city: 'Hyderabad',
    rent: 18500,
    deposit: 40000,
    bedrooms: 1,
    bathrooms: 1,
    category: 'Flatmate Vacancy',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600',
    verified: true,
  },
];

export default function ExploreScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Entire Flat', 'Private Room', 'Flatmate Vacancy', 'PG'];

  const filtered = PROPERTIES.filter((p) => {
    if (activeCategory !== 'All' && p.category !== activeCategory) return false;
    if (searchQuery && !p.locality.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Search color="#94a3b8" size={18} />
          <TextInput
            placeholder="Search locality, city (e.g. Koramangala)"
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* Category Horizontal Filter */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={[
                styles.categoryChip,
                activeCategory === cat && styles.categoryChipActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  activeCategory === cat && styles.categoryChipTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Property List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/property/${item.id}`)}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
            <View style={styles.cardBody}>
              <View style={styles.rowBetween}>
                <Text style={styles.priceText}>₹{item.rent.toLocaleString('en-IN')} / mo</Text>
                {item.verified && (
                  <View style={styles.verifiedTag}>
                    <ShieldCheck color="#059669" size={12} />
                    <Text style={styles.verifiedTagText}>Verified</Text>
                  </View>
                )}
              </View>

              <Text style={styles.titleText} numberOfLines={1}>
                {item.title}
              </Text>

              <View style={styles.localityRow}>
                <MapPin color="#6366f1" size={12} />
                <Text style={styles.localityText}>
                  {item.locality}, {item.city}
                </Text>
              </View>

              <View style={styles.specsRow}>
                <View style={styles.specItem}>
                  <Bed color="#64748b" size={14} />
                  <Text style={styles.specText}>{item.bedrooms} BHK</Text>
                </View>
                <View style={styles.specItem}>
                  <Bath color="#64748b" size={14} />
                  <Text style={styles.specText}>{item.bathrooms} Bath</Text>
                </View>
                <Text style={styles.depositText}>
                  Deposit: ₹{item.deposit.toLocaleString('en-IN')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
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
  searchRow: {
    padding: 16,
    paddingBottom: 8,
    backgroundColor: '#ffffff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    color: '#0f172a',
  },
  categoryContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  categoryScroll: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    marginRight: 6,
  },
  categoryChipActive: {
    backgroundColor: '#0f172a',
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  categoryChipTextActive: {
    color: '#ffffff',
  },
  listContent: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardBody: {
    padding: 14,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 4,
  },
  verifiedTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  localityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 10,
  },
  localityText: {
    fontSize: 12,
    color: '#64748b',
  },
  specsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    gap: 14,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  specText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  depositText: {
    fontSize: 11,
    color: '#94a3b8',
    marginLeft: 'auto',
  },
});
