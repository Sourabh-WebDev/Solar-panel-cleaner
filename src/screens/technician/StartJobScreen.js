import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

export default function StartJobScreen({ route, navigation }) {
    const { job } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Start Job</Text>

            <View style={styles.card}>
                <View style={styles.noteRow}>
                    <MaterialCommunityIcons name="check-circle" size={18} color={colors.success} />
                    <Text style={styles.note}>Job accepted successfully.</Text>
                </View>
                <View style={styles.rowWrap}>
                    <MaterialCommunityIcons name="identifier" size={18} color={colors.primary} />
                    <Text style={styles.row}><Text style={styles.label}>Job ID:</Text> {job.id}</Text>
                </View>
                <View style={styles.rowWrap}>
                    <MaterialCommunityIcons name="account-circle" size={18} color={colors.primary} />
                    <Text style={styles.row}><Text style={styles.label}>Customer:</Text> {job.customer}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("CompleteJob", { job })}
            >
                <MaterialCommunityIcons name="play-circle" size={18} color="#fff" />
                <Text style={styles.buttonText}>Start Job</Text>
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

    noteRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: spacing.sm,
    },

    note: {
        color: colors.success,
        fontWeight: "700",
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
        backgroundColor: colors.primary,
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
