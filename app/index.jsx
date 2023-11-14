import { View, StyleSheet } from 'react-native'
import { colors } from '../themes/colors'
import { Notes } from '../src/components/Notes';
import { NewNoteButton } from '../src/components/NewNoteButton';
import { useNotes } from '../src/hooks/useNotes';
import "expo-router/entry";


const Index = () => {
    const { notes } = useNotes()

    return (
        <View style={styles.main}>
            <Notes notes={notes} />
            <NewNoteButton/>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: colors.background,
        flex: 1,
        flexDirection: 'column',
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: ''
    }
})

export default Index;