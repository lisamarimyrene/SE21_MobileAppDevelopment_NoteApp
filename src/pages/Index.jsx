import { View, StyleSheet, Text} from 'react-native'
import { NewNote } from '../components/NewNote';
import { colors } from '../../themes/colors'
import { useState } from 'react';
import { Notes } from '../components/Notes';
import { NewNoteButton } from '../components/NewNoteButton';
import { useNotes } from '../hooks/useNotes';
import { getNewId } from '../utils/getId'


export const Index = () => {
    const [showNewNote, setShowNewNote] = useState(false);
    const [editNote, setEditNote] = useState(null);

    const { notes, handleSaveNote } = useNotes()

    // Handle the edit of an exisiting note
    const handleEditNote = (note) => {
        setEditNote(note);
        setShowNewNote(true);
    };

    // ! Clean up code
    // If user cancels the new note (not saving)
    const handleCancel = (isDelete, tempId) => {
        if (isDelete) {
            if (tempId) {
                // Remove the temporary note by its unique ID
                setNotes((prevNotes) => prevNotes.filter((note) => note.id !== tempId));
            } else if (editNote) {
                // Remove the note from your data or state
                setNotes((prevNotes) => prevNotes.filter((note) => note.id !== editNote.id));
            }

            if (editNote) {
                // Update AsyncStorage to remove the deleted note
                AsyncStorage.setItem(
                    'notes',
                    JSON.stringify(notes.filter((note) => (tempId ? note.id !== tempId : note.id !== editNote.id)))
                )
                    .then(() => {
                        // Dismiss the editing view
                        setShowNewNote(false);
                        setEditNote(null);
                    })
                    .catch((error) => {
                        console.error('Error saving notes to AsyncStorage: ', error);
                    });
            } else {
                // If there is no `editNote`, simply dismiss the editing view
                setShowNewNote(false);
            }
        } else {
            // Dismiss the editing view
            setShowNewNote(false);
        }
    };

    return (
        <View style={styles.main}>
            <Notes notes={notes} handleEditNote={handleEditNote} />
            
            {showNewNote ? (
                <NewNote animationType="slide" onSave={handleSaveNote} onCancel={handleCancel} noteId={getNewId} editNote={editNote} />
            ) : (
                <NewNoteButton setShowNewNote={setShowNewNote} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: colors.background,
        flex: 1,
        flexDirection: 'column',
        paddingTop: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto'
    }
})