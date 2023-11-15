import React, { createContext, useState } from "react";
import { useNotes } from "../hooks/useNotes";
import { useLocalSearchParams } from "expo-router";

// Initialize context
const NoteContext = createContext(null);

// Bruker en provider når du trenger tilgang til samme statesene globalt
const NoteProvider = ({ children }) => {

    //? Need to figureout the states
    const { id } = useLocalSearchParams();
    const { oneNote } = useNotes(id);

    const [title, setTitle] = useState(oneNote?.title || "");
    const [content, setContent] = useState(oneNote?.content || "");
    const [imageUri, setImageUri] = useState(oneNote?.imageUri || null);
    const [color, setColor] = useState(oneNote?.color || "yellow");
    const [mediaModalVisible, setMediaModalVisible] = useState(false);

    // Wrap the context around all children (App)
    return (
        <NoteContext.Provider
            value={{
                id,
                title, setTitle,
                content, setContent,
                imageUri, setImageUri,
                color, setColor,
                mediaModalVisible, setMediaModalVisible,
            }}>
            {children}
        </NoteContext.Provider>
    );
};

export { NoteContext, NoteProvider };
