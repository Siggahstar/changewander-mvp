import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { Api } from '@/lib/api';
import type { Change } from '@/lib/types';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

export default function ProfileScreen() {
  const [changes, setChanges] = useState<Change[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // For MVP, show all changes from demo user
        const all = await Api.listChanges({});
        const mine = all.filter((c) => c.userId === 'u_demo');
        if (mounted) setChanges(mine);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#E3F2FD', dark: '#0f1b27' }} headerImage={null}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
          Profile
        </ThemedText>
      </ThemedView>
      {loading ? (
        <ThemedText>Loading…</ThemedText>
      ) : changes.length === 0 ? (
        <ThemedText>No contributions yet.</ThemedText>
      ) : (
        changes.map((c) => (
          <ThemedView key={c.id} style={{ gap: 4, marginBottom: 12 }}>
            <Link href={`/change/${c.id}`}>
              <Link.Trigger>
                <ThemedText type="defaultSemiBold">{c.title}</ThemedText>
              </Link.Trigger>
              <Link.Preview />
            </Link>
            <ThemedText numberOfLines={2}>{c.description}</ThemedText>
          </ThemedView>
        ))
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
});


