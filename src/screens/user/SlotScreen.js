import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

const slots = [
    "9:00 AM - 11:00 AM",
    "11:00 AM - 1:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM"
];

export default function SlotScreen({ navigation, route }) {

    const { service, address } = route.params;

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Select Time Slot</Text>

            {slots.map((slot, index) => (

                <TouchableOpacity
                    key={index}
                    style={styles.slot}
                    onPress={() =>
                        navigation.navigate("ConfirmBooking", {
                            service,
                            address,
                            slot
                        })
                    }
                >

                    <Text style={styles.slotText}>{slot}</Text>

                </TouchableOpacity>

            ))}

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

    slot: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.md,
        borderRadius: radius.md,
        marginBottom: spacing.sm,
        ...shadow
    },

    slotText: {
        color: colors.textPrimary,
        fontSize: typography.body,
        fontWeight: "600"
    }
});
