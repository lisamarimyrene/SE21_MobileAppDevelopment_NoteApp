
import { Text, View, StyleSheet, FlatList, ScrollView } from 'react-native'
import { colors } from '../../themes/colors'

export const PostIt = ({ title, content }) => {
    return (
        <View style={styles.postitContainer}>
            <View>
                <Text style={styles.headlineTxt}>{title}</Text>
                <Text style={styles.contentTxt}>{content}</Text>
            </View>
            <View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    postitContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '48%',
        height: '45%',
        aspectRatio: 1,
        padding: 16,
        marginVertical: 7,
        color: colors.text,
        backgroundColor: colors.blue.light,
        borderRadius: 4,
        shadowColor: '#B8AFB8',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    headlineTxt: {
        fontSize: 14,
        fontFamily: 'Menlo',
        marginBottom: 12
    },
    contentTxt: {
        fontSize: 12,
        fontFamily: 'Menlo'
    }

})