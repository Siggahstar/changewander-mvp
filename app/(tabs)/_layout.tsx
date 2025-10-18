import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#009688", // Teal accent
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0.5,
          borderTopColor: "#e0e0e0",
          height: 60,
          elevation: 6,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowOffset: { width: 0, height: -2 },
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
          fontWeight: "500",
        },
      }}
    >
      {/* 🏠 Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? ("home" as any) : ("home-outline" as any)}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* 💳 Wallet */}
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? ("wallet" as any) : ("wallet-outline" as any)}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* 🚌 Transport */}
      <Tabs.Screen
        name="transport"
        options={{
          title: "Transport",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? ("bus" as any) : ("bus-outline" as any)}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* 🏛️ AR Guide */}
      <Tabs.Screen
        name="ar-guide"
        options={{
          title: "AR Guide",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? ("cube" as any) : ("cube-outline" as any)}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* 🔍 Explore - last item */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? ("compass" as any) : ("compass-outline" as any)}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
