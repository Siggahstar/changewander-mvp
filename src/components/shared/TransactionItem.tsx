import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  subtitle?: string;
  amount: number; // cents
  positive?: boolean;
};

export const TransactionItem: React.FC<Props> = ({ title, subtitle, amount, positive }) => {
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <Text style={[styles.amount, { color: positive ? '#10B981' : '#EF4444' }]}>{(amount / 100).toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  title: { fontSize: 15, fontWeight: '600' },
  subtitle: { fontSize: 12, color: '#94A3B8' },
  amount: { fontSize: 14, fontWeight: '700' },
});

export default TransactionItem;
