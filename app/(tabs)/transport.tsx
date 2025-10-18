import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TransportScreen() {
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
          Real-time schedules available for Lisbon, Porto & Algarve
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

      {/* Routes */}
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
        Popular Routes
      </Text>

      {[
        { from: "Lisbon Airport", to: "Baixa-Chiado", time: "12 min" },
        { from: "Porto Campanhã", to: "Ribeira", time: "15 min" },
        { from: "Faro Central", to: "Marina Beach", time: "9 min" },
      ].map((r, i) => (
        <View
          key={i}
          style={{
            backgroundColor: "#f5f5f5",
            borderRadius: 10,
            padding: 15,
            marginBottom: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ color: "#333", fontWeight: "500" }}>
              {r.from} → {r.to}
            </Text>
            <Text style={{ color: "#666", fontSize: 12 }}>{r.time}</Text>
          </View>
          <Ionicons name="navigate-outline" size={20} color="#009688" />
        </View>
      ))}

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
