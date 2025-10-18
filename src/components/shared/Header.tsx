import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
};

export const Header: React.FC<Props> = ({ title, subtitle, right }) => {
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <View>{right}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 20, fontWeight: '700' },
  subtitle: { fontSize: 12, color: '#94A3B8' },
});

export default Header;
