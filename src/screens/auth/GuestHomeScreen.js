import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

export default function GuestHomeScreen({ navigation }) {

    return (

        <SafeAreaView style={styles.safeArea}>

            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>

                <Text style={styles.logo}>
                    SolarClean
                </Text>

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate("RoleSelect")}
                >
                    <MaterialCommunityIcons
                        name="login"
                        size={16}
                        color="#fff"
                    />
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                <View style={styles.heroCard}>

                    <Image
                        source={require("../../../assets/images/solar-panels.png")}
                        style={styles.heroImage}
                    />

                    <Text style={styles.title}>
                        Solar Panel Cleaning
                    </Text>

                    <Text style={styles.subtitle}>
                        Improve solar panel efficiency with professional
                        cleaning and maintenance services for homes
                        and businesses.
                    </Text>

                </View>

                <View style={styles.infoCard}>

                    <Text style={styles.infoTitle}>
                        Why Choose Us
                    </Text>

                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="check-circle" size={16} color={colors.success} />
                        <Text style={styles.infoItem}>Verified technicians</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="leaf" size={16} color={colors.success} />
                        <Text style={styles.infoItem}>Eco-friendly cleaning</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="clock-check" size={16} color={colors.success} />
                        <Text style={styles.infoItem}>Flexible service slots</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="cash-check" size={16} color={colors.success} />
                        <Text style={styles.infoItem}>Transparent pricing</Text>
                    </View>

                </View>

                <Text style={styles.sectionTitle}>
                    Our Services
                </Text>

                <View style={styles.serviceGrid}>

                    <View style={styles.serviceCard}>
                        <MaterialCommunityIcons
                            name="solar-power"
                            size={28}
                            color={colors.primary}
                        />
                        <Text style={styles.serviceText}>
                            Solar Panel Cleaning
                        </Text>
                    </View>

                    <View style={styles.serviceCard}>
                        <MaterialCommunityIcons
                            name="tools"
                            size={28}
                            color={colors.primary}
                        />
                        <Text style={styles.serviceText}>
                            Solar Maintenance
                        </Text>
                    </View>

                    <View style={styles.serviceCard}>
                        <MaterialCommunityIcons
                            name="air-conditioner"
                            size={28}
                            color={colors.primary}
                        />
                        <Text style={styles.serviceText}>
                            Panel Cleaning
                        </Text>
                    </View>

                    <View style={styles.serviceCard}>
                        <MaterialCommunityIcons
                            name="clipboard-search"
                            size={28}
                            color={colors.primary}
                        />
                        <Text style={styles.serviceText}>
                            Panel Inspection
                        </Text>
                    </View>

                </View>

                <View style={styles.footer}>

                    <Text style={styles.footerText}>
                        (c) 2026 SolarClean
                    </Text>

                    <Text style={styles.footerText}>
                        Designed and Developed by XYZ
                    </Text>

                </View>

            </ScrollView>

            <TouchableOpacity
                style={styles.ctaButton}
                onPress={() => navigation.navigate("RoleSelect")}
            >
                <MaterialCommunityIcons name="calendar-check" size={18} color="#fff" />
                <Text style={styles.ctaText}>
                    Book Cleaning
                </Text>
            </TouchableOpacity>

        </SafeAreaView>

    );

}

const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: colors.surface
    },

    header: {
        height: 60,
        paddingHorizontal: spacing.lg,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface
    },

    logo: {
        fontSize: 20,
        fontWeight: "800",
        color: colors.primary
    },

    loginButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: radius.pill,
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },

    loginText: {
        color: "#fff",
        fontWeight: "700"
    },

    scrollContent: {
        paddingBottom: 140
    },

    heroCard: {
        margin: spacing.lg,
        borderRadius: radius.lg,
        overflow: "hidden",
        backgroundColor: colors.surface,
        ...shadow
    },

    heroImage: {
        width: "100%",
        height: 180
    },

    title: {
        fontSize: 26,
        fontWeight: "800",
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
        color: colors.textPrimary
    },

    subtitle: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.lg,
        color: colors.textSecondary
    },

    infoCard: {
        marginHorizontal: spacing.lg,
        padding: spacing.lg,
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        ...shadow
    },

    infoTitle: {
        fontSize: typography.h3,
        fontWeight: "700",
        marginBottom: spacing.sm
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: spacing.xs
    },

    infoItem: {
        color: colors.textSecondary
    },

    sectionTitle: {
        marginTop: spacing.lg,
        marginHorizontal: spacing.lg,
        fontSize: typography.h3,
        fontWeight: "700"
    },

    serviceGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        margin: spacing.lg
    },

    serviceCard: {
        width: "48%",
        padding: spacing.md,
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
        marginBottom: spacing.md,
        ...shadow
    },

    serviceText: {
        marginTop: 6,
        textAlign: "center",
        fontWeight: "600"
    },

    footer: {
        alignItems: "center",
        paddingVertical: 20
    },

    footerText: {
        fontSize: 12,
        color: "#888",
        marginBottom: 4
    },

    ctaButton: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: colors.primary,
        padding: 16,
        borderRadius: radius.lg,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
        ...shadow
    },

    ctaText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16
    }

});
