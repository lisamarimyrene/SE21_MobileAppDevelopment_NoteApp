import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useContext } from "react";
import Svg, { Path } from "react-native-svg";
import { router } from "expo-router";
import { useNotes } from "../../hooks/useNotes";
import { NoteContext } from "../../context/useContext";

export const SaveDeleteSection = () => {
    const { id, title, content, color, imageUri } = useContext(NoteContext);
    const { handleSaveNote, handleDeleteNote } = useNotes(id);

    const handleSubmit = () => {
        if (!title && !content) {
            Alert.alert(
                "Did you mean to save?",
                "Please enter some input or delete the note.",
                [
                    {
                        text: "OK",
                    },
                ],
                { cancelable: true }
            );
            return;
        }
        handleSaveNote(id, title, content, color, imageUri);
    };

    const handleGoingBack = () => {
        if (title || content) {
            Alert.alert(
                "Are you sure?",
                "The note will be lost if you continue.",
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    {
                        text: "I am sure",
                        onPress: () => router.back(),
                        style: "destructive",
                    },
                ],
                { cancelable: false }
            );
        } else {
            router.back();
        }
    };


    return (
        <View style={styles.saveDeleteBackSection}>
            <TouchableOpacity onPress={() => handleGoingBack()}>
                <Svg width="35" height="35" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M19.5 0C8.73113 0 0 8.73113 0 19.5C0 30.2689 8.73113 39 19.5 39C30.2689 39 39 30.2689 39 19.5C39 8.73113 30.2689 0 19.5 0ZM21.7977 19.5C21.7977 19.5 26.8986 24.6009 27.1489 24.8511C27.7843 25.4865 27.7843 26.5151 27.1489 27.1489C26.5135 27.7843 25.4849 27.7843 24.8511 27.1489C24.6009 26.9003 19.5 21.7977 19.5 21.7977C19.5 21.7977 14.3991 26.8986 14.1489 27.1489C13.5135 27.7843 12.4849 27.7843 11.8511 27.1489C11.2158 26.5135 11.2158 25.4849 11.8511 24.8511C12.0998 24.6009 17.2023 19.5 17.2023 19.5C17.2023 19.5 12.1014 14.3991 11.8511 14.1489C11.2158 13.5135 11.2158 12.4849 11.8511 11.8511C12.4865 11.2158 13.5151 11.2158 14.1489 11.8511C14.3991 12.0998 19.5 17.2023 19.5 17.2023C19.5 17.2023 24.6009 12.1014 24.8511 11.8511C25.4865 11.2158 26.5151 11.2158 27.1489 11.8511C27.7843 12.4865 27.7843 13.5151 27.1489 14.1489C26.9003 14.3991 21.7977 19.5 21.7977 19.5Z" fill="#707070" />
                </Svg>
            </TouchableOpacity>
            <View style={styles.saveDeleteSection}>
                <TouchableOpacity onPress={() => handleDeleteNote(id)}>
                    <Svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M18 36C27.3888 36 35 28.165 35 18.5C35 8.83502 27.3888 1 18 1C8.61116 1 1 8.83502 1 18.5C1 28.165 8.61116 36 18 36Z" fill="#D18290" stroke="#D18290" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <Path d="M9 12H11H27" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <Path d="M25 12V26C25 26.5304 24.7893 27.0391 24.4142 27.4142C24.0391 27.7893 23.5304 28 23 28H13C12.4696 28 11.9609 27.7893 11.5858 27.4142C11.2107 27.0391 11 26.5304 11 26V12M14 12V10C14 9.46957 14.2107 8.96086 14.5858 8.58579C14.9609 8.21071 15.4696 8 16 8H20C20.5304 8 21.0391 8.21071 21.4142 8.58579C21.7893 8.96086 22 9.46957 22 10V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <Path d="M16 17V23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <Path d="M20 17V23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSubmit()} style={styles.saveBtn}>
                    <Svg width="45" height="45" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M24.4999 4.89999C13.6758 4.89999 4.8999 13.6759 4.8999 24.5C4.8999 35.3241 13.6758 44.1 24.4999 44.1C35.324 44.1 44.0999 35.3241 44.0999 24.5C44.0999 13.6759 35.324 4.89999 24.4999 4.89999ZM35.4547 20.7548L23.1067 33.1028C22.7996 33.4098 22.3847 33.5813 21.9519 33.5813C21.5191 33.5813 21.1026 33.4098 20.7971 33.1028L15.1572 27.4629C14.5186 26.8242 14.5186 25.792 15.1572 25.1533C15.7959 24.5147 16.8281 24.5147 17.4668 25.1533L21.9519 29.6385L33.1451 18.4452C33.7838 17.8066 34.816 17.8066 35.4547 18.4452C36.0933 19.0839 36.0933 20.1161 35.4547 20.7548Z" fill="#ACD3A9" />
                    </Svg>
                </TouchableOpacity>
            </View>
        </View>
    );


};

const styles = StyleSheet.create({
    saveDeleteBackSection: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30
    },
    saveDeleteSection: {
        flexDirection: "row",
        alignItems: "center"
    },
    saveBtn: {
        paddingLeft: 10
    }
});