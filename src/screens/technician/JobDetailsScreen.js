import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

export default function JobDetailsScreen({ route, navigation }) {

    const { job } = route.params;

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Job Details</Text>

            <View style={styles.card}>
                <View style={styles.rowWrap}>
                    <MaterialCommunityIcons name="account-circle" size={18} color={colors.primary} />
                    <Text style={styles.row}><Text style={styles.label}>Customer:</Text> {job.customer}</Text>
                </View>
                <View style={styles.rowWrap}>
                    <MaterialCommunityIcons name="tools" size={18} color={colors.primary} />
                    <Text style={styles.row}><Text style={styles.label}>Service:</Text> {job.service}</Text>
                </View>
                <View style={styles.rowWrap}>
                    <MaterialCommunityIcons name="map-marker" size={18} color={colors.primary} />
                    <Text style={styles.row}><Text style={styles.label}>Address:</Text> {job.address}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("AcceptJob", { job })}
            >
                <MaterialCommunityIcons name="check-circle" size={18} color="#fff" />
                <Text style={styles.buttonText}>Accept Job</Text>
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
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.md,
        ...shadow
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
        fontWeight: "700"
    },

    button: {
        backgroundColor: colors.success,
        padding: 15,
        borderRadius: radius.sm,
        marginTop: spacing.lg,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "700"
    }

});
