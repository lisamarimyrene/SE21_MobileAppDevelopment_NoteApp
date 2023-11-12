import { View, StyleSheet, Text} from 'react-native'
import { NewNote } from '../components/NewNote';
import { colors } from '../../themes/colors'
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Notes } from '../components/Notes';
import { NewNoteButton } from '../components/NewNoteButton';


export const Index = () => {
    const [showNewNote, setShowNewNote] = useState(false);
    const [notes, setNotes] = useState([]);
    const [editNote, setEditNote] = useState(null);

    // Handle the edit of an exisiting note
    const handleEditNote = (note) => {
        setEditNote(note);
        setShowNewNote(true);
    };

    // Load all saved notes
    //* lage en hook? 
    useEffect(() => {
        // Load notes from AsyncStorage
        AsyncStorage.getItem('notes')
            .then(savedNotes => {
                if (savedNotes) {
                    const parsedNotes = JSON.parse(savedNotes);
                    setNotes(parsedNotes);
                }
            })
            // Error message in case it's not able to load notes
            .catch(error => {
                console.error('Error loading notes from AsyncStorage: ', error);
            });
    }, []);

    // Function to generate the an unique id for the postit notes
    //* Endre til uu7(?)
    const getNewId = () => {
        const newId = Date.now();
        return newId.toString();
    };

    // Save note created or edited
    const handleSaveNote = (newNote) => {
        let updatedNotes;

        if (editNote) {
            // If you are editing a note, update it in the existing notes
            updatedNotes = notes.map((note) =>
                note.id === editNote.id ? { ...note, ...newNote } : note
            );
            // Reset input fields to null
            setEditNote(null);
        } else {
            // If you are adding a new note, add it to the existing notes
            newNote.id = getNewId();
            updatedNotes = [...notes, newNote];
        }

        // Update the state with the updated notes
        setNotes(updatedNotes);

        // Store the updated notes in AsyncStorage
        AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
            .then(() => {
                setShowNewNote(false);
            })
            .catch((error) => {
                console.error('Error saving notes to AsyncStorage: ', error);
            });
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