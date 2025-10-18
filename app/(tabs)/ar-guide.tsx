import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Note: this screen uses expo-camera. If you don't have it installed run:
// expo install expo-camera
import { Camera } from "expo-camera";

// Workaround for TypeScript JSX typing issues with the Camera export.
// Create a thin wrapper functional component so TS sees a proper component type.
const CameraView: React.FC<any> = (props) => {
  // cast to any to avoid TS complaining about the module shape
  return React.createElement((Camera as unknown) as any, props);
};

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
  const [showAllPois, setShowAllPois] = useState(false);
  const INITIAL_VISIBLE = 5;
  const MAX_VISIBLE_POIS = 10;
  // avoid strict Camera typing to keep TS happy when forwarding ref
  const cameraRef = useRef<any>(null);
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null);

  useEffect(() => {
    // enable LayoutAnimation on Android
    if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
      // @ts-ignore
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  // Do NOT request camera permission automatically on mount.
  // Permission will be requested only when the user explicitly opens the camera.
  const requestCameraPermission = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    } catch {
      setHasPermission(false);
    }
  };

  const fetchNearbyPOI = async () => {
    setLoadingPOI(true);
    setError(null);
    try {
      // Try to get user's current location; fall back to central Lisbon
      const getUserLocation = (): Promise<{ lat: number; lon: number }> =>
        new Promise((resolve) => {
          try {
            navigator.geolocation.getCurrentPosition(
              (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
              () => resolve({ lat: 38.7223, lon: -9.1393 }),
              { timeout: 5000 }
            );
          } catch {
            resolve({ lat: 38.7223, lon: -9.1393 });
          }
        });

      const center = await getUserLocation();
      const radius = 3000;

      // Use Overpass to search for tourism/cultural POIs near the center point
      const query = `[
        out:json][timeout:25];
        (
          node["tourism"~"museum|attraction|artwork"](around:${radius},${center.lat},${center.lon});
          node["historic"](around:${radius},${center.lat},${center.lon});
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
            <Text style={{ marginBottom: 12 }}>Camera is disabled for this page.</Text>
            <TouchableOpacity onPress={requestCameraPermission} style={{ backgroundColor: '#009688', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 }}>
              <Text style={{ color: '#fff', fontWeight: '600' }}>Open Camera</Text>
            </TouchableOpacity>
          </View>
        )}

        {hasPermission === false && (
          <View style={{ height: 220, justifyContent: "center", alignItems: "center", padding: 16 }}>
            <Text style={{ color: "#333", textAlign: "center" }}>
              Camera permission denied. To enable AR features, grant camera access in
              your device settings or tap Open Camera to retry.
            </Text>
            <TouchableOpacity onPress={requestCameraPermission} style={{ marginTop: 12, backgroundColor: '#009688', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 }}>
              <Text style={{ color: '#fff', fontWeight: '600' }}>Open Camera</Text>
            </TouchableOpacity>
          </View>
        )}

        {hasPermission === true && (
          <View style={{ height: 300, backgroundColor: "#000" }}>
            <CameraView ref={cameraRef} style={{ flex: 1 }} type={'back'} />

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
            data={showAllPois ? pois.slice(0, MAX_VISIBLE_POIS) : pois.slice(0, INITIAL_VISIBLE)}
            keyExtractor={(it) => it.id}
            renderItem={({ item }) => (
              <View style={{ backgroundColor: "#f5f5f5", borderRadius: 10, padding: 12, marginBottom: 8 }}>
                <Text style={{ fontWeight: "600", color: "#009688" }}>{item.title}</Text>
                {item.desc ? <Text style={{ color: "#444", marginTop: 4 }}>{item.desc}</Text> : null}
                {item.lat && item.lon ? (
                  <Text style={{ color: "#666", fontSize: 12, marginTop: 6 }}>{item.lat.toFixed(4)}, {item.lon.toFixed(4)}</Text>
                ) : null}
                <TouchableOpacity
                  onPress={() => {
                    // animate the modal open
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setSelectedPoi(item);
                  }}
                  style={{ marginTop: 8, backgroundColor: "#009688", padding: 8, borderRadius: 8, alignItems: "center" }}
                >
                  <Text style={{ color: "#fff", fontWeight: "600" }}>View AR Details</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          {pois.length > INITIAL_VISIBLE && (
            <TouchableOpacity
              onPress={() => setShowAllPois((s) => !s)}
              style={{ marginTop: 6, alignItems: 'center' }}
            >
              <Text style={{ color: '#009688', fontWeight: '600' }}>{showAllPois ? 'Show Less' : `View More (${Math.min(pois.length, MAX_VISIBLE_POIS) - INITIAL_VISIBLE} more)`}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* POI detail modal */}
      <Modal visible={!!selectedPoi} animationType="slide" transparent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: '90%', maxWidth: 520, backgroundColor: '#fff', borderRadius: 12, padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#009688', marginBottom: 8 }}>{selectedPoi?.title}</Text>
            {selectedPoi?.desc ? <Text style={{ color: '#444', marginBottom: 8 }}>{selectedPoi?.desc}</Text> : null}
            {selectedPoi?.lat && selectedPoi?.lon ? <Text style={{ color: '#666', fontSize: 12 }}>Coordinates: {selectedPoi.lat.toFixed(4)}, {selectedPoi.lon.toFixed(4)}</Text> : null}

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 }}>
              <TouchableOpacity onPress={() => setSelectedPoi(null)} style={{ padding: 8 }}>
                <Text style={{ color: '#009688', fontWeight: '600' }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
