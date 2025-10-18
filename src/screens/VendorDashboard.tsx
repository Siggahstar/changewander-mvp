import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import Card from '@/components/shared/Card';
import StatsCard from '@/components/shared/StatsCard';

export default function VendorDashboard() {
  const earnings = [500, 800, 1200, 400, 900];

  return (
    <ScrollView style={styles.page} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 12 }}>Vendor Dashboard</Text>

      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <StatsCard title="Today" value="$420" />
        <StatsCard title="This week" value="$3,200" />
      </View>

      <Card>
        <Text style={{ fontWeight: '700' }}>Earnings trend</Text>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 120, marginTop: 12 }}>
          {earnings.map((v, i) => (
            <View key={i} style={{ width: 20, height: (v / 1200) * 100, backgroundColor: '#06B6D4', marginRight: 8, borderRadius: 4 }} />
          ))}
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: '#0F172A' } });
