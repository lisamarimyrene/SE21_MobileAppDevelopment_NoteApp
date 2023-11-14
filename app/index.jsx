import { View, StyleSheet } from 'react-native'
import { colors } from '../themes/colors'
import { Notes } from '../src/components/Notes';
import { NewNoteButton } from '../src/components/NewNoteButton';
import { useNotes } from '../src/hooks/useNotes';
import "expo-router/entry";


const Index = () => {
    const { notes } = useNotes()

    console.log('Index: ', notes);

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
        paddingTop: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto'
    }
})

export default Index;