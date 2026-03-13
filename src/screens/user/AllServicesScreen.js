import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";

import { services } from "../../services/api";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

const serviceMeta = {
    1: { duration: "45 min", rating: 4.8 },
    2: { duration: "60 min", rating: 4.9 },
    3: { duration: "90 min", rating: 4.7 }
};

export default function AllServicesScreen({ navigation }) {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.heading}>Choose a service</Text>
            <Text style={styles.subheading}>
                Saare available services yahan same popular card design me visible hain.
            </Text>

            <View style={styles.grid}>
                {services.map((service) => {
                    const meta = serviceMeta[service.id];

                    return (
                        <Pressable
                            key={service.id}
                            style={styles.card}
                            onPress={() => navigation.navigate("Address", { service })}
                        >
                            <Image source={service.image} style={styles.image} />

                            <View style={styles.ratingRow}>
                                <MaterialCommunityIcons name="star" size={14} color="#F5A623" />
                                <Text style={styles.ratingText}>{meta?.rating ?? 4.8}</Text>
                            </View>

                            <Text style={styles.name} numberOfLines={2}>
                                {service.name}
                            </Text>

                            <View style={styles.infoRow}>
                                <MaterialCommunityIcons name="clock-outline" size={14} color={colors.textSecondary} />
                                <Text style={styles.infoText}>{meta?.duration ?? "45 min"}</Text>
                            </View>

                            <View style={styles.priceRow}>
                                <Text style={styles.priceLabel}>Starting at</Text>
                                <Text style={styles.priceText}>Rs {service.price}</Text>
                            </View>
                        </Pressable>
                    );
                })}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },

    content: {
        padding: spacing.lg,
        paddingBottom: spacing.xl * 2
    },

    heading: {
        color: colors.textPrimary,
        fontSize: typography.h2,
        fontWeight: "700"
    },

    subheading: {
        marginTop: spacing.xs,
        marginBottom: spacing.lg,
        color: colors.textSecondary,
        fontSize: typography.body,
        lineHeight: 21
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: spacing.md
    },

    card: {
        width: "48%",
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.lg,
        padding: spacing.md,
        ...shadow
    },

    image: {
        width: 44,
        height: 44,
        resizeMode: "contain"
    },

    ratingRow: {
        marginTop: spacing.sm,
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },

    ratingText: {
        color: colors.textPrimary,
        fontSize: typography.caption,
        fontWeight: "700"
    },

    name: {
        marginTop: spacing.xs,
        color: colors.textPrimary,
        fontSize: typography.body,
        fontWeight: "700",
        minHeight: 40
    },

    infoRow: {
        marginTop: spacing.sm,
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },

    infoText: {
        color: colors.textSecondary,
        fontSize: typography.caption
    },

    priceRow: {
        marginTop: spacing.md
    },

    priceLabel: {
        color: colors.textSecondary,
        fontSize: 12
    },

    priceText: {
        marginTop: 2,
        color: colors.primary,
        fontSize: typography.body,
        fontWeight: "800"
    }
});
