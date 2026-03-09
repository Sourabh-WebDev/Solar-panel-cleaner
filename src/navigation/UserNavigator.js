
import { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";
import { colors, typography } from "../theme/ui";

import HomeScreen from "../screens/user/HomeScreen";
import MyOrdersScreen from "../screens/user/MyOrdersScreen";
import ProfileScreen from "../screens/user/ProfileScreen";

import AddressScreen from "../screens/user/AddressScreen";
import BookingSuccessScreen from "../screens/user/BookingSuccessScreen";
import ConfirmBookingScreen from "../screens/user/ConfirmBookingScreen";
import OrderDetailsScreen from "../screens/user/OrderDetailsScreen";
import SlotScreen from "../screens/user/SlotScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function TabScreens() {
    const { setUser } = useContext(AuthContext);

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
