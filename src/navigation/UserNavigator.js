
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { AuthContext } from "../context/AuthContext";
import { colors, spacing, typography } from "../theme/ui";

import HomeScreen from "../screens/user/HomeScreen";
import MyOrdersScreen from "../screens/user/MyOrdersScreen";
import ProfileScreen from "../screens/user/ProfileScreen";
import AllServicesScreen from "../screens/user/AllServicesScreen";

import AddressScreen from "../screens/user/AddressScreen";
import BookingSuccessScreen from "../screens/user/BookingSuccessScreen";
import ConfirmBookingScreen from "../screens/user/ConfirmBookingScreen";
import OrderDetailsScreen from "../screens/user/OrderDetailsScreen";
import SlotScreen from "../screens/user/SlotScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function TabScreens() {
    const { user } = useContext(AuthContext);

    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
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
                        <View style={styles.headerAvatar}>
                            {user?.profileImageUri ? (
                                <Image
                                    source={{ uri: user.profileImageUri }}
                                    style={styles.headerAvatarImage}
                                    contentFit="cover"
                                />
                            ) : (
                                <MaterialCommunityIcons name="account" size={20} color={colors.primary} />
                            )}
                        </View>
                        <View style={styles.headerTextWrap}>
                            <Text style={styles.headerName}>
                                {user?.name ?? "Customer"}
                            </Text>
                            <Text style={styles.headerEmail}>
                                {user?.email ?? "customer@solarcleaner.app"}
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
                    <Pressable
                        hitSlop={8}
                        style={styles.notificationButton}
                    >
                        <MaterialCommunityIcons name="bell-outline" size={22} color={colors.textPrimary} />
                        <View style={styles.notificationBadge}>
                            <Text style={styles.notificationCount}>
                                {user?.notificationsCount ?? 0}
                            </Text>
                        </View>
                    </Pressable>
                ),
                tabBarIcon: ({ color, size, focused }) => {
                    const iconByRoute = {
                        Home: "home-variant",
                        MyOrders: "clipboard-list",
                        Profile: "account-circle",
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
                name="Home"
                component={HomeScreen}
            />

            <Tab.Screen
                name="MyOrders"
                component={MyOrdersScreen}
                options={{ title: "My Orders" }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
            />

        </Tab.Navigator>

    );

}


export default function UserNavigator() {
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
                name="Address"
                component={AddressScreen}
                options={{
                    title: "Enter Address",
                    headerBackVisible: true
                }}
            />

            <Stack.Screen
                name="AllServices"
                component={AllServicesScreen}
                options={{
                    title: "All Services",
                    headerBackVisible: true
                }}
            />

            <Stack.Screen
                name="Slot"
                component={SlotScreen}
                options={{
                    title: "Select Slot",
                    headerBackVisible: true
                }}
            />

            <Stack.Screen
                name="ConfirmBooking"
                component={ConfirmBookingScreen}
                options={{
                    title: "Confirm Booking",
                    headerBackVisible: true
                }}
            />

            <Stack.Screen
                name="Success"
                component={BookingSuccessScreen}
                options={{
                    title: "Booking Successful",
                    headerBackVisible: true
                }}
            />

            <Stack.Screen
                name="OrderDetails"
                component={OrderDetailsScreen}
                options={{
                    title: "Order Details",
                    headerBackVisible: true
                }}
            />

        </Stack.Navigator>

    );

}

const styles = StyleSheet.create({
    headerTitleWrap: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm
    },
    headerAvatar: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: colors.chip,
        alignItems: "center",
        justifyContent: "center"
    },
    headerAvatarImage: {
        width: "100%",
        height: "100%",
        borderRadius: 19
    },
    headerTextWrap: {
        gap: 2
    },
    headerName: {
        color: colors.textPrimary,
        fontSize: typography.body,
        fontWeight: "700"
    },
    headerEmail: {
        color: colors.textSecondary,
        fontSize: 12
    },
    notificationButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: colors.chip,
        alignItems: "center",
        justifyContent: "center"
    },
    notificationBadge: {
        position: "absolute",
        top: 6,
        right: 5,
        minWidth: 16,
        height: 16,
        borderRadius: 8,
        paddingHorizontal: 4,
        backgroundColor: "#E74C3C",
        alignItems: "center",
        justifyContent: "center"
    },
    notificationCount: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "700"
    }
});
