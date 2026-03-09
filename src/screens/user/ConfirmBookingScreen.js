import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

export default function ConfirmBookingScreen({ route, navigation }) {

    const { service, address, slot } = route.params;

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Confirm Booking</Text>

            <View style={styles.card}>
                <Text style={styles.rowLabel}>Service</Text>
                <Text style={styles.rowValue}>{service.name}</Text>

                <Text style={styles.rowLabel}>Price</Text>
                <Text style={styles.rowValue}>Rs {service.price}</Text>

                <Text style={styles.rowLabel}>Address</Text>
                <Text style={styles.rowValue}>{address || "Not provided"}</Text>

                <Text style={styles.rowLabel}>Slot</Text>
                <Text style={styles.rowValue}>{slot}</Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Success")}
            >
                <Text style={styles.buttonText}>Confirm Booking</Text>
            </TouchableOpacity>

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

    rowLabel: {
        color: colors.textSecondary,
        fontSize: typography.caption,
        marginTop: spacing.xs
    },

    rowValue: {
        color: colors.textPrimary,
        fontSize: typography.body,
        fontWeight: "600",
        marginTop: 2
    },

    button: {
        backgroundColor: colors.success,
        padding: 15,
        borderRadius: radius.sm,
        marginTop: spacing.lg,
        alignItems: "center"
    },

    buttonText: {
        color: "#fff",
        fontWeight: "700"
    }
});
