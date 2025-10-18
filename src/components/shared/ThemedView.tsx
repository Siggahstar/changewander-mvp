import React from 'react';
import { View, ViewProps } from 'react-native';

// Simple themed wrapper that can be extended for dark/light mode.
export const ThemedView: React.FC<ViewProps> = ({ children, style, ...rest }) => {
  return (
    <View style={style} {...rest}>
      {children}
    </View>
  );
};

export default ThemedView;
