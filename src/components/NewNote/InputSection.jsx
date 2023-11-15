import { ScrollView, TextInput, Image, StyleSheet } from 'react-native'
import { useContext, useEffect } from 'react';
import { NoteContext } from '../../context/useContext';
import { useNotes } from '../../hooks/useNotes';

export const InputSection = () => {
    const { title, content, imageUri, handleTitleChange, handleContentChange, setContent, setImageUri, setTitle  } = useContext(NoteContext)
    const { oneNote } = useNotes()

    useEffect(() => {
        // Assuming oneNote holds the fetched note data
        if (oneNote) {
            setTitle(oneNote.title || '');
            setContent(oneNote.content || '');
            setImageUri(oneNote.imageUri || null);
            // Update other context values as needed
        }
    }, [oneNote]);

    return (
        <ScrollView style={styles.inputSection}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <TextInput
                style={styles.titleInput}
                placeholder="Title"
                value={title}
                multiline={true}
                onChangeText={handleTitleChange}
            />
            <TextInput
                style={styles.contentInput}
                placeholder="What's on your mind?"
                value={content}
                multiline={true}
                onChangeText={handleContentChange}
            />
            {imageUri && (
                <Image
                    source={{ uri: imageUri }}
                    style={styles.imageInput}
                />
            )}
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    inputSection: {
        paddingBottom: 20,
    },
    titleInput: {
        fontSize: 26,
        marginBottom: 30,
        height: 50,
        fontFamily: 'Menlo',
    },
    contentInput: {
        fontSize: 16,
        height: 'auto',
        fontFamily: 'Menlo',
    },
    imageInput: {
        height: 200,
        width: '100%',
        marginTop: 30
    },
})