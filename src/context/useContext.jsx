import { createContext, useState, useEffect } from 'react';
import { useNotes } from '../hooks/useNotes';
import { useLocalSearchParams } from 'expo-router';

// Initialize context
const NoteContext = createContext(null);

// Bruker en provider når du trenger tilgang til samme statesene globalt
const NoteProvider = ({ children }) => {

    const { id } = useLocalSearchParams();
    const { oneNote } = useNotes(id);

    const initialNote = oneNote || {
        title: '',
        content: '',
        imageUri: null,
        color: 'yellow',
        isImageOptionsModalVisible: false,
    };
    
    // Initialize states with fetched data if available
    const [title, setTitle] = useState(initialNote.title || '');
    const [content, setContent] = useState(initialNote.content || '');
    const [imageUri, setImageUri] = useState(initialNote.imageUri || null);
    const [color, setColor] = useState(initialNote.color || 'yellow');
    const [isImageOptionsModalVisible, setImageOptionsModalVisible] = useState(initialNote.isImageOptionsModalVisible || false);
    
    // Event handlers to update local state on text change
    const handleTitleChange = (text) => {
        setTitle(text);
    };
    
    const handleContentChange = (text) => {
        setContent(text);
    };

    // Wrap the context around all children (App)
    return (
        <NoteContext.Provider
            value={{
                id,
                title, setTitle,
                content, setContent,
                imageUri, setImageUri,
                color, setColor,
                isImageOptionsModalVisible, setImageOptionsModalVisible,
                handleTitleChange,
                handleContentChange
            }}>
            {children}
        </NoteContext.Provider>
    );
};

export { NoteContext, NoteProvider };
