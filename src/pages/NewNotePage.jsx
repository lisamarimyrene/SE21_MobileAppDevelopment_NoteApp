import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";

// Utils & Hooks
import { getCameraPermission, getCameraRollPermission } from "../utils/getPermissions";

// Components
import { SaveDeleteSection } from "../components/NewNote/SaveDeleteSection";
import { InputSection } from "../components/NewNote/InputSection";
import { OptionsSection } from "../components/NewNote/OptionsSection";
import { MediaModal } from "../components/NewNote/MediaModal";

export const NewNotePage = () => {

    // Update persmission
    useEffect(() => {
        getCameraRollPermission();
        getCameraPermission();
    }, []);

    return (
            <View style={styles.newNoteContainer}>
                <SaveDeleteSection/>
                <InputSection/>
                <OptionsSection />
                <MediaModal />
            </View>
    );
};

const styles = StyleSheet.create({
    newNote: {
        height: "90%"
    },
    newNoteContainer: {
        height: "100%",
        width: "100%",
        paddingHorizontal: 30,
        paddingTop: 60,
        paddingBottom: 30
    }
});
