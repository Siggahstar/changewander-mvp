import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = { title: string; value: string; subtitle?: string };

export const StatsCard: React.FC<Props> = ({ title, value, subtitle }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 12, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.03)', marginRight: 8 },
  title: { fontSize: 12, color: '#94A3B8' },
  value: { fontSize: 18, fontWeight: '700', marginTop: 6 },
  subtitle: { fontSize: 12, color: '#94A3B8', marginTop: 6 },
});

export default StatsCard;
