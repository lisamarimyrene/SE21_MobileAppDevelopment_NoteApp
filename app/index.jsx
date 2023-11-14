import { View, StyleSheet, Text } from 'react-native'
import { NewNote } from './NewNote';
import { colors } from '../themes/colors'
import { useEffect, useState } from 'react';
import { Notes } from '../src/components/Notes';
import { NewNoteButton } from '../src/components/NewNoteButton';
import { useNotes } from '../src/hooks/useNotes';
import { getNewId } from '../src/utils/getId'
import { useModal } from '../src/hooks/useModal'


const Index = () => {
    // const [showNewNote, setShowNewNote] = useState(false);
    const [editNote, setEditNote] = useState(null);
    const { notes, handleSaveNote, handleDeleteNote } = useNotes()
    const { showModal, toggleModal } = useModal()

    // // Handle the edit of an exisiting note
    // const toggleEditNoteModal = (note) => {
    //     setEditNote(note);
    //     setShowNewNote(true);
    // };

    return (
        <View style={styles.main}>
            <Notes notes={notes} />

            {showModal ? (
                <NewNote animationType="slide" onSave={handleSaveNote} onCancel={handleDeleteNote} noteId={getNewId} editNote={editNote} />
            ) : (
                <NewNoteButton toggleFunction={toggleModal} />
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

export default Index;