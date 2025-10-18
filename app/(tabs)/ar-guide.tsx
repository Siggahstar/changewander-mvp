import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ARGuideScreen() {
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
          AR Cultural Guide
        </Text>
        <Ionicons name="cube-outline" size={28} color="#009688" />
      </View>

      {/* Intro Card */}
      <View
        style={{
          backgroundColor: "#009688",
          borderRadius: 18,
          padding: 20,
          marginBottom: 25,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
          Explore Portugal in Augmented Reality 🌐
        </Text>
        <Text style={{ color: "#fff", marginTop: 6 }}>
          Discover landmarks and cultural sites through immersive AR guides.
        </Text>
      </View>

      {/* AR Sites List */}
      {[
        {
          title: "Belém Tower",
          desc: "Historic fortress and UNESCO site by the Tagus River.",
          img: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Torre_de_Bel%C3%A9m_-_Lisboa%2C_Portugal.jpg",
        },
        {
          title: "Porto Ribeira",
          desc: "AR walking tour through colorful riverside streets.",
          img: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Ribeira_-_Porto.jpg",
        },
        {
          title: "Sintra Palace",
          desc: "Experience Portuguese Romantic architecture in 3D.",
          img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/National_Palace_of_Sintra_-_2019.jpg",
        },
      ].map((spot, i) => (
        <View
          key={i}
          style={{
            backgroundColor: "#f5f5f5",
            borderRadius: 12,
            padding: 15,
            marginBottom: 15,
          }}
        >
          <Image
            source={{ uri: spot.img }}
            style={{
              width: "100%",
              height: 160,
              borderRadius: 10,
              marginBottom: 10,
            }}
          />
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#009688" }}>
            {spot.title}
          </Text>
          <Text style={{ color: "#444", fontSize: 13, marginTop: 4 }}>
            {spot.desc}
          </Text>

          <TouchableOpacity
            style={{
              marginTop: 10,
              backgroundColor: "#009688",
              borderRadius: 8,
              paddingVertical: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>View in AR</Text>
          </TouchableOpacity>
        </View>
      ))}

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
