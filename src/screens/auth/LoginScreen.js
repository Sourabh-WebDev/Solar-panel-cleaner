import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

export default function LoginScreen({ navigation, route }) {
    const [phone, setPhone] = useState("");
    const formTranslateY = useRef(new Animated.Value(0)).current;
    const role = route?.params?.role ?? "user";
    const roleLabel = role === "technician" ? "Technician" : "Customer";

    useEffect(() => {
        const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
        const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

        const handleKeyboardShow = () => {
            Animated.timing(formTranslateY, {
                toValue: -110,
                duration: 250,
                useNativeDriver: true,
            }).start();
        };

        const handleKeyboardHide = () => {
            Animated.timing(formTranslateY, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }).start();
        };

        const showSubscription = Keyboard.addListener(showEvent, handleKeyboardShow);
        const hideSubscription = Keyboard.addListener(hideEvent, handleKeyboardHide);

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, [formTranslateY]);

    const sendOtp = () => {
        if (phone.length < 10) {
            alert("Enter valid phone number");
            return;
        }

        Keyboard.dismiss();
        navigation.navigate("VerifyOtp", { phone, role });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >

            {/* Top Card */}
            <View style={styles.topCard}>
                <Image
                    source={require("../../../assets/images/solar-panel-cleaner-pro-high-resolution-logo-transparent.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <Svg
                height="80"
                width="100%"
                viewBox="0 0 1440 320"
                style={styles.wave}
            >
                <Path
                    fill="#ffffff"
                    d="M0,160L80,154.7C160,149,320,139,480,160C640,181,800,235,960,245.3C1120,256,1280,224,1360,208L1440,192L1440,0L0,0Z"
                />
            </Svg>

            {/* Login Section */}
            <Animated.View
                style={[
                    styles.loginSection,
                    { transform: [{ translateY: formTranslateY }] },
                ]}
            >
                <Text style={styles.loginTitle}>{roleLabel} Login</Text>

                <Text style={styles.loginSubtitle}>
                    Enter your phone number to login as {roleLabel.toLowerCase()}
                </Text>

                {/* Phone Input */}
                <View style={styles.phoneContainer}>
                    <Text style={styles.countryCode}>+91</Text>

                    <TextInput
                        style={styles.phoneInput}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        underlineColorAndroid="transparent"
                        value={phone}
                        onChangeText={setPhone}
                    />
                </View>

                {/* Login Button */}
                <TouchableOpacity activeOpacity={0.8} onPress={sendOtp}>
                    <LinearGradient
                        colors={["#1DA1F2", "#4B6CFF"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.loginButton}
                    >
                        <Text style={styles.loginButtonText}>{roleLabel} Login</Text>

                        <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
            <Text style={styles.footer}>Design by Thewemade</Text>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEF2F7",
        padding: 0,
    },

    topCard: {
        backgroundColor: "#fff",
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 5,
        paddingTop: 5,
        alignItems: "center",
        marginTop: 0,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 15,
        elevation: 5,
    },

    logo: {
        width: 250,
        height: 150,
    },

    brand: {
        fontSize: 26,
        fontWeight: "700",
        color: "#2A7DE1",
    },

    loginSection: {
        marginTop: 5,
        padding: 20,
    },

    loginTitle: {
        fontSize: 30,
        fontWeight: "900",
        color: "#18131348",
        lineHeight: 48,
        letterSpacing: -1,
        marginBottom: 6,
    },

    loginSubtitle: {
        color: "#7A7A7A",
        marginBottom: 20,
    },

    phoneContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D9D9D9",
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 25,
        backgroundColor: "#fff",
    },

    countryCode: {
        fontWeight: "600",
        marginRight: 10,
    },

    phoneInput: {
        flex: 1,
        fontSize: 16,
        borderWidth: 0,
        outlineStyle: "none",
    },

    loginButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 30,
    },

    loginButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },

    wave: {
        marginTop: -5,
    },

    footer: {
        marginTop: "auto",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "900",
        color: "#6e494948",
        lineHeight: 48,
        letterSpacing: -1,
        paddingBottom: 20,
    },
});
