import { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { AuthContext } from "../context/AuthContext";
import { colors, typography } from "../theme/ui";
import { technicianStats } from "../services/api";

import AcceptJobScreen from "../screens/technician/AcceptJobScreen";
import CompleteJobScreen from "../screens/technician/CompleteJobScreen";
import EarningsScreen from "../screens/technician/EarningsScreen";
import IncomingRequestScreen from "../screens/technician/IncomingRequestScreen";
import JobDetailsScreen from "../screens/technician/JobDetailsScreen";
import JobListScreen from "../screens/technician/JobListScreen";
import StartJobScreen from "../screens/technician/StartJobScreen";
import TechnicianAcceptedJobsScreen from "../screens/technician/TechnicianAcceptedJobsScreen";
import TechnicianDashboardScreen from "../screens/technician/TechnicianDashboardScreen";
import TechnicianProfileScreen from "../screens/technician/TechnicianProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabScreens() {
    const { user } = useContext(AuthContext);

    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
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
                headerTitleAlign: "left",
                headerTitle: () => (
                    <View style={styles.headerTitleWrap}>
                        <Text style={styles.headerTitleName}>
                            {user?.name ?? "Technician"}
                        </Text>
                        <View style={styles.headerEarningsRow}>
                            <MaterialCommunityIcons
                                name="currency-inr"
                                size={14}
                                color={colors.success}
                            />
                            <Text style={styles.headerEarningsText}>
                                {technicianStats.earnings}
                            </Text>
                        </View>
                    </View>
                ),
                headerRightContainerStyle: {
                    paddingRight: 14
                },
                headerLeftContainerStyle: {
                    paddingLeft: 8
                },
                headerRight: () => (
                    route.name === "TechnicianProfile" ? null : (
                        <Pressable
                            onPress={() => navigation.navigate("TechnicianProfile")}
                            hitSlop={8}
                            style={styles.headerProfileButton}
                        >
                            {user?.profileImageUri ? (
                                <Image
                                    source={{ uri: user.profileImageUri }}
                                    style={styles.headerProfileImage}
                                    contentFit="cover"
                                />
                            ) : (
                                <MaterialCommunityIcons
                                    name="account-circle"
                                    size={24}
                                    color={colors.primary}
                                />
                            )}
                        </Pressable>
                    )
                ),
                tabBarIcon: ({ color, size, focused }) => {
                    const iconByRoute = {
                        TechnicianHome: "home-variant",
                        AcceptedJobs: "clipboard-check-outline",
                        TechnicianProfile: "account-circle"
                    };
                    const iconName = iconByRoute[route.name] || "circle";
                    return (
                        <View style={{ opacity: focused ? 1 : 0.9 }}>
                            <MaterialCommunityIcons name={iconName} size={size ?? 22} color={color} />
                        </View>
                    );
                },
                tabBarStyle: {
                    height: 64,
                    paddingBottom: 8,
                    paddingTop: 8,
                    backgroundColor: colors.surface,
                    borderTopColor: colors.border
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600"
                }
            })}
        >
            <Tab.Screen
                name="TechnicianHome"
                component={TechnicianDashboardScreen}
                options={{ title: "Home" }}
            />
            <Tab.Screen
                name="AcceptedJobs"
                component={TechnicianAcceptedJobsScreen}
                options={{ title: "Accepted Jobs" }}
            />
            <Tab.Screen
                name="TechnicianProfile"
                component={TechnicianProfileScreen}
                options={{ title: "Profile" }}
            />
        </Tab.Navigator>
    );
}

export default function TechnicianNavigator() {
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
                contentStyle: { backgroundColor: colors.background }
            }}
        >

            <Stack.Screen
                name="Tabs"
                component={TabScreens}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="IncomingRequest"
                component={IncomingRequestScreen}
                options={{
                    title: "Incoming Request",
                    presentation: "fullScreenModal",
                    headerBackVisible: false
                }}
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

const styles = {
    headerTitleWrap: {
        gap: 2
    },
    headerTitleName: {
        color: colors.textPrimary,
        fontSize: typography.body,
        fontWeight: "700"
    },
    headerEarningsRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2
    },
    headerEarningsText: {
        color: colors.success,
        fontSize: 12,
        fontWeight: "700"
    },
    headerProfileButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: colors.chip,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
    },
    headerProfileImage: {
        width: "100%",
        height: "100%"
    }
};
