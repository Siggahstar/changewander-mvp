import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { Api } from '@/lib/api';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, StyleSheet, TextInput } from 'react-native';

export default function AddChangeScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  async function submit() {
    if (!title.trim()) {
      Alert.alert('Title is required');
      return;
    }
    // Minimal create using mock API; userId is demo
    const created = await Api.createChange({
      userId: 'u_demo',
      title: title.trim(),
      description: description.trim(),
      tags: [],
      lat: 37.7749,
      lon: -122.4194,
      address: 'San Francisco, CA',
      photos: photoUri ? [photoUri] : [],
    });
    setTitle('');
    setDescription('');
    setPhotoUri(null);
    router.push(`/change/${created.id}`);
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E8F5E9', dark: '#1d2a1f' }}
      headerImage={null}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
          Add Change
        </ThemedText>
      </ThemedView>

      <ThemedText type="defaultSemiBold">Title</ThemedText>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="e.g., New bike lane on 3rd Ave"
        style={styles.input}
      />

      <ThemedText type="defaultSemiBold">Description</ThemedText>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="What changed? Who led it?"
        multiline
        style={[styles.input, { height: 100 }]}
      />

      <ThemedText type="defaultSemiBold">Photo</ThemedText>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={{ width: '100%', height: 200, borderRadius: 8 }} />
      ) : null}
      <ThemedText type="link" onPress={pickImage}>
        Pick from gallery
      </ThemedText>

      <ThemedView style={{ height: 16 }} />
      <ThemedText type="link" onPress={submit}>
        Submit
      </ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
});


