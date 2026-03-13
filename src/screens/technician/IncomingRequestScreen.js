import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors, radius, shadow, spacing, typography } from "../../theme/ui";
import { resolveIncomingRequest } from "../../services/serviceRequestManager";

export default function IncomingRequestScreen({ route, navigation }) {
  const requestData = route.params?.requestData ?? {};

  async function handleAction(action) {
    await resolveIncomingRequest(action, requestData);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Incoming Request</Text>
        <Text style={styles.title}>{requestData.serviceName || "New Service Request"}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <MaterialCommunityIcons name="map-marker" size={18} color={colors.primary} />
          <Text style={styles.rowText}>{requestData.serviceLocation || "-"}</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="tools" size={18} color={colors.primary} />
          <Text style={styles.rowText}>{requestData.serviceName || "-"}</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="cash" size={18} color={colors.primary} />
          <Text style={styles.rowText}>Earning: Rs {requestData.earningPrice ?? 0}</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="receipt-text" size={18} color={colors.primary} />
          <Text style={styles.rowText}>Commission: Rs {requestData.commissionPrice ?? 0}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.acceptButton} onPress={() => handleAction("accept")}>
        <Text style={styles.acceptButtonText}>Accept</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.rejectButton} onPress={() => handleAction("reject")}>
        <Text style={styles.rejectButtonText}>Reject</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    justifyContent: "center",
  },
  header: {
    marginBottom: spacing.lg,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: typography.caption,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.h1,
    fontWeight: "800",
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
    ...shadow,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  rowText: {
    color: colors.textPrimary,
    fontSize: typography.body,
    flex: 1,
  },
  acceptButton: {
    marginTop: spacing.xl,
    backgroundColor: colors.success,
    borderRadius: radius.md,
    paddingVertical: 16,
    alignItems: "center",
  },
  acceptButtonText: {
    color: "#FFFFFF",
    fontSize: typography.body,
    fontWeight: "700",
  },
  rejectButton: {
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 16,
    alignItems: "center",
  },
  rejectButtonText: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "700",
  },
});
