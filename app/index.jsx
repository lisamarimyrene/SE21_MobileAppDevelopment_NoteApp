import "expo-router/entry";
import { NoteProvider } from "../src/context/useContext";
import { IndexPage } from "../src/pages/IndexPage";

const Index = () => {
    return (
        <NoteProvider>
            <IndexPage />
        </NoteProvider>
    )
}
export default Index;