import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { services } from "../../services/api";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

export default function BookServiceScreen({ navigation }) {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Select Service</Text>

      {services.map(service => (

        <TouchableOpacity
          key={service.id}
          style={styles.card}
          onPress={() => navigation.navigate("MyOrders")}
        >

          <Text style={styles.service}>{service.name}</Text>
          <Text style={styles.price}>Rs {service.price}</Text>

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
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    ...shadow
  },

  service: {
    color: colors.textPrimary,
    fontSize: typography.h3,
    fontWeight: "700"
  },

  price: {
    color: colors.primary,
    fontWeight: "700",
    marginTop: 4
  }

});
