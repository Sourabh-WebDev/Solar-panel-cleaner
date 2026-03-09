import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

export default function AddressScreen({ navigation, route }) {

    const { service } = route.params;
    const [address, setAddress] = useState("");

    return (
        <View style={styles.container}>

            <View style={styles.card}>
                <Text style={styles.title}>Enter Address</Text>
                <Text style={styles.subtitle}>{service.name}</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter Service Address"
                    placeholderTextColor={colors.textSecondary}
                    value={address}
                    onChangeText={setAddress}
                    multiline
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Slot", { service, address })}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.lg
    },

    card: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.lg,
        ...shadow
    },

    title: {
        color: colors.textPrimary,
        fontSize: typography.h2,
        fontWeight: "700",
        marginBottom: spacing.xs
    },

    subtitle: {
        color: colors.textSecondary,
        fontSize: typography.body,
        marginBottom: spacing.md
    },

    input: {
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: "#FAFCFF",
        color: colors.textPrimary,
        padding: spacing.sm,
        borderRadius: radius.sm,
        marginBottom: spacing.md,
        minHeight: 88,
        textAlignVertical: "top"
    },

    button: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: radius.sm,
        alignItems: "center"
    },

    buttonText: {
        color: "#fff",
        fontWeight: "700"
    }
});
