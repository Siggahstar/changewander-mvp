import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Modal, TextInput } from 'react-native';
import Card from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import TransactionItem from '@/components/shared/TransactionItem';

const mockTransactions = [
  { id: '1', title: 'Lunch at Street Bites', subtitle: 'Today', amount: -1200 },
  { id: '2', title: 'Top-up', subtitle: 'Yesterday', amount: 5000 },
];

export default function WalletScreen() {
  const [showSend, setShowSend] = useState(false);
  const [showReceive, setShowReceive] = useState(false);

  return (
    <ScrollView style={styles.page} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.title}>Wallet</Text>

      <Card style={{ marginBottom: 12 }}>
        <Text style={{ color: '#94A3B8' }}>Card balance</Text>
        <Text style={{ fontSize: 28, fontWeight: '800', marginTop: 8 }}>$52.30</Text>
        <View style={{ flexDirection: 'row', marginTop: 12, gap: 8 }}>
          <Button title="Send" onPress={() => setShowSend(true)} />
          <Button title="Receive" containerStyle={{ backgroundColor: '#06B6D4' }} onPress={() => setShowReceive(true)} />
        </View>
      </Card>

      <Text style={{ fontWeight: '700', marginBottom: 8 }}>Transactions</Text>
      <Card>
        {mockTransactions.map((t) => (
          <TransactionItem key={t.id} title={t.title} subtitle={t.subtitle} amount={t.amount} positive={t.amount > 0} />
        ))}
      </Card>

      <Modal visible={showSend} animationType="slide">
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: '700' }}>Send funds</Text>
          <TextInput placeholder="Recipient" style={{ borderBottomWidth: 1, marginTop: 12, padding: 8 }} />
          <TextInput placeholder="Amount" keyboardType="numeric" style={{ borderBottomWidth: 1, marginTop: 12, padding: 8 }} />
          <View style={{ marginTop: 12 }}>
            <Button title="Confirm" />
            <Button title="Cancel" containerStyle={{ marginTop: 8, backgroundColor: '#374151' }} onPress={() => setShowSend(false)} />
          </View>
        </ScrollView>
      </Modal>

      <Modal visible={showReceive} animationType="slide">
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: '700' }}>Receive</Text>
          <Text style={{ marginTop: 12 }}>Share your QR code or wallet address (placeholder)</Text>
          <Button title="Close" containerStyle={{ marginTop: 12 }} onPress={() => setShowReceive(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: '#0F172A' }, title: { fontSize: 22, fontWeight: '700', marginBottom: 12 } });
