import { ThemedText } from '@/components/themed-text';
import type { Change } from '@/lib/types';
import { View } from 'react-native';

type Props = {
  changes: Change[];
  lat?: number;
  lon?: number;
  onRegionChange?: (lat: number, lon: number, radiusKm: number) => void;
};

export default function ExploreMapWeb({ changes }: Props) {
  return (
    <View style={{ height: 300, borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: '#ccc', marginBottom: 12, alignItems: 'center', justifyContent: 'center' }}>
      <ThemedText type="muted">Map is not available on web in this build.</ThemedText>
    </View>
  );
}


