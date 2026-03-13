import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useContext, useMemo, useState } from "react";
import {
    Alert,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { technicianStats } from "../../services/api";
import { colors, radius, shadow, spacing, typography } from "../../theme/ui";

const profileItems = [
    { icon: "account-circle", label: "Name", value: "Rahul Kumar" },
    { icon: "phone", label: "Phone", value: "9876543210" },
    { icon: "shield-check", label: "Role", value: "Senior Field Technician" }
];

const allAreas = [
    "Ghaziabad",
    "Noida",
    "Greater Noida",
    "Indirapuram",
    "Vaishali",
    "Raj Nagar Extension",
    "Crossings Republik",
    "Sector 62 Noida",
    "Sector 137 Noida",
    "Vasundhara"
];

export default function TechnicianProfileScreen() {
    const { user, setUser } = useContext(AuthContext);
    const profileImageUri = user?.profileImageUri ?? null;
    const [dateOfBirth, setDateOfBirth] = useState("14/07/1996");
    const [draftDateOfBirth, setDraftDateOfBirth] = useState("14/07/1996");
    const [isEditingDob, setIsEditingDob] = useState(false);
    const [serviceAreas, setServiceAreas] = useState(["Ghaziabad", "Noida", "Greater Noida"]);
    const [draftServiceAreas, setDraftServiceAreas] = useState(["Ghaziabad", "Noida", "Greater Noida"]);
    const [areaSearch, setAreaSearch] = useState("");
    const [isAreaModalVisible, setIsAreaModalVisible] = useState(false);

    const filteredAreas = useMemo(() => {
        const query = areaSearch.trim().toLowerCase();

        return allAreas.filter((area) => {
            const matchesSearch = !query || area.toLowerCase().includes(query);
            return matchesSearch;
        });
    }, [areaSearch]);

    const openAreaModal = () => {
        setDraftServiceAreas(serviceAreas);
        setAreaSearch("");
        setIsAreaModalVisible(true);
    };

    const closeAreaModal = () => {
        setDraftServiceAreas(serviceAreas);
        setAreaSearch("");
        setIsAreaModalVisible(false);
    };

    const updateAreas = () => {
        setServiceAreas(draftServiceAreas);
        setAreaSearch("");
        setIsAreaModalVisible(false);
    };

    const toggleDraftArea = (area) => {
        setDraftServiceAreas((currentAreas) => (
            currentAreas.includes(area)
                ? currentAreas.filter((item) => item !== area)
                : [...currentAreas, area]
        ));
    };

    const startDobEdit = () => {
        setDraftDateOfBirth(dateOfBirth);
        setIsEditingDob(true);
    };

    const cancelDobEdit = () => {
        setDraftDateOfBirth(dateOfBirth);
        setIsEditingDob(false);
    };

    const updateDob = () => {
        setDateOfBirth(draftDateOfBirth.trim() || dateOfBirth);
        setIsEditingDob(false);
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

    const openHelpSupport = () => {
        Alert.alert(
            "Help & Support",
            "Email us support@solarcleaner.app or Call Us +91 99999 99999"
        );
    };

    return (
        <>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <View style={styles.heroCard}>
                    <View style={styles.heroHeader}>
                        <View />
                        <Pressable
                            onPress={() => setUser(null)}
                            hitSlop={8}
                            style={styles.logoutButton}
                        >
                            <MaterialCommunityIcons name="logout" size={18} color={colors.primary} />
                            <Text style={styles.logoutText}>Logout</Text>
                        </Pressable>
                    </View>
                    <View style={styles.avatarWrap}>
                        <View style={styles.avatar}>
                            {profileImageUri ? (
                                <Image
                                    source={{ uri: profileImageUri }}
                                    style={styles.avatarImage}
                                    contentFit="cover"
                                />
                            ) : (
                                <MaterialCommunityIcons name="account-hard-hat" size={40} color={colors.primary} />
                            )}
                        </View>
                        <Pressable style={styles.photoButton} onPress={pickProfileImage}>
                            <MaterialCommunityIcons name="camera-plus" size={16} color={colors.primary} />
                            <Text style={styles.photoButtonText}>
                                {profileImageUri ? "Change Profile Image" : "Add Profile Image"}
                            </Text>
                        </Pressable>
                    </View>
                    <Text style={styles.name}>Rahul Kumar</Text>
                    <Text style={styles.subtitle}>Solar cleaning technician</Text>

                    <View style={styles.highlightRow}>
                        <View style={styles.highlightBox}>
                            <Text style={styles.highlightValue}>{technicianStats.acceptedJobs}</Text>
                            <Text style={styles.highlightLabel}>Accepted</Text>
                        </View>
                        <View style={styles.highlightBox}>
                            <Text style={styles.highlightValue}>{technicianStats.completionRate}%</Text>
                            <Text style={styles.highlightLabel}>Completion</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.detailCard}>
                    {profileItems.map((item) => (
                        <View key={item.label} style={styles.row}>
                            <MaterialCommunityIcons name={item.icon} size={18} color={colors.primary} />
                            <View style={styles.rowText}>
                                <Text style={styles.label}>{item.label}</Text>
                                <Text style={styles.value}>{item.value}</Text>
                            </View>
                        </View>
                    ))}

                    <View style={styles.inputSection}>
                        <View style={styles.editableHeader}>
                            <View style={styles.sectionHeader}>
                                <MaterialCommunityIcons name="calendar-month" size={18} color={colors.primary} />
                                <Text style={styles.sectionTitle}>Date of Birth</Text>
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
                            <Text style={styles.staticValue}>{dateOfBirth}</Text>
                        )}
                    </View>

                    <View style={styles.serviceAreaSection}>
                        <View style={styles.editableHeader}>
                            <View style={styles.sectionHeader}>
                                <MaterialCommunityIcons name="map-marker-radius" size={18} color={colors.primary} />
                                <Text style={styles.sectionTitle}>Service Areas</Text>
                            </View>
                            <Pressable style={styles.addChipButton} onPress={openAreaModal}>
                                <MaterialCommunityIcons name="plus" size={14} color={colors.primary} />
                                <Text style={styles.addChipText}>Add Area</Text>
                            </Pressable>
                        </View>
                        <Text style={styles.sectionHint}>
                            Selected areas technician profile ke neeche chips me dikhte rahenge.
                        </Text>
                        <View style={styles.chipWrap}>
                            {serviceAreas.map((area) => (
                                <View key={area} style={styles.areaChip}>
                                    <Text style={styles.areaChipText}>{area}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <Pressable style={styles.supportRow} onPress={openHelpSupport}>
                        <View style={styles.sectionHeader}>
                            <MaterialCommunityIcons name="help-circle-outline" size={18} color={colors.primary} />
                            <Text style={styles.sectionTitle}>Help & Support</Text>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textSecondary} />
                    </Pressable>
                </View>
            </ScrollView>

            <Modal
                visible={isAreaModalVisible}
                transparent
                animationType="fade"
                onRequestClose={closeAreaModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Service Areas</Text>
                            <Pressable onPress={closeAreaModal} hitSlop={8}>
                                <MaterialCommunityIcons name="close" size={20} color={colors.textPrimary} />
                            </Pressable>
                        </View>

                        <View style={styles.searchBox}>
                            <MaterialCommunityIcons name="magnify" size={18} color={colors.textSecondary} />
                            <TextInput
                                value={areaSearch}
                                onChangeText={setAreaSearch}
                                placeholder="Search area"
                                placeholderTextColor={colors.textSecondary}
                                style={styles.searchInput}
                            />
                        </View>

                        <ScrollView style={styles.modalList} contentContainerStyle={styles.modalListContent}>
                            {filteredAreas.map((area) => {
                                const isSelected = draftServiceAreas.includes(area);

                                return (
                                    <Pressable
                                        key={area}
                                        style={[styles.areaOption, isSelected && styles.areaOptionActive]}
                                        onPress={() => toggleDraftArea(area)}
                                    >
                                        <Text style={[styles.areaOptionText, isSelected && styles.areaOptionTextActive]}>
                                            {area}
                                        </Text>
                                        {isSelected ? (
                                            <MaterialCommunityIcons
                                                name="check-circle"
                                                size={18}
                                                color={colors.primary}
                                            />
                                        ) : null}
                                    </Pressable>
                                );
                            })}
                        </ScrollView>

                        <View style={styles.modalSelectedWrap}>
                            {draftServiceAreas.map((area) => (
                                <View key={area} style={styles.areaChip}>
                                    <Text style={styles.areaChipText}>{area}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.actionRow}>
                            <Pressable style={styles.secondaryButton} onPress={closeAreaModal}>
                                <Text style={styles.secondaryButtonText}>Cancel</Text>
                            </Pressable>
                            <Pressable style={styles.primaryButton} onPress={updateAreas}>
                                <Text style={styles.primaryButtonText}>Update</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
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
        ...shadow
    },

    heroHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        alignSelf: "flex-end"
    },

    logoutText: {
        color: colors.primary,
        fontWeight: "700"
    },

    avatarWrap: {
        alignItems: "center"
    },

    avatar: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: colors.chip,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center"
    },

    avatarImage: {
        width: "100%",
        height: "100%",
        borderRadius: 44
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
        fontWeight: "700",
        textAlign: "center"
    },

    subtitle: {
        marginTop: 4,
        color: colors.textSecondary,
        fontSize: typography.body,
        textAlign: "center"
    },

    highlightRow: {
        marginTop: spacing.lg,
        width: "100%",
        flexDirection: "row",
        gap: spacing.md
    },

    highlightBox: {
        flex: 1,
        backgroundColor: colors.background,
        borderRadius: radius.md,
        padding: spacing.md,
        alignItems: "center"
    },

    highlightValue: {
        color: colors.textPrimary,
        fontSize: typography.h3,
        fontWeight: "700"
    },

    highlightLabel: {
        marginTop: 4,
        color: colors.textSecondary,
        fontSize: typography.caption
    },

    detailCard: {
        marginTop: spacing.lg,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.lg,
        padding: spacing.lg,
        ...shadow
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },

    rowText: {
        flex: 1
    },

    label: {
        color: colors.textSecondary,
        fontSize: typography.caption
    },

    value: {
        marginTop: 2,
        color: colors.textPrimary,
        fontSize: typography.body,
        fontWeight: "600"
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

    sectionTitle: {
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

    staticValue: {
        marginTop: spacing.sm,
        color: colors.textPrimary,
        fontSize: typography.body,
        fontWeight: "600"
    },

    serviceAreaSection: {
        marginTop: spacing.lg
    },

    supportRow: {
        marginTop: spacing.lg,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: spacing.md
    },

    sectionHint: {
        marginTop: spacing.xs,
        color: colors.textSecondary,
        fontSize: typography.caption
    },

    chipWrap: {
        marginTop: spacing.md,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.sm
    },

    areaChip: {
        backgroundColor: colors.chip,
        borderRadius: radius.pill,
        paddingHorizontal: spacing.md,
        paddingVertical: 10
    },

    areaChipText: {
        color: colors.primary,
        fontWeight: "700"
    },

    addChipButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.pill,
        paddingHorizontal: spacing.md,
        paddingVertical: 10
    },

    addChipText: {
        color: colors.primary,
        fontWeight: "700"
    },

    actionRow: {
        marginTop: spacing.md,
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: spacing.sm
    },

    secondaryButton: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.pill,
        paddingHorizontal: spacing.lg,
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

    modalOverlay: {
        flex: 1,
        backgroundColor: "#10243E55",
        justifyContent: "center",
        padding: spacing.lg
    },

    modalCard: {
        maxHeight: "82%",
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        padding: spacing.lg,
        ...shadow
    },

    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    modalTitle: {
        color: colors.textPrimary,
        fontSize: typography.h3,
        fontWeight: "700"
    },

    searchBox: {
        marginTop: spacing.md,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.md,
        paddingHorizontal: spacing.md,
        backgroundColor: colors.background
    },

    searchInput: {
        flex: 1,
        paddingVertical: 12,
        color: colors.textPrimary,
        fontSize: typography.body
    },

    modalList: {
        marginTop: spacing.md,
        maxHeight: 250
    },

    modalListContent: {
        gap: spacing.sm
    },

    areaOption: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: 12
    },

    areaOptionActive: {
        backgroundColor: colors.chip,
        borderColor: colors.primary
    },

    areaOptionText: {
        color: colors.textPrimary,
        fontSize: typography.body
    },

    areaOptionTextActive: {
        color: colors.primary,
        fontWeight: "700"
    },

    modalSelectedWrap: {
        marginTop: spacing.md,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.sm
    }
});
