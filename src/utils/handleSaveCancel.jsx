import { Alert } from 'react-native'
import { handleData } from '../hooks/useNotesData';

// Helper function to handle save action
// Handle the saving functionality
export const handleSave = async ({
        
    editNote,
        title,
        content,
        getNewId,
        handleSaveNote,
        handleCancelNote,
        color,
        imageUri
    }) => {

    if (title || content) {
        const newNote = {
            id: editNote ? editNote.id : getNewId(),
            color: color,
            title: title,
            content: content,
            image: imageUri,
        };

        handleSaveNote(newNote);
        handleCancelNote();
        
    }
    else {
        Alert.alert(
            'Did you mean to save?',
            'Please enter some input or delete the note.',
            [
                {
                    text: 'OK',
                },
            ],
            { cancelable: true }
        );
    }
};

// Handle the cancel action with a confirmation dialog
export const handleCancel = ({
        title,
        content,
        handleCancelNote 
    }) => {

    // const {
    //     title,
    //     content,
    //     handleCancelNote,
    // } = handleData()

    // If the note has title or content, give alert.
    if (title || content) {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this note?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        handleCancelNote(true);
                    },
                },
            ],
            { cancelable: false }
        );
        // If the note doesnt have title or content, just close modal.
    } else if (!title || !content) {
        handleCancelNote(true);
        // Else, don't close modal but keep open.
    } else {
        handleCancelNote(false);
    }
};



