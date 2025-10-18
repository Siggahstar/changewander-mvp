import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Note: this screen uses expo-camera. If you don't have it installed run:
// expo install expo-camera
import { Camera } from "expo-camera";

type POI = {
  id: string;
  title: string;
  desc?: string;
  img?: string;
  lat?: number;
  lon?: number;
};

export default function ARGuideScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [loadingPOI, setLoadingPOI] = useState(false);
  const [pois, setPois] = useState<POI[]>([]);
  const [error, setError] = useState<string | null>(null);
  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      } catch (e: any) {
        setHasPermission(false);
      }
    })();
  }, []);

  const fetchNearbyPOI = async () => {
    setLoadingPOI(true);
    setError(null);
    try {
      // Use Overpass to search for tourism/cultural POIs around central Lisbon
      const query = `[
        out:json][timeout:25];
        (
          node["tourism"~"museum|attraction|artwork"](around:3000,38.7223,-9.1393);
          node["historic"](around:3000,38.7223,-9.1393);
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

      const parsed: POI[] = (data.elements || []).map((el: any) => ({
        id: `${el.type}/${el.id}`,
        title: el.tags?.name || el.tags?.ref || "Unnamed",
        desc: el.tags?.description || el.tags?.tourism || el.tags?.historic,
        lat: el.lat,
        lon: el.lon,
        img: undefined,
      }));

      setPois(parsed);
    } catch (e: any) {
      setError(e.message || "Failed to load POIs");
    } finally {
      setLoadingPOI(false);
    }
  };

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
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "600", color: "#009688" }}>
          AR Cultural Guide
        </Text>
        <Ionicons name="cube-outline" size={28} color="#009688" />
      </View>

      {/* Intro Card */}
      <View style={{ backgroundColor: "#009688", borderRadius: 18, padding: 16, marginBottom: 12 }}>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
          Explore Portugal in Augmented Reality 🌐
        </Text>
        <Text style={{ color: "#fff", marginTop: 6 }}>
          Point your camera and discover nearby cultural landmarks.
        </Text>
      </View>

      {/* Camera preview / permission */}
      <View style={{ borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
        {hasPermission === null && (
          <View style={{ height: 220, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator color="#009688" />
            <Text style={{ marginTop: 8 }}>Requesting camera permission...</Text>
          </View>
        )}

        {hasPermission === false && (
          <View style={{ height: 220, justifyContent: "center", alignItems: "center", padding: 16 }}>
            <Text style={{ color: "#333", textAlign: "center" }}>
              Camera permission denied. To enable AR features, grant camera access in
              your device settings.
            </Text>
          </View>
        )}

        {hasPermission === true && (
          <View style={{ height: 300, backgroundColor: "#000" }}>
            <Camera ref={cameraRef} style={{ flex: 1 }} type={Camera.Constants.Type.back} />

            {/* Simple overlay */}
            <View pointerEvents="none" style={styles.overlay}>
              <View style={styles.centerBox} />
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity
        onPress={fetchNearbyPOI}
        style={{ backgroundColor: "#009688", borderRadius: 10, paddingVertical: 12, alignItems: "center", marginBottom: 12 }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>Scan Nearby POIs</Text>
      </TouchableOpacity>

      {loadingPOI && <ActivityIndicator size="small" color="#009688" />}
      {error && <Text style={{ color: "red" }}>Error: {error}</Text>}

      {pois.length > 0 && (
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>Nearby Places</Text>
          <FlatList
            data={pois}
            keyExtractor={(it) => it.id}
            renderItem={({ item }) => (
              <View style={{ backgroundColor: "#f5f5f5", borderRadius: 10, padding: 12, marginBottom: 8 }}>
                <Text style={{ fontWeight: "600", color: "#009688" }}>{item.title}</Text>
                {item.desc ? <Text style={{ color: "#444", marginTop: 4 }}>{item.desc}</Text> : null}
                {item.lat && item.lon ? (
                  <Text style={{ color: "#666", fontSize: 12, marginTop: 6 }}>{item.lat.toFixed(4)}, {item.lon.toFixed(4)}</Text>
                ) : null}
                <TouchableOpacity style={{ marginTop: 8, backgroundColor: "#009688", padding: 8, borderRadius: 8, alignItems: "center" }}>
                  <Text style={{ color: "#fff", fontWeight: "600" }}>View AR Details</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}

      {/* CTA */}
      <TouchableOpacity
        style={{
          backgroundColor: "#009688",
          borderRadius: 10,
          paddingVertical: 12,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>Discover More</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  centerBox: {
    width: 180,
    height: 120,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.8)",
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
});
