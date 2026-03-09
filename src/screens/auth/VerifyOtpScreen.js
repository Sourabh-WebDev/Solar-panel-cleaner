import { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

export default function VerifyOtpScreen({ route }) {

    const { phone, role = "user" } = route.params;

    const [otp, setOtp] = useState("");

    const { setUser } = useContext(AuthContext);

    const verifyOtp = () => {

        if (otp !== "1234") {
            alert("Demo OTP is 1234");
            return;
        }

        setUser({
            name: role === "technician" ? "Demo Technician" : "Demo User",
            role
        });

    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Verify OTP</Text>
                <Text style={styles.roleText}>Role: {role === "technician" ? "Technician" : "User"}</Text>
                <Text style={styles.phoneText}>Phone: {phone}</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter OTP"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="number-pad"
                    value={otp}
                    onChangeText={setOtp}
                />

                <TouchableOpacity style={styles.button} onPress={verifyOtp}>
                    <Text style={styles.buttonText}>Verify OTP</Text>
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

    card: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.lg,
        ...shadow,
    },

    title: {
        fontSize: typography.h2,
        fontWeight: "700",
        color: colors.textPrimary,
        marginBottom: spacing.xs,
        textAlign: "center",
    },

    phoneText: {
        fontSize: typography.body,
        color: colors.textSecondary,
        marginBottom: spacing.md,
        textAlign: "center",
    },

    roleText: {
        fontSize: typography.caption,
        color: colors.primary,
        fontWeight: "700",
        marginBottom: spacing.xs,
        textAlign: "center",
    },

    input: {
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: "#FAFCFF",
        padding: 12,
        borderRadius: radius.sm,
        marginBottom: 20
    },

    button: {
        backgroundColor: colors.primary,
        padding: 14,
        borderRadius: radius.sm,
        alignItems: "center",
        marginBottom: 10
    },

    buttonText: {
        color: "#fff",
        fontWeight: "700"
    }

});
