import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ShieldCheck,
  Building,
  Sliders,
  PlusCircle,
  LogOut,
  ChevronRight,
  Sparkles,
  MapPin,
  Briefcase,
  UserCheck,
} from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();

  const [activeRole, setActiveRole] = useState<'seeker' | 'owner' | 'agent'>('seeker');
  const [allowsPets, setAllowsPets] = useState(true);

  const handleSwitchPersona = (roleName: 'seeker' | 'owner' | 'agent') => {
    setActiveRole(roleName);
    Alert.alert('Role Switched', `Active role is now set to: ${roleName.toUpperCase()}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Card */}
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
          }}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.nameText}>Aarav Sharma</Text>
            <ShieldCheck color="#10b981" size={16} />
          </View>
          <Text style={styles.roleSubtext}>Software Engineer • Bangalore</Text>
          <View style={styles.activePill}>
            <Text style={styles.activePillText}>
              {activeRole === 'seeker' ? 'Flatmate Seeker' : activeRole === 'owner' ? 'Property Owner' : 'RERA Agent'}
            </Text>
          </View>
        </View>
      </View>

      {/* Role Testing Quick Switcher */}
      <View style={styles.sectionCard}>
        <Text style={styles.cardHeaderTitle}>⚡ Demo Role Switcher</Text>
        <Text style={styles.cardHeaderSubtitle}>Test all Indian startup personas instantly</Text>

        <View style={styles.roleButtonRow}>
          <TouchableOpacity
            style={[styles.roleBtn, activeRole === 'seeker' && styles.roleBtnActive]}
            onPress={() => handleSwitchPersona('seeker')}
          >
            <Text style={[styles.roleBtnText, activeRole === 'seeker' && styles.roleBtnTextActive]}>
              Seeker
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleBtn, activeRole === 'owner' && styles.roleBtnActive]}
            onPress={() => handleSwitchPersona('owner')}
          >
            <Text style={[styles.roleBtnText, activeRole === 'owner' && styles.roleBtnTextActive]}>
              Owner
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleBtn, activeRole === 'agent' && styles.roleBtnActive]}
            onPress={() => handleSwitchPersona('agent')}
          >
            <Text style={[styles.roleBtnText, activeRole === 'agent' && styles.roleBtnTextActive]}>
              Agent
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Action Options */}
      <View style={styles.menuCard}>
        <TouchableOpacity
          style={styles.menuRow}
          onPress={() => router.push('/property/add')}
        >
          <View style={styles.menuIconBg}>
            <PlusCircle color="#4f46e5" size={18} />
          </View>
          <Text style={styles.menuLabel}>Post a Property Listing</Text>
          <ChevronRight color="#94a3b8" size={18} />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.menuRow}
          onPress={() => Alert.alert('Preferences', 'Lifestyle matching calibrated: Koramangala, ₹18k-₹30k, Night Owl, Cleanliness 4/5')}
        >
          <View style={styles.menuIconBg}>
            <Sliders color="#4f46e5" size={18} />
          </View>
          <Text style={styles.menuLabel}>Lifestyle Preferences</Text>
          <ChevronRight color="#94a3b8" size={18} />
        </TouchableOpacity>

        <View style={styles.divider} />

        <View style={styles.menuRow}>
          <View style={styles.menuIconBg}>
            <ShieldCheck color="#10b981" size={18} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuLabel}>Government ID Verification</Text>
            <Text style={styles.menuSublabel}>Aadhaar &amp; PAN verified</Text>
          </View>
          <Text style={styles.verifiedGreen}>VERIFIED</Text>
        </View>
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => router.push('/auth/login')}
      >
        <LogOut color="#f43f5e" size={16} />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
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
    gap: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  profileInfo: {
    marginLeft: 14,
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  roleSubtext: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  activePill: {
    backgroundColor: '#eef2ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  activePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4f46e5',
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardHeaderTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
  },
  cardHeaderSubtitle: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
    marginBottom: 12,
  },
  roleButtonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  roleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  roleBtnActive: {
    backgroundColor: '#0f172a',
  },
  roleBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  roleBtnTextActive: {
    color: '#ffffff',
  },
  menuCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuIconBg: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
    flex: 1,
  },
  menuSublabel: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  verifiedGreen: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginHorizontal: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#fff1f2',
    gap: 8,
  },
  logoutText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#e11d48',
  },
});
