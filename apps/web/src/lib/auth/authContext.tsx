'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Profile,
  UserRole,
  FlatmatePreferences,
  Property,
  Match,
  Conversation,
  Message,
  Enquiry,
  calculateFlatmateCompatibility,
} from '@flatmate/shared';
import {
  INITIAL_PROFILES,
  INITIAL_PREFERENCES,
  INITIAL_PROPERTIES,
  INITIAL_MATCHES,
  INITIAL_CONVERSATIONS,
  INITIAL_MESSAGES,
  INITIAL_ENQUIRIES,
} from '../supabase/mockData';

interface AuthContextType {
  currentUser: Profile | null;
  currentPreferences: FlatmatePreferences | null;
  isAuthenticated: boolean;
  activeRole: UserRole;
  allProfiles: Profile[];
  properties: Property[];
  matches: Match[];
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  enquiries: Enquiry[];
  savedPropertyIds: string[];
  swipedUserIds: Set<string>;
  setActiveRole: (role: UserRole) => void;
  switchPersona: (userId: string) => void;
  login: (email: string) => Promise<void>;
  signup: (userData: Partial<Profile> & { email: string; role: UserRole }) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<Profile>) => void;
  updatePreferences: (prefs: Partial<FlatmatePreferences>) => void;
  toggleSaveProperty: (propertyId: string) => void;
  recordSwipe: (targetUserId: string, direction: 'left' | 'right' | 'superlike') => { isMatch: boolean; match?: Match };
  addProperty: (property: Property) => void;
  updateProperty: (propertyId: string, updates: Partial<Property>) => void;
  sendEnquiry: (enquiry: Omit<Enquiry, 'id' | 'created_at' | 'updated_at'>) => void;
  updateEnquiryStatus: (enquiryId: string, status: Enquiry['status']) => void;
  sendMessage: (conversationId: string, content: string) => void;
  getOrCreateConversation: (otherUserId: string, propertyId?: string) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default logged in user is Aarav Sharma (Flatmate Seeker) for instant exploration
  const [currentUser, setCurrentUser] = useState<Profile | null>(INITIAL_PROFILES[0]);
  const [activeRole, setActiveRoleState] = useState<UserRole>('flatmate_seeker');
  const [allProfiles, setAllProfiles] = useState<Profile[]>(INITIAL_PROFILES);
  const [preferences, setPreferences] = useState<Record<string, FlatmatePreferences>>(INITIAL_PREFERENCES);
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [messages, setMessages] = useState<Record<string, Message[]>>(INITIAL_MESSAGES);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(INITIAL_ENQUIRIES);
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(['b0000000-0000-0000-0000-000000000002']);
  const [swipedUserIds, setSwipedUserIds] = useState<Set<string>>(new Set());

  const currentPreferences = currentUser ? preferences[currentUser.id] || null : null;

  const setActiveRole = (role: UserRole) => {
    setActiveRoleState(role);
    if (currentUser) {
      setCurrentUser({ ...currentUser, active_role: role });
    }
  };

  const switchPersona = (userId: string) => {
    const found = allProfiles.find((p) => p.id === userId);
    if (found) {
      setCurrentUser(found);
      setActiveRoleState(found.active_role);
    }
  };

  const login = async (email: string) => {
    const found = allProfiles.find((p) => p.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      setActiveRoleState(found.active_role);
    } else {
      // Create new profile dynamically
      const newProfile: Profile = {
        id: `u-${Date.now()}`,
        email,
        full_name: email.split('@')[0],
        city: 'Bangalore',
        state: 'Karnataka',
        is_verified: false,
        is_suspended: false,
        active_role: 'flatmate_seeker',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setAllProfiles((prev) => [...prev, newProfile]);
      setCurrentUser(newProfile);
      setActiveRoleState(newProfile.active_role);
    }
  };

  const signup = async (userData: Partial<Profile> & { email: string; role: UserRole }) => {
    const newProfile: Profile = {
      id: `u-${Date.now()}`,
      email: userData.email,
      full_name: userData.full_name || userData.email.split('@')[0],
      city: userData.city || 'Bangalore',
      state: userData.state || 'Karnataka',
      is_verified: false,
      is_suspended: false,
      active_role: userData.role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setAllProfiles((prev) => [...prev, newProfile]);
    setCurrentUser(newProfile);
    setActiveRoleState(userData.role);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updates: Partial<Profile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates, updated_at: new Date().toISOString() };
    setCurrentUser(updated);
    setAllProfiles((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const updatePreferences = (prefs: Partial<FlatmatePreferences>) => {
    if (!currentUser) return;
    const existing = preferences[currentUser.id] || {
      id: `p-${Date.now()}`,
      user_id: currentUser.id,
      budget_min: 15000,
      budget_max: 25000,
      target_city: currentUser.city,
      preferred_localities: ['Koramangala'],
      target_move_date: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      sleep_schedule: 'flexible',
      cleanliness_level: 4,
      food_preference: 'vegetarian',
      smoking_preference: 'non_smoker',
      drinking_preference: 'social_drinker',
      party_habits: 'rarely',
      work_style: 'hybrid',
      allows_pets: false,
      has_pets: false,
      gender_preference: 'any',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const merged = { ...existing, ...prefs, updated_at: new Date().toISOString() };
    setPreferences((prev) => ({ ...prev, [currentUser.id]: merged }));
  };

  const toggleSaveProperty = (propertyId: string) => {
    setSavedPropertyIds((prev) =>
      prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]
    );
  };

  const recordSwipe = (targetUserId: string, direction: 'left' | 'right' | 'superlike') => {
    setSwipedUserIds((prev) => {
      const nextSet = new Set(prev);
      nextSet.add(targetUserId);
      return nextSet;
    });

    if ((direction === 'right' || direction === 'superlike') && currentUser) {
      // In our realistic demo data, Priya Patel ('a0000000-0000-0000-0000-000000000002') or Neha Reddy creates an immediate mutual match!
      const targetProfile = allProfiles.find((p) => p.id === targetUserId);
      const userAPrefs = preferences[currentUser.id];
      const targetPrefs = preferences[targetUserId];

      const score = userAPrefs && targetPrefs
        ? calculateFlatmateCompatibility(userAPrefs, targetPrefs).overallScore
        : 88;

      const newMatch: Match = {
        id: `match-${Date.now()}`,
        user_1_id: currentUser.id,
        user_2_id: targetUserId,
        compatibility_score: score,
        created_at: new Date().toISOString(),
        last_activity_at: new Date().toISOString(),
        matched_user: targetProfile ? { ...targetProfile, preferences: targetPrefs } : undefined,
      };

      setMatches((prev) => [newMatch, ...prev]);

      // Create conversation
      const newConvId = `conv-${Date.now()}`;
      const newConv: Conversation = {
        id: newConvId,
        type: 'direct_match',
        last_message_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        other_participant: targetProfile,
        last_message: {
          id: `msg-${Date.now()}`,
          conversation_id: newConvId,
          sender_id: currentUser.id,
          content: `You matched with ${targetProfile?.full_name}!`,
          is_system: true,
          created_at: new Date().toISOString(),
        },
      };

      setConversations((prev) => [newConv, ...prev]);
      setMessages((prev) => ({
        ...prev,
        [newConvId]: [
          {
            id: `msg-${Date.now()}`,
            conversation_id: newConvId,
            sender_id: currentUser.id,
            content: `Congratulations! You and ${targetProfile?.full_name} liked each other's profiles with an estimated ${score}% compatibility! Say hello to kick off your flat hunt!`,
            is_system: true,
            created_at: new Date().toISOString(),
          },
        ],
      }));

      return { isMatch: true, match: newMatch };
    }

    return { isMatch: false };
  };

  const addProperty = (prop: Property) => {
    setProperties((prev) => [prop, ...prev]);
  };

  const updateProperty = (propertyId: string, updates: Partial<Property>) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === propertyId ? { ...p, ...updates, updated_at: new Date().toISOString() } : p))
    );
  };

  const sendEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'created_at' | 'updated_at'>) => {
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      renter: currentUser || undefined,
      property: properties.find((p) => p.id === enquiryData.property_id),
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
  };

  const updateEnquiryStatus = (enquiryId: string, status: Enquiry['status']) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === enquiryId ? { ...e, status, updated_at: new Date().toISOString() } : e))
    );
  };

  const sendMessage = (conversationId: string, content: string) => {
    if (!currentUser) return;
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversation_id: conversationId,
      sender_id: currentUser.id,
      content,
      is_system: false,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg],
    }));

    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId ? { ...c, last_message_at: new Date().toISOString(), last_message: newMsg } : c
      )
    );
  };

  const getOrCreateConversation = (otherUserId: string, propertyId?: string): string => {
    if (!currentUser) return '';
    const existing = conversations.find(
      (c) => c.other_participant?.id === otherUserId || c.property_id === propertyId
    );
    if (existing) return existing.id;

    const otherProfile = allProfiles.find((p) => p.id === otherUserId);
    const newConvId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newConvId,
      type: propertyId ? 'property_enquiry' : 'direct_match',
      property_id: propertyId,
      last_message_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      other_participant: otherProfile,
      property: propertyId ? properties.find((p) => p.id === propertyId) : undefined,
    };

    setConversations((prev) => [newConv, ...prev]);
    return newConvId;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentPreferences,
        isAuthenticated: !!currentUser,
        activeRole,
        allProfiles,
        properties,
        matches,
        conversations,
        messages,
        enquiries,
        savedPropertyIds,
        swipedUserIds,
        setActiveRole,
        switchPersona,
        login,
        signup,
        logout,
        updateProfile,
        updatePreferences,
        toggleSaveProperty,
        recordSwipe,
        addProperty,
        updateProperty,
        sendEnquiry,
        updateEnquiryStatus,
        sendMessage,
        getOrCreateConversation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
