import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

export default function LoginScreen({ navigation, route }) {
  const role = route?.params?.role || "user";
  const isTechnician = role === "technician";

  const [phone, setPhone] = useState("");

  const sendOtp = () => {
    if (phone.length < 10) {
      alert("Enter valid phone number");
      return;
    }

    navigation.navigate("VerifyOtp", { phone, role });
  };

  return (
    <View style={[styles.container, isTechnician && styles.techContainer]}>
      <View style={[styles.card, isTechnician ? styles.techCard : styles.userCard]}>
        <Text style={[styles.roleTag, isTechnician ? styles.techTag : styles.userTag]}>
          {isTechnician ? "TECHNICIAN ACCESS" : "CUSTOMER ACCESS"}
        </Text>

        <Text style={[styles.title, isTechnician && styles.techTitle]}>
          {isTechnician ? "Technician Login" : "Customer Login"}
        </Text>

        <Text style={styles.subtitle}>
          {isTechnician
            ? "Access assigned jobs and daily earnings"
            : "Book and track your cleaning service easily"}
        </Text>

        <TextInput
          style={[styles.input, isTechnician && styles.techInput]}
          placeholder="Enter Phone Number"
          placeholderTextColor={colors.textSecondary}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <TouchableOpacity
          style={[styles.button, isTechnician && styles.techButton]}
          onPress={sendOtp}
        >
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.lg,
    backgroundColor: colors.background,
  },

  techContainer: {
    backgroundColor: "#F2FBF6",
  },

  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.lg,
    ...shadow,
  },

  userCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },

  techCard: {
    backgroundColor: "#F8FFFB",
    borderColor: "#CFEEDD",
  },

  roleTag: {
    alignSelf: "center",
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    borderRadius: radius.pill,
    marginBottom: spacing.sm,
  },

  userTag: {
    color: colors.primary,
    backgroundColor: "#EAF1FF",
  },

  techTag: {
    color: "#166534",
    backgroundColor: "#DEF7E8",
  },

  title: {
    fontSize: typography.h2,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    textAlign: "center",
  },

  techTitle: {
    color: "#166534",
  },

  subtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "#FAFCFF",
    padding: 12,
    borderRadius: radius.sm,
    marginBottom: spacing.md,
  },

  techInput: {
    borderColor: "#CFEEDD",
    backgroundColor: "#FFFFFF",
  },

  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: radius.sm,
    alignItems: "center",
  },

  techButton: {
    backgroundColor: colors.success,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
