import React from 'react';
import { ScrollView, Text, StyleSheet, Image, View } from 'react-native';
import Card from '@/components/shared/Card';
import StatsCard from '@/components/shared/StatsCard';

export default function TransitScreen() {
  return (
    <ScrollView style={styles.page} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 12 }}>Transit</Text>
      <Card>
        <Image source={{ uri: 'https://via.placeholder.com/600x200' }} style={{ height: 160, borderRadius: 12 }} />
        <Text style={{ marginTop: 8, color: '#94A3B8' }}>Map preview (mock)</Text>
      </Card>

      <Text style={{ fontWeight: '700', marginTop: 12, marginBottom: 8 }}>Suggested routes</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <StatsCard title="10 min" value="Walk + Bus" subtitle="Fastest" />
        <StatsCard title="20 min" value="Metro" subtitle="Cheapest" />
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: '#0F172A' } });
