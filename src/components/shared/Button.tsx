import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator, ViewStyle } from 'react-native';

type Props = TouchableOpacityProps & {
  title: string;
  loading?: boolean;
  className?: string; // for nativewind
  containerStyle?: ViewStyle;
};

export const Button: React.FC<Props> = ({ title, loading, style, className, containerStyle, ...rest }) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={[{ padding: 12, backgroundColor: '#1D4ED8', borderRadius: 12, alignItems: 'center' }, containerStyle, style]}
      {...rest}
    >
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontWeight: '600' }}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default Button;
