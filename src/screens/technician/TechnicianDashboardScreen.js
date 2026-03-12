import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { technicianStats } from "../../services/api";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

export default function TechnicianDashboardScreen({ navigation }) {
    const summaryCards = [
        {
            label: "Total Earnings",
            value: `Rs ${technicianStats.earnings}`,
            icon: "cash-multiple",
            accent: colors.primary
        },
        {
            label: "Accepted Jobs",
            value: technicianStats.acceptedJobs,
            icon: "briefcase-check",
            accent: colors.success
        },
        {
            label: "Rejected Jobs",
            value: technicianStats.rejectedJobs,
            icon: "briefcase-remove",
            accent: "#F97316"
        }
    ];

    const earningsMax = Math.max(...technicianStats.weeklyEarnings);
    const jobsMax = Math.max(...technicianStats.weeklyJobs);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.hero}>
                <View style={styles.heroTitleRow}>
                    <MaterialCommunityIcons name="view-dashboard" size={24} color="#fff" />
                    <Text style={styles.heroTitle}>Technician Home</Text>
                </View>
                <Text style={styles.heroText}>Aaj ki performance aur accepted work ek jagah.</Text>
                <View style={styles.heroBadge}>
                    <MaterialCommunityIcons name="star-four-points" size={16} color="#fff" />
                    <Text style={styles.heroBadgeText}>
                        {technicianStats.completionRate}% completion rate
                    </Text>
                </View>
            </View>

            <View style={styles.summaryGrid}>
                {summaryCards.map((card) => (
                    <View key={card.label} style={styles.summaryCard}>
                        <View style={[styles.summaryIconWrap, { backgroundColor: `${card.accent}18` }]}>
                            <MaterialCommunityIcons name={card.icon} size={20} color={card.accent} />
                        </View>
                        <Text style={styles.summaryLabel}>{card.label}</Text>
                        <Text style={styles.summaryValue}>{card.value}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Weekly Earnings</Text>
                <View style={styles.chartRow}>
                    {technicianStats.weeklyEarnings.map((value, index) => (
                        <View key={`earning-${index}`} style={styles.chartColumn}>
                            <Text style={styles.chartTopLabel}>{Math.round(value / 1000)}k</Text>
                            <View style={styles.chartTrack}>
                                <View
                                    style={[
                                        styles.chartBar,
                                        { height: `${(value / earningsMax) * 100}%` }
                                    ]}
                                />
                            </View>
                            <Text style={styles.chartBottomLabel}>D{index + 1}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Jobs Trend</Text>
                {technicianStats.weeklyJobs.map((value, index) => (
                    <View key={`jobs-${index}`} style={styles.progressRow}>
                        <Text style={styles.progressLabel}>Day {index + 1}</Text>
                        <View style={styles.progressTrack}>
                            <View
                                style={[
                                    styles.progressFill,
                                    { width: `${(value / jobsMax) * 100}%` }
                                ]}
                            />
                        </View>
                        <Text style={styles.progressValue}>{value}</Text>
                    </View>
                ))}
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("AvailableJobs")}
            >
                <MaterialCommunityIcons name="format-list-bulleted" size={18} color="#fff" />
                <Text style={styles.buttonText}>View Available Jobs</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        padding: spacing.lg,
        paddingBottom: spacing.xl * 2
    },

    hero: {
        backgroundColor: colors.primary,
        borderRadius: radius.lg,
        padding: spacing.xl,
    },

    heroTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    heroTitle: {
        color: "#fff",
        fontSize: typography.h2,
        fontWeight: "700",
    },

    heroText: {
        color: "#EAF1FF",
        fontSize: typography.body,
        marginTop: spacing.xs,
    },

    heroBadge: {
        marginTop: spacing.md,
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#FFFFFF24",
        borderRadius: radius.pill,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs
    },

    heroBadgeText: {
        color: "#fff",
        fontWeight: "700"
    },

    summaryGrid: {
        marginTop: spacing.lg,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.md
    },

    summaryCard: {
        width: "47%",
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.md,
        padding: spacing.md,
        ...shadow
    },

    summaryIconWrap: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: "center",
        justifyContent: "center"
    },

    summaryLabel: {
        marginTop: spacing.sm,
        color: colors.textSecondary,
        fontSize: typography.caption
    },

    summaryValue: {
        marginTop: 4,
        color: colors.textPrimary,
        fontSize: typography.h3,
        fontWeight: "700"
    },

    card: {
        marginTop: spacing.lg,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.md,
        padding: spacing.lg,
        ...shadow,
    },

    sectionTitle: {
        color: colors.textPrimary,
        fontSize: typography.h3,
        fontWeight: "700",
    },

    chartRow: {
        marginTop: spacing.md,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },

    chartColumn: {
        alignItems: "center",
        width: "18%"
    },

    chartTopLabel: {
        color: colors.textSecondary,
        fontSize: 11,
        marginBottom: 6
    },

    chartTrack: {
        width: 24,
        height: 110,
        borderRadius: radius.pill,
        backgroundColor: colors.chip,
        justifyContent: "flex-end",
        overflow: "hidden"
    },

    chartBar: {
        width: "100%",
        backgroundColor: colors.primary,
        borderRadius: radius.pill
    },

    chartBottomLabel: {
        marginTop: 8,
        color: colors.textSecondary,
        fontSize: 12,
        fontWeight: "600"
    },

    progressRow: {
        marginTop: spacing.md,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm
    },

    progressLabel: {
        width: 52,
        color: colors.textPrimary,
        fontWeight: "600"
    },

    progressTrack: {
        flex: 1,
        height: 10,
        borderRadius: radius.pill,
        backgroundColor: colors.chip,
        overflow: "hidden"
    },

    progressFill: {
        height: "100%",
        borderRadius: radius.pill,
        backgroundColor: colors.success
    },

    progressValue: {
        width: 18,
        textAlign: "right",
        color: colors.textSecondary,
        fontWeight: "700"
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
