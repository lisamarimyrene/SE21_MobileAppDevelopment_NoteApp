import { NewNotePage } from "../src/pages/NewNotePage";
import { NoteProvider } from "../src/context/useContext";

const NewNote = () => {
    return (
        <NoteProvider>
            <NewNotePage />
        </NoteProvider>
    )
}

export default NewNote;
