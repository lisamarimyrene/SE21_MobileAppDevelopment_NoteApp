import { createContext, useContext, useState } from 'react';

const NoteContext = createContext(null);

const NoteProvider = ({ children }) => {
    const [title, setTitle] = useState(existingNoteObject?.title || '');
    const [content, setContent] = useState(existingNoteObject?.content || '');
    const [imageUri, setImageUri] = useState(existingNoteObject?.imageUri || null);
    const [color, setColor] = useState(existingNoteObject?.color || 'blue');
    const [isImageOptionsModalVisible, setImageOptionsModalVisible] = useState(false); // To show/hide modal



    // Wrap the context around all children (App)
    return (
        <NoteContext.Provider
            value={{
                title, setTitle,
                content, setContent,
                imageUri, setImageUri,
                color, setColor,
                isImageOptionsModalVisible, setImageOptionsModalVisible,
            }}>
            {children}
        </NoteContext.Provider>
    );
};

export { NoteContext, NoteProvider };
