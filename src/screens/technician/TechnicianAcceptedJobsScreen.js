import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { acceptedJobs } from "../../services/api";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

const statusColors = {
    Accepted: colors.primary,
    "In Progress": colors.success,
    Completed: "#7C3AED"
};

export default function TechnicianAcceptedJobsScreen({ navigation }) {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>Accepted Jobs</Text>
            <Text style={styles.subtitle}>Yahan technician ke current aur recently handled jobs dikh rahe hain.</Text>

            {acceptedJobs.map((job) => {
                const statusColor = statusColors[job.status] || colors.textSecondary;
                const actionLabel = job.status === "In Progress" ? "Continue Job" : "View Details";

                return (
                    <View key={job.id} style={styles.card}>
                        <View style={styles.cardTop}>
                            <View>
                                <Text style={styles.jobId}>{job.id}</Text>
                                <Text style={styles.customer}>{job.customer}</Text>
                            </View>
                            <View style={[styles.statusChip, { backgroundColor: `${statusColor}18` }]}>
                                <Text style={[styles.statusText, { color: statusColor }]}>{job.status}</Text>
                            </View>
                        </View>

                        <View style={styles.metaRow}>
                            <MaterialCommunityIcons name="tools" size={16} color={colors.textSecondary} />
                            <Text style={styles.meta}>{job.service}</Text>
                        </View>
                        <View style={styles.metaRow}>
                            <MaterialCommunityIcons name="map-marker" size={16} color={colors.textSecondary} />
                            <Text style={styles.meta}>{job.address}</Text>
                        </View>
                        <View style={styles.metaRow}>
                            <MaterialCommunityIcons name="clock-outline" size={16} color={colors.textSecondary} />
                            <Text style={styles.meta}>{job.scheduledTime}</Text>
                        </View>

                        <View style={styles.footerRow}>
                            <Text style={styles.payout}>Rs {job.payout}</Text>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => navigation.navigate("JobDetails", { job })}
                            >
                                <Text style={styles.actionText}>{actionLabel}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },

    content: {
        padding: spacing.lg,
        paddingBottom: spacing.xl * 2
    },

    title: {
        color: colors.textPrimary,
        fontSize: typography.h2,
        fontWeight: "700"
    },

    subtitle: {
        marginTop: spacing.xs,
        marginBottom: spacing.md,
        color: colors.textSecondary,
        fontSize: typography.body
    },

    card: {
        marginBottom: spacing.md,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.md,
        padding: spacing.md,
        ...shadow
    },

    cardTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },

    jobId: {
        color: colors.textSecondary,
        fontSize: typography.caption
    },

    customer: {
        marginTop: 4,
        color: colors.textPrimary,
        fontSize: typography.h3,
        fontWeight: "700"
    },

    statusChip: {
        borderRadius: radius.pill,
        paddingHorizontal: spacing.sm,
        paddingVertical: 6
    },

    statusText: {
        fontSize: 12,
        fontWeight: "700"
    },

    metaRow: {
        marginTop: spacing.sm,
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },

    meta: {
        flex: 1,
        color: colors.textSecondary,
        fontSize: typography.body
    },

    footerRow: {
        marginTop: spacing.md,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    payout: {
        color: colors.success,
        fontSize: typography.h3,
        fontWeight: "700"
    },

    actionButton: {
        backgroundColor: colors.primary,
        borderRadius: radius.pill,
        paddingHorizontal: spacing.md,
        paddingVertical: 10
    },

    actionText: {
        color: "#fff",
        fontWeight: "700"
    }
});
