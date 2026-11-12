import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Building, Plus, Check } from 'lucide-react-native';

export default function MobileAddPropertyScreen() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [locality, setLocality] = useState('');
  const [rent, setRent] = useState('35000');
  const [deposit, setDeposit] = useState('70000');

  const handleSubmit = () => {
    if (!title || !locality) {
      Alert.alert('Required Fields', 'Please enter listing title and locality');
      return;
    }
    Alert.alert('Listing Submitted', 'Your property listing has been created and verified!', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Post a Rental Listing</Text>
      <Text style={styles.subheading}>Direct owner or authorized agent post</Text>

      <View style={styles.formCard}>
        <Text style={styles.label}>Property Title *</Text>
        <TextInput
          placeholder="e.g. Sunny 2BHK near Sony World Signal"
          placeholderTextColor="#94a3b8"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <Text style={styles.label}>Locality / Area *</Text>
        <TextInput
          placeholder="e.g. Koramangala 4th Block"
          placeholderTextColor="#94a3b8"
          value={locality}
          onChangeText={setLocality}
          style={styles.input}
        />

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Monthly Rent (₹)</Text>
            <TextInput
              keyboardType="numeric"
              value={rent}
              onChangeText={setRent}
              style={styles.input}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Deposit (₹)</Text>
            <TextInput
              keyboardType="numeric"
              value={deposit}
              onChangeText={setDeposit}
              style={styles.input}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Publish Listing</Text>
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
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  subheading: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
    marginBottom: 20,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 12,
    height: 44,
    fontSize: 13,
    color: '#0f172a',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  submitBtn: {
    backgroundColor: '#4f46e5',
    borderRadius: 14,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
