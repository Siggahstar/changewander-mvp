import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Header } from '@/components/shared/Header';
import Card from '@/components/shared/Card';
import StatsCard from '@/components/shared/StatsCard';
import { Button } from '@/components/shared/Button';
import TransactionItem from '@/components/shared/TransactionItem';

const mockTransactions = [
  { id: '1', title: 'Coffee at Brew', subtitle: 'Aug 12', amount: -450 },
  { id: '2', title: 'Refund', subtitle: 'Aug 10', amount: 1200 },
  { id: '3', title: 'Transit pass', subtitle: 'Aug 9', amount: -2500 },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.page} contentContainerStyle={{ padding: 16 }}>
      <Header title="Welcome back" subtitle="Explore your day" />

      <Card style={{ marginBottom: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: '700' }}>$128.50</Text>
            <Text style={{ color: '#94A3B8' }}>Wallet balance</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button title="Send" />
            <Button title="Receive" containerStyle={{ backgroundColor: '#06B6D4' }} />
          </View>
        </View>
      </Card>

      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontWeight: '700', marginBottom: 8 }}>Quick stats</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <StatsCard title="Earnings" value="$1,240" subtitle="Last 30d" />
          <StatsCard title="Trips" value="12" subtitle="This month" />
          <StatsCard title="Vendors" value="4" subtitle="Nearby" />
        </ScrollView>
      </View>

      <View>
        <Text style={{ fontWeight: '700', marginBottom: 8 }}>Recent activity</Text>
        <Card>
          {mockTransactions.map((t) => (
            <TransactionItem key={t.id} title={t.title} subtitle={t.subtitle} amount={t.amount} positive={t.amount > 0} />
          ))}
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { backgroundColor: '#0F172A', flex: 1 },
});
