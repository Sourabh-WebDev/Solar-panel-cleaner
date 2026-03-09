import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

export default function BookingSuccessScreen({ navigation }) {

    return (
        <View style={styles.container}>

            <View style={styles.card}>
                <Text style={styles.title}>Booking Successful</Text>
                <Text style={styles.subtitle}>Your Solar service request has been created.</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Tabs")}
                >
                    <Text style={styles.buttonText}>Go to Home</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
        padding: spacing.lg
    },

    card: {
        width: "100%",
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.xl,
        ...shadow
    },

    title: {
        color: colors.textPrimary,
        fontSize: typography.h2,
        fontWeight: "700",
        marginBottom: spacing.xs,
        textAlign: "center"
    },

    subtitle: {
        color: colors.textSecondary,
        fontSize: typography.body,
        textAlign: "center"
    },

    button: {
        backgroundColor: colors.primary,
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
