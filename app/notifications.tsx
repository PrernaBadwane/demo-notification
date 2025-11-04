import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function NotificationsScreen() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("unread");
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Welcome to Bright Tuition Care!",
      message: "Complete your profile to get more job opportunities.",
      date: "4 Nov, 2025",
      read: false,
    },
    {
      id: "2",
      title: "New Job Alert!",
      message: "A new tuition job near you has been posted.",
      date: "3 Nov, 2025",
      read: true,
    },
  ]);

  const handleNotificationPress = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const filtered = activeTab === "unread"
    ? notifications.filter(n => !n.read)
    : notifications;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "unread" && styles.activeTab]}
          onPress={() => setActiveTab("unread")}
        >
          <Text style={[styles.tabText, activeTab === "unread" && styles.activeText]}>
            Unread
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "all" && styles.activeTab]}
          onPress={() => setActiveTab("all")}
        >
          <Text style={[styles.tabText, activeTab === "all" && styles.activeText]}>
            All
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.notification}
            onPress={() => handleNotificationPress(item.id)}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            {!item.read && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  tab: { flex: 1, alignItems: "center", paddingVertical: 8 },
  activeTab: { borderBottomWidth: 2, borderColor: "#007bff" },
  tabText: { color: "#666", fontSize: 14 },
  activeText: { color: "#007bff", fontWeight: "bold" },
  notification: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 12,
    marginVertical: 6,
  },
  title: { fontWeight: "600", fontSize: 15 },
  message: { color: "#666", fontSize: 13 },
  date: { color: "#999", fontSize: 11, marginTop: 4 },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#007bff",
    marginLeft: 10,
  },
});
