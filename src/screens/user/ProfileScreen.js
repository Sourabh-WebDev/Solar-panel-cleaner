import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useContext, useState } from "react";
import {
    Alert,
    Linking,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

const buildAddressFromLocation = (placemark) => {
    const parts = [
        placemark?.name,
        placemark?.street,
        placemark?.district,
        placemark?.city,
        placemark?.region,
        placemark?.postalCode
    ].filter(Boolean);

    return parts.join(", ");
};

export default function ProfileScreen() {
    const { user, setUser } = useContext(AuthContext);
    const profileImageUri = user?.profileImageUri ?? null;
    const [draftName, setDraftName] = useState(user?.name ?? "Demo Customer");
    const [draftEmail, setDraftEmail] = useState(user?.email ?? "customer@solarcleaner.app");
    const [draftDateOfBirth, setDraftDateOfBirth] = useState(user?.dateOfBirth ?? "");
    const [draftAddress, setDraftAddress] = useState(user?.address ?? "Indirapuram, Ghaziabad");
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingDob, setIsEditingDob] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);

    const customerName = user?.name ?? "Demo Customer";
    const customerEmail = user?.email ?? "customer@solarcleaner.app";
    const customerDob = user?.dateOfBirth ?? "Add date of birth";
    const customerAddress = user?.address ?? "Indirapuram, Ghaziabad";

    const startNameEdit = () => {
        setDraftName(customerName);
        setIsEditingName(true);
    };

    const cancelNameEdit = () => {
        setDraftName(customerName);
        setIsEditingName(false);
    };

    const updateName = () => {
        const trimmedName = draftName.trim();

        if (!trimmedName) {
            Alert.alert("Missing name", "Customer name enter karo.");
            return;
        }

        setUser((currentUser) => ({
            ...currentUser,
            name: trimmedName
        }));
        setIsEditingName(false);
    };

    const startEmailEdit = () => {
        setDraftEmail(customerEmail);
        setIsEditingEmail(true);
    };

    const cancelEmailEdit = () => {
        setDraftEmail(customerEmail);
        setIsEditingEmail(false);
    };

    const updateEmail = () => {
        const trimmedEmail = draftEmail.trim();

        if (!trimmedEmail || !trimmedEmail.includes("@")) {
            Alert.alert("Invalid email", "Valid email address enter karo.");
            return;
        }

        setUser((currentUser) => ({
            ...currentUser,
            email: trimmedEmail
        }));
        setIsEditingEmail(false);
    };

    const startDobEdit = () => {
        setDraftDateOfBirth(user?.dateOfBirth ?? "");
        setIsEditingDob(true);
    };

    const cancelDobEdit = () => {
        setDraftDateOfBirth(user?.dateOfBirth ?? "");
        setIsEditingDob(false);
    };

    const updateDob = () => {
        const trimmedDob = draftDateOfBirth.trim();

        if (!trimmedDob) {
            Alert.alert("Missing date of birth", "Date of birth enter karo.");
            return;
        }

        setUser((currentUser) => ({
            ...currentUser,
            dateOfBirth: trimmedDob
        }));
        setIsEditingDob(false);
    };

    const startAddressEdit = () => {
        setDraftAddress(customerAddress);
        setIsEditingAddress(true);
    };

    const cancelAddressEdit = () => {
        setDraftAddress(customerAddress);
        setIsEditingAddress(false);
    };

    const updateAddress = () => {
        const trimmedAddress = draftAddress.trim();

        if (!trimmedAddress) {
            Alert.alert("Missing address", "Address empty nahi ho sakta.");
            return;
        }

        setUser((currentUser) => ({
            ...currentUser,
            address: trimmedAddress
        }));
        setIsEditingAddress(false);
    };

    const useCurrentLocation = async () => {
        try {
            setIsFetchingLocation(true);
            const permission = await Location.requestForegroundPermissionsAsync();

            if (!permission.granted) {
                Alert.alert("Permission required", "Current location lane ke liye location permission allow karo.");
                return;
            }

            const currentPosition = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced
            });
            const placemarks = await Location.reverseGeocodeAsync({
                latitude: currentPosition.coords.latitude,
                longitude: currentPosition.coords.longitude
            });
            const resolvedAddress = buildAddressFromLocation(placemarks[0]);

            if (!resolvedAddress) {
                Alert.alert("Address not found", "Current location se address resolve nahi hua. Manual address enter karo.");
                return;
            }

            setDraftAddress(resolvedAddress);
        } catch (_error) {
            Alert.alert("Location error", "Current location fetch nahi ho payi. Manual address use karo.");
        } finally {
            setIsFetchingLocation(false);
        }
    };

    const openGoogleMaps = async () => {
        const query = encodeURIComponent(draftAddress.trim() || customerAddress || "Ghaziabad");
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
        const canOpen = await Linking.canOpenURL(mapsUrl);

        if (!canOpen) {
            Alert.alert("Maps unavailable", "Google Maps open nahi ho pa raha.");
            return;
        }

        Linking.openURL(mapsUrl);
    };

    const openHelpSupport = () => {
        Alert.alert(
            "Help & Support",
            "Email us support@solarcleaner.app or Call Us +91 99999 99999"
        );
    };

    const pickProfileImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            Alert.alert("Permission required", "Gallery access allow karo taaki profile image select ho sake.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8
        });

        if (!result.canceled && result.assets?.length) {
            setUser((currentUser) => ({
                ...currentUser,
                profileImageUri: result.assets[0].uri
            }));
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.heroCard}>
                <View style={styles.avatarWrap}>
                    <View style={styles.avatar}>
                        {profileImageUri ? (
                            <Image
                                source={{ uri: profileImageUri }}
                                style={styles.avatarImage}
                                contentFit="cover"
                            />
                        ) : (
                            <MaterialCommunityIcons name="account-circle" size={68} color={colors.primary} />
                        )}
                    </View>
                    <Pressable style={styles.photoButton} onPress={pickProfileImage}>
                        <MaterialCommunityIcons name="camera-plus" size={16} color={colors.primary} />
                        <Text style={styles.photoButtonText}>
                            {profileImageUri ? "Change Profile Image" : "Add Profile Image"}
                        </Text>
                    </Pressable>
                </View>
                <Text style={styles.name}>{customerName}</Text>
                <Text style={styles.email}>{customerEmail}</Text>

                <View style={styles.quickStatsRow}>
                    <View style={styles.quickStatCard}>
                        <Text style={styles.quickStatValue}>{user?.serviceCount ?? 0}</Text>
                        <Text style={styles.quickStatLabel}>Services Taken</Text>
                    </View>
                    <View style={styles.quickStatCard}>
                        <Text style={styles.quickStatValue}>{user?.paymentCount ?? 0}</Text>
                        <Text style={styles.quickStatLabel}>Payments</Text>
                    </View>
                </View>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.sectionTitle}>Profile</Text>

                <View style={styles.inputSection}>
                    <View style={styles.editableHeader}>
                        <View style={styles.sectionHeader}>
                            <MaterialCommunityIcons name="account-outline" size={18} color={colors.primary} />
                            <Text style={styles.fieldTitle}>Name</Text>
                        </View>
                        {!isEditingName ? (
                            <Pressable onPress={startNameEdit} hitSlop={8} style={styles.iconButton}>
                                <MaterialCommunityIcons name="pencil" size={18} color={colors.primary} />
                            </Pressable>
                        ) : null}
                    </View>

                    {isEditingName ? (
                        <>
                            <TextInput
                                value={draftName}
                                onChangeText={setDraftName}
                                placeholder="Enter full name"
                                placeholderTextColor={colors.textSecondary}
                                style={styles.input}
                            />
                            <View style={styles.actionRow}>
                                <Pressable style={styles.secondaryButton} onPress={cancelNameEdit}>
                                    <Text style={styles.secondaryButtonText}>Cancel</Text>
                                </Pressable>
                                <Pressable style={styles.primaryButton} onPress={updateName}>
                                    <Text style={styles.primaryButtonText}>Update</Text>
                                </Pressable>
                            </View>
                        </>
                    ) : (
                        <Text style={styles.staticValue}>{customerName}</Text>
                    )}
                </View>

                <View style={styles.inputSection}>
                    <View style={styles.editableHeader}>
                        <View style={styles.sectionHeader}>
                            <MaterialCommunityIcons name="email-outline" size={18} color={colors.primary} />
                            <Text style={styles.fieldTitle}>Email</Text>
                        </View>
                        {!isEditingEmail ? (
                            <Pressable onPress={startEmailEdit} hitSlop={8} style={styles.iconButton}>
                                <MaterialCommunityIcons name="pencil" size={18} color={colors.primary} />
                            </Pressable>
                        ) : null}
                    </View>

                    {isEditingEmail ? (
                        <>
                            <TextInput
                                value={draftEmail}
                                onChangeText={setDraftEmail}
                                placeholder="Enter email"
                                placeholderTextColor={colors.textSecondary}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                style={styles.input}
                            />
                            <View style={styles.actionRow}>
                                <Pressable style={styles.secondaryButton} onPress={cancelEmailEdit}>
                                    <Text style={styles.secondaryButtonText}>Cancel</Text>
                                </Pressable>
                                <Pressable style={styles.primaryButton} onPress={updateEmail}>
                                    <Text style={styles.primaryButtonText}>Update</Text>
                                </Pressable>
                            </View>
                        </>
                    ) : (
                        <Text style={styles.staticValue}>{customerEmail}</Text>
                    )}
                </View>

                <View style={styles.inputSection}>
                    <View style={styles.editableHeader}>
                        <View style={styles.sectionHeader}>
                            <MaterialCommunityIcons name="calendar-month-outline" size={18} color={colors.primary} />
                            <Text style={styles.fieldTitle}>Date of Birth</Text>
                        </View>
                        {!isEditingDob ? (
                            <Pressable onPress={startDobEdit} hitSlop={8} style={styles.iconButton}>
                                <MaterialCommunityIcons name="pencil" size={18} color={colors.primary} />
                            </Pressable>
                        ) : null}
                    </View>

                    {isEditingDob ? (
                        <>
                            <TextInput
                                value={draftDateOfBirth}
                                onChangeText={setDraftDateOfBirth}
                                placeholder="DD/MM/YYYY"
                                placeholderTextColor={colors.textSecondary}
                                style={styles.input}
                            />
                            <View style={styles.actionRow}>
                                <Pressable style={styles.secondaryButton} onPress={cancelDobEdit}>
                                    <Text style={styles.secondaryButtonText}>Cancel</Text>
                                </Pressable>
                                <Pressable style={styles.primaryButton} onPress={updateDob}>
                                    <Text style={styles.primaryButtonText}>Update</Text>
                                </Pressable>
                            </View>
                        </>
                    ) : (
                        <Text style={styles.staticValue}>{customerDob}</Text>
                    )}
                </View>

                <View style={styles.inputSection}>
                    <View style={styles.editableHeader}>
                        <View style={styles.sectionHeader}>
                            <MaterialCommunityIcons name="map-marker-radius" size={18} color={colors.primary} />
                            <Text style={styles.fieldTitle}>Address</Text>
                        </View>
                        {!isEditingAddress ? (
                            <Pressable onPress={startAddressEdit} hitSlop={8} style={styles.iconButton}>
                                <MaterialCommunityIcons name="pencil" size={18} color={colors.primary} />
                            </Pressable>
                        ) : null}
                    </View>

                    {isEditingAddress ? (
                        <>
                            <Text style={styles.sectionHint}>
                                Current location se address fetch kar sakte ho, ya Google Maps me point karke address yahan update kar sakte ho.
                            </Text>
                            <TextInput
                                value={draftAddress}
                                onChangeText={setDraftAddress}
                                placeholder="Enter address"
                                placeholderTextColor={colors.textSecondary}
                                multiline
                                style={[styles.input, styles.addressInput]}
                            />
                            <View style={styles.wrapActionRow}>
                                <Pressable
                                    onPress={useCurrentLocation}
                                    style={[styles.secondaryButton, isFetchingLocation && styles.buttonDisabled]}
                                    disabled={isFetchingLocation}
                                >
                                    <MaterialCommunityIcons name="crosshairs-gps" size={16} color={colors.primary} />
                                    <Text style={styles.secondaryButtonText}>
                                        {isFetchingLocation ? "Fetching..." : "Use Current Location"}
                                    </Text>
                                </Pressable>
                                <Pressable onPress={openGoogleMaps} style={styles.secondaryButton}>
                                    <MaterialCommunityIcons name="google-maps" size={16} color={colors.primary} />
                                    <Text style={styles.secondaryButtonText}>Open Google Maps</Text>
                                </Pressable>
                            </View>
                            <View style={styles.actionRow}>
                                <Pressable style={styles.secondaryButton} onPress={cancelAddressEdit}>
                                    <Text style={styles.secondaryButtonText}>Cancel</Text>
                                </Pressable>
                                <Pressable style={styles.primaryButton} onPress={updateAddress}>
                                    <Text style={styles.primaryButtonText}>Update</Text>
                                </Pressable>
                            </View>
                        </>
                    ) : (
                        <Text style={styles.staticValue}>{customerAddress}</Text>
                    )}
                </View>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.sectionTitle}>General Information</Text>

                <View style={styles.infoRow}>
                    <View style={styles.infoIconWrap}>
                        <MaterialCommunityIcons name="account-outline" size={18} color={colors.primary} />
                    </View>
                    <View style={styles.infoTextWrap}>
                        <Text style={styles.infoLabel}>Customer Type</Text>
                        <Text style={styles.infoValue}>{user?.customerType ?? "Residential Customer"}</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <View style={styles.infoIconWrap}>
                        <MaterialCommunityIcons name="phone-outline" size={18} color={colors.primary} />
                    </View>
                    <View style={styles.infoTextWrap}>
                        <Text style={styles.infoLabel}>Phone</Text>
                        <Text style={styles.infoValue}>{user?.phone ?? "9876543210"}</Text>
                    </View>
                </View>

                <Pressable style={styles.supportRow} onPress={openHelpSupport}>
                    <View style={styles.infoIconWrap}>
                        <MaterialCommunityIcons name="help-circle-outline" size={18} color={colors.primary} />
                    </View>
                    <View style={styles.infoTextWrap}>
                        <Text style={styles.infoLabel}>Support</Text>
                        <Text style={styles.infoValue}>Help & Support</Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textSecondary} />
                </Pressable>
            </View>

            <Pressable
                onPress={() => setUser(null)}
                hitSlop={8}
                style={styles.logoutButton}
            >
                <MaterialCommunityIcons name="logout" size={18} color="#fff" />
                <Text style={styles.logoutText}>Logout</Text>
            </Pressable>
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

    heroCard: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.lg,
        padding: spacing.xl,
        alignItems: "center",
        ...shadow
    },

    avatar: {
        width: 92,
        height: 92,
        borderRadius: 46,
        backgroundColor: colors.chip,
        alignItems: "center",
        justifyContent: "center"
    },

    avatarWrap: {
        alignItems: "center"
    },

    avatarImage: {
        width: "100%",
        height: "100%",
        borderRadius: 46
    },

    photoButton: {
        marginTop: spacing.sm,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: colors.chip,
        borderRadius: radius.pill,
        paddingHorizontal: spacing.md,
        paddingVertical: 10
    },

    photoButtonText: {
        color: colors.primary,
        fontWeight: "700"
    },

    name: {
        marginTop: spacing.md,
        color: colors.textPrimary,
        fontSize: typography.h2,
        fontWeight: "700"
    },

    email: {
        marginTop: 4,
        color: colors.textSecondary,
        fontSize: typography.body
    },

    quickStatsRow: {
        marginTop: spacing.lg,
        width: "100%",
        flexDirection: "row",
        gap: spacing.md
    },

    quickStatCard: {
        flex: 1,
        backgroundColor: colors.background,
        borderRadius: radius.md,
        padding: spacing.md,
        alignItems: "center"
    },

    quickStatValue: {
        color: colors.textPrimary,
        fontSize: typography.h3,
        fontWeight: "700"
    },

    quickStatLabel: {
        marginTop: 4,
        color: colors.textSecondary,
        fontSize: typography.caption
    },

    infoCard: {
        marginTop: spacing.lg,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.lg,
        padding: spacing.lg,
        ...shadow
    },

    sectionTitle: {
        color: colors.textPrimary,
        fontSize: typography.h3,
        fontWeight: "700"
    },

    inputSection: {
        marginTop: spacing.md
    },

    editableHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: spacing.sm
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm
    },

    fieldTitle: {
        color: colors.textPrimary,
        fontSize: typography.body,
        fontWeight: "700"
    },

    iconButton: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: colors.chip,
        alignItems: "center",
        justifyContent: "center"
    },

    input: {
        marginTop: spacing.sm,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: 12,
        color: colors.textPrimary,
        fontSize: typography.body,
        backgroundColor: colors.background
    },

    addressInput: {
        minHeight: 96,
        textAlignVertical: "top"
    },

    staticValue: {
        marginTop: spacing.sm,
        color: colors.textPrimary,
        fontSize: typography.body,
        fontWeight: "600"
    },

    sectionHint: {
        marginTop: spacing.sm,
        color: colors.textSecondary,
        fontSize: typography.caption,
        lineHeight: 18
    },

    wrapActionRow: {
        marginTop: spacing.md,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.sm
    },

    actionRow: {
        marginTop: spacing.md,
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: spacing.sm
    },

    secondaryButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.pill,
        paddingHorizontal: spacing.md,
        paddingVertical: 10,
        backgroundColor: colors.surface
    },

    secondaryButtonText: {
        color: colors.textPrimary,
        fontWeight: "700"
    },

    primaryButton: {
        backgroundColor: colors.primary,
        borderRadius: radius.pill,
        paddingHorizontal: spacing.lg,
        paddingVertical: 10
    },

    primaryButtonText: {
        color: "#fff",
        fontWeight: "700"
    },

    buttonDisabled: {
        opacity: 0.55
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },

    supportRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        paddingTop: spacing.sm,
        marginTop: spacing.xs
    },

    infoIconWrap: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.chip,
        alignItems: "center",
        justifyContent: "center"
    },

    infoTextWrap: {
        flex: 1
    },

    infoLabel: {
        color: colors.textSecondary,
        fontSize: typography.caption
    },

    infoValue: {
        marginTop: 2,
        color: colors.textPrimary,
        fontSize: typography.body,
        fontWeight: "600"
    },

    logoutButton: {
        marginTop: spacing.lg,
        backgroundColor: colors.primary,
        borderRadius: radius.pill,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.xs
    },

    logoutText: {
        color: "#fff",
        fontSize: typography.body,
        fontWeight: "700"
    }
});
