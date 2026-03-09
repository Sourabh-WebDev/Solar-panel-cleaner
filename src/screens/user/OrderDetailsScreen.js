import { StyleSheet, Text, View } from "react-native";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

export default function OrderDetailsScreen({ route }) {

    const { order } = route.params;

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Order Details</Text>

            <View style={styles.card}>
                <Text style={styles.row}><Text style={styles.label}>Service:</Text> {order.service}</Text>
                <Text style={styles.row}><Text style={styles.label}>Date:</Text> {order.date}</Text>
                <Text style={styles.row}><Text style={styles.label}>Slot:</Text> {order.slot}</Text>
                <Text style={styles.row}><Text style={styles.label}>Technician:</Text> {order.technician}</Text>
            </View>

            <View style={styles.timeline}>
                <Text style={styles.timelineTitle}>Progress</Text>
                <Text style={styles.step}>[Done] Booked</Text>
                <Text style={styles.step}>[Done] Technician Assigned</Text>
                <Text style={styles.step}>[Pending] On the Way</Text>
                <Text style={styles.step}>[Pending] Service Completed</Text>
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
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.md,
        ...shadow
    },

    row: {
        color: colors.textPrimary,
        fontSize: typography.body,
        marginBottom: spacing.xs
    },

    label: {
        fontWeight: "700"
    },

    timeline: {
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.md,
        marginTop: spacing.lg,
        ...shadow
    },

    timelineTitle: {
        color: colors.textPrimary,
        fontSize: typography.h3,
        fontWeight: "700",
        marginBottom: spacing.sm
    },

    step: {
        color: colors.textSecondary,
        fontSize: typography.body,
        marginBottom: spacing.xs
    }

});
