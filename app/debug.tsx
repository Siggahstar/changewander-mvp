import React from 'react';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const ROUTES = ['/wallet', '/transport', '/ar-guide', '/debug'];

export default function DebugScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }} style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 12 }}>Debug — Routes</Text>

      {ROUTES.map((r) => (
        <TouchableOpacity
          key={r}
          onPress={() => router.push(r as any)}
          style={{ backgroundColor: '#e0f2f1', padding: 12, borderRadius: 8, marginBottom: 10 }}
        >
          <Text style={{ color: '#009688', fontWeight: '600' }}>{r}</Text>
        </TouchableOpacity>
      ))}

  <Text style={{ marginTop: 18, color: '#666' }}>If a route does not open on your device, try reopening Expo Go or clear cache with the dev server.</Text>
    </ScrollView>
  );
}
