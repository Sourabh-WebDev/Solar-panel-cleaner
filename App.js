import { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthContext, AuthProvider } from "./src/context/AuthContext";
import RootNavigator from "./src/navigation/RootNavigator";
import { navigationRef } from "./src/navigation/navigationRef";
import {
  ensureServiceRequestPermissions,
  initializeServiceRequestManager,
  registerBackgroundServiceRequestHandler,
} from "./src/services/serviceRequestManager";

registerBackgroundServiceRequestHandler();

function AppShell() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.role !== "technician") {
      return undefined;
    }

    ensureServiceRequestPermissions();
    return initializeServiceRequestManager({ isTechnician: true });
  }, [user?.role]);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}
