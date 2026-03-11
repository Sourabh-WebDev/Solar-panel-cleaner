import { useEffect } from "react";
import { Image, StatusBar, StyleSheet, View } from "react-native";

const SPLASH_DELAY_MS = 1800;

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("RoleSelect");
    }, SPLASH_DELAY_MS);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Image
        source={require("../../../assets/images/splash-icon.png")}
        style={styles.splashImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});