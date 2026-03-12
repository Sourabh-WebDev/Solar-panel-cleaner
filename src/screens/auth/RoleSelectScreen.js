import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
    Animated,
    Easing,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

export default function RoleSelectScreen({ navigation }) {

    const spinValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(1)).current;
    const opacityValue = useRef(new Animated.Value(1)).current;

    useEffect(() => {

        // Rotation
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 7000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        // Scale pulse
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleValue, {
                    toValue: 1.1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleValue, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Opacity pulse
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacityValue, {
                    toValue: 0.7,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityValue, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();

    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <View style={styles.container}>

            {/* Animated Illustration */}
            <Animated.Image
                source={require("../../../assets/images/solar-illustration.png")}
                resizeMode="contain"
                style={[
                    styles.illustration,
                    {
                        opacity: opacityValue,
                        transform: [
                            { rotate: spin },
                            { scale: scaleValue }
                        ]
                    }
                ]}
            />

            <Image
                source={require("../../../assets/images/solar-panel-model.png")}
                resizeMode="contain"
                style={styles.panelImage}
            />

            {/* Hero Typography */}
            <View style={styles.header}>
                <Text style={styles.heroBig}>Let Your Solar Shine Brighter</Text>

                <Text style={styles.subtitle}>
                    Select your role to continue
                </Text>
            </View>

            {/* Cards */}
            <View>

                <TouchableOpacity
                    style={styles.userCard}
                    onPress={() => navigation.navigate("Login", { role: "user" })}
                >

                    <View style={styles.cardRow}>

                        <View style={styles.cardContent}>

                            <View style={styles.row}>
                                <MaterialCommunityIcons
                                    name="account"
                                    size={24}
                                    color={colors.primary}
                                />
                                <Text style={styles.cardTitle}>Customer Login</Text>
                            </View>

                            <Text style={styles.cardSubtitle}>
                                Book and track solar cleaning services
                            </Text>

                        </View>

                        <MaterialCommunityIcons
                            name="chevron-right"
                            size={24}
                            color={colors.textSecondary}
                        />

                    </View>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.techCard}
                    onPress={() => navigation.navigate("Login", { role: "technician" })}
                >

                    <View style={styles.cardRow}>

                        <View style={styles.cardContent}>

                            <View style={styles.row}>
                                <MaterialCommunityIcons
                                    name="wrench-cog"
                                    size={24}
                                    color={colors.success}
                                />
                                <Text style={styles.cardTitle}>Technician Login</Text>
                            </View>

                            <Text style={styles.cardSubtitle}>
                                Manage jobs and earnings
                            </Text>

                        </View>

                        <MaterialCommunityIcons
                            name="chevron-right"
                            size={24}
                            color={colors.textSecondary}
                        />

                    </View>

                </TouchableOpacity>

            </View>

            {/* Footer */}
            <Text style={styles.footer}>
                Crafted with ❤️ in India
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: colors.background,
        padding: spacing.lg,
    },

    illustration: {
        width: "100%",
        height: 180,
        alignSelf: "center",
    },

    panelImage: {
        width: "100%",
        height: 110,
        alignSelf: "center",
        marginTop: -50,
    },

    header: {
        marginTop: spacing.md,
        alignItems: "center",
    },

    heroBig: {
        fontSize: 34,
        fontWeight: "900",
        color: "#6e494948",
        lineHeight: 58,
        letterSpacing: -1,
        textAlign: "center",
    },

    subtitle: {
        marginTop: spacing.lg,
        color: colors.textSecondary,
        fontSize: typography.body,
        textAlign: "center",
    },

    userCard: {

        backgroundColor: "#EAF1FF",
        borderWidth: 1,
        borderColor: "#CFE0FF",
        borderRadius: radius.lg,
        padding: spacing.lg,
        marginBottom: spacing.md,
        ...shadow,
    },

    techCard: {
        backgroundColor: "#EAFBF1",
        borderWidth: 1,
        borderColor: "#C9EDD9",
        borderRadius: radius.lg,
        padding: spacing.lg,
        ...shadow,
    },

    cardTitle: {
        color: colors.textPrimary,
        fontSize: typography.h3,
        fontWeight: "700",
    },

    cardSubtitle: {
        marginTop: spacing.xs,
        color: colors.textSecondary,
        fontSize: typography.body,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    footer: {
        textAlign: "center",
        color: colors.textSecondary,
        fontSize: typography.caption,
    },

    cardRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    cardContent: {
        flex: 1,
    },

});
