import { View, Modal, TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { colors } from "../../../themes/colors";
import { NoteContext } from "../../context/useContext";
import { mediaFunctionaliy } from "../../utils/mediaFunctionality";
import * as ImagePicker from "expo-image-picker";

export const MediaModal = () => {
    const { mediaModalVisible, setMedaModalVisible  } = useContext(NoteContext);

    const launchCameraAsync = ImagePicker.launchCameraAsync;
    const launchImageLibraryAsync = ImagePicker.launchImageLibraryAsync;

    return (
        <View style={styles.modalContainer}>
            <Modal
                visible={mediaModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setMedaModalVisible(!mediaModalVisible);
                }}>

                <View style={styles.centeredModal}>
                    <View style={styles.imageOptionsModal}>
                        <View style={styles.modalPictureOptionsContainer}>
                            <TouchableOpacity style={styles.modalChooseBtn} onPress={() => mediaFunctionaliy(launchCameraAsync)}>
                                <Text style={styles.modalOptionText}>Take a Photo</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalChooseBtn} onPress={() => mediaFunctionaliy(launchImageLibraryAsync)}>
                                <Text style={styles.modalOptionText}>Choose from Camera Roll</Text>
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setMedaModalVisible(false)}>
                            <Text style={styles.modalOptionText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredModal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    imageOptionsModal: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
        height: "20%",
        width: "80%",
        paddingBottom: 10,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.13,
        shadowRadius: 8.00,
        elevation: 4,
    },
    modalPictureOptionsContainer: {
        flexDirection: "row",
        width: "80%",
        justifyContent: "space-between"

    },
    modalOptionText: {
        textAlign: "center",
    },
    modalChooseBtn: {
        backgroundColor: "white",
        padding: 10,
        width: 110,
        borderRadius: 5,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    modalCancelBtn: {
        backgroundColor: colors.blue.medium,
        padding: 10,
        borderRadius: 20,
        marginTop: 20
    }
});