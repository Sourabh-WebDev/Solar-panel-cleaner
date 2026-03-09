import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

export default function TechnicianDashboardScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.hero}>
                <View style={styles.heroTitleRow}>
                    <MaterialCommunityIcons name="view-dashboard" size={24} color="#fff" />
                    <Text style={styles.heroTitle}>Technician Dashboard</Text>
                </View>
                <Text style={styles.heroText}>Track jobs, update status, and manage earnings.</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Today</Text>
                <View style={styles.cardValueRow}>
                    <MaterialCommunityIcons name="briefcase-clock" size={20} color={colors.primary} />
                    <Text style={styles.cardValue}>2 Jobs Assigned</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("AvailableJobs")}
            >
                <MaterialCommunityIcons name="format-list-bulleted" size={18} color="#fff" />
                <Text style={styles.buttonText}>View Available Jobs</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.lg,
    },

    hero: {
        backgroundColor: colors.primary,
        borderRadius: radius.lg,
        padding: spacing.xl,
    },

    heroTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    heroTitle: {
        color: "#fff",
        fontSize: typography.h2,
        fontWeight: "700",
    },

    heroText: {
        color: "#EAF1FF",
        fontSize: typography.body,
        marginTop: spacing.xs,
    },

    card: {
        marginTop: spacing.lg,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.md,
        padding: spacing.lg,
        ...shadow,
    },

    cardTitle: {
        color: colors.textSecondary,
        fontSize: typography.caption,
    },

    cardValueRow: {
        marginTop: spacing.xs,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    cardValue: {
        color: colors.textPrimary,
        fontSize: typography.h3,
        fontWeight: "700",
    },

    button: {
        marginTop: spacing.lg,
        backgroundColor: colors.success,
        borderRadius: radius.sm,
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "700",
    },
});
