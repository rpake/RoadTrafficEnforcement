import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useSession } from "@/context/AuthProvider";
function Routes() {
  const { session, loading } = useSession();
  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#163C65" },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Protected guard={!session}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="remote/create"
            options={{ title: "Create Remote Record" }}
          />
          <Stack.Screen
            name="remote/[id]"
            options={{ title: "Record Detail" }}
          />
          <Stack.Screen
            name="remote/edit/[id]"
            options={{ title: "Edit Record" }}
          />
          <Stack.Screen
            name="map/index"
            options={{ title: "Offence Locations" }}
          />
          <Stack.Screen
            name="violation/create"
            options={{ title: "Local Draft" }}
          />
          <Stack.Screen
            name="violation/[id]"
            options={{ title: "Local Detail" }}
          />
          <Stack.Screen
            name="violation/evidence"
            options={{ title: "Evidence" }}
          />
          <Stack.Screen
            name="fine/index"
            options={{ title: "Fine Schedule" }}
          />
          <Stack.Screen
            name="fine/calculator"
            options={{ title: "Fine Calculator" }}
          />
          <Stack.Screen name="fine/[id]" options={{ title: "Fine Detail" }} />
          <Stack.Screen
            name="driver/scan"
            options={{ title: "Driver Scanner" }}
          />
          <Stack.Screen
            name="driver/search"
            options={{ title: "Driver Lookup" }}
          />
          <Stack.Screen
            name="driver/[id]"
            options={{ title: "Driver Detail" }}
          />
          <Stack.Screen
            name="vehicle/scan"
            options={{ title: "Vehicle Scanner" }}
          />
          <Stack.Screen
            name="vehicle/search"
            options={{ title: "Vehicle Lookup" }}
          />
          <Stack.Screen
            name="vehicle/[plate]"
            options={{ title: "Vehicle Detail" }}
          />
          <Stack.Screen name="ticket/[id]" options={{ title: "Demo Ticket" }} />
          <Stack.Screen name="ticket/receipt" options={{ title: "Receipt" }} />
          <Stack.Screen
            name="payment/index"
            options={{ title: "Payment Status" }}
          />
          <Stack.Screen
            name="payment/[id]"
            options={{ title: "Payment Detail" }}
          />
          <Stack.Screen name="reports/index" options={{ title: "Reports" }} />
        </Stack.Protected>
      </Stack>
    </>
  );
}
export default function RootLayout() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
