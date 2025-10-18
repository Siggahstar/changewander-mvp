import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function WalletScreen() {
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
          Wallet
        </Text>
        <Ionicons name="card-outline" size={28} color="#009688" />
      </View>

      {/* Balance Card */}
      <View
        style={{
          backgroundColor: "#009688",
          borderRadius: 18,
          padding: 20,
          alignItems: "center",
          marginBottom: 25,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 14 }}>Available Balance</Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 36,
            fontWeight: "bold",
            marginVertical: 6,
          }}
        >
          €693.09
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            borderRadius: 8,
            paddingVertical: 8,
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ color: "#009688", fontWeight: "600" }}>Top Up</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 25,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <Ionicons name="arrow-up-circle-outline" size={32} color="#009688" />
          <Text style={{ color: "#444", fontSize: 13 }}>Send</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <Ionicons
            name="arrow-down-circle-outline"
            size={32}
            color="#009688"
          />
          <Text style={{ color: "#444", fontSize: 13 }}>Receive</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <Ionicons name="cash-outline" size={32} color="#009688" />
          <Text style={{ color: "#444", fontSize: 13 }}>Exchange</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction History */}
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
        Recent Transactions
      </Text>

      {[
        { title: "Lisbon Café", amount: "-€4.50", type: "out" },
        { title: "Porto Tour", amount: "-€18.00", type: "out" },
        { title: "Wallet Top-up", amount: "+€50.00", type: "in" },
      ].map((tx, i) => (
        <View
          key={i}
          style={{
            backgroundColor: "#f5f5f5",
            borderRadius: 10,
            padding: 15,
            marginBottom: 8,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#333" }}>{tx.title}</Text>
          <Text
            style={{
              color: tx.type === "in" ? "#009688" : "red",
              fontWeight: "500",
            }}
          >
            {tx.amount}
          </Text>
        </View>
      ))}

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
          View Full History
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
