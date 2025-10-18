import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Stop = {
  id: string;
  name?: string;
  lat: number;
  lon: number;
  tags?: Record<string, string>;
};

export default function TransportScreen() {
  const [stops, setStops] = useState<Stop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const MAX_VISIBLE = 50;

  useEffect(() => {
    // Fetch nearby public transport stops using Overpass API centered on Lisbon
    const fetchStops = async () => {
      setLoading(true);
      setError(null);
      try {
        // Center at Lisboa: 38.7223, -9.1393, radius 2000 meters
        const query = `[
          out:json][timeout:25];
          (
            node[public_transport](around:2000,38.7223,-9.1393);
            node[highway=bus_stop](around:2000,38.7223,-9.1393);
            node[railway=tram_stop](around:2000,38.7223,-9.1393);
          );
          out body;`;

        const url = "https://overpass-api.de/api/interpreter";
        const resp = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `data=${encodeURIComponent(query)}`,
        });

        if (!resp.ok) throw new Error(`API ${resp.status}`);
        const data = await resp.json();

        const parsed: Stop[] = (data.elements || []).map((el: any) => ({
          id: `${el.type}/${el.id}`,
          name: el.tags?.name || el.tags?.ref || "Unnamed stop",
          lat: el.lat,
          lon: el.lon,
          tags: el.tags || {},
        }));

        setStops(parsed);
      } catch (e: any) {
        setError(e.message || "Failed to load stops");
      } finally {
        setLoading(false);
      }
    };

    fetchStops();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ padding: 20 }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 25,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "600", color: "#009688" }}>
          Transport
        </Text>
        <Ionicons name="bus-outline" size={28} color="#009688" />
      </View>

      {/* Status Card */}
      <View
        style={{
          backgroundColor: "#009688",
          borderRadius: 18,
          padding: 20,
          marginBottom: 25,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
          Metro & Bus Connected ✅
        </Text>
        <Text style={{ color: "#fff", marginTop: 6 }}>
          Nearby stops and basic schedule info
        </Text>
      </View>

      {/* Active Pass */}
      <View
        style={{
          backgroundColor: "#e0f2f1",
          borderRadius: 12,
          padding: 20,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#009688", fontWeight: "600", fontSize: 16 }}>
          Your Active Pass
        </Text>
        <Text style={{ color: "#444", marginTop: 6 }}>
          24-Hour Unlimited Travel
        </Text>
        <Text style={{ color: "#444", fontSize: 13, marginTop: 2 }}>
          Valid until 10:00 AM Tomorrow
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#009688",
            borderRadius: 8,
            paddingVertical: 10,
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>Show QR Ticket</Text>
        </TouchableOpacity>
      </View>

      {/* Nearby Stops */}
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
        Nearby Stops
      </Text>

      {loading && <ActivityIndicator size="large" color="#009688" />}
      {error && (
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: "red" }}>Error: {error}</Text>
        </View>
      )}

      {!loading && !error && (
        <>
          <FlatList
            data={
              showAll ? stops.slice(0, MAX_VISIBLE) : stops.slice(0, 10)
            }
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: 10,
                  padding: 12,
                  marginBottom: 8,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "#333", fontWeight: "500" }}>{item.name}</Text>
                  <Text style={{ color: "#666", fontSize: 12 }}>
                    {item.lat.toFixed(4)}, {item.lon.toFixed(4)}
                  </Text>
                </View>
                <Ionicons name="navigate-outline" size={20} color="#009688" />
              </View>
            )}
          />

          {stops.length > 10 && (
            <TouchableOpacity
              onPress={() => setShowAll((s) => !s)}
              style={{
                backgroundColor: "transparent",
                borderRadius: 8,
                paddingVertical: 10,
                alignItems: "center",
                marginTop: 6,
              }}
            >
              <Text style={{ color: "#009688", fontWeight: "600" }}>
                {showAll
                  ? "Show Less"
                  : `View More (${Math.min(stops.length - 10, MAX_VISIBLE - 10)} more)`}
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {/* CTA */}
      <TouchableOpacity
        style={{
          backgroundColor: "#009688",
          borderRadius: 10,
          paddingVertical: 12,
          alignItems: "center",
          marginTop: 15,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>Plan New Trip</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
