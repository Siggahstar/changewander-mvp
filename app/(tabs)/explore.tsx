import ExploreMap from '@/components/ExploreMap';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { Api } from '@/lib/api';
import type { Change } from '@/lib/types';
import { Link } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function ExploreScreen() {
  const [changes, setChanges] = useState<Change[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [lat, setLat] = useState<number | undefined>(37.7749);
  const [lon, setLon] = useState<number | undefined>(-122.4194);
  const [radiusKm, setRadiusKm] = useState<string>('10');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      try {
        const tags = tagInput
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);
        const data = await Api.listChanges({
          search: search.trim() || undefined,
          tags: tags.length ? tags : undefined,
          lat,
          lon,
          radiusKm: radiusKm ? Number(radiusKm) : undefined,
        });
        if (mounted) setChanges(data);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(run, 300);
    return () => {
      mounted = false;
    };
  }, [search, tagInput, lat, lon, radiusKm]);

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }} headerImage={null}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
          Explore
        </ThemedText>
      </ThemedView>
      <TextInput
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 8 }}
      />
      <TextInput
        placeholder="Tags (comma-separated)"
        value={tagInput}
        onChangeText={setTagInput}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 12 }}
      />
      <TextInput
        placeholder="Radius (km)"
        value={radiusKm}
        onChangeText={setRadiusKm}
        keyboardType="numeric"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 12 }}
      />

      <ThemedText type="link" onPress={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}>
        {viewMode === 'list' ? 'Switch to Map' : 'Switch to List'}
      </ThemedText>

      {loading ? (
        <ThemedText>Loading…</ThemedText>
      ) : changes.length === 0 ? (
        <ThemedText>No changes yet.</ThemedText>
      ) : (
        viewMode === 'list' ? (
          changes.map((c) => (
            <ThemedView key={c.id} style={{ gap: 4, marginBottom: 12 }}>
              <Link href={`/change/${c.id}`}>
                <Link.Trigger>
                  <ThemedText type="defaultSemiBold">{c.title}</ThemedText>
                </Link.Trigger>
                <Link.Preview />
              </Link>
              <ThemedText numberOfLines={2}>{c.description}</ThemedText>
              <ThemedText type="muted">{c.address ?? `${c.lat.toFixed(3)}, ${c.lon.toFixed(3)}`}</ThemedText>
            </ThemedView>
          ))
        ) : (
          <ExploreMap
            changes={changes}
            lat={lat}
            lon={lon}
            onRegionChange={(newLat, newLon, newRadiusKm) => {
              setLat(newLat);
              setLon(newLon);
              setRadiusKm(String(Math.round(newRadiusKm)));
            }}
            onSelectChange={(id) => {
              const { router } = require('expo-router');
              router.push(`/change/${id}`);
            }}
          />
        )
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
