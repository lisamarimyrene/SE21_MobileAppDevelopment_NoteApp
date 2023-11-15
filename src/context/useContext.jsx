import React, { createContext, useState, useEffect } from "react";
import { useNotes } from "../hooks/useNotes";
import { useLocalSearchParams } from "expo-router";

// Initialize context
const NoteContext = createContext(null);

// Bruker en provider når du trenger tilgang til samme statesene globalt
const NoteProvider = ({ children }) => {

    //? Need to figureout the states
    const { id } = useLocalSearchParams();
    console.log("ID", id);
    const { notes } = useNotes(id);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUri, setImageUri] = useState(null);
    const [color, setColor] = useState("yellow");
    const [mediaModalVisible, setMediaModalVisible] = useState(false);

    useEffect(() => {
        const existingNoteObject = notes.find((note) => note.id === id);
        setTitle(existingNoteObject?.title || "");
        setContent(existingNoteObject?.content || "");
        setImageUri(existingNoteObject?.imageUri || null);
        setColor(existingNoteObject?.color || "yellow");
     }, [id, notes]);

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
