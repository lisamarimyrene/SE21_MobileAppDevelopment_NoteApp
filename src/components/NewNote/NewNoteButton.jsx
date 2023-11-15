import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Link } from "expo-router";

export const NewNoteButton = () => {
    return (
        <Link href={"/NewNote?noteId="} asChild>
            <TouchableOpacity
                style={styles.buttonContainer}
            >
                <Svg width="90" height="90" viewBox="0 0 162 162" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M81 16.2C45.2142 16.2 16.2 45.2142 16.2 81C16.2 116.786 45.2142 145.8 81 145.8C116.786 145.8 145.8 116.786 145.8 81C145.8 45.2142 116.786 16.2 81 16.2ZM113.4 86.4H86.4V113.4C86.4 116.386 83.9808 118.8 81 118.8C78.0192 118.8 75.6 116.386 75.6 113.4V86.4H48.6C45.6192 86.4 43.2 83.9862 43.2 81C43.2 78.0138 45.6192 75.6 48.6 75.6H75.6V48.6C75.6 45.6138 78.0192 43.2 81 43.2C83.9808 43.2 86.4 45.6138 86.4 48.6V75.6H113.4C116.381 75.6 118.8 78.0138 118.8 81C118.8 83.9862 116.381 86.4 113.4 86.4Z" fill="#B17A9B" />
                </Svg>
            </TouchableOpacity>
        </Link>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        width: "100%",
        height: "20%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#000",
    },
});