import { useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { overwriteNotes } from "../utils/asyncStorage";
import { getNewId } from "../utils/getId";
import { useModal } from "./useModal";

export const useNotes = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(false)
    const [notes, setNotes] = useState([])
    const { toggleModal } = useModal()

    // Trigger refresh of data function
    const triggerRefresh = () => {
        setRefreshTrigger(!refreshTrigger)
    }

    // Refresh notes data that are listening on the refreshTrigger state
    useEffect(() => {
        AsyncStorage.getItem('notes')
            .then(savedNotes => {
                if (savedNotes) {
                    const parsedNotes = JSON.parse(savedNotes);
                    setNotes(parsedNotes)
                }
            })
            // Error message in case it's not able to load notes
            .catch(error => {
                console.error('Error loading notes from AsyncStorage: ', error);
            });

    }, [refreshTrigger])

    // Save note created or edited
    const handleSaveNote = (noteToSave) => {
        let newNotesArray;

        const noteIdExists = notes.filter((note) => {
            if (noteToSave.id === note.id) return note
            console.log(note);
        })
        console.log("noteExists", noteIdExists);

        if (noteIdExists.length) {
            // If you are editing a note, update it in the existing notes
            newNotesArray = notes.map((note) =>
                note.id === noteToSave.id ? { ...note, ...noteToSave } : note
            );
            console.log("if", noteToSave.id);


            // ? Remove
            // Reset input fields to null
            // setEditNote(null);
            //! kommer ikke inn til elsen
        } else {
            // If you are adding a new note, add it to the existing notes
            noteToSave.id = getNewId();
            newNotesArray = [...notes, noteToSave];
            console.log("else", noteToSave.id);
        }

        overwriteNotes(newNotesArray)
        triggerRefresh()
    };

    // Handle delete note
    const handleDeleteNote = (noteToDelete) => {
        let newNotesArray;

        // newNotesArray = notes.map((note) =>
        //     note.id === noteToDelete.id ? { ...note, ...noteToDelete } : note
        // );

        newNotesArray = notes.filter((note) => {
            if(note.id !== noteToDelete.id) {
                return note
            }
        })

        AsyncStorage.setItem(
            'notes',
            JSON.stringify(newNotesArray)
        )
            .then(() => {
                // Dismiss the editing view
                overwriteNotes(newNotesArray)
                triggerRefresh()
                toggleModal(false)
            })
            .catch((error) => {
                console.error('Error saving notes to AsyncStorage: ', error);
            });
            
    }


    //     if (isDelete) {
    //         if (tempId) {
    //             // Remove the temporary note by its unique ID
    //             setNotes((prevNotes) => prevNotes.filter((note) => note.id !== tempId));
    //         } else if (editNote) {
    //             // Remove the note from your data or state
    //             setNotes((prevNotes) => prevNotes.filter((note) => note.id !== editNote.id));
    //         }

    //         if (editNote) {
    //             // Update AsyncStorage to remove the deleted note
    //             AsyncStorage.setItem(
    //                 'notes',
    //                 JSON.stringify(notes.filter((note) => (tempId ? note.id !== tempId : note.id !== editNote.id)))
    //             )
    //                 .then(() => {
    //                     // Dismiss the editing view
    //                     setShowNewNote(false);
    //                     setEditNote(null);
    //                 })
    //                 .catch((error) => {
    //                     console.error('Error saving notes to AsyncStorage: ', error);
    //                 });
    //         } else {
    //             // If there is no `editNote`, simply dismiss the editing view
    //             setShowNewNote(false);
    //         }
    //     } else {
    //         // Dismiss the editing view
    //         setShowNewNote(false);
    //     }
    // };

    return { notes, handleSaveNote, handleDeleteNote }
}