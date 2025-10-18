import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
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
        <View>
          <Text style={{ fontSize: 22, fontWeight: "600", color: "#009688" }}>
            Portugal Guide
          </Text>
          <Text style={{ fontSize: 14, color: "#444" }}>Welcome, Santos 👋</Text>
        </View>

        <View style={{ flexDirection: "row", gap: 16 }}>
          <Ionicons name="notifications-outline" size={24} color="#009688" />
          <Ionicons name="person-circle-outline" size={30} color="#009688" />
        </View>
      </View>

      {/* Greeting Card */}
      <View
        style={{
          backgroundColor: "#009688",
          borderRadius: 18,
          padding: 20,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "500" }}>
          Good Morning, Santos ☀️
        </Text>
        <Text style={{ color: "#fff", fontSize: 14, marginTop: 4 }}>
          Explore Portugal with confidence
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Ionicons name="location-outline" size={16} color="#fff" />
          <Text style={{ color: "#fff", marginLeft: 6 }}>Lisboa, Portugal</Text>
        </View>
      </View>

      {/* Feature Cards */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          rowGap: 10,
          columnGap: 10,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={{
            flexBasis: "47%",
            backgroundColor: "#e0f2f1",
            borderRadius: 12,
            padding: 15,
          }}
        >
          <Ionicons name="card-outline" size={26} color="#009688" />
          <Text style={{ color: "#009688", fontSize: 16, fontWeight: "600" }}>
            Digital Wallet
          </Text>
          <Text style={{ color: "#444", fontSize: 12 }}>€693.09 available</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexBasis: "47%",
            backgroundColor: "#e0f2f1",
            borderRadius: 12,
            padding: 15,
          }}
        >
          <Ionicons name="bus-outline" size={26} color="#009688" />
          <Text style={{ color: "#009688", fontSize: 16, fontWeight: "600" }}>
            Transport
          </Text>
          <Text style={{ color: "#444", fontSize: 12 }}>
            Real-time schedules
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexBasis: "47%",
            backgroundColor: "#e0f2f1",
            borderRadius: 12,
            padding: 15,
          }}
        >
          <Ionicons name="cube-outline" size={26} color="#009688" />
          <Text style={{ color: "#009688", fontSize: 16, fontWeight: "600" }}>
            AR Cultural Guide
          </Text>
          <Text style={{ color: "#444", fontSize: 12 }}>Discover heritage</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Activity */}
      <View>
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
          Recent Activity
        </Text>

        <View
          style={{
            backgroundColor: "#f5f5f5",
            borderRadius: 10,
            padding: 15,
            marginBottom: 8,
          }}
        >
          <Text style={{ color: "#333" }}>Lisbon Café Payment</Text>
          <Text style={{ color: "red", marginTop: 2 }}>-€4.50</Text>
        </View>

        <View
          style={{
            backgroundColor: "#f5f5f5",
            borderRadius: 10,
            padding: 15,
            marginBottom: 8,
          }}
        >
          <Text style={{ color: "#333" }}>Porto Tour Ticket</Text>
          <Text style={{ color: "red", marginTop: 2 }}>-€18.00</Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#009688",
            borderRadius: 10,
            paddingVertical: 12,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>
            View All Transactions
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
