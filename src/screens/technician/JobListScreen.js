import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { jobs } from "../../services/api";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

export default function JobListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Jobs</Text>

      {jobs.map((job) => (
        <TouchableOpacity
          key={job.id}
          style={styles.card}
          onPress={() => navigation.navigate("JobDetails", { job })}
        >
          <View style={styles.customerRow}>
            <MaterialCommunityIcons name="account-circle" size={20} color={colors.primary} />
            <Text style={styles.customer}>{job.customer}</Text>
          </View>

          <View style={styles.metaRow}>
            <MaterialCommunityIcons name="tools" size={16} color={colors.textSecondary} />
            <Text style={styles.meta}>{job.service}</Text>
          </View>

          <View style={styles.metaRow}>
            <MaterialCommunityIcons name="map-marker" size={16} color={colors.textSecondary} />
            <Text style={styles.meta}>{job.address}</Text>
          </View>
        </TouchableOpacity>
      ))}
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
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    ...shadow,
  },

  customerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  customer: {
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: typography.body,
  },

  metaRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  meta: {
    color: colors.textSecondary,
  },
});
