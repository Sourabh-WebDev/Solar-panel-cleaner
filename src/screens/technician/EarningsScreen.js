import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

export default function EarningsScreen({ route }) {
    const completedJob = route?.params?.job;

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Technician Earnings</Text>

            <View style={styles.card}>
                <View style={styles.metricRow}>
                    <MaterialCommunityIcons name="briefcase-check" size={18} color={colors.primary} />
                    <Text style={styles.metric}><Text style={styles.label}>Total Jobs:</Text> 12</Text>
                </View>

                <View style={styles.metricRow}>
                    <MaterialCommunityIcons name="cash-multiple" size={18} color={colors.primary} />
                    <Text style={styles.metric}><Text style={styles.label}>Total Earnings:</Text> Rs 8400</Text>
                </View>

                {completedJob ? (
                    <View style={styles.metricRow}>
                        <MaterialCommunityIcons name="check-decagram" size={18} color={colors.success} />
                        <Text style={styles.metric}>
                            <Text style={styles.label}>Latest Completed:</Text> {completedJob.id} (Rs {completedJob.payout})
                        </Text>
                    </View>
                ) : null}
            </View>

        </View>
    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.lg
    },

    title: {
        color: colors.textPrimary,
        fontSize: typography.h2,
        fontWeight: "700",
        marginBottom: spacing.md
    },

    card: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.lg,
        ...shadow
    },

    metricRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: spacing.xs,
    },

    metric: {
        color: colors.textPrimary,
        fontSize: typography.body,
    },

    label: {
        fontWeight: "700"
    }

});
