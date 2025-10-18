import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Card from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';

export default function ARScreen() {
  return (
    <View style={styles.page}>
      <Card style={{ margin: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>AR Guide</Text>
        <Text style={{ color: '#94A3B8', marginTop: 8 }}>An immersive augmented reality guide is coming soon.</Text>
        <Image source={{ uri: 'https://via.placeholder.com/300x150' }} style={{ height: 150, borderRadius: 12, marginTop: 12 }} />
        <Button title="Join beta" containerStyle={{ marginTop: 12 }} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: '#0F172A' } });
