import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { orders } from "../../services/api";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

export default function MyOrdersScreen({ navigation }) {

    return (
        <View style={styles.container}>

            <Text style={styles.title}>My Orders</Text>

            {orders.map(order => (

                <TouchableOpacity
                    key={order.id}
                    style={styles.card}
                    onPress={() => navigation.navigate("OrderDetails", { order })}
                >

                    <Text style={styles.service}>{order.service}</Text>

                    <Text style={styles.meta}>Status: {order.status}</Text>
                    <Text style={styles.meta}>Date: {order.date}</Text>

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

    card: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: radius.md,
        marginBottom: spacing.sm,
        borderWidth: 1,
        borderColor: colors.border,
        ...shadow
    },

    service: {
        color: colors.textPrimary,
        fontSize: typography.body,
        fontWeight: "700",
        marginBottom: 5
    },

    meta: {
        color: colors.textSecondary,
        fontSize: typography.caption,
        marginTop: 2
    }

});
