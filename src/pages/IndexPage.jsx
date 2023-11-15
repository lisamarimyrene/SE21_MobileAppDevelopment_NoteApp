import { View, StyleSheet } from 'react-native'
import { colors } from '../../themes/colors';
import { Notes } from "../components/AllNotes/Notes"
import { NewNoteButton } from "../components/NewNote/NewNoteButton"

export const IndexPage = () => {
    return (
        <View style={styles.main}>
            <Notes/>
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
        justifyContent: 'center',
        height: ''
    }
})
