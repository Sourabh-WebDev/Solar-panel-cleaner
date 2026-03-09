import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

export default function CompleteJobScreen({ route, navigation }) {
    const { job } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Complete Job</Text>

            <View style={styles.card}>
                <View style={styles.rowWrap}>
                    <MaterialCommunityIcons name="tools" size={18} color={colors.primary} />
                    <Text style={styles.row}><Text style={styles.label}>Service:</Text> {job.service}</Text>
                </View>
                <View style={styles.rowWrap}>
                    <MaterialCommunityIcons name="cash" size={18} color={colors.primary} />
                    <Text style={styles.row}><Text style={styles.label}>Payout:</Text> Rs {job.payout}</Text>
                </View>
                <View style={styles.rowWrap}>
                    <MaterialCommunityIcons name="progress-clock" size={18} color={colors.primary} />
                    <Text style={styles.row}><Text style={styles.label}>Status:</Text> Ready to complete</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Earnings", { job })}
            >
                <MaterialCommunityIcons name="check-decagram" size={18} color="#fff" />
                <Text style={styles.buttonText}>Complete Job</Text>
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
        marginBottom: spacing.md,
    },

    card: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.md,
        padding: spacing.md,
        ...shadow,
    },

    rowWrap: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: spacing.xs,
    },

    row: {
        color: colors.textPrimary,
        fontSize: typography.body,
    },

    label: {
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
