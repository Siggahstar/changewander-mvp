import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, ScrollView 
} from 'react-native';

const mockData = [
  {
    id: '1',
    title: 'Sunset Boat Tour',
    summary: 'Romantic cruise near Lisbon, 2h • €45',
    rating: 4.8,
    distance: '3.2 km',
    image: 'https://picsum.photos/400/200?random=1',
    ar: true,
  },
  {
    id: '2',
    title: 'Sintra Hiking Adventure',
    summary: 'Guided morning trail • Family friendly',
    rating: 4.6,
    distance: '12 km',
    image: 'https://picsum.photos/400/200?random=2',
    ar: false,
  },
  {
    id: '3',
    title: 'Lisbon Street Food Walk',
    summary: 'Taste 5 local dishes in 2 hours',
    rating: 4.9,
    distance: '1.8 km',
    image: 'https://picsum.photos/400/200?random=3',
    ar: true,
  },
];

export default function DiscoverScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(mockData);

  const handleSearch = () => {
    // MVP: pretend to query agent
    console.log('Query:', query);
    // Could later connect to /api/discover/query
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.summary}>{item.summary}</Text>
        <View style={styles.row}>
          <Text style={styles.meta}>⭐ {item.rating}</Text>
          <Text style={styles.meta}>{item.distance}</Text>
          {item.ar && (
            <View style={styles.arBadge}>
              <Text style={styles.arText}>AR</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
      <Text style={styles.heading}>Discover</Text>
      <TextInput
        style={styles.input}
        placeholder="Ask AI what to do..."
        placeholderTextColor="#777"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      <View style={styles.agentCard}>
        <Text style={styles.agentTitle}>Agent Suggestion 🤖</Text>
        <Text style={styles.agentText}>
          “I found 3 experiences nearby you might love. Want to see AR previews?”
        </Text>
        <View style={styles.agentActions}>
          <TouchableOpacity style={styles.agentBtn}>
            <Text style={styles.agentBtnText}>Show Me</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.agentBtnOutline}>
            <Text style={styles.agentBtnOutlineText}>Maybe Later</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfdfd', paddingHorizontal: 16 },
  heading: { fontSize: 24, fontWeight: '600', marginTop: 50, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#0077B6',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: { color: '#fff', fontWeight: '600', textAlign: 'center', fontSize: 16 },
  agentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 20,
  },
  agentTitle: { fontWeight: '700', fontSize: 16, marginBottom: 4 },
  agentText: { color: '#444', fontSize: 14, marginBottom: 12 },
  agentActions: { flexDirection: 'row', gap: 10 },
  agentBtn: {
    backgroundColor: '#0077B6',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  agentBtnText: { color: '#fff', fontWeight: '500' },
  agentBtnOutline: {
    borderColor: '#0077B6',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  agentBtnOutlineText: { color: '#0077B6', fontWeight: '500' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
    overflow: 'hidden',
  },
  image: { width: 110, height: 110, borderTopLeftRadius: 12, borderBottomLeftRadius: 12 },
  title: { fontWeight: '600', fontSize: 16, color: '#222', marginTop: 8 },
  summary: { color: '#555', fontSize: 13, marginTop: 4 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 8 },
  meta: { color: '#777', fontSize: 12 },
  arBadge: {
    backgroundColor: '#FFB703',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  arText: { color: '#fff', fontSize: 10, fontWeight: '600' },
});
