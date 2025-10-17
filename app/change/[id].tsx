import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { Api } from '@/lib/api';
import type { Change } from '@/lib/types';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function ChangeDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [change, setChange] = useState<Change | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<{ id: string; text: string }[]>([]);
  const [reacted, setReacted] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!id) return;
      try {
        const data = await Api.getChange(String(id));
        if (mounted) setChange(data);
        const cmts = await Api.listComments(String(id));
        if (mounted) setComments(cmts);
        const rxn = await Api.getUserReaction(String(id), 'u_demo');
        if (mounted) setReacted(!!rxn);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  async function toggleLike() {
    if (!change) return;
    if (reacted) {
      await Api.unreact(change.id, 'u_demo');
      setReacted(false);
      setChange({ ...change, reactionsCount: Math.max(0, change.reactionsCount - 1) });
    } else {
      await Api.react(change.id, 'u_demo', 'like');
      setReacted(true);
      setChange({ ...change, reactionsCount: change.reactionsCount + 1 });
    }
  }

  async function addComment() {
    if (!change) return;
    const text = commentText.trim();
    if (!text) return;
    const c = await Api.addComment(change.id, 'u_demo', text);
    setComments((prev) => [c, ...prev]);
    setCommentText('');
    setChange({ ...change, commentsCount: change.commentsCount + 1 });
  }

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#FFFDE7', dark: '#1f1b0f' }} headerImage={null}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
          Change Details
        </ThemedText>
      </ThemedView>
      {loading ? (
        <ThemedText>Loading…</ThemedText>
      ) : !change ? (
        <ThemedText>Not found.</ThemedText>
      ) : (
        <>
          <ThemedText type="subtitle">{change.title}</ThemedText>
          <ThemedText>{change.description}</ThemedText>
          <ThemedText type="muted">{change.address ?? `${change.lat.toFixed(3)}, ${change.lon.toFixed(3)}`}</ThemedText>
          <ThemedText type="defaultSemiBold" onPress={toggleLike}>
            ❤️ {change.reactionsCount}  •  Comments: {change.commentsCount}
          </ThemedText>
          {change.userId === 'u_demo' ? (
            <ThemedText type="link" onPress={async () => {
              const ok = await Api.deleteChange(change.id, 'u_demo');
              if (ok) {
                router.replace('/');
              }
            }}>
              Delete
            </ThemedText>
          ) : null}
          <ThemedView style={{ height: 12 }} />
          <ThemedText type="subtitle">Comments</ThemedText>
          <TextInput
            placeholder="Add a comment"
            value={commentText}
            onChangeText={setCommentText}
            onSubmitEditing={addComment}
            style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 8 }}
            returnKeyType="send"
          />
          {comments.map((c) => (
            <ThemedText key={c.id} style={{ marginBottom: 6 }}>{c.text}</ThemedText>
          ))}
        </>
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


