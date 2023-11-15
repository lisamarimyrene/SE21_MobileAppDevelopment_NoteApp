import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { colors } from "../../../themes/colors";
import { PostIt } from "./PostIt";
import { useNotes } from "../../hooks/useNotes";

export const Notes = () => {
    const { notes } = useNotes();

    if (!notes) {
        return (
            <View style={styles.placeholderTxtContainer}>
                <Text style={styles.placeholderTxt}>Click the + button to create new note</Text>
            </View>
        );
    }

    return (
        <View style={styles.viewSection}>
            <FlatList
                contentContainerStyle={styles.postitSection}
                numColumns={2} 
                scrollEnabled={true}
                data={notes}
                renderItem={({ item }) => {
                    return <PostIt
                        id={item.id}
                        color={item.color}
                        title={item.title}
                        content={item.content}
                    />;
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    placeholderTxtContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    placeholderTxt: {
        color: colors.text,
        fontFamily: "Menlo"
    },
    viewSection: {
        height: "78%",
    },
    postitSection: {
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 10,
        height: "auto",
        paddingVertical: 20,
    },
});