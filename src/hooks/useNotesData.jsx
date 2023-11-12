import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleData = () => {
    // All notes
    const [showNewNote, setShowNewNote] = useState(false);
    const [notes, setNotes] = useState([]);
    const [editNote, setEditNote] = useState(null);

    // Single note data
    const [title, setTitle] = useState(editNote ? editNote.title : '');
    const [content, setContent] = useState(editNote ? editNote.content : '');
    const [color, setColor] = useState(editNote ? editNote.color : 'yellow');
    const [imageUri, setImageUri] = useState(editNote ? editNote.image : null);
    const [isImageOptionsModalVisible, setImageOptionsModalVisible] = useState(false); // To show/hide modal

    // Load all saved notes 
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
    const handleCancelNote = (isDelete, tempId) => {
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

    // Handle the edit of an exisiting note
    const handleEditNote = (note) => {
        setEditNote(note);
        setShowNewNote(true);
    };

    return {
        showNewNote, 
        setShowNewNote,
        notes,
        setNotes,
        editNote,
        setEditNote,
        title,
        setTitle,
        content,
        setContent,
        color,
        setColor,
        imageUri,
        setImageUri,
        isImageOptionsModalVisible,
        setImageOptionsModalVisible,
        getNewId,
        handleSaveNote,
        handleCancelNote,
        handleEditNote        
    }

}
