import { StyleSheet, Text, View } from "react-native";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

export default function ProfileScreen() {

    return (
        <View style={styles.container}>

            <View style={styles.card}>
                <Text style={styles.title}>Profile</Text>

                <Text style={styles.row}><Text style={styles.label}>Name:</Text> Demo User</Text>
                <Text style={styles.row}><Text style={styles.label}>Phone:</Text> 9876543210</Text>
            </View>

        </View>
    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.background,
        padding: spacing.lg
    },

    card: {
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
        marginBottom: spacing.md,
        textAlign: "center"
    },

    row: {
        color: colors.textPrimary,
        fontSize: typography.body,
        marginBottom: spacing.xs
    },

    label: {
        fontWeight: "700"
    }

});
