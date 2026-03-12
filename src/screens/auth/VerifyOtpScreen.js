import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useRef, useState } from "react";
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
import { AuthContext } from "../../context/AuthContext";

export default function VerifyOtpScreen({ route }) {

    const { phone, role = "user" } = route.params;
    const [otp, setOtp] = useState("");
    const [secondsLeft, setSecondsLeft] = useState(120);
    const { setUser } = useContext(AuthContext);
    const roleLabel = role === "technician" ? "Technician" : "Customer";
    const formTranslateY = useRef(new Animated.Value(0)).current;
    const otpInputRef = useRef(null);

    useEffect(() => {
        if (secondsLeft <= 0) {
            return undefined;
        }

        const timer = setInterval(() => {
            setSecondsLeft((current) => {
                if (current <= 1) {
                    clearInterval(timer);
                    return 0;
                }

                return current - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [secondsLeft]);

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

    const verifyOtp = () => {

        if (otp !== "1234") {
            alert("Demo OTP is 1234");
            return;
        }

        setUser({
            name: role === "technician" ? "Demo Technician" : "Demo Customer",
            role,
            profileImageUri: null,
        });

    };

    const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const seconds = String(secondsLeft % 60).padStart(2, "0");
    const otpDigits = Array.from({ length: 4 }, (_, index) => otp[index] ?? "");

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
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

            <Animated.View
                style={[
                    styles.verifySection,
                    { transform: [{ translateY: formTranslateY }] },
                ]}
            >
                <Text style={styles.verifyTitle}>Verify OTP</Text>
                <Text style={styles.verifySubtitle}>
                    Enter the OTP sent to +91 {phone} for {roleLabel.toLowerCase()} login
                </Text>

                {/* <View style={styles.roleBadge}>
                    <Text style={styles.roleBadgeText}>{roleLabel}</Text>
                </View> */}

                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.otpWrapper}
                    onPress={() => otpInputRef.current?.focus()}
                >
                    <TextInput
                        ref={otpInputRef}
                        style={styles.hiddenInput}
                        keyboardType="number-pad"
                        value={otp}
                        onChangeText={(value) => setOtp(value.replace(/\D/g, ""))}
                        maxLength={4}
                    />
                    <View style={styles.otpRow}>
                        {otpDigits.map((digit, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.otpBox,
                                    digit ? styles.otpBoxFilled : null,
                                ]}
                            >
                                <Text style={styles.otpDigit}>{digit}</Text>
                            </View>
                        ))}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} onPress={verifyOtp}>
                    <LinearGradient
                        colors={["#1DA1F2", "#4B6CFF"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.verifyButton}
                    >
                        <Text style={styles.verifyButtonText}>Verify OTP</Text>
                        <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </LinearGradient>
                </TouchableOpacity>

                <View style={styles.resendRow}>
                    <Text style={styles.resendText}>Dont recive otp code ? </Text>
                    <TouchableOpacity activeOpacity={0.7}>
                        <Text style={styles.resendLink}>resend otp</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.timerRow}>
                    <Ionicons name="time-outline" size={16} color="#7A7A7A" />
                    <Text style={styles.timerText}>
                        {minutes}:{seconds}
                    </Text>
                </View>
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

    wave: {
        marginTop: -5,
    },

    verifySection: {
        marginTop: 5,
        padding: 20,
    },

    verifyTitle: {
        fontSize: 30,
        fontWeight: "900",
        color: "#18131348",
        lineHeight: 48,
        letterSpacing: -1,
        marginBottom: 6,
    },

    verifySubtitle: {
        color: "#7A7A7A",
        marginBottom: 14,
    },

    roleBadge: {
        alignSelf: "flex-start",
        backgroundColor: "#EAF1FF",
        borderWidth: 1,
        borderColor: "#CFE0FF",
        borderRadius: 30,
        paddingHorizontal: 14,
        paddingVertical: 6,
        marginBottom: 20,
    },

    roleBadgeText: {
        color: "#2A7DE1",
        fontWeight: "700",
        fontSize: 13,
    },

    otpWrapper: {
        marginBottom: 25,
    },

    hiddenInput: {
        position: "absolute",
        opacity: 0,
        width: 1,
        height: 1,
    },

    otpRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },

    otpBox: {
        flex: 1,
        height: 62,
        borderWidth: 1,
        borderColor: "#D9D9D9",
        borderRadius: 18,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    otpBoxFilled: {
        borderColor: "#4B6CFF",
        backgroundColor: "#F4F7FF",
    },

    otpDigit: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1F2937",
    },

    verifyButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 14,
        paddingHorizontal: 20,
        borderRadius: 30,
    },

    verifyButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },

    resendRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 18,
    },

    resendText: {
        color: "#7A7A7A",
        fontSize: 14,
    },

    resendLink: {
        color: "#2A7DE1",
        fontSize: 14,
        fontWeight: "700",
        textTransform: "capitalize",
    },

    timerRow: {
        marginTop: 8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
    },

    timerText: {
        textAlign: "center",
        color: "#7A7A7A",
        fontSize: 13,
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
