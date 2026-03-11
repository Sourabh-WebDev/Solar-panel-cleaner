import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors, typography } from "../theme/ui";

import GuestHomeScreen from "../screens/auth/GuestHomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RoleSelectScreen from "../screens/auth/RoleSelectScreen";
import SplashScreen from "../screens/auth/SplashScreen";
import VerifyOtpScreen from "../screens/auth/VerifyOtpScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerShadowVisible: false,
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontSize: typography.h3,
          fontWeight: "700",
        },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="GuestHome"
        component={GuestHomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="RoleSelect"
        component={RoleSelectScreen}
        options={{
          title: "Choose Role",
          headerBackVisible: true,
        }}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({ route }) => ({
          title: route?.params?.role === "technician" ? "Technician Sign In" : "Customer Sign In",
          headerBackVisible: true,
        })}
      />

      <Stack.Screen
        name="VerifyOtp"
        component={VerifyOtpScreen}
        options={({ route }) => ({
          title: route?.params?.role === "technician" ? "Verify Technician OTP" : "Verify Customer OTP",
          headerBackVisible: true,
        })}
      />

    </Stack.Navigator>
  );

}
