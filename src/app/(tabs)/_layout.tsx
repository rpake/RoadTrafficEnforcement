import { Tabs, Redirect } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useSession } from "@/context/AuthProvider";
export default function TabsLayout() {
  const { session, loading } = useSession();
  if (loading) return <ActivityIndicator />;
  if (!session) return <Redirect href="/(auth)/login" />;
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#163C65" }}>
      <Tabs.Screen name="index" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="scan" options={{ title: "Scan" }} />
      <Tabs.Screen name="violations" options={{ title: "Records" }} />
      <Tabs.Screen name="vehicles" options={{ title: "Vehicles" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
