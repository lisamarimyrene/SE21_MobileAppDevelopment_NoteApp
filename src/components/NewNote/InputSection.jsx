import { ScrollView, TextInput, Image, StyleSheet } from 'react-native'
import { useContext } from 'react';
import { NoteContext } from '../../context/useContext';
import { useNotes } from '../../hooks/useNotes';

export const InputSection = () => {
    const { title, setTitle, content, setContent, imageUri, id } = useContext(NoteContext)
    const { oneNote } = useNotes(id)

    console.log("id input", id);
    console.log("oneNote: ", oneNote);

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
                onChangeText={text => setTitle(text)}
            />
            <TextInput
                style={styles.contentInput}
                placeholder="What's on your mind?"
                value={content}
                multiline={true}
                onChangeText={text => setContent(text)}
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