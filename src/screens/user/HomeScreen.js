import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { services } from "../../services/api";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

export default function HomeScreen({ navigation }) {

    const popularServices = services.slice(0, 2);

    return (
        <ScrollView style={styles.container}>

            <View style={styles.banner}>
                <Text style={styles.bannerTitle}>
                    Solar Summer Offer
                </Text>

                <Text style={styles.bannerText}>
                    Get Solar cleaning starting at Rs 499
                </Text>
            </View>

            <Text style={styles.sectionTitle}>Popular Services</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                {popularServices.map((service) => (

                    <TouchableOpacity
                        key={service.id}
                        style={styles.popularCard}
                        onPress={() => navigation.navigate("Address", { service })}
                    >

                        <Image
                            source={service.image}
                            style={styles.popularIcon}
                        />

                        <Text style={styles.popularText}>
                            {service.name}
                        </Text>

                    </TouchableOpacity>

                ))}

            </ScrollView>

            <Text style={styles.sectionTitle}>All Services</Text>

            <View style={styles.grid}>

                {services.map((service) => (

                    <TouchableOpacity
                        key={service.id}
                        style={styles.card}
                        onPress={() => navigation.navigate("Address", { service })}
                    >

                        <Image
                            source={service.image}
                            style={styles.icon}
                        />

                        <Text style={styles.serviceName}>
                            {service.name}
                        </Text>

                        <Text style={styles.price}>
                            Rs {service.price}
                        </Text>

                    </TouchableOpacity>

                ))}

            </View>

        </ScrollView>
    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.lg
    },

    banner: {
        backgroundColor: colors.primary,
        padding: spacing.lg,
        borderRadius: radius.lg,
        marginBottom: spacing.lg
    },

    bannerTitle: {
        color: "#fff",
        fontSize: typography.h2,
        fontWeight: "700"
    },

    bannerText: {
        color: "#fff",
        fontSize: typography.body,
        marginTop: 6
    },

    sectionTitle: {
        color: colors.textPrimary,
        fontSize: typography.h3,
        fontWeight: "700",
        marginBottom: spacing.sm
    },

    popularCard: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: radius.md,
        marginRight: spacing.sm,
        alignItems: "center",
        width: 130,
        borderWidth: 1,
        borderColor: colors.border,
        ...shadow
    },

    popularIcon: {
        width: 40,
        height: 40,
        marginBottom: 5
    },

    popularText: {
        color: colors.textPrimary,
        fontSize: typography.caption,
        fontWeight: "600",
        textAlign: "center",
        marginTop: 2
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },

    card: {
        backgroundColor: colors.surface,
        width: "48%",
        padding: spacing.md,
        borderRadius: radius.md,
        alignItems: "center",
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        ...shadow
    },

    icon: {
        width: 50,
        height: 50,
        marginBottom: 10
    },

    serviceName: {
        color: colors.textPrimary,
        fontSize: typography.body,
        fontWeight: "700",
        textAlign: "center"
    },

    price: {
        color: colors.primary,
        fontWeight: "700",
        marginTop: 6
    }

});
