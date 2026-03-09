import { useContext } from "react";
import { Pressable, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";
import { colors, typography } from "../theme/ui";

import AcceptJobScreen from "../screens/technician/AcceptJobScreen";
import CompleteJobScreen from "../screens/technician/CompleteJobScreen";
import EarningsScreen from "../screens/technician/EarningsScreen";
import JobDetailsScreen from "../screens/technician/JobDetailsScreen";
import JobListScreen from "../screens/technician/JobListScreen";
import StartJobScreen from "../screens/technician/StartJobScreen";
import TechnicianDashboardScreen from "../screens/technician/TechnicianDashboardScreen";

const Stack = createNativeStackNavigator();

export default function TechnicianNavigator() {
    const { setUser } = useContext(AuthContext);

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.surface,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border
                },
                headerShadowVisible: false,
                headerTintColor: colors.textPrimary,
                headerTitleStyle: {
                    fontSize: typography.h3,
                    fontWeight: "700"
                },
                headerRightContainerStyle: {
                    paddingRight: 14
                },
                headerLeftContainerStyle: {
                    paddingLeft: 8
                },
                headerRight: () => (
                    <Pressable
                        onPress={() => setUser(null)}
                        hitSlop={8}
                        style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                    >
                        <MaterialCommunityIcons name="logout" size={18} color={colors.primary} />
                        <Text style={{ color: colors.primary, fontWeight: "700" }}>
                            Logout
                        </Text>
                    </Pressable>
                ),
                contentStyle: { backgroundColor: colors.background }
            }}
        >

            <Stack.Screen
                name="TechnicianDashboard"
                component={TechnicianDashboardScreen}
                options={{ title: "Technician Dashboard" }}
            />
            <Stack.Screen
                name="AvailableJobs"
                component={JobListScreen}
                options={{
                    title: "Available Jobs",
                    headerBackVisible: true
                }}
            />
            <Stack.Screen
                name="JobDetails"
                component={JobDetailsScreen}
                options={{
                    title: "Job Details",
                    headerBackVisible: true
                }}
            />
            <Stack.Screen
                name="AcceptJob"
                component={AcceptJobScreen}
                options={{
                    title: "Accept Job",
                    headerBackVisible: true
                }}
            />
            <Stack.Screen
                name="StartJob"
                component={StartJobScreen}
                options={{
                    title: "Start Job",
                    headerBackVisible: true
                }}
            />
            <Stack.Screen
                name="CompleteJob"
                component={CompleteJobScreen}
                options={{
                    title: "Complete Job",
                    headerBackVisible: true
                }}
            />
            <Stack.Screen
                name="Earnings"
                component={EarningsScreen}
                options={{
                    title: "Earnings",
                    headerBackVisible: true
                }}
            />

        </Stack.Navigator>
    );

}
