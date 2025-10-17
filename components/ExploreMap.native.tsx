import type { Change } from '@/lib/types';
import { View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

type Props = {
  changes: Change[];
  lat?: number;
  lon?: number;
  onRegionChange?: (lat: number, lon: number, radiusKm: number) => void;
  onSelectChange?: (id: string) => void;
};

export default function ExploreMap({ changes, lat, lon, onRegionChange, onSelectChange }: Props) {
  return (
    <View style={{ height: 300, borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: '#ccc', marginBottom: 12 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: lat ?? 37.7749,
          longitude: lon ?? -122.4194,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        onRegionChangeComplete={(region: Region) => {
          if (!onRegionChange) return;
          const kmPerDegLat = 111; // approximate
          const approxRadiusKm = Math.max(region.latitudeDelta, region.longitudeDelta) * kmPerDegLat * 0.5;
          onRegionChange(region.latitude, region.longitude, Math.max(1, approxRadiusKm));
        }}
      >
        {changes.map((c) => (
          <Marker
            key={c.id}
            coordinate={{ latitude: c.lat, longitude: c.lon }}
            title={c.title}
            description={c.description}
            onPress={() => onSelectChange && onSelectChange(c.id)}
          />
        ))}
      </MapView>
    </View>
  );
}


