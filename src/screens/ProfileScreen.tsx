import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View, TextInput, Image } from 'react-native';
import Card from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';

export default function ProfileScreen() {
  const [name, setName] = useState('Alex Traveler');

  return (
    <ScrollView style={styles.page} contentContainerStyle={{ padding: 16 }}>
      <Card style={{ alignItems: 'center', padding: 20 }}>
        <Image source={{ uri: 'https://via.placeholder.com/96' }} style={{ width: 96, height: 96, borderRadius: 48 }} />
        <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 12 }}>{name}</Text>
        <Text style={{ color: '#94A3B8' }}>Joined March 2024</Text>
      </Card>

      <Card style={{ marginTop: 12 }}>
        <Text style={{ fontWeight: '700' }}>Edit profile</Text>
        <TextInput value={name} onChangeText={setName} style={{ borderBottomWidth: 1, marginTop: 8, padding: 8 }} />
        <View style={{ marginTop: 12 }}>
          <Button title="Save" />
        </View>
      </Card>

      <Card style={{ marginTop: 12 }}>
        <Text style={{ fontWeight: '700' }}>Settings</Text>
        <Text style={{ marginTop: 8, color: '#94A3B8' }}>Notifications, privacy, and preferences (placeholder)</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: '#0F172A' } });
