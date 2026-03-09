import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

export default function RoleSelectScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Continue As</Text>
            <Text style={styles.subtitle}>Select your role to open the right login screen.</Text>

            <TouchableOpacity
                style={styles.userCard}
                onPress={() => navigation.navigate("Login", { role: "user" })}
            >
                <View style={styles.row}>
                    <MaterialCommunityIcons name="account" size={22} color={colors.primary} />
                    <Text style={styles.cardTitle}>User Login</Text>
                </View>
                <Text style={styles.cardSubtitle}>Book and track service orders</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.techCard}
                onPress={() => navigation.navigate("Login", { role: "technician" })}
            >
                <View style={styles.row}>
                    <MaterialCommunityIcons name="wrench-cog" size={22} color={colors.success} />
                    <Text style={styles.cardTitle}>Technician Login</Text>
                </View>
                <Text style={styles.cardSubtitle}>Manage jobs and earnings</Text>
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

    title: {
        color: colors.textPrimary,
        fontSize: typography.h2,
        fontWeight: "700",
    },

    subtitle: {
        marginTop: spacing.xs,
        color: colors.textSecondary,
        fontSize: typography.body,
        marginBottom: spacing.lg,
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
        gap: 8,
    },
});
